<?php

require_once dirname( plugin_dir_path( __FILE__ ) ) . '/utils/extract-headings.php';
require_once dirname( plugin_dir_path( __FILE__ ) ) . '/utils/extract-images.php';
require_once dirname( plugin_dir_path( __FILE__ ) ) . '/utils/extract-page-info.php';
require_once dirname( plugin_dir_path( __FILE__ ) ) . '/utils/extract-page-links.php';
require_once dirname( plugin_dir_path( __FILE__ ) ) . '/utils/get-page-metrics.php';
require_once dirname( plugin_dir_path( __FILE__ ) ) . '/utils/guess-keywords.php';
require_once dirname( plugin_dir_path( __FILE__ ) ) . '/utils/get-keyword-consistency.php';

class FalconSEOAudit {

	protected $wpdb;
	protected $audit_report_table;
	protected $single_content_report_table;
	protected $report_id;
	protected $audited_urls = array();

	public function __construct() {
		global $wpdb;
		$this->wpdb                        = $wpdb;
		$this->audit_report_table          = $wpdb->prefix . 'falcon_seo_audit_report';
		$this->single_content_report_table = $wpdb->prefix . 'falcon_seo_single_content_report';
	}

	public function start_the_crawler( $new_report_id ) {

		$this->report_id = $new_report_id;

		try {
			// Mark status as running
			$this->wpdb->update( $this->audit_report_table, array( 'status' => 'running' ), array( 'id' => $this->report_id ) );

			// Perform the audit
			$home_page_url = home_url( '/' );
			$this->audit_url( $home_page_url );

			// Mark status as completed if no exceptions occur
			$this->wpdb->update( $this->audit_report_table, array( 'status' => 'completed' ), array( 'id' => $this->report_id ) );
		} catch ( Exception $e ) {
			// Log the exception message and update the status to 'failed'
			error_log( 'Audit failed: ' . $e->getMessage() );
			$this->wpdb->update( $this->audit_report_table, array( 'status' => 'failed' ), array( 'id' => $this->report_id ) );
		}
	}

	public function audit_url( $url ) {
		if ( in_array( $url, $this->audited_urls, true ) ) {
			return;
		}

		$this->audited_urls[] = $url;

		$response    = wp_remote_get( $url );
		$status_code = wp_remote_retrieve_response_code( $response );
		$headers     = wp_remote_retrieve_headers( $response );

		// Check for Content-Security-Policy header
		$csp_header        = $headers['content-security-policy'] ?? null;
		$encoding          = $headers['content-encoding'] ?? null;
		$uncompressed_size = $headers['content-length'] ?? null;

		if ( 200 === $status_code ) {
			$body = $response['body'];

			// Compressed page size
			$compressed_size = strlen( $body );

			$doc = new DOMDocument();
			@$doc->loadHTML( mb_convert_encoding( $body, 'HTML-ENTITIES', 'UTF-8' ) );

			$page_info           = extractInformation( $doc );
			$links               = extractPageLinks( $doc );
			$content_metrics     = analyzeContentMetrics( $doc );
			$headings            = extractHeadings( $doc );
			$images              = extractImages( $doc );
			$guessed_keywords    = guessKeywords( $doc );
			$keyword_consistency = extractKeywordConsistency( $doc, array_keys( $guessed_keywords ) );

			// Insert data to report table
			$this->wpdb->insert(
				$this->single_content_report_table,
				array(
					'report_id'                   => $this->report_id,
					'url'                         => $url,
					'status_code'                 => $status_code,
					'title'                       => $page_info['title'],
					'meta_description'            => $page_info['meta_description'],
					'keywords'                    => $page_info['keywords'],
					'content_type'                => $page_info['content_type'],
					'robots'                      => $page_info['robots'],
					'lang'                        => $page_info['lang'],
					'canonical_url'               => $page_info['canonical_url'],
					'open_graph'                  => wp_json_encode( $page_info['open_graph'] ),
					'twitter_data'                => wp_json_encode( $page_info['twitter_data'] ),
					'json_ld'                     => wp_json_encode( $page_info['json_ld'] ),
					'viewport'                    => $page_info['viewport'],
					'favicon'                     => $page_info['favicon'],
					'stylesheets'                 => wp_json_encode( $page_info['stylesheets'] ),
					'csp'                         => $csp_header ?? $page_info['csp'],
					'alternate_links'             => wp_json_encode( $page_info['alternate_links'] ),
					'javascript_links'            => wp_json_encode( $page_info['javascript_links'] ),
					'internal_links'              => wp_json_encode( $links['internal'] ),
					'external_links'              => wp_json_encode( $links['external'] ),
					'compressed_size'             => $compressed_size,
					'uncompressed_size'           => $uncompressed_size,
					'encoding'                    => $encoding,
					'word_count'                  => $content_metrics['word_count'],
					'paragraph_count'             => $content_metrics['paragraph_count'],
					'average_words_per_paragraph' => $content_metrics['average_words_per_paragraph'],
					'sentence_count'              => $content_metrics['sentence_count'],
					'average_words_per_sentence'  => $content_metrics['average_words_per_sentence'],
					'readability_score'           => $content_metrics['readability_score'],
					'node_count'                  => $content_metrics['node_count'],
					'headings'                    => wp_json_encode( $headings ),
					'images'                      => wp_json_encode( $images ),
					'guessed_keywords'            => wp_json_encode( $guessed_keywords ),
					'keyword_consistency'         => wp_json_encode( $keyword_consistency ),

				)
			);

			// Crawl the links for this page
			foreach ( $links['internal'] as $internal_link ) {
				$this->audit_url( $internal_link['href'] );
			}
		}
	}
}

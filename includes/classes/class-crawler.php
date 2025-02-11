<?php

/**
 * File: class-crawler.php
 *
 * @package Falcon_SEO_Audit
 * @since 1.0.0
 */

namespace Falcon_Seo_Audit;

use Falcon_Seo_Audit\Utils;

/**
 * Class Crawler
 *
 * @package Falcon_Seo_Audit
 * @since 1.0.0
 */
class Crawler
{

	/**
	 * WordPress database object.
	 *
	 * @var \wpdb
	 */
	protected $wpdb;

	/**
	 * Table name for report table.
	 *
	 * @var string
	 */
	protected $audit_report_table;

	/**
	 * Table name for single content report table.
	 *
	 * @var string
	 */
	protected $single_content_report_table;

	/**
	 * The ID of the report to create.
	 *
	 * @var int
	 */
	protected $report_id;

	/**
	 * An array of audited URLs.
	 *
	 * @var array
	 */
	protected $audited_urls = array();

	protected $home_page_url = 'https://wpsm.developerhasan.com/';

	/**
	 * Construct the crawler with database references.
	 *
	 * @return void
	 */
	public function __construct()
	{
		global $wpdb;
		$this->wpdb                        = $wpdb;
		$this->audit_report_table          = $wpdb->prefix . 'falcon_seo_audit_report';
		$this->single_content_report_table = $wpdb->prefix . 'falcon_seo_single_content_report';

		// Hook the callback to the cron event.
		add_action('falcon_seo_audit_cron', array($this, 'start_the_crawler'));
	}

	/**
	 * Starts the audit crawler.
	 *
	 * The crawler will traverse the links from the home page and audit them.
	 * The audit status will be marked as 'running' and then 'completed' if no errors occur.
	 * If an error occurs, the status will be marked as 'failed'.
	 *
	 * @param int $new_report_id The ID of the report to create.
	 *
	 * @return void
	 */
	public function start_the_crawler($new_report_id)
	{

		$this->report_id = $new_report_id;

		try {
			// Mark status as running.
			$this->wpdb->update($this->audit_report_table, array('status' => 'running'), array('id' => $this->report_id));

			// Perform the audit.
			$this->audit_url($this->home_page_url);

			// Mark status as completed if no exceptions occur.
			$this->wpdb->update($this->audit_report_table, array('status' => 'completed'), array('id' => $this->report_id));
		} catch (\Exception $e) {
			$this->wpdb->update($this->audit_report_table, array('status' => 'failed'), array('id' => $this->report_id));
		}
	}

	/**
	 * Performs a single audit on a given URL.
	 *
	 * @param string $url The URL to audit.
	 *
	 * @return void
	 */
	public function audit_url($url)
	{
		if (in_array($url, $this->audited_urls, true)) {
			return;
		}

		$this->audited_urls[] = $url;

		$response    = wp_remote_get($url);
		$status_code = wp_remote_retrieve_response_code($response);
		$headers     = wp_remote_retrieve_headers($response);

		// Get DATA from PSI API.
		$psi_rsponse = wp_remote_get('https://www.googleapis.com/pagespeedonline/v5/runPagespeed?url=' . $url . '&category=performance&&fields=lighthouseResult', [
			'timeout' => 60,
		]); 

		if (is_wp_error($psi_rsponse)) {
			error_log('Error: ' . $psi_rsponse->get_error_message());
			return;
		}

		$psi_data = $psi_rsponse['body'];

		$psi_metrics = Utils\extractMetrics($psi_data);

		// Getting header data.
		$csp_header        = $headers['content-security-policy'] ?? null;
		$encoding          = $headers['content-encoding'] ?? null;
		$uncompressed_size = $headers['content-length'] ?? null;

		if (200 === $status_code) {
			$body = $response['body'];

			$compressed_size = strlen($body);

			$doc = new \DOMDocument();
			@$doc->loadHTML(mb_convert_encoding($body, 'HTML-ENTITIES', 'UTF-8'));

			$page_info           = Utils\extract_information($doc);
			$links               = Utils\extract_page_links($doc, $this->home_page_url);
			$content_metrics     = Utils\analyze_content_metrics($doc);
			$headings            = Utils\extract_headings($doc);
			$images              = Utils\extract_images($doc);
			$guessed_keywords    = Utils\guess_keywords($doc);
			$keyword_consistency = Utils\get_keyword_consistency($doc, array_keys($guessed_keywords));

			// Insert data to report table.
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
					'open_graph'                  => wp_json_encode($page_info['open_graph']),
					'twitter_data'                => wp_json_encode($page_info['twitter_data']),
					'json_ld'                     => wp_json_encode($page_info['json_ld']),
					'viewport'                    => $page_info['viewport'],
					'favicon'                     => $page_info['favicon'],
					'stylesheets'                 => wp_json_encode($page_info['stylesheets']),
					'csp'                         => $csp_header ?? $page_info['csp'],
					'alternate_links'             => wp_json_encode($page_info['alternate_links']),
					'javascript_links'            => wp_json_encode($page_info['javascript_links']),
					'internal_links'              => wp_json_encode($links['internal']),
					'external_links'              => wp_json_encode($links['external']),
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
					'headings'                    => wp_json_encode($headings),
					'images'                      => wp_json_encode($images),
					'guessed_keywords'            => wp_json_encode($guessed_keywords),
					'keyword_consistency'         => wp_json_encode($keyword_consistency),
					'psi_score'                   => $psi_metrics['score'],
					'psi_fcp'                     => $psi_metrics['fcp'],
					'psi_lcp'                     => $psi_metrics['lcp'],
					'psi_tbt'                     => $psi_metrics['tbt'],
					'psi_cls'                     => $psi_metrics['cls'],
					'psi_speed_index'             => $psi_metrics['speedIndex'],
					'psi_screenshot'              => $psi_metrics['screenshot'],

				)
			);

			// Crawl the links for this page.
			foreach ($links['internal'] as $internal_link) {
				$this->audit_url($internal_link['href']);
			}
		}
	}
}

// Initialize the plugin.
$fsa_crawler = new Crawler();

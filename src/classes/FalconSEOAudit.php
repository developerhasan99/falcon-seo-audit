<?php

require_once dirname(plugin_dir_path(__FILE__)) . '/utils/extract-headings.php';
require_once dirname(plugin_dir_path(__FILE__)) . '/utils/extract-images.php';
require_once dirname(plugin_dir_path(__FILE__)) . '/utils/extract-page-info.php';
require_once dirname(plugin_dir_path(__FILE__)) . '/utils/extract-page-links.php';
require_once dirname(plugin_dir_path(__FILE__)) . '/utils/get-page-metrics.php';
require_once dirname(plugin_dir_path(__FILE__)) . '/utils/guess-keywords.php';
require_once dirname(plugin_dir_path(__FILE__)) . '/utils/get-keyword-consistency.php';

class FalconSEOAudit
{
    protected $wpdb;
    protected $audit_report_table;
    protected $single_content_report_table;
    protected $report_id;
    protected $audited_urls = [];

    public function __construct()
    {
        global $wpdb;
        $this->wpdb = $wpdb;
        $this->audit_report_table = $wpdb->prefix . "falcon_seo_audit_report";
        $this->single_content_report_table = $wpdb->prefix . "falcon_seo_single_content_report";

        // Hook into the action for background tasks
        // add_action('falcon_seo_audit_background_task', [$this, 'runBackgroundTask']);
    }

    public function runBackgroundTask($new_report_id)
    {

        $this->report_id = $new_report_id;

        $this->wpdb->update($this->audit_report_table, ['status' => 'running'], ['id' => $this->report_id]);

        $home_page_url = home_url('/');
        $this->auditUrl($home_page_url);

        $this->wpdb->update($this->audit_report_table, ['status' => 'completed'], ['id' => $this->report_id]);
    }

    public function auditUrl($url)
    {
        if (in_array($url, $this->audited_urls)) {
            return;
        }

        $this->audited_urls[] = $url;

        $response = wp_remote_get($url);
        $status_code = wp_remote_retrieve_response_code($response);

        $headers = wp_remote_retrieve_headers($response);

        // Check for Content-Security-Policy header
        $cspHeader = $headers['content-security-policy'] ?? null;
        $encoding = $headers['content-encoding'] ?? null;
        $uncompressedSize = $headers['content-length'] ?? null;

        if ($status_code === 200) {
            $body = $response['body'];

            // Compressed page size
            $compressedSize = strlen($body);

            $doc = new DOMDocument();
            @$doc->loadHTML(mb_convert_encoding($body, 'HTML-ENTITIES', 'UTF-8'));

            $page_info = extractInformation($doc);
            $links = extractPageLinks($doc);
            $contentMetrics = analyzeContentMetrics($doc);
            $headings = extractHeadings($doc);
            $images = extractImages($doc);
            $guessedKeywords = guessKeywords($doc);
            $keywordConsistency = extractKeywordConsistency($doc, array_keys($guessedKeywords));

            // Insert data to report table
            $this->wpdb->insert($this->single_content_report_table, [
                'report_id' => $this->report_id,
                'url' => $url,
                'status_code' => $status_code,
                'title' => $page_info['title'],
                'meta_description' => $page_info['meta_description'],
                'keywords' => $page_info['keywords'],
                'content_type' => $page_info['content_type'],
                'robots' => $page_info['robots'],
                'lang' => $page_info['lang'],
                'canonical_url' => $page_info['canonical_url'],
                'open_graph' => wp_json_encode($page_info['open_graph']),
                'twitter_data' => wp_json_encode($page_info['twitter_data']),
                'json_ld' => wp_json_encode($page_info['json_ld']),
                'viewport' => $page_info['viewport'],
                'favicon' => $page_info['favicon'],
                'stylesheets' => wp_json_encode($page_info['stylesheets']),
                'csp' => $cspHeader ?? $page_info['csp'],
                'alternate_links' => wp_json_encode($page_info['alternate_links']),
                'javascript_links' => wp_json_encode($page_info['javascript_links']),
                'internal_links' => wp_json_encode($links['internal']),
                'external_links' => wp_json_encode($links['external']),
                'compressed_size' => $compressedSize,
                'uncompressed_size' => $uncompressedSize,
                'encoding' => $encoding,
                'word_count' => $contentMetrics['word_count'],
                'paragraph_count' => $contentMetrics['paragraph_count'],
                'average_words_per_paragraph' => $contentMetrics['average_words_per_paragraph'],
                'sentence_count' => $contentMetrics['sentence_count'],
                'average_words_per_sentence' => $contentMetrics['average_words_per_sentence'],
                'readability_score' => $contentMetrics['readability_score'],
                'node_count' => $contentMetrics['node_count'],
                'headings' => wp_json_encode($headings),
                'images' => wp_json_encode($images),
                'guessed_keywords' => wp_json_encode($guessedKeywords),
                'keyword_consistency' => wp_json_encode($keywordConsistency),

            ]);

            // Crawl the links for this page
            foreach ($links['internal'] as $internal_link) {
                $this->auditUrl($internal_link['href']);
            }
        }
    }
}

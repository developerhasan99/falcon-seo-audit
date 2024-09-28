<?php

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

        if ($status_code === 200) {
            $body = $response['body'];

            $doc = new DOMDocument();
            @$doc->loadHTML(mb_convert_encoding($body, 'HTML-ENTITIES', 'UTF-8'));

            $page_info = $this->extractInformation($doc);

            $links = $this->analyzeLinks($doc);

            // Insert data to report table
            $this->wpdb->insert($this->single_content_report_table, [
                'report_id' => $this->report_id,
                'url' => $url,
                'status_code' => $status_code,
                'title' => $page_info['title'],
                'meta_description' => $page_info['meta_description'],
                'internal_links' => json_encode($links['internal']),
                'external_links' => json_encode($links['external']),
            ]);

            // Crawl the links for this page
            foreach ($links['internal'] as $internal_link) {
                $this->auditUrl($internal_link['href']);
            }
        }
    }

    protected function analyzeLinks($doc)
    {
        $internal_links = [];
        $external_links = [];
        $linkNodeList = $doc->getElementsByTagName('a');

        foreach ($linkNodeList as $linkNode) {
            $href = $linkNode->getAttribute('href');
            $anchorText = trim($linkNode->textContent);

            if ($this->isWebpageLink($href) && !str_contains($href, '#')) {
                $parsed_url = parse_url($href);
                $parsed_home_url = parse_url(home_url());

                if (!isset($parsed_url['host']) || $parsed_url['host'] === $parsed_home_url['host']) {
                    $href = isset($parsed_url['host']) ? $href : home_url() . $href;
                    $internal_links[] = ['anchor' => $anchorText, 'href' => $href];
                } else {
                    $external_links[] = ['anchor' => $anchorText, 'href' => $href];
                }
            }
        }

        return ['internal' => $internal_links, 'external' => $external_links];
    }

    protected function extractInformation($doc)
    {
        $title = $doc->getElementsByTagName('title')->item(0)->nodeValue;
        $description = "";
        $metas = $doc->getElementsByTagName('meta');

        foreach ($metas as $meta) {
            if ($meta->getAttribute('name') == 'description') {
                $description = $meta->getAttribute('content');
            }
        }

        return [
            'title' => $title,
            'meta_description' => $description,
        ];
    }

    protected function isWebpageLink($link)
    {
        $path = parse_url($link, PHP_URL_PATH);

        if (strpos($path, 'wp-content/uploads') !== false) {
            return false;
        }

        $extension = pathinfo($path, PATHINFO_EXTENSION);
        $file_extensions = ['jpg', 'jpeg', 'png', 'gif', 'pdf', 'doc', 'docx', 'zip', 'mp4', 'mp3'];

        return !in_array(strtolower($extension), $file_extensions);
    }
}
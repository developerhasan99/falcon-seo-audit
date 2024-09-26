<?php

function falcon_seo_audit_run_audit(WP_REST_Request $request)
{
    // Get JSON payload from the request
    $data = $request->get_json_params();

    if (isset($data['urls'])) {
        $urls = $data['urls'];

        if (count($urls) > 0) {

            global $wpdb;
            $table_name = $wpdb->prefix . 'falcon_seo_audit_report';

            $wpdb->insert(
                $table_name,
                [
                    'urls' => json_encode($urls),
                ]
            );

            $new_report_id = $wpdb->insert_id;

            // Ensure the cron event is scheduled
            if (!wp_next_scheduled('falcon_seo_audit_background_task') && $new_report_id) {
                wp_schedule_single_event(time(), 'falcon_seo_audit_background_task', [$new_report_id]);

                // Your logic for processing the data
                $response_data = [
                    'status' => 'success',
                    'Message' => 'Audit job is started successfully'
                ];

                return new WP_REST_Response($response_data, 200);
            }
        }
    } else {
        return new WP_Error('rest_forbidden', esc_html__('Invalid request.'), ['status' => 403]);
    }
}

add_action('falcon_seo_audit_background_task', 'falcon_seo_audit_background_task');
function falcon_seo_audit_background_task($new_report_id)
{
    global $wpdb;
    $table_name = $wpdb->prefix . 'falcon_seo_audit_report';

    // Update the status to 'running' for the given report ID
    $wpdb->update($table_name, ['status' => 'running',], ['id' => $new_report_id]);

    // Retrieve the URLs for the given report ID
    $result = $wpdb->get_var($wpdb->prepare("SELECT urls FROM $table_name WHERE id = %d", $new_report_id));
    $urls = json_decode($result);

    foreach ($urls as $url_obj) {
        // Perform the audit task here
        $links = $url_obj->links;
        foreach ($links as $link) {

            $audit_url = $link->url;

            $response = wp_remote_get($audit_url);

            if (is_array($response) && ! is_wp_error($response)) {
                $status_code = wp_remote_retrieve_response_code($response);

                $body    = $response['body'];

                $doc = new DOMDocument();
                @$doc->loadHTML(mb_convert_encoding($body, 'HTML-ENTITIES', 'UTF-8'));

                // Extract title, and meta tags
                $nodes = $doc->getElementsByTagName('title');
                $title = $nodes->item(0)->nodeValue;

                $description = "";
                $keywords = "";
                $metas = $doc->getElementsByTagName('meta');

                for ($i = 0; $i < $metas->length; $i++) {
                    $meta = $metas->item($i);
                    if ($meta->getAttribute('name') == 'description')
                        $description = $meta->getAttribute('content');
                    if ($meta->getAttribute('name') == 'keywords')
                        $keywords = $meta->getAttribute('content');
                }

                // Get image tags from the page 
                $images = $doc->getElementsByTagName('img');
                $image_tags = [];
                foreach ($images as $image) {
                    $image_tags[] = $image->getAttribute('src');
                }

                // link analyze
                $linkNodeList = $doc->getElementsByTagName('a');

                foreach ($linkNodeList as $linkNode) {
                    $href = $linkNode->getAttribute('href');
                    $anchorText = trim($linkNode->textContent);

                    // Select the internal links only and remove # links
                    $parsed_url = parse_url($href);
                    if (!isset($parsed_url['scheme']) && $href !== '#' && strpos($href, '#') !== 0 && !str_contains($href, "#")) {
                        error_log($audit_url . ': ' . $href);
                    }
                }
            }
        }
    }
}

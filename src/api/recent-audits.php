<?php

function falcon_seo_audit_get_recent_audits(WP_REST_Request $request)
{

    global $wpdb;
    $table_name = $wpdb->prefix . 'falcon_seo_audit_report';

    $results = $wpdb->get_results("SELECT * FROM $table_name ORDER BY id DESC LIMIT 10");

    $reports = [];

    foreach ($results as $result) {

        $all_urls = [];

        $urls = json_decode($result->urls);
        foreach ($urls as $url) {
            $all_urls = array_merge($all_urls, $url->links);
        }

        array_push($reports, [
            'id' => $result->id,
            'urls_count' => count($all_urls),
            'status' => $result->status,
            'initiated_at' => $result->initiated_at
        ]);
    }

    // Your logic for processing the data
    $response_data = [
        'status' => 'success',
        'reports' => $reports
    ];

    return new WP_REST_Response($response_data, 200);
}

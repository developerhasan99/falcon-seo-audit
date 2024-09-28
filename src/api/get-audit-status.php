<?php

function falcon_seo_audit_get_audit_status(WP_REST_Request $request)
{

    global $wpdb;
    $audit_report_table_name = $wpdb->prefix . 'falcon_seo_audit_report';
    $single_content_report_table = $wpdb->prefix . 'falcon_seo_single_content_report';

    // Fetch the latest row based on the 'id' column
    $last_audit = $wpdb->get_row("SELECT id, status FROM $audit_report_table_name ORDER BY id DESC LIMIT 1");
    $urls = $wpdb->get_col("SELECT url FROM $single_content_report_table WHERE report_id = $last_audit->id");

    // Your logic for processing the data
    $response_data = [
        'status' => $last_audit->status,
        'urls' => $urls
    ];

    return new WP_REST_Response($response_data, 200);
}

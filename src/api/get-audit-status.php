<?php

function falcon_seo_audit_get_audit_status(WP_REST_Request $request)
{

    global $wpdb;
    $audit_report_table_name = $wpdb->prefix . 'falcon_seo_audit_report';
    $single_content_report_table = $wpdb->prefix . 'falcon_seo_single_content_report';

    // Get JSON payload from the request
    $data = $request->get_json_params();

    if (isset($data['audit_id'])) {

        $audit_id = $data['audit_id'];
        // Fetch the latest row based on the 'id' column
        $last_audit_status = $wpdb->get_var($wpdb->prepare("SELECT status FROM $audit_report_table_name WHERE id = %s", $audit_id));
        $urls = $wpdb->get_col($wpdb->prepare("SELECT url FROM $single_content_report_table WHERE report_id = %s", $audit_id));

        // Your logic for processing the data
        $response_data = [
            'status' => $last_audit_status,
            'urls' => $urls
        ];

        return new WP_REST_Response($response_data, 200);
    }
}

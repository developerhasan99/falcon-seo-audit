<?php

function falcon_seo_audit_get_single_audit(WP_REST_Request $request)
{

    global $wpdb;
    $single_content_report_table = $wpdb->prefix . 'falcon_seo_single_content_report';

    // Get JSON payload from the request
    $data = $request->get_json_params();

    if (isset($data['audit_id'])) {

        $audit_id = $data['audit_id'];

        $results = $wpdb->get_results($wpdb->prepare("SELECT * FROM $single_content_report_table WHERE report_id = %s", $audit_id));

        // TODO: have to implement internal and external links concation with the type. but habe to try to keep the external and internal liks seperate on db

        return new WP_REST_Response($results, 200);
    }
}
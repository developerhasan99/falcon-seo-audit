<?php

function falcon_seo_audit_get_single_audit(WP_REST_Request $request)
{

    global $wpdb;
    $single_content_report_table = $wpdb->prefix . 'falcon_seo_single_content_report';

    // Get JSON payload from the request
    $data = $request->get_json_params();

    if (isset($data['audit_id'])) {

        $audit_id = $data['audit_id'];

        $results = $wpdb->get_results($wpdb->prepare("SELECT id,url,status_code,title,meta_description,internal_links,external_links   FROM $single_content_report_table WHERE report_id = %s", $audit_id));

        return new WP_REST_Response($results, 200);
    }
}

<?php

require_once dirname(__DIR__, 1) . '/classes/FalconSEOAudit.php';

function falcon_seo_audit_run_audit(WP_REST_Request $request)
{
    global $wpdb;
    $table_name = $wpdb->prefix . 'falcon_seo_audit_report';
    $falcon_seo_audit = new FalconSEOAudit();

    // Get JSON payload from the request
    $data = $request->get_json_params();

    if (isset($data['audit_id'])) {
        $wpdb->insert($table_name, ['status' => 'pending']);
        $falcon_seo_audit->runBackgroundTask($data['audit_id']);
    }

    // Your logic for processing the data
    $response_data = [
        'status' => 'success',
    ];

    return new WP_REST_Response($response_data, 200);
}
<?php

function falcon_seo_audit_run_audit(WP_REST_Request $request)
{
    global $wpdb;
    $table_name = $wpdb->prefix . 'falcon_seo_audit_report';

    $wpdb->insert($table_name, ['status' => 'pending']);
    $new_report_id = $wpdb->insert_id;

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

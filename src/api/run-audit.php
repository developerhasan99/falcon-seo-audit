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
    // Perform the long-running task here
    error_log($new_report_id);
}

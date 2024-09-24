<?php

require_once plugin_dir_path(__FILE__) . 'get-urls.php';
require_once plugin_dir_path(__FILE__) . 'run-audit.php';
require_once plugin_dir_path(__FILE__) . 'recent-audits.php';

add_action('rest_api_init', function () {
    register_rest_route('falcon-seo-audit/v1', '/get-audit-urls/', [
        'methods' => 'POST',
        'callback' => 'falcon_seo_audit_get_audit_urls',
        'permission_callback' => 'falcon_seo_audit_permission_callback',
    ]);
    register_rest_route('falcon-seo-audit/v1', '/audit/', [
        'methods' => 'POST',
        'callback' => 'falcon_seo_audit_run_audit',
        'permission_callback' => 'falcon_seo_audit_permission_callback',
    ]);
    register_rest_route('falcon-seo-audit/v1', '/recent-audits/', [
        'methods' => 'GET',
        'callback' => 'falcon_seo_audit_get_recent_audits',
        'permission_callback' => 'falcon_seo_audit_permission_callback',
    ]);
});


function falcon_seo_audit_permission_callback(WP_REST_Request $request)
{
    // Validate the nonce from the request headers
    $nonce = $request->get_header('X-WP-Nonce');
    if (wp_verify_nonce($nonce, 'wp_rest')) {
        return true;
    }

    return new WP_Error('rest_forbidden', esc_html__('You do not have permission to access this endpoint.'), ['status' => 403]);
}

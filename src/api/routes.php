<?php

require_once plugin_dir_path(__FILE__) . 'initiate-audit.php';
require_once plugin_dir_path(__FILE__) . 'run-audit.php';
require_once plugin_dir_path(__FILE__) . 'get-audit-status.php';
require_once plugin_dir_path(__FILE__) . 'recent-audits.php';
require_once plugin_dir_path(__FILE__) . 'get-single-audit.php';
require_once plugin_dir_path(__FILE__) . 'get-single-details.php';
require_once plugin_dir_path(__FILE__) . 'delete-audit.php';

add_action('rest_api_init', 'Fsa_register_rest_api_routes');

function Fsa_register_rest_api_routes()
{
    register_rest_route(
        'falcon-seo-audit/v1',
        '/initiate-audit/',
        [
            'methods' => 'GET',
            'callback' => 'falcon_seo_audit_initiate_audit',
            'permission_callback' => 'falcon_seo_audit_permission_callback',
        ]
    );
    register_rest_route(
        'falcon-seo-audit/v1',
        '/run-audit/',
        [
          'methods' => 'POST',
          'callback' => 'falcon_seo_audit_run_audit',
          'permission_callback' => 'falcon_seo_audit_permission_callback',
        ]
    );
    register_rest_route(
        'falcon-seo-audit/v1',
        '/get-audit-status/',
        [
          'methods' => 'POST',
          'callback' => 'falcon_seo_audit_get_audit_status',
          'permission_callback' => 'falcon_seo_audit_permission_callback',
        ]
    );
    register_rest_route(
        'falcon-seo-audit/v1',
        '/recent-audits/',
        [
          'methods' => 'GET',
          'callback' => 'falcon_seo_audit_get_recent_audits',
          'permission_callback' => 'falcon_seo_audit_permission_callback',
        ]
    );
    register_rest_route(
        'falcon-seo-audit/v1',
        '/get-single-audit/',
        [
          'methods' => 'POST',
          'callback' => 'falcon_seo_audit_get_single_audit',
          'permission_callback' => 'falcon_seo_audit_permission_callback',
        ]
    );
    register_rest_route(
        'falcon-seo-audit/v1',
        '/get-single-details/',
        [
          'methods' => 'POST',
          'callback' => 'falcon_seo_audit_get_single_details',
          'permission_callback' => 'falcon_seo_audit_permission_callback',
        ]
    );
    register_rest_route(
        'falcon-seo-audit/v1',
        '/delete-audit/',
        [
          'methods' => 'POST',
          'callback' => 'falcon_seo_audit_delete_audit',
          'permission_callback' => 'falcon_seo_audit_permission_callback',
        ]
    );
}

function falcon_seo_audit_permission_callback(WP_REST_Request $request)
{
    // Validate the nonce from the request headers
    $nonce = $request->get_header('X-WP-Nonce');
    if (wp_verify_nonce($nonce, 'wp_rest')) {
        return true;
    }

    return new WP_Error(
        'rest_forbidden',
        esc_html__('You do not have permission to access this endpoint.'),
        ['status' => 403]
    );
}

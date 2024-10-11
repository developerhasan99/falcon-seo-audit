<?php

require_once plugin_dir_path( __FILE__ ) . 'initiate-audit.php';
require_once plugin_dir_path( __FILE__ ) . 'run-audit.php';
require_once plugin_dir_path( __FILE__ ) . 'get-audit-status.php';
require_once plugin_dir_path( __FILE__ ) . 'recent-audits.php';
require_once plugin_dir_path( __FILE__ ) . 'get-single-audit.php';
require_once plugin_dir_path( __FILE__ ) . 'get-single-details.php';
require_once plugin_dir_path( __FILE__ ) . 'delete-audit.php';

add_action( 'rest_api_init', 'fsa_register_rest_api_routes' );

/**
 * Registers REST API routes for the Falcon SEO Audit plugin.
 *
 * This function is attached to the `rest_api_init` action hook and registers
 * the following routes:
 *
 * - GET /initiate-audit/
 * - POST /run-audit/
 * - POST /get-audit-status/
 * - GET /recent-audits/
 * - POST /get-single-audit/
 * - POST /get-single-details/
 * - POST /delete-audit/
 *
 * @since 1.0.0
 */
function fsa_register_rest_api_routes() {
	register_rest_route(
		'falcon-seo-audit/v1',
		'/initiate-audit/',
		array(
			'methods'             => 'GET',
			'callback'            => 'falcon_seo_audit_initiate_audit',
			'permission_callback' => 'falcon_seo_audit_permission_callback',
		)
	);
	register_rest_route(
		'falcon-seo-audit/v1',
		'/run-audit/',
		array(
			'methods'             => 'POST',
			'callback'            => 'falcon_seo_audit_run_audit',
			'permission_callback' => 'falcon_seo_audit_permission_callback',
		)
	);
	register_rest_route(
		'falcon-seo-audit/v1',
		'/get-audit-status/',
		array(
			'methods'             => 'POST',
			'callback'            => 'falcon_seo_audit_get_audit_status',
			'permission_callback' => 'falcon_seo_audit_permission_callback',
		)
	);
	register_rest_route(
		'falcon-seo-audit/v1',
		'/recent-audits/',
		array(
			'methods'             => 'GET',
			'callback'            => 'falcon_seo_audit_get_recent_audits',
			'permission_callback' => 'falcon_seo_audit_permission_callback',
		)
	);
	register_rest_route(
		'falcon-seo-audit/v1',
		'/get-single-audit/',
		array(
			'methods'             => 'POST',
			'callback'            => 'falcon_seo_audit_get_single_audit',
			'permission_callback' => 'falcon_seo_audit_permission_callback',
		)
	);
	register_rest_route(
		'falcon-seo-audit/v1',
		'/get-single-details/',
		array(
			'methods'             => 'POST',
			'callback'            => 'falcon_seo_audit_get_single_details',
			'permission_callback' => 'falcon_seo_audit_permission_callback',
		)
	);
	register_rest_route(
		'falcon-seo-audit/v1',
		'/delete-audit/',
		array(
			'methods'             => 'POST',
			'callback'            => 'falcon_seo_audit_delete_audit',
			'permission_callback' => 'falcon_seo_audit_permission_callback',
		)
	);
}

/**
 * Checks if the request is authorized to access the Falcon SEO Audit API.
 *
 * Checks that the request includes a valid nonce in the X-WP-Nonce header.
 * Returns true if the request is authorized, or a WP_Error if the request is not authorized.
 *
 * @param WP_REST_Request $request The REST request.
 *
 * @return bool|WP_Error True if the request is authorized, or a WP_Error if the request is not authorized.
 */
function falcon_seo_audit_permission_callback( WP_REST_Request $request ) {
	// Validate the nonce from the request headers.
	$nonce = $request->get_header( 'X-WP-Nonce' );
	if ( wp_verify_nonce( $nonce, 'wp_rest' ) ) {
		return true;
	}

	return new WP_Error(
		'rest_forbidden',
		esc_html__( 'You do not have permission to access this endpoint.' ),
		array( 'status' => 403 )
	);
}

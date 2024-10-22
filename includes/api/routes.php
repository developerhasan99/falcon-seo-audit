<?php

/**
 * File: ajax-handlers.php
 *
 * @package Falcon_SEO_Audit
 * @since 1.0.0
 */

namespace Falcon_Seo_Audit\API;

/**
 * Registers all AJAX actions for the Falcon SEO Audit plugin.
 */
function register_ajax_actions()
{
	// Initiate Audit.
	add_action('wp_ajax_initiate_audit', __NAMESPACE__ . '\\initiate_audit');
	add_action('wp_ajax_nopriv_initiate_audit', __NAMESPACE__ . '\\initiate_audit');

	// Get Audit Status.
	add_action('wp_ajax_get_audit_status', __NAMESPACE__ . '\\get_audit_status');
	add_action('wp_ajax_nopriv_get_audit_status', __NAMESPACE__ . '\\get_audit_status');

	// Recent Audits.
	add_action('wp_ajax_get_recent_audits', __NAMESPACE__ . '\\get_recent_audits');
	add_action('wp_ajax_nopriv_get_recent_audits', __NAMESPACE__ . '\\get_recent_audits');

	// Get Single Audit.
	add_action('wp_ajax_get_single_audit', __NAMESPACE__ . '\\get_single_audit');
	add_action('wp_ajax_nopriv_get_single_audit', __NAMESPACE__ . '\\get_single_audit');

	// Get Single Details.
	add_action('wp_ajax_get_single_details', __NAMESPACE__ . '\\get_single_details');
	add_action('wp_ajax_nopriv_get_single_details', __NAMESPACE__ . '\\get_single_details');

	// Delete Audit.
	add_action('wp_ajax_delete_audit', __NAMESPACE__ . '\\delete_audit');
	add_action('wp_ajax_nopriv_delete_audit', __NAMESPACE__ . '\\delete_audit');
}

add_action('init', __NAMESPACE__ . '\\register_ajax_actions');

/**
 * Checks if the request is authorized to access the Falcon SEO Audit API.
 *
 * Verifies the nonce from the request to ensure secure access.
 */
function permission_callback()
{
	if (!isset($_GET['nonce']) || !wp_verify_nonce($_GET['nonce'], 'falcon_seo_audit')) {
		wp_send_json_error(array(
			'message' => esc_html__('You do not have permission to access this endpoint.', 'falcon-seo-audit'),
			'status'  => 403,
		));
		wp_die(); // Ensure the script exits.
	}
}

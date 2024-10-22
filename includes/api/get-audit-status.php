<?php

/**
 * File: get-audit-status.php
 *
 * @package Falcon_SEO_Audit
 * @since 1.0.0
 */

namespace Falcon_Seo_Audit\API;

use Falcon_SEO_Audit\API;

/**
 * Gets the status of a single audit report.
 *
 * Returns the status of a single audit report based on the provided audit ID.
 * The status can be 'pending', 'running', or 'completed'.
 * If the audit is completed, also returns the crawled URLs.
 *
 * @param WP_REST_Request $request The request object.
 *
 * @return WP_REST_Response The response object.
 */
function get_audit_status()
{

	API\permission_callback();

	// Get JSON payload from the request.
	if (isset($_GET['audit_id']) && !empty($_GET['audit_id'])) {

		global $wpdb;
		$audit_report_table_name     = $wpdb->prefix . 'falcon_seo_audit_report';
		$single_content_report_table = $wpdb->prefix . 'falcon_seo_single_content_report';

		$audit_id = $_GET['audit_id'];

		// phpcs:ignore WordPress.DB.DirectDatabaseQuery
		$last_audit_status = $wpdb->get_var($wpdb->prepare('SELECT status FROM ' . esc_sql($audit_report_table_name) . ' WHERE id = %s', $audit_id));
		// phpcs:ignore WordPress.DB.DirectDatabaseQuery
		$urls = $wpdb->get_col($wpdb->prepare('SELECT url FROM ' . esc_sql($single_content_report_table) . ' WHERE report_id = %s', $audit_id));

		// Your logic for processing the data.
		$response_data = array(
			'status' => $last_audit_status,
			'urls'   => $urls,
		);

		wp_send_json_success($response_data); // Send the JSON response.
		wp_die(); // Ensure no further script execution.
	}
}

<?php

/**
 * File: recent-audits.php
 *
 * @package Falcon_SEO_Audit
 * @since 1.0.0
 */

namespace Falcon_Seo_Audit\API;

use Falcon_Seo_Audit\API;

/**
 * Gets all recent audits in descending order of their IDs.
 *
 * Returns an array of audits, each containing the report ID, number of URLs audited, status, and initiated at timestamp.
 *
 * @return WP_REST_Response The response object.
 */
function get_recent_audits()
{

	API\permission_callback();

	global $wpdb;
	$audit_report_table          = $wpdb->prefix . 'falcon_seo_audit_report';
	$single_content_report_table = $wpdb->prefix . 'falcon_seo_single_content_report';

	// phpcs:ignore WordPress.DB.DirectDatabaseQuery
	$results = $wpdb->get_results($wpdb->prepare('SELECT * FROM ' . esc_sql($audit_report_table) . ' ORDER BY id DESC'));

	$reports = array();

	foreach ($results as $result) {

		$report_id = $result->id;
		// phpcs:ignore WordPress.DB.DirectDatabaseQuery
		$urls_count = $wpdb->get_var($wpdb->prepare('SELECT COUNT(*) FROM ' . esc_sql($single_content_report_table) . ' WHERE report_id = %s', $report_id));

		array_push(
			$reports,
			array(
				'id'           => $report_id,
				'urls_count'   => $urls_count,
				'status'       => $result->status,
				'initiated_at' => $result->initiated_at,
			)
		);
	}

	wp_send_json_success($reports); // Send the JSON response.
	wp_die(); // Ensure no further script execution.
}

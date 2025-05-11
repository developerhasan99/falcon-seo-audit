<?php

/**
 * File: initiate-audit.php
 *
 * @package Falcon_SEO_Audit
 * @since 1.0.0
 */

namespace Falcon_Seo_Audit\API;

use Falcon_Seo_Audit\API;

/**
 * Initiates a new Falcon SEO audit.
 *
 * This endpoint creates a new audit report row in the database and returns the ID of the report.
 * The status of the report is set to 'pending' and the 'approx_link_count' is set to the number of links on the site.
 * The 'approx_link_count' is determined by calling the 'get_all_page_links' function.
 *
 * @return WP_REST_Response The response object.
 */
function initiate_audit()
{

	API\permission_callback();

	global $wpdb;
	$table_name = $wpdb->prefix . 'falcon_seo_audit_report';

	// phpcs:ignore WordPress.DB.DirectDatabaseQuery
	$wpdb->insert($table_name, array('status' => 'pending'));
	$new_report_id = $wpdb->insert_id;

	if ($new_report_id) {

		// Schedule a one-time cron event with an argument if it's not already scheduled.
		if (!wp_next_scheduled('falcon_seo_audit_cron', array($new_report_id))) {
			wp_schedule_single_event(time(), 'falcon_seo_audit_cron', array($new_report_id));

			// TODO: Debug log delete on production.
			error_log('Scheduled cron event falcon_seo_audit_cron for report ID: ' . $new_report_id);
		}

		wp_send_json_success($new_report_id);
		wp_die();
	}
}

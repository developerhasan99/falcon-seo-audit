<?php

/**
 * File: delete-audit.php
 *
 * @package Falcon_SEO_Audit
 * @since 1.0.0
 */

namespace Falcon_Seo_Audit\API;

use Falcon_Seo_Audit\API;

/**
 * Deletes a Falcon SEO Audit report.
 *
 * This endpoint deletes a single audit report and its related single content report based on the provided audit ID.
 *
 * @param WP_REST_Request $request The request object.
 *
 * @return WP_REST_Response The response object.
 */
function delete_audit()
{

	API\permission_callback();

	if (isset($_GET['id']) && !empty($_GET['id'])) {

		global $wpdb;
		$audit_report_table_name     = $wpdb->prefix . 'falcon_seo_audit_report';
		$single_content_report_table = $wpdb->prefix . 'falcon_seo_single_content_report';

		$audit_id = $_GET['id'];

		// phpcs:ignore WordPress.DB.DirectDatabaseQuery
		$wpdb->delete($audit_report_table_name, array('id' => $audit_id), array('%s'));
		// phpcs:ignore WordPress.DB.DirectDatabaseQuery
		$wpdb->delete($single_content_report_table, array('report_id' => $audit_id), array('%s'));

		wp_send_json_success();
		wp_die();
	}
}

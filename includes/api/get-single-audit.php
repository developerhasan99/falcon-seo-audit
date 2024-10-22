<?php

/**
 * File: class-crawler.php
 *
 * @package Falcon_SEO_Audit
 * @since 1.0.0
 */

namespace Falcon_Seo_Audit\API;

use Falcon_Seo_Audit\API;

/**
 * Gets all links in a single audit report.
 *
 * This endpoint returns an array of links, each containing the link ID, URL, HTTP status code, title, meta description, internal links, and external links.
 *
 * @param WP_REST_Request $request The request object.
 *
 * @return WP_REST_Response The response object.
 */
function get_single_audit()
{

	API\permission_callback();

	if (isset($_GET['audit_id']) || !empty($_GET['audit_id'])) {

		global $wpdb;
		$single_content_report_table = $wpdb->prefix . 'falcon_seo_single_content_report';

		$audit_id = $_GET['audit_id'];
		$page = $_GET['page'] ? $_GET['page'] : 1;
		$per_page = $_GET['per_page'] ? $_GET['per_page'] : 20;

		$offset = ($page - 1) * $per_page; // Calculate offset.

		// phpcs:ignore WordPress.DB.DirectDatabaseQuery
		$query = $wpdb->prepare(
			'SELECT id, url, status_code, title, robots, readability_score, internal_links, external_links 
			 FROM ' . esc_sql($single_content_report_table) . ' 
			 WHERE report_id = %s 
			 LIMIT %d, %d',
			$audit_id,
			$offset,
			$per_page
		);

		$results = $wpdb->get_results($query);

		// Get total count without limit, since doing main query without limit lead memory limit issue.
		// phpcs:ignore WordPress.DB.DirectDatabaseQuery
		$total_count = $wpdb->get_var($wpdb->prepare(
			'SELECT COUNT(*) FROM ' . esc_sql($single_content_report_table) . ' WHERE report_id = %s',
			$audit_id
		));

		wp_send_json_success(array('audit' => $results, 'total_count' => $total_count));
		wp_die();
	}
}

<?php

/**
 * File: class-crawler.php
 *
 * @package Falcon_SEO_Audit
 * @since 1.0.0
 */

namespace Falcon_Seo_Audit\API;

use WP_REST_Request;

/**
 * Gets all links in a single audit report.
 *
 * This endpoint returns an array of links, each containing the link ID, URL, HTTP status code, title, meta description, internal links, and external links.
 *
 * @param WP_REST_Request $request The request object.
 *
 * @return WP_REST_Response The response object.
 */
function get_single_audit(WP_REST_Request $request)
{

	global $wpdb;
	$single_content_report_table = $wpdb->prefix . 'falcon_seo_single_content_report';

	// Get JSON payload from the request.
	$data = $request->get_json_params();

	if (isset($data['audit_id'])) {

		$audit_id = !empty($data['audit_id']) ? intval($data['audit_id']) : 0;
		$page = !empty($data['page']) ? intval($data['page']) : 1;
		$per_page = !empty($data['per_page']) ? intval($data['per_page']) : 20;

		// TODO: Implement this total page count on the component mount and make the pagination and per page logic on front end.

		$count_query = $wpdb->prepare(
			'SELECT COUNT(*) FROM ' . esc_sql($single_content_report_table) . ' WHERE report_id = %s',
			$audit_id
		);

		$total_count = $wpdb->get_var($count_query);

		$offset = ($page - 1) * $per_page; // Calculate offset

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

		$response_data = array();

		foreach ($results as $result) {

			$links_present = array();

			$internal_links = json_decode($result->internal_links);
			$external_links = json_decode($result->external_links);

			foreach ($internal_links as $link) {
				$links_present[] = array(
					'anchor' => $link->anchor,
					'href'   => $link->href,
					'type'   => 'Internal',
				);
			}

			foreach ($external_links as $link) {
				$links_present[] = array(
					'anchor' => $link->anchor,
					'href'   => $link->href,
					'type'   => 'External',
				);
			}

			$response_data[] = array(
				'id'                => $result->id,
				'url'               => $result->url,
				'status_code'       => $result->status_code,
				'title'             => $result->title,
				'robots'            => $result->robots,
				'readability_score' => $result->readability_score,
				'links_present'     => $links_present,
			);
		}

		return new \WP_REST_Response(array('audit' => $response_data, 'total_count' => $total_count), 200);
	}
}

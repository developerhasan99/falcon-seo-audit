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
function falcon_seo_audit_get_single_audit( WP_REST_Request $request ) {

	global $wpdb;
	$single_content_report_table = $wpdb->prefix . 'falcon_seo_single_content_report';

	// Get JSON payload from the request.
	$data = $request->get_json_params();

	if ( isset( $data['audit_id'] ) ) {

		$audit_id = $data['audit_id'];

		// phpcs:ignore WordPress.DB.DirectDatabaseQuery
		$results = $wpdb->get_results( $wpdb->prepare( 'SELECT id,url,status_code,title,meta_description,internal_links,external_links   FROM ' . esc_sql( $single_content_report_table ) . ' WHERE report_id = %s', $audit_id ) );

		return new \WP_REST_Response( $results, 200 );
	}
}

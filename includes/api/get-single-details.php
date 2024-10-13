<?php
/**
 * File: get-single-details.php
 *
 * @package Falcon_SEO_Audit
 * @since 1.0.0
 */

namespace Falcon_Seo_Audit\API;

use WP_REST_Request;

/**
 * Gets the details of a single audit report link.
 *
 * Returns the details of a single link in an audit report.
 *
 * @param WP_REST_Request $request The request object.
 *
 * @return WP_REST_Response The response object.
 */
function get_single_details( WP_REST_Request $request ) {

	global $wpdb;
	$single_content_report_table = $wpdb->prefix . 'falcon_seo_single_content_report';

	// Get JSON payload from the request.
	$data = $request->get_json_params();

	if ( isset( $data['link_id'] ) ) {

		$link_id = $data['link_id'];

		// phpcs:ignore WordPress.DB.DirectDatabaseQuery
		$results = $wpdb->get_row( $wpdb->prepare( 'SELECT * FROM ' . esc_sql( $single_content_report_table ) . ' WHERE id = %s', $link_id ) );

		return new \WP_REST_Response( $results, 200 );
	}
}

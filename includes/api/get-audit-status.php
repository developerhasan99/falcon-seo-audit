<?php
/**
 * File: get-audit-status.php
 *
 * @package Falcon_SEO_Audit
 * @since 1.0.0
 */

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
function falcon_seo_audit_get_audit_status( WP_REST_Request $request ) {

	global $wpdb;
	$audit_report_table_name     = $wpdb->prefix . 'falcon_seo_audit_report';
	$single_content_report_table = $wpdb->prefix . 'falcon_seo_single_content_report';

	// Get JSON payload from the request.
	$data = $request->get_json_params();

	if ( isset( $data['audit_id'] ) ) {

		$audit_id = $data['audit_id'];

		// phpcs:ignore WordPress.DB.DirectDatabaseQuery
		$last_audit_status = $wpdb->get_var( $wpdb->prepare( 'SELECT status FROM ' . esc_sql( $audit_report_table_name ) . ' WHERE id = %s', $audit_id ) );
		// phpcs:ignore WordPress.DB.DirectDatabaseQuery
		$urls = $wpdb->get_col( $wpdb->prepare( 'SELECT url FROM ' . esc_sql( $single_content_report_table ) . ' WHERE report_id = %s', $audit_id ) );

		// Your logic for processing the data.
		$response_data = array(
			'status' => $last_audit_status,
			'urls'   => $urls,
		);

		return new WP_REST_Response( $response_data, 200 );
	}
}

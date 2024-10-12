<?php
/**
 * File: recent-audits.php
 *
 * @package Falcon_SEO_Audit
 * @since 1.0.0
 */

/**
 * Gets all recent audits in descending order of their IDs.
 *
 * Returns an array of audits, each containing the report ID, number of URLs audited, status, and initiated at timestamp.
 *
 * @return WP_REST_Response The response object.
 */
function falcon_seo_audit_get_recent_audits() {

	global $wpdb;
	$audit_report_table          = $wpdb->prefix . 'falcon_seo_audit_report';
	$single_content_report_table = $wpdb->prefix . 'falcon_seo_single_content_report';

	// phpcs:ignore WordPress.DB.DirectDatabaseQuery
	$results = $wpdb->get_results( $wpdb->prepare( 'SELECT * FROM ' . esc_sql( $audit_report_table ) . ' ORDER BY id DESC' ) );

	$reports = array();

	foreach ( $results as $result ) {

		$report_id = $result->id;
		// phpcs:ignore WordPress.DB.DirectDatabaseQuery
		$urls_count = $wpdb->get_var( $wpdb->prepare( 'SELECT COUNT(*) FROM ' . esc_sql( $single_content_report_table ) . ' WHERE report_id = %s', $report_id ) );

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

	// Your logic for processing the data.
	$response_data = array(
		'status'  => 'success',
		'reports' => $reports,
	);

	return new WP_REST_Response( $response_data, 200 );
}

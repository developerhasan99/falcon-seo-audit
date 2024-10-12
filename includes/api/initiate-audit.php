<?php
/**
 * File: initiate-audit.php
 *
 * @package Falcon_SEO_Audit
 * @since 1.0.0
 */

use Falcon_Seo_Audit\Utils;

/**
 * Initiates a new Falcon SEO audit.
 *
 * This endpoint creates a new audit report row in the database and returns the ID of the report.
 * The status of the report is set to 'pending' and the 'approx_link_count' is set to the number of links on the site.
 * The 'approx_link_count' is determined by calling the 'get_all_page_links' function.
 *
 * @return WP_REST_Response The response object.
 */
function falcon_seo_audit_initiate_audit() {
	global $wpdb;
	$table_name = $wpdb->prefix . 'falcon_seo_audit_report';

	// phpcs:ignore WordPress.DB.DirectDatabaseQuery
	$wpdb->insert( $table_name, array( 'status' => 'pending' ) );
	$new_report_id = $wpdb->insert_id;

	if ( $new_report_id ) {
		$response_data = array(
			'status'            => 'success',
			'Message'           => 'Initiated falcon audit',
			'audit_id'          => $new_report_id,
			'approx_link_count' => count( Utils\get_all_links() ),
		);
		return new WP_REST_Response( $response_data, 200 );
	}
}

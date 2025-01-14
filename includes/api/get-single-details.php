<?php
/**
 * File: get-single-details.php
 *
 * @package Falcon_SEO_Audit
 * @since 1.0.0
 */

namespace Falcon_Seo_Audit\API;

use Falcon_Seo_Audit\API;

/**
 * Retrieves the details of a single link from the content report.
 *
 * This endpoint fetches information about a specific link identified by its link ID.
 * The response includes all the data associated with the link from the database.
 *
 * @return void Outputs the link details as a JSON response.
 */
function get_single_details( ) {

	API\permission_callback();

	global $wpdb;
	$single_content_report_table = $wpdb->prefix . 'falcon_seo_single_content_report';

	if ( isset( $_GET['link_id'] ) && ! empty( $_GET['link_id'] ) ) {

		$link_id = $_GET['link_id'];

		// phpcs:ignore WordPress.DB.DirectDatabaseQuery
		$results = $wpdb->get_row( $wpdb->prepare( 'SELECT * FROM ' . esc_sql( $single_content_report_table ) . ' WHERE id = %s', $link_id ) );

		wp_send_json_success($results, 200 );
		wp_die();
	}
}

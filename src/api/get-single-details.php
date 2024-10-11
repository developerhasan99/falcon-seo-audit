<?php

function falcon_seo_audit_get_single_details( WP_REST_Request $request ) {

	global $wpdb;
	$single_content_report_table = $wpdb->prefix . 'falcon_seo_single_content_report';

	// Get JSON payload from the request
	$data = $request->get_json_params();

	if ( isset( $data['link_id'] ) ) {

		$link_id = $data['link_id'];

		$results = $wpdb->get_row( $wpdb->prepare( 'SELECT * FROM ' . esc_sql( $single_content_report_table ) . ' WHERE id = %s', $link_id ) );

		return new WP_REST_Response( $results, 200 );
	}
}

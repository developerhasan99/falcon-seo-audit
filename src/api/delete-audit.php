<?php

function falcon_seo_audit_delete_audit( WP_REST_Request $request ) {
	global $wpdb;
	$audit_report_table_name     = $wpdb->prefix . 'falcon_seo_audit_report';
	$single_content_report_table = $wpdb->prefix . 'falcon_seo_single_content_report';

	// Get JSON payload from the request
	$data = $request->get_json_params();

	// Validate and sanitize the 'id' parameter
	if ( isset( $data['id'] ) && is_string( $data['id'] ) && ! empty( $data['id'] ) ) {

		$audit_id = sanitize_text_field( $data['id'] ); // Sanitize the string ID

		// Check if the audit ID exists before attempting to delete
		$report_exists = $wpdb->get_var(
			$wpdb->prepare(
				'SELECT COUNT(*) FROM ' . esc_sql( $audit_report_table_name ) . ' WHERE id = %s',
				$audit_id
			)
		);

		if ( $report_exists ) {
			// Delete the audit report and related single content report
			$wpdb->delete( $audit_report_table_name, array( 'id' => $audit_id ), array( '%s' ) );
			$wpdb->delete( $single_content_report_table, array( 'report_id' => $audit_id ), array( '%s' ) );

			// Return a success response
			$response = array(
				'status'  => 'success',
				'message' => 'Audit deleted successfully',
			);

			return new WP_REST_Response( $response, 200 );
		} else {
			// Return an error if the audit ID does not exist
			return new WP_REST_Response(
				array(
					'status'  => 'error',
					'message' => 'Audit ID not found',
				),
				404
			);
		}
	} else {
		// Return an error if 'id' is missing or invalid
		return new WP_REST_Response(
			array(
				'status'  => 'error',
				'message' => 'Invalid or missing audit ID',
			),
			400
		);
	}
}

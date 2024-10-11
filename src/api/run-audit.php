<?php

require_once dirname( __DIR__, 1 ) . '/classes/FalconSEOAudit.php';

function falcon_seo_audit_run_audit( WP_REST_Request $request ) {
	$falcon_seo_audit = new FalconSEOAudit();

	// Get JSON payload from the request
	$data = $request->get_json_params();

	if ( isset( $data['audit_id'] ) ) {

		$audit_id = $data['audit_id'];
		$falcon_seo_audit->start_the_crawler( $audit_id );
	}

	// Your logic for processing the data
	$response_data = array(
		'status' => 'success',
	);

	return new WP_REST_Response( $response_data, 200 );
}

<?php
/**
 * File: run-audit.php
 *
 * @package Falcon_SEO_Audit
 * @since 1.0.0
 */

namespace Falcon_Seo_Audit\API;

use Falcon_Seo_Audit\Crawler;
use WP_REST_Request;

/**
 * Runs a Falcon SEO Audit.
 *
 * Triggers the audit crawler to start crawling the site based on the provided audit ID.
 *
 * @param WP_REST_Request $request The request object.
 *
 * @return WP_REST_Response The response object.
 */
function falcon_seo_audit_run_audit( WP_REST_Request $request ) {
	$falcon_seo_audit = new Crawler();

	// Get JSON payload from the request.
	$data = $request->get_json_params();

	if ( isset( $data['audit_id'] ) ) {

		$audit_id = $data['audit_id'];
		$falcon_seo_audit->start_the_crawler( $audit_id );
	}

	// Your logic for processing the data.
	$response_data = array(
		'status' => 'success',
	);

	return new \WP_REST_Response( $response_data, 200 );
}

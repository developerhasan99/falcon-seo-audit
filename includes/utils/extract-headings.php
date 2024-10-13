<?php
/**
 * File: extract-headings.php
 *
 * @package Falcon_SEO_Audit
 * @since 1.0.0
 */

namespace Falcon_Seo_Audit\Utils;

/**
 * Extract all headings from a webpage.
 *
 * This function takes a DOMDocument object of a webpage and returns an
 * associative array of headings. The returned array has six keys: 'h1', 'h2',
 * 'h3', 'h4', 'h5', and 'h6', each of which contains an array of heading text.
 *
 * @param DOMDocument $doc The DOMDocument object of the webpage.
 *
 * @return array An associative array of headings.
 */
function extract_headings( $doc ) {
	$headings = array(
		'h1' => array(),
		'h2' => array(),
		'h3' => array(),
		'h4' => array(),
		'h5' => array(),
		'h6' => array(),
	);

	// Loop through each heading tag (h1 to h6).
	for ( $i = 1; $i <= 6; $i++ ) {
		$heading_tags = $doc->getElementsByTagName( 'h' . $i );
		foreach ( $heading_tags as $heading ) {

			// @codingStandardsIgnoreStart
			$headings[ 'h' . $i ][] = trim( $heading->nodeValue );
			// @codingStandardsIgnoreEnd
		}
	}

	return $headings;
}

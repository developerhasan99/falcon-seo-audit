<?php
/**
 * File: extract-page-links.php
 *
 * @package Falcon_SEO_Audit
 * @since 1.0.0
 */

namespace Falcon_Seo_Audit\Utils;

/**
 * Extract all links from a webpage.
 *
 * This function takes a DOMDocument object of a webpage and returns an
 * associative array of internal and external links. The returned array has two
 * keys: 'internal' and 'external', each of which contains an array of link
 * objects. Each link object has the following properties:
 *
 * - `anchor`: The anchor text of the link.
 * - `href`: The URL of the link.
 *
 * The function filters out links that are not webpages (i.e. links that are files
 * or mailto links) and links that are empty or contain only whitespace. It also
 * filters out links that are internal anchors (i.e. links that contain '#').
 *
 * @param DOMDocument $doc The DOMDocument object of the webpage.
 *
 * @return array An associative array of internal and external links.
 */
function extract_page_links( $doc ) {

	$internal_links = array();
	$external_links = array();
	$link_node_list = $doc->getElementsByTagName( 'a' );

	$href = $link_node_list->item( 0 )->getAttribute( 'href' );

	foreach ( $link_node_list as $link_node ) {

		if ( ! ( $link_node instanceof \DOMElement ) ) {
			continue;  // Skip non-element nodes.
		}

		$href = $link_node->getAttribute( 'href' );

        // @codingStandardsIgnoreStart
		$anchor_text = trim( $link_node->textContent );
        // @codingStandardsIgnoreEnd

		if ( is_webpage_link( $href ) && ! str_contains( $href, '#' ) ) {
			$parsed_url      = wp_parse_url( $href );
			$parsed_home_url = wp_parse_url( home_url() );

			// Check if it's an internal link.
			if ( ! isset( $parsed_url['host'] ) || $parsed_url['host'] === $parsed_home_url['host'] ) {
				// Ensure it has a trailing slash.
				if ( substr( $href, -1 ) !== '/' ) {
					$href = rtrim( $href, '/' ) . '/';
				}

				// Append home_url() if it's a relative path.
				$href = isset( $parsed_url['host'] ) ? $href : home_url() . $href;

				$internal_links[] = array(
					'anchor' => $anchor_text,
					'href'   => $href,
				);
			} else {
				$external_links[] = array(
					'anchor' => $anchor_text,
					'href'   => $href,
				);
			}
		}
	}

	return array(
		'internal' => $internal_links,
		'external' => $external_links,
	);
}

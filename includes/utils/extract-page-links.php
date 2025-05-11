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
function extract_page_links($doc, $home_page_url)
{

	$internal_links = array();
	$external_links = array();
	$link_node_list = $doc->getElementsByTagName('a');

	foreach ($link_node_list as $link_node) {

		if (! ($link_node instanceof \DOMElement)) {
			continue;  // Skip non-element nodes.
		}

		$href = $link_node->getAttribute('href');

		// @codingStandardsIgnoreStart
		$anchor_text = trim($link_node->textContent);
		// @codingStandardsIgnoreEnd

		if (is_webpage_link($href) && ! str_contains($href, '#')) {
			$parsed_url = wp_parse_url($href);
			$parsed_home_page_url = wp_parse_url($home_page_url);

			// Check if it's an internal link.
			if (! isset($parsed_url['host']) || $parsed_url['host'] === $parsed_home_page_url['host']) {
				// Handle relative paths by appending $home_page_url.
				if (! isset($parsed_url['host'])) {
					$href = rtrim($home_page_url, '/') . '/' . ltrim($href, '/');
				}

				// Ensure it has a trailing slash.
				if (substr($href, -1) !== '/' && ! pathinfo($href, PATHINFO_EXTENSION)) {
					$href = rtrim($href, '/') . '/';
				}

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

<?php

/**
 * Extract metadata from an HTML document.
 *
 * @param \DOMDocument $doc Document to extract metadata from.
 *
 * @return array {
 *     Array of metadata.
 *
 *     @type string $title            Page title.
 *     @type string $meta_description  Meta description.
 *     @type string $keywords          Keywords.
 *     @type string $content_type      Content type or charset.
 *     @type string $robots            Robots tag.
 *     @type string $lang              HTML lang attribute.
 *     @type string $canonical_url     Canonical URL.
 *     @type array  $open_graph        Open Graph data.
 *     @type array  $twitter_data      Twitter data.
 *     @type array  $json_ld           JSON-LD structured data.
 *     @type string $viewport          Viewport meta tag.
 *     @type string $favicon           Favicon URL.
 *     @type array  $stylesheets       Stylesheet URLs.
 *     @type string $csp               Content Security Policy meta tag.
 *     @type array  $alternate_links   Alternate links.
 *     @type array  $javascript_links  JavaScript links.
 * }
 */
function extract_information( $doc ) {
	$title            = $doc->getElementsByTagName( 'title' )->item( 0 )->nodeValue;
	$description      = '';
	$keywords         = '';
	$content_type     = '';
	$robots           = '';
	$lang             = '';
	$canonical_url    = '';
	$open_graph       = array();
	$twitter_data     = array();
	$json_ld          = array();
	$viewport         = '';
	$favicon          = '';
	$stylesheets      = array();
	$csp              = '';
	$alternate_links  = array();
	$javascript_links = array();

	// Get meta tags.
	$metas = $doc->getElementsByTagName( 'meta' );

	foreach ( $metas as $meta ) {

		// Meta description and keywords.
		if ( $meta->getAttribute( 'name' ) == 'description' ) {
			$description = $meta->getAttribute( 'content' );
		}
		if ( $meta->getAttribute( 'name' ) == 'keywords' ) {
			$keywords = $meta->getAttribute( 'content' );
		}
		// Content type or charset.
		if ( $meta->hasAttribute( 'http-equiv' ) && $meta->getAttribute( 'http-equiv' ) == 'Content-Type' ) {
			$content_type = $meta->getAttribute( 'content' );
		} elseif ( $meta->hasAttribute( 'charset' ) ) {
			$content_type = 'text/html; charset=' . $meta->getAttribute( 'charset' );
		}
		// Robots tag.
		if ( $meta->getAttribute( 'name' ) == 'robots' ) {
			$robots = $meta->getAttribute( 'content' );
		}
		// Open Graph data.
		if ( strpos( $meta->getAttribute( 'property' ), 'og:' ) === 0 ) {
			$open_graph[ $meta->getAttribute( 'property' ) ] = $meta->getAttribute( 'content' );
		}
		// Twitter data.
		if ( strpos( $meta->getAttribute( 'name' ), 'twitter:' ) === 0 ) {
			$twitter_data[ $meta->getAttribute( 'name' ) ] = $meta->getAttribute( 'content' );
		}
		// Viewport meta tag.
		if ( $meta->getAttribute( 'name' ) == 'viewport' ) {
			$viewport = $meta->getAttribute( 'content' );
		}
		// CSP meta tag.
		if ( $meta->getAttribute( 'http-equiv' ) == 'Content-Security-Policy' ) {
			$csp = $meta->getAttribute( 'content' );
		}
	}

	// Get canonical URL.
	$links = $doc->getElementsByTagName( 'link' );
	foreach ( $links as $link ) {
		if ( $link->getAttribute( 'rel' ) == 'canonical' ) {
			$canonical_url = $link->getAttribute( 'href' );
		}
		if ( $link->getAttribute( 'rel' ) == 'icon' || $link->getAttribute( 'rel' ) == 'shortcut icon' ) {
			$favicon = $link->getAttribute( 'href' );
		}
		if ( $link->getAttribute( 'rel' ) == 'stylesheet' ) {
			$stylesheets[] = $link->getAttribute( 'href' );
		}
		if ( $link->getAttribute( 'rel' ) == 'alternate' ) {
			$alternate_links[] = array(
				'href'     => $link->getAttribute( 'href' ),
				'hreflang' => $link->getAttribute( 'hreflang' ),
			);
		}
	}

	// Get HTML lang attribute.
	$lang = $doc->documentElement->getAttribute( 'lang' );

	// Get JSON-LD structured data and JavaScript links.
	$scriptTags = $doc->getElementsByTagName( 'script' );
	foreach ( $scriptTags as $script ) {
		// Extract JSON-LD structured data.
		if ( $script->getAttribute( 'type' ) === 'application/ld+json' ) {
			$json_ld[] = json_decode( $script->nodeValue, true );
		}

		// Extract JavaScript links.
		if ( $script->hasAttribute( 'src' ) ) {
			$javascript_links[] = $script->getAttribute( 'src' );
		}
	}

	// Return all metadata.
	return array(
		'title'            => $title,
		'meta_description' => $description,
		'keywords'         => $keywords,
		'content_type'     => $content_type,
		'robots'           => $robots,
		'lang'             => $lang,
		'canonical_url'    => $canonical_url,
		'open_graph'       => $open_graph,
		'twitter_data'     => $twitter_data,
		'json_ld'          => $json_ld,
		'viewport'         => $viewport,
		'favicon'          => $favicon,
		'stylesheets'      => $stylesheets,
		'csp'              => $csp,
		'alternate_links'  => $alternate_links,
		'javascript_links' => $javascript_links,
	);
}

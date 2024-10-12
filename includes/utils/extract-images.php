<?php
/**
 * File: extract-images.php
 *
 * @package Falcon_SEO_Audit
 * @since 1.0.0
 */

/**
 * Extract all images from a DOMDocument.
 *
 * @param \DOMDocument $doc Document to extract images from.
 *
 * @return array {
 *     Array of image attributes.
 *
 *     @type string $src     Image source URL.
 *     @type string $alt     Image alt text.
 *     @type string $title   Image title.
 *     @type string $width   Image width.
 *     @type string $height  Image height.
 * }
 */
function extract_images( $doc ) {
	$images = array();

	// Get all <img> elements.
	$image_tags = $doc->getElementsByTagName( 'img' );

	foreach ( $image_tags as $img ) {

		if ( ! $img instanceof \DOMElement ) {
			continue;
		}

		// Collect image attributes.
		$src    = $img->getAttribute( 'src' );
		$alt    = $img->getAttribute( 'alt' );
		$title  = $img->getAttribute( 'title' );
		$width  = $img->getAttribute( 'width' );
		$height = $img->getAttribute( 'height' );

		// Add to the images array.
		$images[] = array(
			'src'    => $src,
			'alt'    => $alt,
			'title'  => $title,
			'width'  => $width,
			'height' => $height,
		);
	}

	return $images;
}

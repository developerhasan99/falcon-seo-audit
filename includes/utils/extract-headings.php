<?php

function extractHeadings( $doc ) {
	$headings = array(
		'h1' => array(),
		'h2' => array(),
		'h3' => array(),
		'h4' => array(),
		'h5' => array(),
		'h6' => array(),
	);

	// Loop through each heading tag (h1 to h6)
	for ( $i = 1; $i <= 6; $i++ ) {
		$headingTags = $doc->getElementsByTagName( 'h' . $i );
		foreach ( $headingTags as $heading ) {
			// Add the heading text to the corresponding level
			$headings[ 'h' . $i ][] = trim( $heading->nodeValue );
		}
	}

	return $headings;
}

<?php
/**
 * File: is-webpage-link.php
 *
 * @package Falcon_SEO_Audit
 * @since 1.0.0
 */

/**
 * Checks if the given link is a webpage link (i.e. not a file download).
 *
 * This function checks if the link has a file extension. If it does, it checks
 * if the file extension is one of the common file extensions (jpg, jpeg, png,
 * gif, pdf, doc, docx, zip, mp4, mp3). If it is, it returns false. Otherwise,
 * it returns true.
 *
 * @param string $link The link to check.
 *
 * @return bool True if the link is a webpage link, false otherwise.
 */
function is_webpage_link( $link ) {
	// Parse the URL and get the path.
	$path = wp_parse_url( $link, PHP_URL_PATH );

	// If the path is null, treat it as a webpage link (or handle it as you wish).
	if ( null === $path ) {
		return true;
	}

	// Skip wp-content/uploads links.
	if ( strpos( $path, 'wp-content/uploads' ) !== false ) {
		return false;
	}

	// Check for file extension.
	$extension       = pathinfo( $path, PATHINFO_EXTENSION );
	$file_extensions = array( 'jpg', 'jpeg', 'png', 'gif', 'pdf', 'doc', 'docx', 'zip', 'mp4', 'mp3' );

	// Return false if it's one of the file types, true otherwise.
	return ! in_array( strtolower( $extension ), $file_extensions, true );
}

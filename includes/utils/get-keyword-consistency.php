<?php
/**
 * File: get-keyword-consistency.php
 *
 * @package Falcon_SEO_Audit
 * @since 1.0.0
 */

namespace Falcon_Seo_Audit\Utils;

/**
 * Analyze keyword consistency in a given HTML document.
 *
 * @param \DOMDocument $doc           The HTML document to analyze.
 * @param array        $keywords      The keywords to analyze.
 *
 * @return array {
 *     Array of keyword consistency data.
 *
 *     @type array $keyword {
 *         Array of keyword consistency data for a single keyword.
 *
 *         @type int $occurrences_in_title            Number of occurrences of the keyword in the title.
 *         @type int $occurrences_in_meta_description Number of occurrences of the keyword in the meta description.
 *         @type int $occurrences_in_headings         Number of occurrences of the keyword in headings.
 *         @type int $occurrences_in_paragraphs       Number of occurrences of the keyword in paragraphs.
 *         @type int $total_occurrences               Total number of occurrences of the keyword.
 *         @type float $keyword_density              Keyword density (percentage of the keyword in total text).
 *     }
 * }
 */
function get_keyword_consistency( $doc, $keywords ) {
	$keyword_data = array();

	// Extract text from title, meta description, and headings.
	$title = $doc->getElementsByTagName( 'title' )->item( 0 )->nodeValue ?? '';

	// Get meta description.
	$meta_description = '';
	$meta_tags        = $doc->getElementsByTagName( 'meta' );
	foreach ( $meta_tags as $meta ) {
		if ( ! $meta instanceof \DOMElement ) {
			continue;
		}

		if ( $meta->getAttribute( 'name' ) === 'description' ) {
			$meta_description = $meta->getAttribute( 'content' );
		}
	}

	// Get text from headings.
	$headings_text = '';
	for ( $i = 1; $i <= 6; $i++ ) {
		$heading_tags = $doc->getElementsByTagName( 'h' . $i );
		foreach ( $heading_tags as $heading ) {

            //phpcs:ignore WordPress.NamingConventions.ValidVariableName
			$headings_text .= ' ' . $heading->nodeValue;
		}
	}

	// Get text from paragraphs.
	$paragraphs_text = '';
	$paragraphs      = $doc->getElementsByTagName( 'p' );
	foreach ( $paragraphs as $paragraph ) {
        // phpcs:ignore WordPress.NamingConventions.ValidVariableName
		$paragraphs_text .= ' ' . $paragraph->nodeValue;
	}

	// Concatenate all the text.
	$content_text = $title . ' ' . $meta_description . ' ' . $headings_text . ' ' . $paragraphs_text;

	// Total word count.
	$total_words = str_word_count( $content_text );

	// Analyze each keyword.
	foreach ( $keywords as $keyword ) {
		$occurrences_in_title            = count_keyword_occurrences( $title, $keyword );
		$occurrences_in_meta_description = count_keyword_occurrences( $meta_description, $keyword );
		$occurrences_in_headings         = count_keyword_occurrences( $headings_text, $keyword );
		$occurrences_in_paragraphs       = count_keyword_occurrences( $paragraphs_text, $keyword );
		$total_occurrences               = count_keyword_occurrences( $content_text, $keyword );

		// Calculate keyword density (percentage of the keyword in total text).
		$keyword_density = ( $total_occurrences / $total_words ) * 100;

		// Structure the keyword consistency data.
		$keyword_data[ $keyword ] = array(
			'occurrences_in_title'            => $occurrences_in_title,
			'occurrences_in_meta_description' => $occurrences_in_meta_description,
			'occurrences_in_headings'         => $occurrences_in_headings,
			'occurrences_in_paragraphs'       => $occurrences_in_paragraphs,
			'total_occurrences'               => $total_occurrences,
			'keyword_density'                 => round( $keyword_density, 2 ),
		);
	}

	return $keyword_data;
}

/**
 * Count the number of occurrences of a keyword in a given text.
 *
 * This function is case-insensitive, so it treats "Keyword" and "keyword" as the same.
 *
 * @param string $text The text to search in.
 * @param string $keyword The keyword to search for.
 * @return int The number of occurrences of the keyword in the text.
 */
function count_keyword_occurrences( $text, $keyword ) {
	return substr_count( strtolower( $text ), strtolower( $keyword ) );
}

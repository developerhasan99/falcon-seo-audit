<?php
/**
 * File: guess-keywords.php
 *
 * @package Falcon_SEO_Audit
 * @since 1.0.0
 */

namespace Falcon_Seo_Audit\Utils;

/**
 * Guesses potential keywords from a page by analyzing the text content.
 *
 * The function combines the page title, headings, and paragraph text, removes
 * HTML entities and punctuation, removes common stop words, and then counts the
 * frequency of words. The top 10 most frequent words are returned as the
 * potential keywords.
 *
 * @param DOMDocument $doc The page document to analyze.
 *
 * @return array The top 10 most frequent words.
 */
function guess_keywords( $doc ) {
	$text_content = '';

	// Extract text from title, headings, and paragraphs.
	$title        = $doc->getElementsByTagName( 'title' )->item( 0 )->nodeValue ?? '';
	$heading_text = '';
	for ( $i = 1; $i <= 6; $i++ ) {
		$heading_tags = $doc->getElementsByTagName( 'h' . $i );
		foreach ( $heading_tags as $heading ) {
            //phpcs:ignore WordPress.NamingConventions.ValidVariableName
			$heading_text .= ' ' . $heading->nodeValue;
		}
	}

	$paragraphs_text = '';
	$paragraphs      = $doc->getElementsByTagName( 'p' );
	foreach ( $paragraphs as $paragraph ) {

        //phpcs:ignore WordPress.NamingConventions.ValidVariableName
		$paragraphs_text .= ' ' . $paragraph->nodeValue;
	}

	// Combine all the text content.
	$text_content = $title . ' ' . $heading_text . ' ' . $paragraphs_text;

	// Convert to lowercase for consistency.
	$text_content = strtolower( $text_content );

	// Remove HTML entities and punctuation.
	$text_content = html_entity_decode( $text_content );
	$text_content = preg_replace( '/[^\w\s]/', '', $text_content );

	// Split text into words.
	$words = explode( ' ', $text_content );

	// Remove common stop words.
	$stop_words = array(
		'the',
		'and',
		'is',
		'in',
		'to',
		'of',
		'it',
		'for',
		'with',
		'on',
		'this',
		'that',
		'by',
		'from',
		'at',
		'or',
		'as',
		'be',
		'an',
		'are',
		'a',
		'was',
		'were',
		'can',
		'which',
		'if',
		// More words will be added letter.
	);
	$filtered_words = array_filter(
		$words,
		function ( $word ) use ( $stop_words ) {
			return strlen( $word ) > 2 && ! in_array( $word, $stop_words, true );
		}
	);

	// Count word frequencies.
	$word_frequencies = array_count_values( $filtered_words );

	// Sort words by frequency in descending order.
	arsort( $word_frequencies );

	// Get the top 10 most frequent words (potential keywords).
	$top_keywords = array_slice( $word_frequencies, 0, 10 );

	return $top_keywords;
}

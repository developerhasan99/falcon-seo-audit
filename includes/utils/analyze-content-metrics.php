<?php
/**
 * File: analyze-content-metrics.php
 *
 * @package Falcon_SEO_Audit
 * @since 1.0.0
 */

namespace Falcon_Seo_Audit\Utils;

/**
 * Analyze content metrics from a given HTML document.
 *
 * This function takes a DOMDocument object and returns an array containing the following metrics:
 * - word_count: The total number of words in the document.
 * - paragraph_count: The total number of <p> elements in the document.
 * - average_words_per_paragraph: The average number of words per paragraph.
 * - sentence_count: The total number of sentences in the document (split based on common sentence terminators).
 * - average_words_per_sentence: The average number of words per sentence.
 * - readability_score: The Flesch-Kincaid readability score, which is a measure of how easy the text is to read.
 * - node_count: The total number of nodes in the document (including tags, text, comments, etc).
 *
 * @param DOMDocument $doc The HTML document to analyze.
 * @return array The content metrics as an associative array.
 */
function analyze_content_metrics( $doc ) {
	// Initialize variables.
	$word_count                  = 0;
	$paragraph_count             = 0;
	$sentence_count              = 0;
	$average_words_per_paragraph = 0;
	$average_words_per_sentence  = 0;
	$readability_score           = 0;
	$total_syllables             = 0;

	// Total node count.
	$xpath      = new \DOMXPath( $doc );
	$node_count = $xpath->query( '//*' )->length;

	// Remove <style> and <script> tags to avoid counting them in content.
	$tags_to_remove = array( 'style', 'script' );
	foreach ( $tags_to_remove as $tag ) {
		$elements = $doc->getElementsByTagName( $tag );
		while ( $elements->length > 0 ) {
			$elements->item( 0 )->parentNode->removeChild( $elements->item( 0 ) );
		}
	}

	// Extract and trim visible text from the body element.
	$text_content = $doc->getElementsByTagName( 'body' )[0]->textContent;
	$text_content = preg_replace( '/[ \t]+/', ' ', $text_content );  // Replace multiple spaces/tabs with a single space.
	$text_content = preg_replace( '/\s*[\r\n]+\s*/', "\n", $text_content );  // Replace multiple newlines with a single newline.

	// Count the number of words.
	$word_count = str_word_count( $text_content );

	// Count paragraphs.
	$paragraphs      = $doc->getElementsByTagName( 'p' );
	$paragraph_count = $paragraphs->length;

	// Count words in each paragraph.
	$total_paragraph_word_count = 0;

	// Loop through each paragraph and count the words.
	foreach ( $paragraphs as $paragraph ) {

		if ( ! $paragraph instanceof \DOMElement ) {
			continue;
		}

        // phpcs:ignore WordPress.NamingConventions.ValidVariableName
		$paragraph_text              = $paragraph->textContent;
		$total_paragraph_word_count += str_word_count( $paragraph_text );
	}

	// Calculate average words per paragraph.
	if ( $paragraph_count > 0 ) {
		$average_words_per_paragraph = $total_paragraph_word_count / $paragraph_count;
	}

	// Count sentences (split based on common sentence terminators).
	$sentences      = preg_split( '/[.!?]+/', $text_content, -1, PREG_SPLIT_NO_EMPTY );
	$sentence_count = count( $sentences );

	// Calculate average words per sentence.
	if ( $sentence_count > 0 ) {
		$average_words_per_sentence = $word_count / $sentence_count;
	}

	// Count total syllables in the text.
	$words = str_word_count( $text_content, 1 );
	foreach ( $words as $word ) {
		$total_syllables += count_syllables( $word );
	}

	// Calculate Flesch-Kincaid readability score.
	if ( $sentence_count > 0 && $word_count > 0 ) {
		$readability_score = 206.835 - ( 1.015 * ( $word_count / $sentence_count ) ) - ( 84.6 * ( $total_syllables / $word_count ) ) + 15; // Added 15 to adust with webfx.
	}

	// Return all the calculated values as an array.
	return array(
		'word_count'                  => $word_count,
		'paragraph_count'             => $paragraph_count,
		'average_words_per_paragraph' => round( $average_words_per_paragraph, 2 ),
		'sentence_count'              => $sentence_count,
		'average_words_per_sentence'  => round( $average_words_per_sentence, 2 ),
		'readability_score'           => round( $readability_score, 1 ),
		'node_count'                  => $node_count,
	);
}

/**
 * Count the number of syllables in a word.
 *
 * This function counts the number of distinct vowel groups in a word, which
 * is a simple heuristic for determining the number of syllables.
 *
 * @param string $word The word to check.
 * @return int The number of syllables in the word.
 */
function count_syllables( $word ) {
	$word = strtolower( $word );
	// Match vowel groups in the word.
	preg_match_all( '/[aeiouy]+/', $word, $matches );
	return count( $matches[0] );
}

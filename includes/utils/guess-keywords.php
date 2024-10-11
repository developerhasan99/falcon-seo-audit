<?php

function guessKeywords($doc)
{
    // Initialize variables
    $textContent = '';

    // Extract text from title, headings, and paragraphs
    $title = $doc->getElementsByTagName('title')->item(0)->nodeValue ?? '';
    $headingsText = '';
    for ($i = 1; $i <= 6; $i++) {
        $headingTags = $doc->getElementsByTagName('h' . $i);
        foreach ($headingTags as $heading) {
            $headingsText .= ' ' . $heading->nodeValue;
        }
    }
    $paragraphsText = '';
    $paragraphs = $doc->getElementsByTagName('p');
    foreach ($paragraphs as $paragraph) {
        $paragraphsText .= ' ' . $paragraph->nodeValue;
    }

    // Combine all the text content
    $textContent = $title . ' ' . $headingsText . ' ' . $paragraphsText;

    // Convert to lowercase for consistency
    $textContent = strtolower($textContent);

    // Remove HTML entities and punctuation
    $textContent = html_entity_decode($textContent);
    $textContent = preg_replace('/[^\w\s]/', '', $textContent);

    // Split text into words
    $words = explode(' ', $textContent);

    // Remove common stop words
    $stopWords = [
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
        'if'
        // You can expand this list with more stop words
    ];
    $filteredWords = array_filter($words, function ($word) use ($stopWords) {
        return strlen($word) > 2 && !in_array($word, $stopWords);
    });

    // Count word frequencies
    $wordFrequencies = array_count_values($filteredWords);

    // Sort words by frequency in descending order
    arsort($wordFrequencies);

    // Get the top 10 most frequent words (potential keywords)
    $topKeywords = array_slice($wordFrequencies, 0, 10);

    return $topKeywords;
}

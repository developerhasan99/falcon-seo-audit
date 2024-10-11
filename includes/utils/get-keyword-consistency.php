<?php

function extractKeywordConsistency($doc, $keywords)
{
    $keywordData = [];

    // Extract text from title, meta description, and headings
    $title = $doc->getElementsByTagName('title')->item(0)->nodeValue ?? '';

    // Get meta description
    $metaDescription = '';
    $metas = $doc->getElementsByTagName('meta');
    foreach ($metas as $meta) {
        if ($meta->getAttribute('name') == 'description') {
            $metaDescription = $meta->getAttribute('content');
        }
    }

    // Get text from headings
    $headingsText = '';
    for ($i = 1; $i <= 6; $i++) {
        $headingTags = $doc->getElementsByTagName('h' . $i);
        foreach ($headingTags as $heading) {
            $headingsText .= ' ' . $heading->nodeValue;
        }
    }

    // Get text from paragraphs
    $paragraphsText = '';
    $paragraphs = $doc->getElementsByTagName('p');
    foreach ($paragraphs as $paragraph) {
        $paragraphsText .= ' ' . $paragraph->nodeValue;
    }

    // Concatenate all the text
    $contentText = $title . ' ' . $metaDescription . ' ' . $headingsText . ' ' . $paragraphsText;

    // Total word count
    $totalWords = str_word_count($contentText);

    // Analyze each keyword
    foreach ($keywords as $keyword) {
        $occurrencesInTitle = countKeywordOccurrences($title, $keyword);
        $occurrencesInMetaDescription = countKeywordOccurrences($metaDescription, $keyword);
        $occurrencesInHeadings = countKeywordOccurrences($headingsText, $keyword);
        $occurrencesInParagraphs = countKeywordOccurrences($paragraphsText, $keyword);
        $totalOccurrences = countKeywordOccurrences($contentText, $keyword);

        // Calculate keyword density (percentage of the keyword in total text)
        $keywordDensity = ($totalOccurrences / $totalWords) * 100;

        // Structure the keyword consistency data
        $keywordData[$keyword] = [
            'occurrences_in_title' => $occurrencesInTitle,
            'occurrences_in_meta_description' => $occurrencesInMetaDescription,
            'occurrences_in_headings' => $occurrencesInHeadings,
            'occurrences_in_paragraphs' => $occurrencesInParagraphs,
            'total_occurrences' => $totalOccurrences,
            'keyword_density' => round($keywordDensity, 2) // Percentage of total words
        ];
    }

    return $keywordData;
}

// Function to count keyword occurrences in text
function countKeywordOccurrences($text, $keyword)
{
    return substr_count(strtolower($text), strtolower($keyword));
}

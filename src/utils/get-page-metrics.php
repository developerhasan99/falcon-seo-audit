<?php

function analyzeContentMetrics($doc)
{
    // Initialize variables
    $wordCount = 0;
    $paragraphCount = 0;
    $sentenceCount = 0;
    $averageWordsPerParagraph = 0;
    $averageWordsPerSentence = 0;
    $readabilityScore = 0;
    $totalSyllables = 0;

    // Total node count
    $xpath = new DOMXPath($doc);
    $nodeCount = $xpath->query('//*')->length;

    // Remove <style> and <script> tags to avoid counting them in content
    $tagsToRemove = ['style', 'script'];
    foreach ($tagsToRemove as $tag) {
        $elements = $doc->getElementsByTagName($tag);
        while ($elements->length > 0) {
            $elements->item(0)->parentNode->removeChild($elements->item(0));
        }
    }

    // Extract and trim visible text from the body element
    $textContent = $doc->getElementsByTagName('body')[0]->textContent;
    $textContent = trim(preg_replace('/\s+/', ' ', $textContent));

    error_log('textContent: ' . $textContent);

    // Count the number of words
    $wordCount = str_word_count($textContent);

    // Count paragraphs
    $paragraphs = $doc->getElementsByTagName('p');
    $paragraphCount = $paragraphs->length;

    // Calculate average words per paragraph
    if ($paragraphCount > 0) {
        $averageWordsPerParagraph = $wordCount / $paragraphCount;
    }

    // Count sentences (split based on common sentence terminators)
    $sentences = preg_split('/[.!?]+/', $textContent, -1, PREG_SPLIT_NO_EMPTY);
    $sentenceCount = count($sentences);

    // Calculate average words per sentence
    if ($sentenceCount > 0) {
        $averageWordsPerSentence = $wordCount / $sentenceCount;
    }

    // Count total syllables in the text
    $words = str_word_count($textContent, 1);
    foreach ($words as $word) {
        $totalSyllables += countSyllables($word);
    }

    error_log("Word Count: $wordCount, Sentence Count: $sentenceCount, Total Syllables: $totalSyllables\n");

    // Calculate Flesch-Kincaid readability score
    if ($sentenceCount > 0 && $wordCount > 0) {
        $readabilityScore = 206.835 - (1.015 * ($wordCount / $sentenceCount)) - (84.6 * ($totalSyllables / $wordCount));
    }

    // Return all the calculated values as an array
    return [
        'word_count' => $wordCount,
        'paragraph_count' => $paragraphCount,
        'average_words_per_paragraph' => round($averageWordsPerParagraph, 2),
        'sentence_count' => $sentenceCount,
        'average_words_per_sentence' => round($averageWordsPerSentence, 2),
        'readability_score' => round($readabilityScore, 2),
        'node_count' => $nodeCount
    ];
}

// Syllable counter helper function
function countSyllables($word)
{
    $word = strtolower($word);
    // Match vowel groups in the word
    preg_match_all('/[aeiouy]+/', $word, $matches);
    return count($matches[0]);
}

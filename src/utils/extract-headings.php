<?php

function extractHeadings($doc)
{
    $headings = [
        'h1' => [],
        'h2' => [],
        'h3' => [],
        'h4' => [],
        'h5' => [],
        'h6' => []
    ];

    // Loop through each heading tag (h1 to h6)
    for ($i = 1; $i <= 6; $i++) {
        $headingTags = $doc->getElementsByTagName('h' . $i);
        foreach ($headingTags as $heading) {
            // Add the heading text to the corresponding level
            $headings['h' . $i][] = trim($heading->nodeValue);
        }
    }

    return $headings;
}

<?php

function extractImages($doc)
{
    $images = [];

    // Get all <img> elements
    $imageTags = $doc->getElementsByTagName('img');

    foreach ($imageTags as $img) {
        // Collect image attributes
        $src = $img->getAttribute('src');
        $alt = $img->getAttribute('alt');
        $title = $img->getAttribute('title');
        $width = $img->getAttribute('width');
        $height = $img->getAttribute('height');

        // Add to the images array
        $images[] = [
            'src' => $src,
            'alt' => $alt,
            'title' => $title,
            'width' => $width,
            'height' => $height
        ];
    }

    return $images;
}

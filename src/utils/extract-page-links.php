<?php

function isWebpageLink($link)
{
    $path = parse_url($link, PHP_URL_PATH);

    if (strpos($path, 'wp-content/uploads') !== false) {
        return false;
    }

    $extension = pathinfo($path, PATHINFO_EXTENSION);
    $file_extensions = ['jpg', 'jpeg', 'png', 'gif', 'pdf', 'doc', 'docx', 'zip', 'mp4', 'mp3'];

    return !in_array(strtolower($extension), $file_extensions);
}

function extractPageLinks($doc)
{
    $internal_links = [];
    $external_links = [];
    $linkNodeList = $doc->getElementsByTagName('a');

    foreach ($linkNodeList as $linkNode) {
        $href = $linkNode->getAttribute('href');
        $anchorText = trim($linkNode->textContent);

        if (isWebpageLink($href) && !str_contains($href, '#')) {
            $parsed_url = parse_url($href);
            $parsed_home_url = parse_url(home_url());

            if (!isset($parsed_url['host']) || $parsed_url['host'] === $parsed_home_url['host']) {
                $href = isset($parsed_url['host']) ? $href : home_url() . $href;
                $internal_links[] = ['anchor' => $anchorText, 'href' => $href];
            } else {
                $external_links[] = ['anchor' => $anchorText, 'href' => $href];
            }
        }
    }

    return ['internal' => $internal_links, 'external' => $external_links];
}

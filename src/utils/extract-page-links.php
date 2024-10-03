<?php

function isWebpageLink($link)
{
    // Parse the URL and get the path
    $path = parse_url($link, PHP_URL_PATH);

    // If the path is null, treat it as a webpage link (or handle it as you wish)
    if ($path === null) {
        return true;
    }

    // Skip wp-content/uploads links
    if (strpos($path, 'wp-content/uploads') !== false) {
        return false;
    }

    // Check for file extension
    $extension = pathinfo($path, PATHINFO_EXTENSION);
    $file_extensions = ['jpg', 'jpeg', 'png', 'gif', 'pdf', 'doc', 'docx', 'zip', 'mp4', 'mp3'];

    // Return false if it's one of the file types, true otherwise
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

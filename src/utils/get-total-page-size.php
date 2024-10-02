<?php

function get_total_page_size($url)
{
    // Perform the initial request to get the HTML content
    $response = wp_remote_get($url);

    if (is_wp_error($response)) {
        return 'Error retrieving the page';
    }

    // Get the body (HTML content)
    $html = wp_remote_retrieve_body($response);

    // Calculate the size of the HTML itself
    $total_size = strlen($html);

    // Create a DOMDocument to parse the HTML
    $doc = new DOMDocument();
    @$doc->loadHTML($html);

    // Initialize an array to hold asset URLs
    $assets = [];

    // Extract asset URLs for <img> tags
    $images = $doc->getElementsByTagName('img');
    foreach ($images as $img) {
        $assets[] = $img->getAttribute('src');
    }

    // Extract asset URLs for <link> tags (CSS files)
    $links = $doc->getElementsByTagName('link');
    foreach ($links as $link) {
        if ($link->getAttribute('rel') === 'stylesheet') {
            $assets[] = $link->getAttribute('href');
        }
    }

    // Extract asset URLs for <script> tags (JavaScript files)
    $scripts = $doc->getElementsByTagName('script');
    foreach ($scripts as $script) {
        $src = $script->getAttribute('src');
        if ($src) {
            $assets[] = $src;
        }
    }

    // Fetch and calculate the size of each asset
    foreach ($assets as $asset_url) {
        // Ensure URLs are absolute
        if (!filter_var($asset_url, FILTER_VALIDATE_URL)) {
            $asset_url = esc_url_raw($url . $asset_url);
        }

        $asset_response = wp_remote_get($asset_url);
        if (!is_wp_error($asset_response)) {
            $asset_body = wp_remote_retrieve_body($asset_response);
            $total_size += strlen($asset_body);
        }
    }

    // Return the total size in bytes
    return $total_size;
}
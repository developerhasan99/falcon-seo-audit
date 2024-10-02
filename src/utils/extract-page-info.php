<?php

function extractInformation($doc)
{
    $title = $doc->getElementsByTagName('title')->item(0)->nodeValue;
    $description = "";
    $keywords = "";
    $contentType = "";
    $robots = "";
    $lang = "";
    $canonicalUrl = "";
    $openGraph = [];
    $twitterData = [];
    $jsonLd = [];
    $viewport = "";
    $favicon = "";
    $stylesheets = [];
    $csp = "";
    $alternateLinks = [];
    $javascriptLinks = [];

    // Get meta tags
    $metas = $doc->getElementsByTagName('meta');

    foreach ($metas as $meta) {

        // Meta description and keywords
        if ($meta->getAttribute('name') == 'description') {
            $description = $meta->getAttribute('content');
        }
        if ($meta->getAttribute('name') == 'keywords') {
            $keywords = $meta->getAttribute('content');
        }
        // Content type or charset
        if ($meta->hasAttribute('http-equiv') && $meta->getAttribute('http-equiv') == 'Content-Type') {
            $contentType = $meta->getAttribute('content');
        } elseif ($meta->hasAttribute('charset')) {
            $contentType = 'text/html; charset=' . $meta->getAttribute('charset');
        }
        // Robots tag
        if ($meta->getAttribute('name') == 'robots') {
            $robots = $meta->getAttribute('content');
        }
        // Open Graph data
        if (strpos($meta->getAttribute('property'), 'og:') === 0) {
            $openGraph[$meta->getAttribute('property')] = $meta->getAttribute('content');
        }
        // Twitter data
        if (strpos($meta->getAttribute('name'), 'twitter:') === 0) {
            $twitterData[$meta->getAttribute('name')] = $meta->getAttribute('content');
        }
        // Viewport meta tag
        if ($meta->getAttribute('name') == 'viewport') {
            $viewport = $meta->getAttribute('content');
        }
        // CSP meta tag
        if ($meta->getAttribute('http-equiv') == 'Content-Security-Policy') {
            $csp = $meta->getAttribute('content');
        }
    }

    // Get canonical URL
    $links = $doc->getElementsByTagName('link');
    foreach ($links as $link) {
        if ($link->getAttribute('rel') == 'canonical') {
            $canonicalUrl = $link->getAttribute('href');
        }
        if ($link->getAttribute('rel') == 'icon' || $link->getAttribute('rel') == 'shortcut icon') {
            $favicon = $link->getAttribute('href');
        }
        if ($link->getAttribute('rel') == 'stylesheet') {
            $stylesheets[] = $link->getAttribute('href');
        }
        if ($link->getAttribute('rel') == 'alternate') {
            $alternateLinks[] = [
                'href' => $link->getAttribute('href'),
                'hreflang' => $link->getAttribute('hreflang')
            ];
        }
    }

    // Get HTML lang attribute
    $lang = $doc->documentElement->getAttribute('lang');

    // Get JSON-LD structured data and JavaScript links
    $scriptTags = $doc->getElementsByTagName('script');
    foreach ($scriptTags as $script) {
        // Extract JSON-LD structured data
        if ($script->getAttribute('type') == 'application/ld+json') {
            $jsonLd[] = json_decode($script->nodeValue, true);
        }

        // Extract JavaScript links
        if ($script->hasAttribute('src')) {
            $javascriptLinks[] = $script->getAttribute('src');
        }
    }

    // Return all metadata
    return [
        'title' => $title,
        'meta_description' => $description,
        'keywords' => $keywords,
        'content_type' => $contentType,
        'robots' => $robots,
        'lang' => $lang,
        'canonical_url' => $canonicalUrl,
        'open_graph' => $openGraph,
        'twitter_data' => $twitterData,
        'json_ld' => $jsonLd,
        'viewport' => $viewport,
        'favicon' => $favicon,
        'stylesheets' => $stylesheets,
        'csp' => $csp,
        'alternate_links' => $alternateLinks,
        'javascript_links' => $javascriptLinks,  // Added JS links
    ];
}
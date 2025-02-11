<?php
namespace Falcon_Seo_Audit\Utils;

function extractMetrics($psiResponse) {
    $psiResponse = json_decode($psiResponse, true);  // If input is JSON string
    
    $metrics = [
        'score' => round($psiResponse['lighthouseResult']['categories']['performance']['score'] * 100),
        'fcp' => round($psiResponse['lighthouseResult']['audits']['first-contentful-paint']['numericValue'] / 1000, 1),
        'lcp' => round($psiResponse['lighthouseResult']['audits']['largest-contentful-paint']['numericValue'] / 1000, 1),
        'tbt' => round($psiResponse['lighthouseResult']['audits']['total-blocking-time']['numericValue']),
        'cls' => round($psiResponse['lighthouseResult']['audits']['cumulative-layout-shift']['numericValue'], 3),
        'speedIndex' => round($psiResponse['lighthouseResult']['audits']['speed-index']['numericValue'] / 1000, 1),
        'screenshot' => $psiResponse['lighthouseResult']['audits']['final-screenshot']['details']['data']
    ];

    return $metrics;
}
<?php

namespace Falcon_Seo_Audit\API;
use Falcon_Seo_Audit\API;

function get_issues() {
    API\permission_callback();

    global $wpdb;
    $audit_report_table = $wpdb->prefix . 'falcon_seo_audit_report';
    $single_content_report_table = $wpdb->prefix . 'falcon_seo_single_content_report';

    // Get the latest audit report ID
    $latest_report = $wpdb->get_var(
        $wpdb->prepare(
            "SELECT id FROM {$audit_report_table} 
            WHERE status = 'completed' 
            ORDER BY initiated_at DESC 
            LIMIT 1"
        )
    );

    if (!$latest_report) {
        return wp_send_json_error('No completed audits found');
    }

    $errors = [];
    $warnings = [];
    $notices = [];
    $passed = [];

    // Count pages without titles
    $missing_titles_count = $wpdb->get_var(
        $wpdb->prepare(
            "SELECT COUNT(*) 
            FROM {$single_content_report_table} 
            WHERE report_id = %d 
            AND (title IS NULL OR title = '')",
            $latest_report
        )
    );

    $missing_titles = [
        'title' => 'Pages don\'t have title tags',
    ];

    if ($missing_titles_count > 0) {
        $missing_titles['count'] = $missing_titles_count;
        $errors[] = $missing_titles;
    }

    // Count duplicate titles
    $duplicate_titles_count = $wpdb->get_var(
        $wpdb->prepare(
            "SELECT COUNT(*) 
            FROM (
                SELECT COUNT(*) as count
                FROM {$single_content_report_table} 
                WHERE report_id = %d 
                AND title IS NOT NULL 
                GROUP BY title 
                HAVING count > 1
            ) as dt",
            $latest_report
        )
    );

    // Count duplicate meta descriptions
    $duplicate_descriptions_count = $wpdb->get_var(
        $wpdb->prepare(
            "SELECT COUNT(*) 
            FROM (
                SELECT COUNT(*) as count
                FROM {$single_content_report_table} 
                WHERE report_id = %d 
                AND meta_description IS NOT NULL 
                GROUP BY meta_description 
                HAVING count > 1
            ) as dm",
            $latest_report
        )
    );

    // Count potential duplicate content
    $duplicate_content_count = $wpdb->get_var(
        $wpdb->prepare(
            "SELECT COUNT(*) 
            FROM (
                SELECT t1.id
                FROM {$single_content_report_table} t1
                INNER JOIN {$single_content_report_table} t2
                WHERE t1.report_id = %d 
                AND t2.report_id = %d
                AND t1.id < t2.id
                AND t1.word_count = t2.word_count
                AND t1.readability_score = t2.readability_score
                AND ABS(t1.word_count - t2.word_count) < 10
            ) as dc",
            $latest_report,
            $latest_report
        )
    );

    $response = array(
        'errors' => $errors,
        'warnings' => $warnings,
        'notices' => $notices,
        'passed' => $passed
    );

    wp_send_json_success($response);
    wp_die();
}
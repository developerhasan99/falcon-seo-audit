<?php

// ERROR, WARNING, and PASSED will be added letter
function falcon_seo_audit_activate_plugin()
{
    // Create the database table
    global $wpdb;

    $charset_collate = $wpdb->get_charset_collate();
    $audit_report_table = $wpdb->prefix . "falcon_seo_audit_report";
    $single_content_report_table = $wpdb->prefix . "falcon_seo_single_content_report";

    // First table creation
    $sql = "CREATE TABLE IF NOT EXISTS $audit_report_table (
        id int(20) NOT NULL AUTO_INCREMENT,
        status ENUM('pending', 'running', 'completed', 'failed') NOT NULL DEFAULT 'pending',
        initiated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        PRIMARY KEY  (id)
    ) $charset_collate;";

    // Second table creation (fixed)
    $sql2 = "CREATE TABLE IF NOT EXISTS $single_content_report_table (
        id int(20) NOT NULL AUTO_INCREMENT,
        report_id int(20) NOT NULL,
        url TEXT NOT NULL,
        status_code int(3) NOT NULL,
        title TEXT NULL,
        meta_description TEXT NULL,
        keywords TEXT NULL,
        content_type TEXT NULL,
        robots TEXT NULL,
        lang TEXT NULL,
        canonical_url TEXT NULL,
        open_graph LONGTEXT NULL,
        twitter_data LONGTEXT NULL,
        json_ld LONGTEXT NULL,
        viewport TEXT NULL,
        favicon TEXT NULL,
        stylesheets LONGTEXT NULL,
        csp TEXT NULL,
        alternate_links LONGTEXT NULL,
        javascript_links LONGTEXT NULL,
        internal_links LONGTEXT NULL,
        external_links LONGTEXT NULL,
        compressed_size int(20) NULL,
        uncompressed_size int(20) NULL,
        encoding varchar(20) NULL,
        word_count int(20) NULL,
        paragraph_count int(20) NULL,
        average_words_per_paragraph int(20) NULL,
        sentence_count int(20) NULL,
        average_words_per_sentence int(20) NULL,
        readability_score int(20) NULL,
        node_count int(20) NULL,
        headings LONGTEXT NULL,
        images LONGTEXT NULL,
        guessed_keywords LONGTEXT NULL,
        keyword_consistency LONGTEXT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        PRIMARY KEY  (id),
        INDEX (report_id)
    ) $charset_collate;";

    require_once(ABSPATH . 'wp-admin/includes/upgrade.php');
    dbDelta($sql);
    dbDelta($sql2);
}

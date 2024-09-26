<?php

// ERROR, WARNING, and PASSED will be added letter
function falcon_seo_audit_activate_plugin()
{
    // Create the database table
    global $wpdb;

    $charset_collate = $wpdb->get_charset_collate();
    $audit_report_table = $wpdb->prefix . "falcon_seo_audit_report";
    $single_content_report_table = $wpdb->prefix . "falcon_seo_single_content_report";

    $sql = "CREATE TABLE IF NOT EXISTS $audit_report_table (
		id int(20) NOT NULL AUTO_INCREMENT,
		urls LONGTEXT NOT NULL,
        status ENUM('pending', 'running', 'completed', 'failed') NOT NULL DEFAULT 'pending',
        initiated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
		PRIMARY KEY  (id)
	) $charset_collate;";

    $sql2 = "CREATE TABLE IF NOT EXISTS $single_content_report_table (
        id int(20) NOT NULL AUTO_INCREMENT,
        report_id int(20) NOT NULL
        url TEXT NOT NULL,
        title TEXT NOT NULL,
        description TEXT NOT NULL,
        links TEXT NOT NULL,
        PRIMARY KEY  (id),
        INDEX (report_id)
    );";

    require_once(ABSPATH . 'wp-admin/includes/upgrade.php');
    dbDelta($sql);
    dbDelta($sql2);
}

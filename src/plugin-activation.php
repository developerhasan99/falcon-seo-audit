<?php

// ERROR, WARNING, and PASSED will be added letter
function falcon_seo_audit_activate_plugin()
{
    // Create the database table
    global $wpdb;

    $charset_collate = $wpdb->get_charset_collate();
    $table_name = $wpdb->prefix . "falcon_seo_audit_report";

    $sql = "CREATE TABLE IF NOT EXISTS $table_name (
		id int(20) NOT NULL AUTO_INCREMENT,
		urls LONGTEXT NOT NULL,
        status ENUM('pending', 'running', 'completed', 'failed') NOT NULL DEFAULT 'pending',
        initiated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
		PRIMARY KEY  (id)
	) $charset_collate;";

    require_once(ABSPATH . 'wp-admin/includes/upgrade.php');
    dbDelta($sql);
}

<?php

/**
 * File: admin-pages.php
 *
 * @package Falcon_SEO_Audit
 * @since 1.0.0
 */

namespace Falcon_Seo_Audit;

/**
 * Class Plugin
 *
 * Main plugin class for Falcon SEO Audit.
 *
 * This class handles plugin activation, initialization, and loading of inline CSS for admin pages.
 */
class Plugin
{

    /**
     * Constructor to initialize hooks and activation.
     */
    public function __construct() {}

    /**
     * Initialize the plugin by registering activation hook and adding hook to load inline CSS
     * for specific admin pages.
     */
    public function initialize($plugin_file)
    {
        add_action('admin_enqueue_scripts', array($this, 'load_inline_css'));
        register_activation_hook($plugin_file, array($this, 'activate_plugin'));
    }

    /**
     * Activation function for the plugin.
     * This is triggered when the plugin is activated.
     */
    public function activate_plugin()
    {
        // Create the database table.
        global $wpdb;

        $charset_collate             = $wpdb->get_charset_collate();
        $audit_report_table          = $wpdb->prefix . 'falcon_seo_audit_report';
        $single_content_report_table = $wpdb->prefix . 'falcon_seo_single_content_report';

        // First table creation.
        $sql = "CREATE TABLE IF NOT EXISTS $audit_report_table (
            id int(20) NOT NULL AUTO_INCREMENT,
            status ENUM('pending', 'running', 'completed', 'failed') NOT NULL DEFAULT 'pending',
            initiated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            PRIMARY KEY  (id)
        ) $charset_collate;";

        // Second table creation (fixed).
        $sql2 = "CREATE TABLE IF NOT EXISTS $single_content_report_table (
            id int(20) NOT NULL AUTO_INCREMENT,
            report_id int(20) NOT NULL,
            url TEXT NOT NULL,
            status_code int(3) NOT NULL,
            title TEXT NULL,
            meta_description TEXT NULL,
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
            psi_score int(3) NULL,
            psi_fcp DECIMAL(10, 1) NULL,
            psi_lcp DECIMAL(10, 1) NULL,
            psi_tbt int(20) NULL,
            psi_cls DECIMAL(10, 3) NULL,
            psi_speed_index DECIMAL(10, 1) NULL,
            psi_screenshot LONGTEXT NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            PRIMARY KEY  (id),
            INDEX (report_id)
        ) $charset_collate;";

        require_once ABSPATH . 'wp-admin/includes/upgrade.php';
        dbDelta($sql);
        dbDelta($sql2);
    }

    /**
     * Loads inline CSS for the plugin's admin pages.
     */
    public function load_inline_css()
    {
        if (is_admin()) {
            wp_enqueue_style('wp-admin');

            $custom_css = '
            #adminmenu .toplevel_page_falcon-seo-audit .wp-menu-image img {
                padding: 0;
                opacity: 0.9;
            }
            body[class*="page_falcon-seo-audit"] {
                background-color: #f9fafb;
            }
            body[class*="page_falcon-seo-audit"] #wpcontent {
                padding: 0;
            }
            body[class*="page_falcon-seo-audit"] #wpbody-content {
                padding-bottom: 0;
            }
            body[class*="page_falcon-seo-audit"] #wpfooter {
                display: none;
            }
            body[class*="page_falcon-seo-audit"] #fsa-main-page {
                position: relative;
                min-height: calc(100vh - var(--wp-admin--admin-bar--height));
            }';

            wp_add_inline_style('wp-admin', $custom_css);
        }
    }
}

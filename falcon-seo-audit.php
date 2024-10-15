<?php
/**
 * Plugin Name: Falcon SEO Audit
 * Description: Advanced SEO Audit from User Perspective
 * Plugin URI: https://wordpress.org/plugin/falcon-seo-audit
 * Author: Mehedi Hasan
 * Version: 1.0.0
 * Author URI: https://developerhasan.com
 *
 * Text Domain: falcon-seo-audit
 *
 * @package Falcon_SEO_Audit
 * @category Seo
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

use Falcon_Seo_Audit\Plugin;

define( 'VERSION', '1.0.0' );
define( 'PLUGIN_DIR_PATH', plugin_dir_path( __FILE__ ) );
define( 'PLUGIN_DIR_URL', plugin_dir_url( __FILE__ ) );

/**
 * Activation function for the plugin.
 * This is triggered when the plugin is activated.
 *
 * Creates two database tables if they doesn't exist already.
 * The first table is for storing the audit report.
 * The second table is for storing the individual content report.
 */
function fsa_activate_plugin() {
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

	require_once ABSPATH . 'wp-admin/includes/upgrade.php';
	dbDelta( $sql );
	dbDelta( $sql2 );
}

register_activation_hook( __FILE__, 'fsa_activate_plugin' );

// Load classes.
require_once PLUGIN_DIR_PATH . 'includes/classes/class-plugin.php';
require_once PLUGIN_DIR_PATH . 'includes/classes/class-adminpages.php';
require_once PLUGIN_DIR_PATH . 'includes/classes/class-crawler.php';

// Load API related files.
require_once PLUGIN_DIR_PATH . 'includes/api/routes.php';
require_once PLUGIN_DIR_PATH . 'includes/api/initiate-audit.php';
require_once PLUGIN_DIR_PATH . 'includes/api/run-audit.php';
require_once PLUGIN_DIR_PATH . 'includes/api/get-audit-status.php';
require_once PLUGIN_DIR_PATH . 'includes/api/recent-audits.php';
require_once PLUGIN_DIR_PATH . 'includes/api/get-single-audit.php';
require_once PLUGIN_DIR_PATH . 'includes/api/get-single-details.php';
require_once PLUGIN_DIR_PATH . 'includes/api/delete-audit.php';

// Load utility files.
require_once PLUGIN_DIR_PATH . 'includes/utils/is-webpage-link.php';
require_once PLUGIN_DIR_PATH . 'includes/utils/get-all-site-links.php';
require_once PLUGIN_DIR_PATH . 'includes/utils/extract-headings.php';
require_once PLUGIN_DIR_PATH . 'includes/utils/extract-images.php';
require_once PLUGIN_DIR_PATH . 'includes/utils/extract-page-info.php';
require_once PLUGIN_DIR_PATH . 'includes/utils/extract-page-links.php';
require_once PLUGIN_DIR_PATH . 'includes/utils/analyze-content-metrics.php';
require_once PLUGIN_DIR_PATH . 'includes/utils/guess-keywords.php';
require_once PLUGIN_DIR_PATH . 'includes/utils/get-keyword-consistency.php';

// Initialize the plugin.
$fsa_plugin = new Plugin();
$fsa_plugin->initialize();

// Move the activation function to the plugin class.

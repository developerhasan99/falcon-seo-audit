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

define( 'VERSION', '1.0.0' );
define( 'PLUGIN_DIR_PATH', plugin_dir_path( __FILE__ ) );
define( 'PLUGIN_DIR_URL', plugin_dir_url( __FILE__ ) );

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

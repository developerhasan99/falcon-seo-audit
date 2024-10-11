<?php
/**
 * Plugin Name: Falcon SEO Audit
 * Description: Advanced SEO Audit from User Perspective
 * Plugin URI: https://developerhasan.com
 * Author: Developerhasan.com
 * Version: 1.0.0
 * Author URI: https://developerhasan.com
 *
 * Text Domain: fsa
 *
 * @package Falcon_SEO_Audit
 * @category Seo
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

define( 'VERSION', '1.0.0' );
define( 'PLUGIN_DIR_URL', plugin_dir_url( __FILE__ ) );

// Activation hook for the plugin.
register_activation_hook( __FILE__, 'falcon_seo_audit_activate_plugin' );
require_once plugin_dir_path( __FILE__ ) . 'src/plugin-activation.php';

// Load classes.
require_once plugin_dir_path( __FILE__ ) . 'src/classes/FalconSEOAudit.php';

require_once plugin_dir_path( __FILE__ ) . 'src/inline-css.php';
require_once plugin_dir_path( __FILE__ ) . 'src/admin-page.php';
require_once plugin_dir_path( __FILE__ ) . 'src/api/routes.php';

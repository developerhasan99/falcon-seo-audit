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

if (! defined('ABSPATH')) {
	exit;
}

use Falcon_Seo_Audit\Plugin;

define('VERSION', '1.0.0');
define('PLUGIN_DIR_PATH', plugin_dir_path(__FILE__));
define('PLUGIN_DIR_URL', plugin_dir_url(__FILE__));

// Load classes.
require_once PLUGIN_DIR_PATH . 'includes/classes/class-plugin.php';
require_once PLUGIN_DIR_PATH . 'includes/classes/class-adminpages.php';

// Initialize the plugin.
$fsa_plugin = new Plugin();
$fsa_plugin->initialize(__FILE__);

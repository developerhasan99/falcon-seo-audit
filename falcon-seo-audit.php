<?php

/**
 * Plugin Name: Falcon SEO Audit
 * Description: Advanced SEO Audit from User Perspective
 * Version: 1.0.0
 * Author: Mehedi Hasan
 */

if (! defined('ABSPATH')) exit;

define('VERSION', '1.0.0');
define('PLUGIN_DIR_URL', plugin_dir_url(__FILE__));

// Activation hook for the plugin
register_activation_hook(__FILE__, 'falcon_seo_audit_activate_plugin');
require_once plugin_dir_path(__FILE__) . 'src/plugin-activation.php';

require_once plugin_dir_path(__FILE__) . 'src/inline-css.php';
require_once plugin_dir_path(__FILE__) . 'src/admin-page.php';
require_once plugin_dir_path(__FILE__) . 'src/api/routes.php';

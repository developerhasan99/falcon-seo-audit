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

require_once plugin_dir_path(__FILE__) . 'src/inline-css.php';
require_once plugin_dir_path(__FILE__) . 'src/admin-page.php';
require_once plugin_dir_path(__FILE__) . 'src/api/get-urls.php';

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
        // TODO: Do whatever you want to plugin activation
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
                float: none;
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

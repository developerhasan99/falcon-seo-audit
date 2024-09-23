<?php

// Load the inline css codes
function falcon_seo_audit_admin_css()
{
    // This ensures the CSS only loads in the WordPress admin area
    if (is_admin()) {
        // Enqueue a common admin style like 'wp-admin' to ensure we can attach inline CSS
        wp_enqueue_style('wp-admin');

        // Add the inline CSS
        $custom_css = '
        #adminmenu .toplevel_page_falcon-seo-audit .wp-menu-image img {
            padding: 0;
            opacity: 0.9;
        }';

        // Attach the inline CSS to the 'wp-admin' handle
        wp_add_inline_style('wp-admin', $custom_css);
    }
}
add_action('admin_enqueue_scripts', 'falcon_seo_audit_admin_css');
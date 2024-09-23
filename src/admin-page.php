<?php


// Hook to add the admin menu
function falcon_seo_audit_add_admin_menu()
{
    $icon_url = PLUGIN_DIR_URL . '/assets/falcon-menu-icon.svg';

    add_menu_page(
        'Falcon SEO Audit',
        'Falcon SEO Audit',
        'manage_options',
        'falcon-seo-audit',
        'falcon_seo_audit_render_admin_page',
        $icon_url,
        36
    );
}
add_action('admin_menu', 'falcon_seo_audit_add_admin_menu');

// Render the admin page
function falcon_seo_audit_render_admin_page()
{
    echo '<div id="falcon-seo-audit-admin"></div>';
    wp_enqueue_script(
        'falcon-seo-audit-js',
        PLUGIN_DIR_URL . 'build/bundle.js', // Vite output
        array('wp-element'),  // React depends on wp-element in WP context
        '1.0',
        true
    );

    wp_localize_script('falcon-seo-audit-js', 'falcon_seo_obj', array(
        'version' => VERSION,
        'asset_url' => PLUGIN_DIR_URL . 'assets/',
    ));

    wp_enqueue_style(
        'falcon-seo-audit-css',
        PLUGIN_DIR_URL . 'build/styles.css',
        array(),
        '1.0'
    );
}
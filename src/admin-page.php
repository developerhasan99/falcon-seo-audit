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

    // Add submenu page
    add_submenu_page(
        'falcon-seo-audit',
        'Run Falcon Audit',
        'Run Falcon Audit',
        'manage_options',
        'falcon-seo-audit-run-audit',
        'falcon_seo_audit_run_audit_render_page'
    );
}
add_action('admin_menu', 'falcon_seo_audit_add_admin_menu');

function falcon_seo_get_post_types()
{
    $post_types = [];
    $result = get_post_types(['public' => true, 'exclude_from_search' => false], 'objects'); // Use 'objects' here

    foreach ($result as $post_type) {
        if ($post_type->name !== 'attachment' && $post_type->name !== 'e-landing-page') {
            array_push($post_types, ['name' => $post_type->name, 'label' => $post_type->label, 'type' => 'post_type']);
        }
    }

    return $post_types;
}

function falcon_seo_get_taxonomies()
{
    $taxonomies = [];
    $result = get_taxonomies(['public' => true, 'show_ui' => true], 'objects'); // Use 'objects' here

    foreach ($result as $taxonomy) {
        array_push($taxonomies, ['name' => $taxonomy->name, 'label' => $taxonomy->label, 'type' => 'taxonomy']);
    }

    return $taxonomies;
}

// Enqueue the React assets for falcon-seo-audit pages
function falcon_seo_audit_enqueue_scripts()
{
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
        'api_url' => rest_url('falcon-seo-audit/v1'),
        'nonce' => wp_create_nonce('wp_rest'),
        'post_types' => falcon_seo_get_post_types(),
        'taxonomies' => falcon_seo_get_taxonomies(),
        'test' => get_taxonomies(['public' => true], 'object'),
    ));

    wp_enqueue_style(
        'falcon-seo-audit-css',
        PLUGIN_DIR_URL . 'build/styles.css',
        array(),
        '1.0'
    );
}


// Render the admin page
function falcon_seo_audit_render_admin_page()
{
    falcon_seo_audit_enqueue_scripts();
    echo '<div id="falcon-seo-audit-admin"></div>';
}

// Render the Run Falcon Audit submenu page 
function falcon_seo_audit_run_audit_render_page()
{
    falcon_seo_audit_enqueue_scripts();
    echo '<div id="falcon-seo-audit-run-audit"></div>';
}

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
        'fsa_render_page_cb',
        $icon_url,
        36
    );

    add_submenu_page(
        'falcon-seo-audit',
        'Run Audit',
        'Run Audit',
        'manage_options',
        'run-audit',
        'fsa_render_run_audit_page'
    );

    add_submenu_page(
        'falcon-seo-audit',
        'Audit Report',
        'Audit Report',
        'manage_options',
        'audit-report',
        'fsa_render_audit_report_page'
    );

    remove_submenu_page('falcon-seo-audit', 'falcon-seo-audit');

    // // Add submenu page
    // add_submenu_page(
    //     'falcon-seo-audit',
    //     'Link explorer',
    //     'Link explorer',
    //     'manage_options',
    //     'falcon-seo-audit-run-audit',
    //     'falcon_seo_audit_run_audit_render_page'
    // );

    // // Add submenu page
    // add_submenu_page(
    //     'falcon-seo-audit',
    //     'All issues',
    //     'All issues',
    //     'manage_options',
    //     'falcon-seo-audit-run-audit',
    //     'falcon_seo_audit_run_audit_render_page'
    // );

    // // Add submenu page
    // add_submenu_page(
    //     'falcon-seo-audit',
    //     'Settings',
    //     'Settings',
    //     'manage_options',
    //     'falcon-seo-audit-run-audit',
    //     'falcon_seo_audit_run_audit_render_page'
    // );
}
add_action('admin_menu', 'falcon_seo_audit_add_admin_menu');

function get_running_audit_id()
{
    global $wpdb;
    $audit_report_table_name = $wpdb->prefix . 'falcon_seo_audit_report';

    // Fetch the latest row based on the 'id' column
    $last_audit = $wpdb->get_row("SELECT id, status FROM $audit_report_table_name ORDER BY id DESC LIMIT 1");

    // if Cron job is failed the status will be remaining pending
    if ($last_audit) {
        if ($last_audit->status === 'running') {
            return $last_audit->id;
        }
    }

    return null;
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
        'api_base' => rest_url('falcon-seo-audit/v1/'),
        'nonce' => wp_create_nonce('wp_rest'),
        'running_audit_id' => get_running_audit_id(),
    ));

    wp_enqueue_style(
        'falcon-seo-audit-css',
        PLUGIN_DIR_URL . 'build/styles.css',
        array(),
        '1.0'
    );
}


// Render admin pages
function fsa_render_run_audit_page()
{
    falcon_seo_audit_enqueue_scripts();
    echo '<div id="fsa-run-audit-page" class="falcon-seo-audit"></div>';
}

// // Render the admin page
function fsa_render_audit_report_page()
{
    falcon_seo_audit_enqueue_scripts();
    echo '<div id="fsa-audit-report-page" class="falcon-seo-audit"></div>';
}

// // Render the Run Falcon Audit submenu page 
// function falcon_seo_audit_run_audit_render_page()
// {
//     falcon_seo_audit_enqueue_scripts();
//     echo '<div id="falcon-seo-audit-run-audit" class="falcon-seo-audit"></div>';
// }
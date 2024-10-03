<?php

function falcon_seo_audit_initiate_audit(WP_REST_Request $request)
{
    global $wpdb;
    $table_name = $wpdb->prefix . 'falcon_seo_audit_report';

    $wpdb->insert($table_name, ['status' => 'pending']);
    $new_report_id = $wpdb->insert_id;

    if ($new_report_id) {
        $response_data = [
            'status' => 'success',
            'Message' => 'Initiated falcon audit',
            'audit_id' => $new_report_id,
            'approx_link_count' => count(get_all_links())
        ];
        return new WP_REST_Response($response_data, 200);
    }
}

function get_all_links()
{
    // Get all posts and pages
    $args = array(
        'post_type' => array('post', 'page'),
        'posts_per_page' => -1
    );

    $posts = get_posts($args);

    $links = array();

    // Loop through each post and get its permalink
    foreach ($posts as $post) {
        $links[] = get_permalink($post->ID);
    }

    // Also get categories, tags, and custom taxonomies links
    $categories = get_categories();
    foreach ($categories as $category) {
        $links[] = get_category_link($category->term_id);
    }

    // Get tags
    $tags = get_tags();
    foreach ($tags as $tag) {
        $links[] = get_tag_link($tag->term_id);
    }

    // Print or return the list of links
    return $links;
}

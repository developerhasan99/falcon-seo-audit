<?php

add_action('rest_api_init', function () {
    register_rest_route('falcon-seo-audit/v1', '/get-audit-urls/', [
        'methods' => 'POST',
        'callback' => 'falcon_seo_audit_get_audit_urls',
        'permission_callback' => 'falcon_seo_audit_permission_callback',
    ]);
});

function falcon_seo_audit_get_audit_urls(WP_REST_Request $request)
{
    // Get JSON payload from the request
    $data = $request->get_json_params();
    $url_topics = isset($data['urlTopics']) ? $data['urlTopics'] : [];

    $urls = [];

    foreach ($url_topics as $topic) {
        if ($topic->type === 'post_type') {
            $posts = get_posts(['post_type' => $topic->type, 'numberposts' => -1]);
            array_push($data, $posts);
        }
    }

    // Your logic for processing the data
    $response_data = [
        'status' => 'success',
        'received_data' => $urls
    ];

    return new WP_REST_Response($response_data, 200);
}

// $urls = [];
// // Get posts and pages
// $query = new WP_Query(['post_type' => 'any', 'post_status' => 'publish', 'posts_per_page' => -1]);
// while ($query->have_posts()) {
//     $query->the_post();
//     $urls[] = get_permalink();
// }
// wp_reset_postdata();

// // Get category URLs
// foreach (get_categories() as $category) {
//     $urls[] = get_category_link($category->term_id);
// }

// // Get tag URLs
// foreach (get_tags() as $tag) {
//     $urls[] = get_tag_link($tag->term_id);
// }

function falcon_seo_audit_permission_callback(WP_REST_Request $request)
{
    // Validate the nonce from the request headers
    $nonce = $request->get_header('X-WP-Nonce');
    if (wp_verify_nonce($nonce, 'wp_rest')) {
        return true;
    }

    return new WP_Error('rest_forbidden', esc_html__('You do not have permission to access this endpoint.'), ['status' => 403]);
}

<?php

function falcon_seo_audit_get_audit_urls(WP_REST_Request $request)
{
    // Get JSON payload from the request
    $data = $request->get_json_params();
    $url_topics = isset($data['urlTopics']) ? $data['urlTopics'] : [];

    $urls = [];

    foreach ($url_topics as $topic) {
        $links = [];

        // Check if the topic is a post type
        if ($topic['type'] === 'post_type') {
            $query = new WP_Query([
                'post_type' => $topic['name'],
                'post_status' => 'publish',
                'posts_per_page' => -1,
            ]);
            while ($query->have_posts()) {
                $query->the_post();
                array_push($links, ['id' => get_the_ID(), 'url' => get_permalink()]);
            }
            wp_reset_postdata();
        }

        // Check if the topic is a taxonomy and fetch only term links
        elseif ($topic['type'] === 'taxonomy') {
            $terms = get_terms(['taxonomy' => $topic['name'], 'hide_empty' => false]);
            foreach ($terms as $term) {
                array_push($links, ['id' => $term->term_id, 'url' => get_term_link($term)]);
            }
        }

        // Push the URL object to the final list
        $url_obj = [
            'type' => $topic['type'],
            'label' => $topic['label'],
            'name' => $topic['name'],
            'links' => $links,
        ];

        array_push($urls, $url_obj);
    }


    // Your logic for processing the data
    $response_data = [
        'status' => 'success',
        'urls' => $urls
    ];

    return new WP_REST_Response($response_data, 200);
}

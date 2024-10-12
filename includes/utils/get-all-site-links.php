<?php
/**
 * File: get-all-site-links.php
 *
 * @package Falcon_SEO_Audit
 * @since 1.0.0
 */

namespace Falcon_SEO_Audit\Utils;

/**
 * Gets all the links of a WordPress site.
 *
 * This function gets all the post and page links, as well as the links of categories, tags, and custom taxonomies.
 *
 * @return array An array of links.
 */
function get_all_links() {
	// Get all posts and pages.
	$args = array(
		'post_type'      => array( 'post', 'page' ),
		'posts_per_page' => -1,
	);

	$posts = get_posts( $args );

	$links = array();

	// Loop through each post and get its permalink.
	foreach ( $posts as $post ) {
		$links[] = get_permalink( $post->ID );
	}

	// Also get categories, tags, and custom taxonomies links.
	$categories = get_categories();
	foreach ( $categories as $category ) {
		$links[] = get_category_link( $category->term_id );
	}

	$tags = get_tags();
	foreach ( $tags as $tag ) {
		$links[] = get_tag_link( $tag->term_id );
	}

	return $links;
}

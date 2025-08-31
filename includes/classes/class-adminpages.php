<?php

/**
 * File: class-adminpages.php
 *
 * @package Falcon_SEO_Audit
 * @since 1.0.0
 */

namespace Falcon_SEO_Audit;

/**
 * Class AdminPages
 *
 * Handles the administration pages for Falcon SEO Audit.
 *
 * This class is responsible for adding the admin menu and submenus, enqueueing React assets and localization,
 * and rendering the main admin pages.
 */
class AdminPages
{

	/**
	 * The WordPress database object.
	 *
	 * @var object
	 */
	private $wpdb;

	/**
	 * The name of the Falcon SEO Audit report table.
	 *
	 *  @var string
	 */
	private $report_table_name;

	/**
	 * Constructor to initialize hooks.
	 */
	public function __construct()
	{

		$this->wpdb              = $GLOBALS['wpdb'];
		$this->report_table_name = $this->wpdb->prefix . 'falcon_seo_audit_report';

		add_action('admin_menu', array($this, 'add_admin_menu'));
	}

	/**
	 * Adds the admin menu and submenus for Falcon SEO Audit.
	 */
	public function add_admin_menu()
	{
		$icon_url = PLUGIN_DIR_URL . '/assets/falcon-menu-icon.svg';

		add_menu_page(
			'Falcon SEO Audit',
			'Falcon SEO Audit',
			'manage_options',
			'falcon-seo-audit',
			array($this, 'render_main_page'),
			$icon_url,
			36
		);

		add_submenu_page(
			'falcon-seo-audit',
			'Dashboard',
			'Dashboard',
			'manage_options',
			'falcon-seo-audit#/',
			array($this, 'render_main_page')
		);

		add_submenu_page(
			'falcon-seo-audit',
			'Run Audit',
			'Run Audit',
			'manage_options',
			'falcon-seo-audit#/run-audit',
			array($this, 'render_main_page')
		);

		add_submenu_page(
			'falcon-seo-audit',
			'Crawled URLs',
			'Crawled URLs',
			'manage_options',
			'falcon-seo-audit#/crawled-urls',
			array($this, 'render_main_page')
		);

		add_submenu_page(
			'falcon-seo-audit',
			'SEO Issues',
			'SEO Issues',
			'manage_options',
			'falcon-seo-audit#/seo-issues',
			array($this, 'render_main_page')
		);

		add_submenu_page(
			'falcon-seo-audit',
			'Page Speed',
			'Page Speed',
			'manage_options',
			'falcon-seo-audit#/page-speed',
			array($this, 'render_main_page')
		);

		add_submenu_page(
			'falcon-seo-audit',
			'Mobile Usability',
			'Mobile Usability',
			'manage_options',
			'falcon-seo-audit#/mobile-usability',
			array($this, 'render_main_page')
		);

		add_submenu_page(
			'falcon-seo-audit',
			'Backlinks',
			'Backlinks',
			'manage_options',
			'falcon-seo-audit#/backlinks',
			array($this, 'render_main_page')
		);

		add_submenu_page(
			'falcon-seo-audit',
			'Content Analysis',
			'Content Analysis',
			'manage_options',
			'falcon-seo-audit#/content-analysis',
			array($this, 'render_main_page')
		);

		add_submenu_page(
			'falcon-seo-audit',
			'Technical SEO',
			'Technical SEO',
			'manage_options',
			'falcon-seo-audit#/technical-seo',
			array($this, 'render_main_page')
		);

		remove_submenu_page('falcon-seo-audit', 'falcon-seo-audit');
	}

	/**
	 * Enqueues React assets and localization.
	 */
	public function enqueue_scripts()
	{
		wp_enqueue_script(
			'falcon-seo-audit-js',
			PLUGIN_DIR_URL . 'build/bundle.js',
			array('wp-element'),
			'1.0',
			true
		);

		wp_localize_script(
			'falcon-seo-audit-js',
			'falcon_seo_obj',
			array(
				'version'          => VERSION,
				'asset_url'        => PLUGIN_DIR_URL . 'assets/',
				'site_url'          => home_url(),
				'api_base'         => rest_url('falcon-seo-audit/v1/'),
				'nonce'            => wp_create_nonce('falcon_seo_audit'),
				'running_audit_id' => $this->get_running_audit_id(),
			)
		);

		wp_enqueue_style(
			'falcon-seo-audit-css',
			PLUGIN_DIR_URL . 'build/tailwind-compiled.css',
			array(),
			'1.0'
		);
	}

	/**
	 * Gets the running audit ID.
	 *
	 * @return int|null The ID of the running audit or null if none is running.
	 */
	private function get_running_audit_id()
	{

		$last_audit = $this->wpdb->get_row('SELECT id, status FROM ' . esc_sql($this->report_table_name) . ' ORDER BY id DESC LIMIT 1');

		if ($last_audit && 'running' === $last_audit->status) {
			return $last_audit->id;
		}

		return null;
	}

	/**
	 * Renders the main admin page.
	 */
	public function render_main_page()
	{
		$this->enqueue_scripts();
		echo '<div id="fsa-main-page" class="falcon-seo-audit"></div>';
	}
}

// Initialize the class.
if (is_admin()) {
	new AdminPages();
}

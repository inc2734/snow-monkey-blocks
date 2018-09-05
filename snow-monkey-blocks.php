<?php
/**
 * Plugin name: Snow Monkey Blocks
 * Version: 1.0.0
 * Text Domain: snow-monkey-blocks
 * Domain Path: /languages/
 *
 * @package snow-monkey-blocks
 * @author inc2734
 * @license GPL-2.0+
 */

namespace Snow_Monkey\Plugin\Blocks;

class Bootstrap {

	public function __construct() {
		add_action( 'plugins_loaded', [ $this, '_bootstrap' ] );
	}

	public function _bootstrap() {
		load_plugin_textdomain( 'snow-monkey-blocks', false, basename( __DIR__ ) . '/languages' );

		add_filter( 'block_categories', [ $this, '_block_categories' ] );
		add_action( 'enqueue_block_editor_assets', [ $this, '_enqueue_block_editor_assets' ] );
		add_action( 'wp_enqueue_scripts', [ $this, '_wp_enqueue_scripts' ] );
		add_action( 'init', [ $this, '_activate_autoupdate' ] );
		add_action( 'wp_loaded', [ $this, '_customizer_styles' ] );
	}

	/**
	 * Add block category
	 *
	 * @param array $categories
	 * @return array
	 */
	public function _block_categories( $categories ) {
		$categories[] = [
			'slug'  => 'smb',
			'title' => __( 'Snow Monkey Blocks', 'snow-monkey-blocks' )
								. __( '[Common blocks]', 'snow-monkey-blocks' ),
		];
		$categories[] = [
			'slug'  => 'smb-section',
			'title' => __( 'Snow Monkey Blocks', 'snow-monkey-blocks' )
								. __( '[Sections]', 'snow-monkey-blocks' ),
		];

		return $categories;
	}

	/**
	 * Enqueue block script for editor
	 *
	 * @return void
	 */
	public function _enqueue_block_editor_assets() {
		$relative_path = '/dist/js/blocks-build.js';
		$src  = plugin_dir_url( __FILE__ ) . $relative_path;
		$path = plugin_dir_path( __FILE__ ) . $relative_path;

		wp_register_script(
			'snow-monkey-blocks-editor-script',
			$src,
			[ 'wp-blocks', 'wp-element', 'wp-i18n' ],
			filemtime( $path ),
			true
		);

		if ( function_exists( 'gutenberg_get_jed_locale_data' ) ) {
			$locale  = gutenberg_get_jed_locale_data( 'snow-monkey-blocks' );
			$content = 'wp.i18n.setLocaleData( ' . json_encode( $locale ) . ', "snow-monkey-blocks" );';
			wp_script_add_data( 'snow-monkey-blocks-editor-script', 'data', $content );
		}

		wp_enqueue_script( 'snow-monkey-blocks-editor-script' );

		wp_localize_script(
			'snow-monkey-blocks-editor-script',
			'smb',
			[
				'pluginURL' => plugin_dir_url( __FILE__ ),
				'pluginDir' => plugin_dir_path( __FILE__ ),
			]
		);

		$relative_path = '/dist/css/blocks-editor.min.css';
		$src  = plugin_dir_url( __FILE__ ) . $relative_path;
		$path = plugin_dir_path( __FILE__ ) . $relative_path;

		wp_enqueue_style(
			'snow-monkey-blocks-editor-style',
			$src,
			[],
			filemtime( $path )
		);
	}

	/**
	 * Enqueue assets for front
	 *
	 * @return void
	 */
	public function _wp_enqueue_scripts() {
		$relative_path = '/dist/css/blocks.min.css';
		$src  = plugin_dir_url( __FILE__ ) . $relative_path;
		$path = plugin_dir_path( __FILE__ ) . $relative_path;

		wp_enqueue_style(
			'snow-monkey-blocks',
			$src,
			[],
			filemtime( $path )
		);
	}

	/**
	 * Apply styles from customizer settings of Snow Monkey
	 *
	 * @return void
	 */
	public function _customizer_styles() {
		if ( 'snow-monkey' !== get_template() && 'snow-monkey/resources' !== get_template() ) {
			return;
		}

		\Inc2734\Mimizuku_Core\Core::include_files( __DIR__ . '/block/' );
	}

	/**
	 * Activate auto update using GitHub
	 *
	 * @return [void]
	 */
	public function _activate_autoupdate() {
		new \Inc2734\WP_GitHub_Plugin_Updater\GitHub_Plugin_Updater(
			plugin_basename( __FILE__ ),
			'inc2734',
			'snow-monkey-blocks'
		);
	}
}

require_once( __DIR__ . '/vendor/autoload.php' );
new \Snow_Monkey\Plugin\Blocks\Bootstrap();

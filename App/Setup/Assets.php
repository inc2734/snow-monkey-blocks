<?php
/**
 * @package snow-monkey-blocks
 * @author inc2734
 * @license GPL-2.0+
 */

namespace Snow_Monkey\Plugin\Blocks\App\Setup;

use Snow_Monkey\Plugin\Blocks;

class Assets {
	public function __construct() {
		add_action( 'enqueue_block_editor_assets', [ $this, '_enqueue_block_editor_assets' ] );
		add_action( 'wp_enqueue_scripts', [ $this, '_wp_enqueue_scripts' ] );
		add_action( 'wp_enqueue_scripts', [ $this, '_wp_enqueue_nopro_scripts' ] );
		add_action( 'enqueue_block_assets', [ $this, '_enqueue_block_assets' ] );
		add_action( 'enqueue_block_assets', [ $this, '_enqueue_block_nopro_assets' ] );
	}

	/**
	 * Enqueue block script for editor
	 *
	 * @return void
	 */
	public function _enqueue_block_editor_assets() {
		$relative_path = '/dist/js/blocks-build.js';
		$src  = SNOW_MONKEY_BLOCKS_DIR_URL . $relative_path;
		$path = SNOW_MONKEY_BLOCKS_DIR_PATH . $relative_path;

		wp_register_script(
			'snow-monkey-blocks-editor',
			$src,
			[ 'wp-blocks', 'wp-element', 'wp-i18n' ],
			filemtime( $path ),
			true
		);

		if ( function_exists( 'gutenberg_get_jed_locale_data' ) ) {
			$locale  = gutenberg_get_jed_locale_data( 'snow-monkey-blocks' );
			$content = 'wp.i18n.setLocaleData( ' . json_encode( $locale ) . ', "snow-monkey-blocks" );';
			wp_script_add_data( 'snow-monkey-blocks-editor', 'data', $content );
		}

		wp_enqueue_script( 'snow-monkey-blocks-editor' );

		wp_localize_script(
			'snow-monkey-blocks-editor',
			'smb',
			[
				'pluginURL' => SNOW_MONKEY_BLOCKS_DIR_URL,
				'pluginDir' => SNOW_MONKEY_BLOCKS_DIR_PATH,
			]
		);

		$relative_path = '/dist/css/blocks-editor.min.css';
		$src  = SNOW_MONKEY_BLOCKS_DIR_URL . $relative_path;
		$path = SNOW_MONKEY_BLOCKS_DIR_PATH . $relative_path;

		wp_enqueue_style(
			'snow-monkey-blocks-editor',
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
		$src  = SNOW_MONKEY_BLOCKS_DIR_URL . $relative_path;
		$path = SNOW_MONKEY_BLOCKS_DIR_PATH . $relative_path;

		wp_enqueue_style(
			'snow-monkey-blocks',
			$src,
			[],
			filemtime( $path )
		);
	}

	/**
	 * Enqueue nopro assets
	 *
	 * @return void
	 */
	public function _wp_enqueue_nopro_scripts() {
		if ( Blocks\is_pro() ) {
			return;
		}

		$relative_path = '/dist/css/blocks-nopro.min.css';
		$src  = SNOW_MONKEY_BLOCKS_DIR_URL . $relative_path;
		$path = SNOW_MONKEY_BLOCKS_DIR_PATH . $relative_path;

		wp_enqueue_style(
			'snow-monkey-blocks-nopro',
			$src,
			[],
			filemtime( $path )
		);

		$relative_path = '/dist/js/blocks-nopro-build.js';
		$src  = SNOW_MONKEY_BLOCKS_DIR_URL . $relative_path;
		$path = SNOW_MONKEY_BLOCKS_DIR_PATH . $relative_path;

		wp_enqueue_script(
			'snow-monkey-blocks-nopro',
			$src,
			[ 'jquery' ],
			filemtime( $path )
		);
	}

	/**
	 * Enqueue assets for block
	 *
	 * @return void
	 */
	public function _enqueue_block_assets() {
		if ( Blocks\is_snow_monkey() ) {
			return;
		}

		if ( apply_filters( 'snow_monkey_blocks_enqueue_fontawesome', true ) ) {
			$relative_path = '/dist/packages/fontawesome-free/js/all.min.js';
			$src  = SNOW_MONKEY_BLOCKS_DIR_URL . $relative_path;
			$path = SNOW_MONKEY_BLOCKS_DIR_PATH . $relative_path;

			wp_enqueue_script(
				'fontawesome5',
				$src,
				[],
				filemtime( $path )
			);
		}

		if ( apply_filters( 'snow_monkey_blocks_enqueue_fallback_style', true ) ) {
			$relative_path = '/dist/css/fallback.min.css';
			$src  = SNOW_MONKEY_BLOCKS_DIR_URL . $relative_path;
			$path = SNOW_MONKEY_BLOCKS_DIR_PATH . $relative_path;

			wp_enqueue_style(
				'snow-monkey-blocks-fallback',
				$src,
				[],
				filemtime( $path )
			);
		}
	}

	/**
	 * Enqueue nopro assets for block
	 *
	 * @return void
	 */
	public function _enqueue_block_nopro_assets() {
		if ( Blocks\is_pro() ) {
			return;
		}

		$relative_path = '/dist/css/blocks-editor-nopro.min.css';
		$src  = SNOW_MONKEY_BLOCKS_DIR_URL . $relative_path;
		$path = SNOW_MONKEY_BLOCKS_DIR_PATH . $relative_path;

		wp_enqueue_style(
			'snow-monkey-blocks-editor-nopro',
			$src,
			[],
			filemtime( $path )
		);
	}
}

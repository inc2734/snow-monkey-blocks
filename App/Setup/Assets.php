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
		add_action( 'admin_enqueue_scripts', [ $this, '_enqueue_editor_style' ] );
		add_filter( 'block_editor_settings', [ $this, '_enqueue_editor_style' ] );
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

		wp_enqueue_script(
			'snow-monkey-blocks-editor',
			$src,
			[ 'wp-blocks', 'wp-element', 'wp-i18n' ],
			filemtime( $path ),
			true
		);

		if ( function_exists( 'gutenberg_get_jed_locale_data' ) ) {
			$locale  = gutenberg_get_jed_locale_data( 'snow-monkey-blocks' );
			$content = 'wp.i18n.setLocaleData( ' . json_encode( $locale ) . ', "snow-monkey-blocks" );';
			wp_add_inline_script( 'snow-monkey-blocks-editor', $content, 'before' );
		}

		wp_localize_script(
			'snow-monkey-blocks-editor',
			'smb',
			[
				'pluginURL' => SNOW_MONKEY_BLOCKS_DIR_URL,
				'pluginDir' => SNOW_MONKEY_BLOCKS_DIR_PATH,
			]
		);
	}

	/**
	 * Enqueue block style for editor
	 *
	 * @return string||array
	 * @return array
	 */
	public function _enqueue_editor_style( $editor_settings ) {
		if ( ! function_exists( 'is_gutenberg_page' ) || ! is_gutenberg_page() ) {
			return $editor_settings;
		}

		if ( ! isset( $editor_settings['styles'] ) ) {
			return $editor_settings;
		}

		$relative_path = '/dist/css/blocks-editor.min.css';
		$src = SNOW_MONKEY_BLOCKS_DIR_PATH . $relative_path;
		$editor_settings['styles'][] = [
			'css' => file_get_contents( $src ),
		];

		return $editor_settings;
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

		$relative_path = '/dist/js/app.min.js';
		$src  = SNOW_MONKEY_BLOCKS_DIR_URL . $relative_path;
		$path = SNOW_MONKEY_BLOCKS_DIR_PATH . $relative_path;

		wp_enqueue_script(
			'snow-monkey-blocks',
			$src,
			[ 'jquery' ],
			filemtime( $path ),
			true
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
				filemtime( $path ),
				true
			);
		}

		if ( apply_filters( 'snow_monkey_blocks_enqueue_slick', true ) ) {
			$relative_path = '/dist/packages/slick/slick.min.js';
			$src  = SNOW_MONKEY_BLOCKS_DIR_URL . $relative_path;
			$path = SNOW_MONKEY_BLOCKS_DIR_PATH . $relative_path;

			wp_enqueue_script(
				'slick-carousel',
				$src,
				[ 'jquery' ],
				filemtime( $path ),
				true
			);

			$relative_path = '/dist/packages/slick/slick.css';
			$src  = SNOW_MONKEY_BLOCKS_DIR_URL . $relative_path;
			$path = SNOW_MONKEY_BLOCKS_DIR_PATH . $relative_path;

			wp_enqueue_style(
				'slick-carousel',
				$src,
				[],
				filemtime( $path )
			);

			$relative_path = '/dist/packages/slick/slick-theme.css';
			$src  = SNOW_MONKEY_BLOCKS_DIR_URL . $relative_path;
			$path = SNOW_MONKEY_BLOCKS_DIR_PATH . $relative_path;

			wp_enqueue_style(
				'slick-carousel-theme',
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

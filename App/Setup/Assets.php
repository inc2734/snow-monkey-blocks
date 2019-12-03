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
		add_action( 'wp_enqueue_scripts', [ $this, '_wp_enqueue_pro_scripts' ] );
		add_action( 'wp_enqueue_scripts', [ $this, '_wp_enqueue_nopro_scripts' ] );
		add_action( 'enqueue_block_assets', [ $this, '_enqueue_block_assets' ] );
		add_action( 'enqueue_block_assets', [ $this, '_enqueue_block_nopro_assets' ] );
		add_action( 'enqueue_block_editor_assets', [ $this, '_enqueue_block_editor_nopro_assets' ] );
	}

	/**
	 * Enqueue block script for editor
	 *
	 * @return void
	 */
	public function _enqueue_block_editor_assets() {
		$asset = include( SNOW_MONKEY_BLOCKS_DIR_PATH . '/dist/js/blocks.asset.php' );
		wp_enqueue_script(
			'snow-monkey-blocks-editor',
			SNOW_MONKEY_BLOCKS_DIR_URL . '/dist/js/blocks.js',
			$asset['dependencies'],
			filemtime( SNOW_MONKEY_BLOCKS_DIR_PATH . '/dist/js/blocks.js' ),
			true
		);

		wp_enqueue_style(
			'snow-monkey-blocks-editor-wrapper',
			SNOW_MONKEY_BLOCKS_DIR_URL . '/dist/css/blocks-editor-wrapper.min.css',
			[],
			filemtime( SNOW_MONKEY_BLOCKS_DIR_PATH . '/dist/css/blocks-editor-wrapper.min.css' )
		);

		wp_enqueue_style(
			'snow-monkey-blocks-editor',
			SNOW_MONKEY_BLOCKS_DIR_URL . '/dist/css/blocks-editor.min.css',
			[ 'snow-monkey-blocks' ],
			filemtime( SNOW_MONKEY_BLOCKS_DIR_PATH . '/dist/css/blocks-editor.min.css' )
		);

		wp_set_script_translations(
			'snow-monkey-blocks-editor',
			'snow-monkey-blocks',
			SNOW_MONKEY_BLOCKS_DIR_PATH . '/languages'
		);

		wp_localize_script(
			'snow-monkey-blocks-editor',
			'smb',
			[
				'pluginUrl' => SNOW_MONKEY_BLOCKS_DIR_URL,
				'pluginDir' => SNOW_MONKEY_BLOCKS_DIR_PATH,
				'isPro'     => Blocks\is_pro(),
			]
		);
	}

	/**
	 * Enqueue assets for front
	 *
	 * @return void
	 */
	public function _wp_enqueue_scripts() {
		wp_enqueue_script( 'moment' );
	}

	/**
	 * Enqueue pro assets
	 * The parallax effect for section with bgimage block
	 *
	 * @return void
	 */
	public function _wp_enqueue_pro_scripts() {
		if ( ! Blocks\is_pro() ) {
			return;
		}

		if ( file_exists( get_theme_file_path( '/assets/js/background-parallax-scroll.min.js' ) ) ) {
			wp_enqueue_script(
				\Framework\Helper::get_main_script_handle() . '-background-parallax-scroll',
				get_theme_file_uri( '/assets/js/background-parallax-scroll.min.js' ),
				[ 'jquery' ],
				filemtime( get_theme_file_path( '/assets/js/background-parallax-scroll.min.js' ) ),
				true
			);
		}

		if ( file_exists( get_theme_file_path( '/assets/packages/jquery.background-parallax-scroll/dist/jquery.background-parallax-scroll.min.css' ) ) ) {
			wp_enqueue_style(
				'jquery.background-parallax-scroll',
				get_theme_file_uri( '/assets/packages/jquery.background-parallax-scroll/dist/jquery.background-parallax-scroll.min.css' ),
				[ \Framework\Helper::get_main_style_handle() ],
				filemtime( get_theme_file_path( '/assets/packages/jquery.background-parallax-scroll/dist/jquery.background-parallax-scroll.min.css' ) )
			);
		}
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

		wp_enqueue_style(
			'snow-monkey-blocks-nopro',
			SNOW_MONKEY_BLOCKS_DIR_URL . '/dist/css/blocks-nopro.min.css',
			[],
			filemtime( SNOW_MONKEY_BLOCKS_DIR_PATH . '/dist/css/blocks-nopro.min.css' )
		);

		wp_enqueue_script( 'moment' );

		$asset = include( SNOW_MONKEY_BLOCKS_DIR_PATH . '/dist/js/app-nopro.asset.php' );
		wp_enqueue_script(
			'snow-monkey-blocks-nopro',
			SNOW_MONKEY_BLOCKS_DIR_URL . '/dist/js/app-nopro.js',
			$asset['dependencies'],
			filemtime( SNOW_MONKEY_BLOCKS_DIR_PATH . '/dist/js/app-nopro.js' )
		);
	}

	public function _enqueue_block_assets() {
		wp_enqueue_style(
			'snow-monkey-blocks',
			SNOW_MONKEY_BLOCKS_DIR_URL . '/dist/css/blocks.min.css',
			[],
			filemtime( SNOW_MONKEY_BLOCKS_DIR_PATH . '/dist/css/blocks.min.css' )
		);
	}

	/**
	 * Enqueue assets for block
	 *
	 * @return void
	 */
	public function _enqueue_block_nopro_assets() {
		if ( Blocks\is_pro() ) {
			return;
		}

		if ( apply_filters( 'snow_monkey_blocks_enqueue_fontawesome', true ) ) {
			wp_enqueue_script(
				'fontawesome5',
				SNOW_MONKEY_BLOCKS_DIR_URL . '/dist/packages/fontawesome-free/js/all.min.js',
				[],
				filemtime( SNOW_MONKEY_BLOCKS_DIR_PATH . '/dist/packages/fontawesome-free/js/all.min.js' ),
				true
			);
		}

		if ( apply_filters( 'snow_monkey_blocks_enqueue_slick', true ) ) {
			wp_enqueue_script(
				'slick-carousel',
				SNOW_MONKEY_BLOCKS_DIR_URL . '/dist/packages/slick/slick.min.js',
				[ 'jquery' ],
				filemtime( SNOW_MONKEY_BLOCKS_DIR_PATH . '/dist/packages/slick/slick.min.js' ),
				true
			);

			wp_enqueue_style(
				'slick-carousel',
				SNOW_MONKEY_BLOCKS_DIR_URL . '/dist/packages/slick/slick.css',
				[],
				filemtime( SNOW_MONKEY_BLOCKS_DIR_PATH . '/dist/packages/slick/slick.css' )
			);

			wp_enqueue_style(
				'slick-carousel-theme',
				SNOW_MONKEY_BLOCKS_DIR_URL . '/dist/packages/slick/slick-theme.css',
				[],
				filemtime( SNOW_MONKEY_BLOCKS_DIR_PATH . '/dist/packages/slick/slick-theme.css' )
			);
		}

		if ( apply_filters( 'snow_monkey_blocks_enqueue_fallback_style', true ) ) {
			wp_enqueue_style(
				'snow-monkey-blocks-fallback',
				SNOW_MONKEY_BLOCKS_DIR_URL . '/dist/css/fallback.min.css',
				[],
				filemtime( SNOW_MONKEY_BLOCKS_DIR_PATH . '/dist/css/fallback.min.css' )
			);
		}
	}

	/**
	 * Enqueue nopro assets for block
	 *
	 * @return void
	 */
	public function _enqueue_block_editor_nopro_assets() {
		if ( Blocks\is_pro() ) {
			return;
		}

		wp_enqueue_style(
			'snow-monkey-blocks-editor-nopro',
			SNOW_MONKEY_BLOCKS_DIR_URL . '/dist/css/blocks-editor-nopro.min.css',
			[],
			filemtime( SNOW_MONKEY_BLOCKS_DIR_PATH . '/dist/css/blocks-editor-nopro.min.css' )
		);
	}
}

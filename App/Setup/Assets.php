<?php
/**
 * @package snow-monkey-blocks
 * @author inc2734
 * @license GPL-2.0+
 */

namespace Snow_Monkey\Plugin\Blocks\App\Setup;

use Snow_Monkey\Plugin\Blocks;

class Assets {

	/**
	 * constructor
	 */
	public function __construct() {
		add_action( 'enqueue_block_editor_assets', [ $this, '_enqueue_block_editor_assets' ] );
		add_action( 'wp_enqueue_scripts', [ $this, '_wp_enqueue_pro_scripts' ] );
		add_action( 'enqueue_block_assets', [ $this, '_enqueue_block_nopro_assets' ] );
		add_action( 'enqueue_block_assets', [ $this, '_enqueue_block_assets' ] );
		add_filter( 'render_block', [ $this, '_enqueue_block_scripts' ], 10, 2 );
		add_action( 'admin_enqueue_scripts', [ $this, '_admin_enqueue_scripts' ] );
	}

	/**
	 * Process script to be enqueued at block displaying.
	 *
	 * @param string $block_content The block content about to be appended.
	 * @param string $block The full block, including name and attributes.
	 * @return string
	 */
	public function _enqueue_block_scripts( $block_content, $block ) {
		if ( is_admin() ) {
			return $block_content;
		}

		// Parallax assets for the section with background image/video block
		if ( 'snow-monkey-blocks/section-with-bgimage' === $block['blockName'] ) {
			if ( isset( $block['attrs']['parallax'] ) && true === $block['attrs']['parallax'] ) {
				if ( ! wp_script_is( 'snow-monkey-blocks/background-parallax', 'registered' ) ) {
					wp_enqueue_script(
						'snow-monkey-blocks/background-parallax',
						SNOW_MONKEY_BLOCKS_DIR_URL . '/dist/js/background-parallax.js',
						[],
						filemtime( SNOW_MONKEY_BLOCKS_DIR_PATH . '/dist/js/background-parallax.js' ),
						true
					);
				}
			}
		}

		// The slider block or the thumbnail gallery block
		if ( 'snow-monkey-blocks/slider' === $block['blockName']
			|| 'snow-monkey-blocks/thumbnail-gallery' === $block['blockName']
		) {
			if ( ! wp_script_is( 'slick-carousel', 'registered' ) ) {
				wp_enqueue_script(
					'slick-carousel',
					SNOW_MONKEY_BLOCKS_DIR_URL . '/dist/packages/slick/slick.min.js',
					[ 'jquery' ],
					filemtime( SNOW_MONKEY_BLOCKS_DIR_PATH . '/dist/packages/slick/slick.min.js' ),
					true
				);
			}
		}

		// The slider block
		if ( 'snow-monkey-blocks/slider' === $block['blockName'] ) {
			if ( ! wp_script_is( 'snow-monkey-blocks/slider', 'registered' ) ) {
				wp_enqueue_script(
					'snow-monkey-blocks/slider',
					SNOW_MONKEY_BLOCKS_DIR_URL . '/dist/block/slider/script.js',
					[ 'slick-carousel' ],
					filemtime( SNOW_MONKEY_BLOCKS_DIR_PATH . '/dist/block/slider/script.js' ),
					true
				);
			}
		}

		// The thumbnail gallery block
		if ( 'snow-monkey-blocks/thumbnail-gallery' === $block['blockName'] ) {
			if ( ! wp_script_is( 'snow-monkey-blocks/thumbnail-gallery', 'registered' ) ) {
				wp_enqueue_script(
					'snow-monkey-blocks/thumbnail-gallery',
					SNOW_MONKEY_BLOCKS_DIR_URL . '/dist/block/thumbnail-gallery/script.js',
					[ 'slick-carousel' ],
					filemtime( SNOW_MONKEY_BLOCKS_DIR_PATH . '/dist/block/thumbnail-gallery/script.js' ),
					true
				);
			}
		}

		return $block_content;
	}

	/**
	 * Enqueue block script for editor.
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
			SNOW_MONKEY_BLOCKS_DIR_URL . '/dist/css/blocks-editor-wrapper.css',
			[],
			filemtime( SNOW_MONKEY_BLOCKS_DIR_PATH . '/dist/css/blocks-editor-wrapper.css' )
		);

		$editor_style_dependencies = [ 'snow-monkey-blocks' ];
		wp_enqueue_style(
			'snow-monkey-blocks-editor',
			SNOW_MONKEY_BLOCKS_DIR_URL . '/dist/css/blocks-editor.css',
			$editor_style_dependencies,
			filemtime( SNOW_MONKEY_BLOCKS_DIR_PATH . '/dist/css/blocks-editor.css' )
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
	 * Enqueue pro assets
	 * The parallax effect for section with bgimage block
	 *
	 * @return void
	 */
	public function _wp_enqueue_pro_scripts() {
		if ( ! Blocks\is_pro() ) {
			return;
		}

		wp_enqueue_style(
			'snow-monkey-blocks-background-parallax',
			SNOW_MONKEY_BLOCKS_DIR_URL . '/dist/css/background-parallax.css',
			[ 'snow-monkey-blocks' ],
			filemtime( SNOW_MONKEY_BLOCKS_DIR_PATH . '/dist/css/background-parallax.css' )
		);
	}

	/**
	 * Enqueue block assets
	 */
	public function _enqueue_block_assets() {
		if ( ! wp_style_is( 'slick-carousel', 'registered' ) ) {
			wp_register_style(
				'slick-carousel',
				SNOW_MONKEY_BLOCKS_DIR_URL . '/dist/packages/slick/slick.css',
				[],
				filemtime( SNOW_MONKEY_BLOCKS_DIR_PATH . '/dist/packages/slick/slick.css' )
			);
		}

		if ( ! wp_style_is( 'slick-carousel-theme', 'registered' ) ) {
			wp_register_style(
				'slick-carousel-theme',
				SNOW_MONKEY_BLOCKS_DIR_URL . '/dist/packages/slick/slick-theme.css',
				[ 'slick-carousel' ],
				filemtime( SNOW_MONKEY_BLOCKS_DIR_PATH . '/dist/packages/slick/slick-theme.css' )
			);
		}

		if ( ! wp_style_is( 'spider', 'registered' ) ) {
			wp_enqueue_style(
				'spider',
				SNOW_MONKEY_BLOCKS_DIR_URL . '/dist/packages/spider/dist/css/spider.css',
				[],
				filemtime( SNOW_MONKEY_BLOCKS_DIR_PATH . '/dist/packages/spider/dist/css/spider.css' )
			);
		}

		if ( ! wp_script_is( 'spider', 'registered' ) ) {
			wp_enqueue_script(
				'spider',
				SNOW_MONKEY_BLOCKS_DIR_URL . '/dist/packages/spider/dist/js/spider.js',
				[],
				filemtime( SNOW_MONKEY_BLOCKS_DIR_PATH . '/dist/packages/spider/dist/js/spider.js' ),
				true
			);
		}

		wp_enqueue_style(
			'snow-monkey-blocks',
			SNOW_MONKEY_BLOCKS_DIR_URL . '/dist/css/blocks.css',
			[],
			filemtime( SNOW_MONKEY_BLOCKS_DIR_PATH . '/dist/css/blocks.css' )
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

		if ( apply_filters( 'snow_monkey_blocks_enqueue_fallback_style', true ) ) {
			wp_enqueue_style(
				'snow-monkey-blocks-fallback',
				SNOW_MONKEY_BLOCKS_DIR_URL . '/dist/css/fallback.css',
				[],
				filemtime( SNOW_MONKEY_BLOCKS_DIR_PATH . '/dist/css/fallback.css' )
			);
		}
	}

	/**
	 * Enqueue admin assets.
	 */
	public function _admin_enqueue_scripts() {
		wp_enqueue_style(
			'snow-monkey-blocks-admin',
			SNOW_MONKEY_BLOCKS_DIR_URL . '/dist/css/admin.css',
			[],
			filemtime( SNOW_MONKEY_BLOCKS_DIR_PATH . '/dist/css/admin.css' )
		);
	}
}

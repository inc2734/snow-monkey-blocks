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
		add_action( 'wp_enqueue_scripts', array( $this, '_wp_enqueue_scripts' ) );
		add_action( 'wp_enqueue_scripts', array( $this, '_wp_enqueue_pro_scripts' ) );
		add_action( 'enqueue_block_assets', array( $this, '_enqueue_block_nopro_assets' ) );
		add_action( 'enqueue_block_assets', array( $this, '_enqueue_block_assets' ) );
		add_filter( 'render_block', array( $this, '_enqueue_block_scripts' ), 10, 2 );
		add_action( 'admin_enqueue_scripts', array( $this, '_admin_enqueue_scripts' ) );
		add_action( 'admin_print_scripts', array( $this, '_admin_print_scripts' ) );
	}

	/**
	 * Add slick carousel.
	 */
	public function _wp_enqueue_scripts() {
		if ( ! wp_script_is( 'slick-carousel', 'registered' ) ) {
			wp_register_script(
				'slick-carousel',
				SNOW_MONKEY_BLOCKS_DIR_URL . '/dist/packages/slick/slick.min.js',
				array( 'jquery' ),
				filemtime( SNOW_MONKEY_BLOCKS_DIR_PATH . '/dist/packages/slick/slick.min.js' ),
				true
			);
		}
	}

	/**
	 * Enqueue pro assets
	 * The parallax effect for section with bgimage block
	 */
	public function _wp_enqueue_pro_scripts() {
		if ( ! Blocks\is_pro() ) {
			return;
		}

		wp_enqueue_style(
			'snow-monkey-blocks-background-parallax',
			SNOW_MONKEY_BLOCKS_DIR_URL . '/dist/css/background-parallax.css',
			array( 'snow-monkey-blocks' ),
			filemtime( SNOW_MONKEY_BLOCKS_DIR_PATH . '/dist/css/background-parallax.css' )
		);
	}

	/**
	 * Enqueue assets for block
	 */
	public function _enqueue_block_nopro_assets() {
		if ( Blocks\is_pro() ) {
			return;
		}

		if ( apply_filters( 'snow_monkey_blocks_enqueue_fontawesome', true ) ) {
			wp_enqueue_script(
				'fontawesome6',
				SNOW_MONKEY_BLOCKS_DIR_URL . '/dist/packages/fontawesome-free/all.min.js',
				array(),
				filemtime( SNOW_MONKEY_BLOCKS_DIR_PATH . '/dist/packages/fontawesome-free/all.min.js' ),
				array(
					'strategy'  => 'defer',
					'in_footer' => false,
				)
			);
		}
	}

	/**
	 * Enqueue block assets
	 */
	public function _enqueue_block_assets() {
		if ( ! wp_style_is( 'slick-carousel', 'registered' ) ) {
			wp_register_style(
				'slick-carousel',
				SNOW_MONKEY_BLOCKS_DIR_URL . '/dist/packages/slick/slick.css',
				array(),
				filemtime( SNOW_MONKEY_BLOCKS_DIR_PATH . '/dist/packages/slick/slick.css' )
			);
		}

		if ( ! wp_style_is( 'slick-carousel-theme', 'registered' ) ) {
			wp_register_style(
				'slick-carousel-theme',
				SNOW_MONKEY_BLOCKS_DIR_URL . '/dist/packages/slick/slick-theme.css',
				array( 'slick-carousel' ),
				filemtime( SNOW_MONKEY_BLOCKS_DIR_PATH . '/dist/packages/slick/slick-theme.css' )
			);
		}

		if ( ! wp_style_is( 'spider', 'registered' ) ) {
			wp_enqueue_style(
				'spider',
				SNOW_MONKEY_BLOCKS_DIR_URL . '/dist/packages/spider/dist/css/spider.css',
				array(),
				filemtime( SNOW_MONKEY_BLOCKS_DIR_PATH . '/dist/packages/spider/dist/css/spider.css' )
			);
		}

		wp_enqueue_script(
			'spider',
			SNOW_MONKEY_BLOCKS_DIR_URL . '/dist/packages/spider/dist/js/spider.js',
			array(),
			filemtime( SNOW_MONKEY_BLOCKS_DIR_PATH . '/dist/packages/spider/dist/js/spider.js' ),
			array(
				'strategy'  => 'defer',
				'in_footer' => false,
			)
		);

		wp_enqueue_style(
			'snow-monkey-blocks',
			SNOW_MONKEY_BLOCKS_DIR_URL . '/dist/css/blocks.css',
			array(),
			filemtime( SNOW_MONKEY_BLOCKS_DIR_PATH . '/dist/css/blocks.css' )
		);

		if ( apply_filters( 'snow_monkey_blocks_enqueue_fallback_style', ! Blocks\is_pro() ) ) {
			if ( ! wp_style_is( 'sass-basis-core' ) ) {
				wp_dequeue_style( 'sass-basis-core' );
			}

			if ( ! wp_style_is( 'sass-basis' ) ) {
				wp_enqueue_style(
					'sass-basis',
					SNOW_MONKEY_BLOCKS_DIR_URL . '/dist/css/fallback.css',
					array(),
					filemtime( SNOW_MONKEY_BLOCKS_DIR_PATH . '/dist/css/fallback.css' )
				);
			}
		}

		if ( is_admin() ) {
			wp_enqueue_style(
				'snow-monkey-blocks-editor-wrapper',
				SNOW_MONKEY_BLOCKS_DIR_URL . '/dist/css/blocks-editor-wrapper.css',
				array(),
				filemtime( SNOW_MONKEY_BLOCKS_DIR_PATH . '/dist/css/blocks-editor-wrapper.css' )
			);

			$editor_style_dependencies = array( 'wp-edit-blocks', 'snow-monkey-blocks' );
			wp_enqueue_style(
				'snow-monkey-blocks-editor',
				SNOW_MONKEY_BLOCKS_DIR_URL . '/dist/css/blocks-editor.css',
				$editor_style_dependencies,
				filemtime( SNOW_MONKEY_BLOCKS_DIR_PATH . '/dist/css/blocks-editor.css' )
			);

			$asset = include SNOW_MONKEY_BLOCKS_DIR_PATH . '/dist/js/editor.asset.php';
			wp_enqueue_script(
				'snow-monkey-blocks-editor',
				SNOW_MONKEY_BLOCKS_DIR_URL . '/dist/js/editor.js',
				$asset['dependencies'],
				filemtime( SNOW_MONKEY_BLOCKS_DIR_PATH . '/dist/js/editor.js' ),
				array(
					'strategy'  => 'defer',
					'in_footer' => false,
				)
			);
		}

		/**
		 * nopro
		 */
		if ( ! Blocks\is_pro() && ! is_admin() ) {
			wp_enqueue_style(
				'snow-monkey-blocks/nopro',
				SNOW_MONKEY_BLOCKS_DIR_URL . '/dist/css/nopro.css',
				array(),
				filemtime( SNOW_MONKEY_BLOCKS_DIR_PATH . '/dist/css/nopro.css' )
			);
		}

		/**
		 * nopro
		 */
		if ( ! Blocks\is_pro() && is_admin() ) {
			wp_enqueue_style(
				'snow-monkey-blocks/nopro/editor',
				SNOW_MONKEY_BLOCKS_DIR_URL . '/dist/css/nopro-editor.css',
				array(),
				filemtime( SNOW_MONKEY_BLOCKS_DIR_PATH . '/dist/css/nopro-editor.css' )
			);
		}
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

		// Parallax assets for the section with background image/video block.
		if ( 'snow-monkey-blocks/section-with-bgimage' === $block['blockName'] ) {
			if ( isset( $block['attrs']['parallax'] ) && true === $block['attrs']['parallax'] ) {
				if ( ! wp_script_is( 'snow-monkey-blocks/background-parallax', 'registered' ) ) {
					wp_enqueue_script(
						'snow-monkey-blocks/background-parallax',
						SNOW_MONKEY_BLOCKS_DIR_URL . '/dist/js/background-parallax.js',
						array(),
						filemtime( SNOW_MONKEY_BLOCKS_DIR_PATH . '/dist/js/background-parallax.js' ),
						array(
							'strategy'  => 'defer',
							'in_footer' => false,
						)
					);
				}
			}
		}

		return $block_content;
	}

	/**
	 * Enqueue admin assets.
	 */
	public function _admin_enqueue_scripts() {
		wp_enqueue_style(
			'snow-monkey-blocks-admin',
			SNOW_MONKEY_BLOCKS_DIR_URL . '/dist/css/admin.css',
			array(),
			filemtime( SNOW_MONKEY_BLOCKS_DIR_PATH . '/dist/css/admin.css' )
		);
	}

	/**
	 * Add JavaScript global variables.
	 */
	public function _admin_print_scripts() {
		?>
<script>
var smb = {
	pluginUrl: '<?php echo esc_attr( SNOW_MONKEY_BLOCKS_DIR_URL ); ?>',
	pluginDir: '<?php echo esc_attr( str_replace( '\\', '\\\\', SNOW_MONKEY_BLOCKS_DIR_PATH ) ); ?>',
	isPro: <?php echo esc_attr( Blocks\is_pro() ? 'true' : 'false' ); ?>,
};
</script>
			<?php
	}
}

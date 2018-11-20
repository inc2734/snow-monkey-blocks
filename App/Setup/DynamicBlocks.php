<?php
/**
 * @package snow-monkey-blocks
 * @author inc2734
 * @license GPL-2.0+
 */

namespace Snow_Monkey\Plugin\Blocks\App\Setup;

use Snow_Monkey\Plugin\Blocks;

class DynamicBlocks {
	public function __construct() {
		if ( ! Blocks\is_snow_monkey() ) {
			return;
		}

		add_action( 'init', [ $this, '_recent_posts_block' ] );
		add_action( 'init', [ $this, '_pickup_slider_block' ] );
	}

	/**
	 * Recent posts block
	 *
	 * @return void
	 */
	public function _recent_posts_block() {
		register_block_type(
			'snow-monkey-blocks/recent-posts',
			[
				'attributes' => [
					'postsPerPage' => [
						'type' => 'number',
						'default' => 6,
					],
					'layout' => [
						'type' => 'string',
						'default' => 'rich-media',
					],
				],
				'render_callback' => function( $attributes ) {
					return $this->_render( 'recent-posts', $attributes );
				},
			]
		);
	}

	/**
	 * Recent posts block
	 *
	 * @return void
	 */
	public function _pickup_slider_block() {
		register_block_type(
			'snow-monkey-blocks/pickup-slider',
			[
				'attributes' => [
					'random' => [
						'type'    => 'boolean',
						'default' => false,
					],
					'linkType' => [
						'type'    => 'string',
						'default' => 'button',
					],
				],
				'render_callback' => function( $attributes ) {
					return $this->_render( 'pickup-slider', $attributes );
				},
			]
		);
	}

	/**
	 * Render template
	 *
	 * @param string $slug
	 * @param array $attributes This variable can be referenced in the template.
	 * @return string
	 */
	protected function _render( $slug, $attributes ) {
		ob_start();
		include( SNOW_MONKEY_BLOCKS_DIR_PATH . '/block/' . $slug . '/block.php' );
		return ob_get_clean();
	}
}

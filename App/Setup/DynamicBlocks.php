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
		$this->_register_common_blocks();
		$this->_register_snow_monkey_dedicated_blocks();
	}

	/**
	 * Register common blocks
	 *
	 * @return void
	 */
	protected function _register_common_blocks() {
		add_action( 'init', [ $this, '_categories_list_block' ] );
	}

	/**
	 * Register Snow Monkey dedicated blocks
	 *
	 * @return void
	 */
	protected function _register_snow_monkey_dedicated_blocks() {
		if ( ! Blocks\is_snow_monkey() ) {
			return;
		}

		add_action( 'init', [ $this, '_recent_posts_block' ] );
		add_action( 'init', [ $this, '_pickup_slider_block' ] );
		add_action( 'init', [ $this, '_contents_outline_block' ] );
		add_action( 'init', [ $this, '_child_pages_block' ] );
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
	 * Pickup_slider block
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
	 * Categories list block
	 *
	 * @return void
	 */
	public function _categories_list_block() {
		register_block_type(
			'snow-monkey-blocks/categories-list',
			[
				'attributes' => [
					'articles' => [
						'type'    => 'number',
						'default' => '5',
					],
				],
				'render_callback' => function( $attributes, $content ) {
					return $this->_render( 'categories-list', $attributes, $content );
				},
			]
		);
	}

	/**
	 * Contents outline block
	 *
	 * @return void
	 */
	public function _contents_outline_block() {
		register_block_type(
			'snow-monkey-blocks/contents-outline',
			[
				'attributes' => [
					'headings' => [
						'type'    => 'string',
						'default' => 'h2,h3,h4',
					],
				],
				'render_callback' => function( $attributes, $content ) {
					return $this->_render( 'contents-outline', $attributes, $content );
				},
			]
		);
	}

	/**
	 * Contents outline block
	 *
	 * @return void
	 */
	public function _child_pages_block() {
		register_block_type(
			'snow-monkey-blocks/child-pages',
			[
				'render_callback' => function( $attributes, $content ) {
					return $this->_render( 'child-pages', $attributes, $content );
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

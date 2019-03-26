<?php
/**
 * @package snow-monkey-blocks
 * @author kmix-39
 * @license GPL-2.0+
 */

use Snow_Monkey\Plugin\Blocks\App\Setup\DynamicBlocks;

add_action(
	'init',
	function() {
		register_block_type(
			'snow-monkey-blocks/categories-list',
			[
				'attributes' => [
					'articles' => [
						'type'    => 'number',
						'default' => '5',
					],
					'exclusionCategories' => [
						'type'    => 'string',
						'default' => '',
					],
					'orderby' => [
						'type'    => 'string',
						'default' => '',
					],
					'order' => [
						'type'    => 'string',
						'default' => '',
					],
					'className' => [
						'type'    => 'string',
						'default' => '',
					],
				],
				'render_callback' => function( $attributes, $content ) {
					return DynamicBlocks::render( 'categories-list', $attributes, $content );
				},
			]
		);
	}
);

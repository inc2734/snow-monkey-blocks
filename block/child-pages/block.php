<?php
/**
 * @package snow-monkey-blocks
 * @author kmix-39
 * @license GPL-2.0+
 */

use Snow_Monkey\Plugin\Blocks\App\DynamicBlocks;

register_block_type(
	'snow-monkey-blocks/child-pages',
	[
		'attributes' => [
			'title' => [
				'type'    => 'string',
				'default' => __( 'Child pages', 'snow-monkey-blocks' ),
			],
			'className' => [
				'type'    => 'string',
				'default' => '',
			],
		],
		'render_callback' => function( $attributes, $content ) {
			return DynamicBlocks::render( 'child-pages', $attributes, $content );
		},
	]
);

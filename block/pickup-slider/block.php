<?php
/**
 * @package snow-monkey-blocks
 * @author inc2734
 * @license GPL-2.0+
 */

use Snow_Monkey\Plugin\Blocks\App\DynamicBlocks;

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
			'className' => [
				'type'    => 'string',
				'default' => '',
			],
		],
		'render_callback' => function( $attributes ) {
			return DynamicBlocks::render( 'pickup-slider', $attributes );
		},
	]
);

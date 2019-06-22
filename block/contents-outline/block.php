<?php
/**
 * @package snow-monkey-blocks
 * @author kmix-39
 * @license GPL-2.0+
 */

use Snow_Monkey\Plugin\Blocks\App\DynamicBlocks;

register_block_type(
	'snow-monkey-blocks/contents-outline',
	[
		'attributes' => [
			'headings' => [
				'type'    => 'string',
				'default' => 'h2,h3,h4',
			],
			'moveToBefore1stHeading' => [
				'type'    => 'boolean',
				'default' => true,
			],
			'className' => [
				'type' => 'string',
			],
		],
		'render_callback' => function( $attributes, $content ) {
			return DynamicBlocks::render( 'contents-outline', $attributes, $content );
		},
	]
);

<?php
/**
 * @package snow-monkey-blocks
 * @author kmix-39
 * @license GPL-2.0+
 */

use Snow_Monkey\Plugin\Blocks\App\Setup\DynamicBlocks;
use Snow_Monkey\Plugin\Blocks;

if ( ! Blocks\is_snow_monkey() ) {
	return;
}

add_action(
	'init',
	function() {
		register_block_type(
			'snow-monkey-blocks/contents-outline',
			[
				'attributes' => [
					'headings' => [
						'type'    => 'string',
						'default' => 'h2,h3,h4',
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
	}
);

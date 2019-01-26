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
					'className' => [
						'type' => 'string',
						'default' => '',
					]
				],
				'render_callback' => function( $attributes ) {
					return DynamicBlocks::render( 'recent-posts', $attributes );
				},
			]
		);
	}
);

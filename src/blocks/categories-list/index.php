<?php
/**
 * @package snow-monkey-blocks
 * @author inc2734, kmix-39
 * @license GPL-2.0+
 */

use Snow_Monkey\Plugin\Blocks\App\DynamicBlocks;

register_block_type(
	__DIR__,
	array(
		'render_callback' => function ( $attributes ) {
			return DynamicBlocks::render( 'categories-list', $attributes );
		},
	)
);

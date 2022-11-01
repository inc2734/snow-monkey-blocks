<?php
/**
 * @package snow-monkey-blocks
 * @author inc2734, kmix-39
 * @license GPL-2.0+
 */

use Snow_Monkey\Plugin\Blocks\App\DynamicBlocks;

wp_register_style(
	'snow-monkey-blocks/categories-list',
	SNOW_MONKEY_BLOCKS_DIR_URL . '/dist/blocks/categories-list/style.css',
	array(),
	filemtime( SNOW_MONKEY_BLOCKS_DIR_PATH . '/dist/blocks/categories-list/style.css' )
);

register_block_type(
	__DIR__,
	array(
		'render_callback' => function( $attributes ) {
			return DynamicBlocks::render( 'categories-list', $attributes );
		},
	)
);

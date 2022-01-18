<?php
/**
 * @package snow-monkey-blocks
 * @author inc2734, kmix-39
 * @license GPL-2.0+
 */

use Snow_Monkey\Plugin\Blocks\App\DynamicBlocks;

wp_register_style(
	'snow-monkey-blocks/categories-list',
	SNOW_MONKEY_BLOCKS_DIR_URL . '/dist/block/categories-list/style.css',
	[],
	filemtime( SNOW_MONKEY_BLOCKS_DIR_PATH . '/dist/block/categories-list/style.css' )
);

wp_register_script(
	'snow-monkey-blocks/categories-list',
	SNOW_MONKEY_BLOCKS_DIR_URL . '/dist/block/categories-list/script.js',
	[],
	filemtime( SNOW_MONKEY_BLOCKS_DIR_PATH . '/dist/block/categories-list/script.js' ),
	true
);

register_block_type(
	__DIR__,
	[
		'script'          => ! is_admin() ? 'snow-monkey-blocks/categories-list' : null,
		'render_callback' => function( $attributes ) {
			return DynamicBlocks::render( 'categories-list', $attributes );
		},
	]
);

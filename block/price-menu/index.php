<?php
/**
 * @package snow-monkey-blocks
 * @author inc2734
 * @license GPL-2.0+
 */

wp_register_style(
	'snow-monkey-blocks/price-menu',
	SNOW_MONKEY_BLOCKS_DIR_URL . '/dist/block/price-menu/style.css',
	[],
	filemtime( SNOW_MONKEY_BLOCKS_DIR_PATH . '/dist/block/price-menu/style.css' )
);

wp_register_style(
	'snow-monkey-blocks/price-menu/editor',
	SNOW_MONKEY_BLOCKS_DIR_URL . '/dist/block/price-menu/editor.css',
	[ 'snow-monkey-blocks/price-menu' ],
	filemtime( SNOW_MONKEY_BLOCKS_DIR_PATH . '/dist/block/price-menu/editor.css' )
);

register_block_type(
	__DIR__
);

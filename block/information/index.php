<?php
/**
 * @package snow-monkey-blocks
 * @author inc2734
 * @license GPL-2.0+
 */

wp_register_style(
	'snow-monkey-blocks/information',
	SNOW_MONKEY_BLOCKS_DIR_URL . '/dist/block/information/style.css',
	[],
	filemtime( SNOW_MONKEY_BLOCKS_DIR_PATH . '/dist/block/information/style.css' )
);

wp_register_style(
	'snow-monkey-blocks/information/editor',
	SNOW_MONKEY_BLOCKS_DIR_URL . '/dist/block/information/editor.css',
	[ 'snow-monkey-blocks/information' ],
	filemtime( SNOW_MONKEY_BLOCKS_DIR_PATH . '/dist/block/information/editor.css' )
);

register_block_type(
	__DIR__
);

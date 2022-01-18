<?php
/**
 * @package snow-monkey-blocks
 * @author inc2734
 * @license GPL-2.0+
 */

wp_register_style(
	'snow-monkey-blocks/accordion',
	SNOW_MONKEY_BLOCKS_DIR_URL . '/dist/block/accordion/style.css',
	[],
	filemtime( SNOW_MONKEY_BLOCKS_DIR_PATH . '/dist/block/accordion/style.css' )
);

wp_register_style(
	'snow-monkey-blocks/accordion/editor',
	SNOW_MONKEY_BLOCKS_DIR_URL . '/dist/block/accordion/editor.css',
	[ 'snow-monkey-blocks/accordion' ],
	filemtime( SNOW_MONKEY_BLOCKS_DIR_PATH . '/dist/block/accordion/editor.css' )
);

register_block_type(
	__DIR__
);

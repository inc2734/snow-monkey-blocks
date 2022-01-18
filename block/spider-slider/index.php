<?php
/**
 * @package snow-monkey-blocks
 * @author inc2734
 * @license GPL-2.0+
 */

wp_register_style(
	'snow-monkey-blocks/spider-slider',
	SNOW_MONKEY_BLOCKS_DIR_URL . '/dist/block/spider-slider/style.css',
	[ 'spider' ],
	filemtime( SNOW_MONKEY_BLOCKS_DIR_PATH . '/dist/block/spider-slider/style.css' )
);

wp_register_style(
	'snow-monkey-blocks/spider-slider/editor',
	SNOW_MONKEY_BLOCKS_DIR_URL . '/dist/block/spider-slider/editor.css',
	[ 'snow-monkey-blocks/spider-slider' ],
	filemtime( SNOW_MONKEY_BLOCKS_DIR_PATH . '/dist/block/spider-slider/editor.css' )
);

wp_register_script(
	'snow-monkey-blocks/spider-slider',
	SNOW_MONKEY_BLOCKS_DIR_URL . '/dist/block/spider-slider/script.js',
	[ 'spider' ],
	filemtime( SNOW_MONKEY_BLOCKS_DIR_PATH . '/dist/block/spider-slider/script.js' )
);

register_block_type(
	__DIR__,
	[
		'script' => ! is_admin() ? 'snow-monkey-blocks/spider-slider' : null,
	]
);

<?php
/**
 * @package snow-monkey-blocks
 * @author inc2734
 * @license GPL-2.0+
 */

wp_register_style(
	'snow-monkey-blocks/spider-contents-slider',
	SNOW_MONKEY_BLOCKS_DIR_URL . '/dist/block/spider-contents-slider/style.css',
	[ 'spider' ],
	filemtime( SNOW_MONKEY_BLOCKS_DIR_PATH . '/dist/block/spider-contents-slider/style.css' )
);

wp_register_style(
	'snow-monkey-blocks/spider-contents-slider/editor',
	SNOW_MONKEY_BLOCKS_DIR_URL . '/dist/block/spider-contents-slider/editor.css',
	[ 'snow-monkey-blocks/spider-contents-slider' ],
	filemtime( SNOW_MONKEY_BLOCKS_DIR_PATH . '/dist/block/spider-contents-slider/editor.css' )
);

register_block_type(
	__DIR__,
	[
		'script' => ! is_admin() ? 'spider' : null,
	]
);

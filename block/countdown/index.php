<?php
/**
 * @package snow-monkey-blocks
 * @author inc2734
 * @license GPL-2.0+
 */

wp_register_style(
	'snow-monkey-blocks/countdown',
	SNOW_MONKEY_BLOCKS_DIR_URL . '/dist/block/countdown/style.css',
	[],
	filemtime( SNOW_MONKEY_BLOCKS_DIR_PATH . '/dist/block/countdown/style.css' )
);

wp_register_script(
	'snow-monkey-blocks/countdown',
	SNOW_MONKEY_BLOCKS_DIR_URL . '/dist/block/countdown/script.js',
	[],
	filemtime( SNOW_MONKEY_BLOCKS_DIR_PATH . '/dist/block/countdown/script.js' ),
	true
);

register_block_type(
	__DIR__,
	[
		'script' => ! is_admin() ? 'snow-monkey-blocks/countdown' : null,
	]
);

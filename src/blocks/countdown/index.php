<?php
/**
 * @package snow-monkey-blocks
 * @author inc2734
 * @license GPL-2.0+
 */

wp_register_style(
	'snow-monkey-blocks/countdown',
	SNOW_MONKEY_BLOCKS_DIR_URL . '/dist/blocks/countdown/style.css',
	array(),
	filemtime( SNOW_MONKEY_BLOCKS_DIR_PATH . '/dist/blocks/countdown/style.css' )
);

register_block_type(
	__DIR__
);

<?php
/**
 * @package snow-monkey-blocks
 * @author inc2734
 * @license GPL-2.0+
 */

wp_register_style(
	'snow-monkey-blocks/rating-box',
	SNOW_MONKEY_BLOCKS_DIR_URL . '/dist/block/rating-box/style.css',
	[],
	filemtime( SNOW_MONKEY_BLOCKS_DIR_PATH . '/dist/block/rating-box/style.css' )
);

register_block_type(
	__DIR__
);

<?php
/**
 * @package snow-monkey-blocks
 * @author inc2734
 * @license GPL-2.0+
 */

wp_register_style(
	'snow-monkey-blocks/step',
	SNOW_MONKEY_BLOCKS_DIR_URL . '/dist/block/step/style.css',
	[],
	filemtime( SNOW_MONKEY_BLOCKS_DIR_PATH . '/dist/block/step/style.css' )
);

register_block_type(
	__DIR__
);

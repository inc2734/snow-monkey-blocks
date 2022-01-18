<?php
/**
 * @package snow-monkey-blocks
 * @author inc2734
 * @license GPL-2.0+
 */

wp_register_style(
	'snow-monkey-blocks/panels',
	SNOW_MONKEY_BLOCKS_DIR_URL . '/dist/block/panels/style.css',
	[],
	filemtime( SNOW_MONKEY_BLOCKS_DIR_PATH . '/dist/block/panels/style.css' )
);

register_block_type(
	__DIR__
);

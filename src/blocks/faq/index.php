<?php
/**
 * @package snow-monkey-blocks
 * @author inc2734
 * @license GPL-2.0+
 */

wp_register_style(
	'snow-monkey-blocks/faq',
	SNOW_MONKEY_BLOCKS_DIR_URL . '/dist/blocks/faq/style.css',
	array(),
	filemtime( SNOW_MONKEY_BLOCKS_DIR_PATH . '/dist/blocks/faq/style.css' )
);

register_block_type(
	__DIR__
);

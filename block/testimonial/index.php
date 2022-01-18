<?php
/**
 * @package snow-monkey-blocks
 * @author inc2734
 * @license GPL-2.0+
 */

wp_register_style(
	'snow-monkey-blocks/testimonial',
	SNOW_MONKEY_BLOCKS_DIR_URL . '/dist/block/testimonial/style.css',
	[],
	filemtime( SNOW_MONKEY_BLOCKS_DIR_PATH . '/dist/block/testimonial/style.css' )
);

wp_register_style(
	'snow-monkey-blocks/testimonial/editor',
	SNOW_MONKEY_BLOCKS_DIR_URL . '/dist/block/testimonial/editor.css',
	[ 'snow-monkey-blocks/testimonial' ],
	filemtime( SNOW_MONKEY_BLOCKS_DIR_PATH . '/dist/block/testimonial/editor.css' )
);

register_block_type(
	__DIR__
);

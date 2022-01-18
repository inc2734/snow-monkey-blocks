<?php
/**
 * @package snow-monkey-blocks
 * @author inc2734
 * @license GPL-2.0+
 */

wp_register_style(
	'snow-monkey-blocks/thumbnail-gallery',
	SNOW_MONKEY_BLOCKS_DIR_URL . '/dist/block/thumbnail-gallery/style.css',
	[ 'slick-carousel-theme' ],
	filemtime( SNOW_MONKEY_BLOCKS_DIR_PATH . '/dist/block/thumbnail-gallery/style.css' )
);

register_block_type(
	__DIR__
);

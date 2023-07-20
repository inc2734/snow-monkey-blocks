<?php
/**
 * @package snow-monkey-blocks
 * @author inc2734
 * @license GPL-2.0+
 */

wp_register_style(
	generate_block_asset_handle( 'snow-monkey-blocks/slider', 'style' ),
	SNOW_MONKEY_BLOCKS_DIR_URL . '/dist/blocks/slider/style.css',
	array( 'slick-carousel-theme' ),
	filemtime( SNOW_MONKEY_BLOCKS_DIR_PATH . '/dist/blocks/slider/style.css' )
);

register_block_type(
	__DIR__
);

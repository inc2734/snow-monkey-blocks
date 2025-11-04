<?php
/**
 * @package snow-monkey-blocks
 * @author inc2734
 * @license GPL-2.0+
 */

register_block_type(
	__DIR__
);

wp_enqueue_block_style(
	'snow-monkey-blocks/slider',
	array(
		'handle' => generate_block_asset_handle( 'snow-monkey-blocks/slider', 'style' ),
		'src'    => SNOW_MONKEY_BLOCKS_DIR_URL . '/dist/blocks/slider/style-index.css',
		'deps'   => array( 'slick-carousel', 'slick-carousel-theme' ),
		'ver'    => filemtime( __DIR__ . '/style-index.css' ),
		'file'   => __DIR__ . '/style-index.css',
	)
);

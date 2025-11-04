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
	'snow-monkey-blocks/items',
	array(
		'handle' => generate_block_asset_handle( 'snow-monkey-blocks/items', 'style' ),
		'src'    => SNOW_MONKEY_BLOCKS_DIR_URL . '/dist/blocks/items/style-index.css',
		'deps'   => array( generate_block_asset_handle( 'snow-monkey-blocks/btn', 'style' ) ),
		'ver'    => filemtime( __DIR__ . '/style-index.css' ),
		'file'   => __DIR__ . '/style-index.css',
	)
);

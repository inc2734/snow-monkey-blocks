<?php
/**
 * @package snow-monkey-blocks
 * @author inc2734
 * @license GPL-2.0+
 */

use Snow_Monkey\Plugin\Blocks\App\DynamicBlocks;

register_block_type(
	__DIR__,
	array(
		'render_callback' => function ( $attributes, $content ) {
			return DynamicBlocks::render( 'spider-pickup-slider', $attributes, $content );
		},
	)
);

wp_enqueue_block_style(
	'snow-monkey-blocks/spider-pickup-slider',
	array(
		'handle' => generate_block_asset_handle( 'snow-monkey-blocks/spider-pickup-slider', 'style' ),
		'src'    => SNOW_MONKEY_BLOCKS_DIR_URL . '/dist/blocks/spider-pickup-slider/style-index.css',
		'deps'   => array(
			'spider',
			generate_block_asset_handle( 'snow-monkey-blocks/spider-slider', 'style' ),
		),
		'ver'    => filemtime( __DIR__ . '/style-index.css' ),
		'file'   => __DIR__ . '/style-index.css',
	)
);

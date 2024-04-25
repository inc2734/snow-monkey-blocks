<?php
/**
 * @package snow-monkey-blocks
 * @author inc2734
 * @license GPL-2.0+
 */

use Snow_Monkey\Plugin\Blocks\App\DynamicBlocks;

wp_register_style(
	generate_block_asset_handle( 'snow-monkey-blocks/spider-pickup-slider', 'style' ),
	SNOW_MONKEY_BLOCKS_DIR_URL . '/dist/blocks/spider-pickup-slider/style.css',
	array( 'spider' ),
	filemtime( SNOW_MONKEY_BLOCKS_DIR_PATH . '/dist/blocks/spider-pickup-slider/style.css' )
);

register_block_type(
	__DIR__,
	array(
		'render_callback' => function ( $attributes, $content ) {
			return DynamicBlocks::render( 'spider-pickup-slider', $attributes, $content );
		},
	)
);

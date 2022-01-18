<?php
/**
 * @package snow-monkey-blocks
 * @author inc2734
 * @license GPL-2.0+
 */

use Snow_Monkey\Plugin\Blocks\App\DynamicBlocks;

wp_register_style(
	'snow-monkey-blocks/spider-pickup-slider',
	SNOW_MONKEY_BLOCKS_DIR_URL . '/dist/block/spider-pickup-slider/style.css',
	[ 'spider' ],
	filemtime( SNOW_MONKEY_BLOCKS_DIR_PATH . '/dist/block/spider-pickup-slider/style.css' )
);

wp_register_script(
	'snow-monkey-blocks/spider-pickup-slider',
	SNOW_MONKEY_BLOCKS_DIR_URL . '/dist/block/spider-pickup-slider/script.js',
	[ 'spider' ],
	filemtime( SNOW_MONKEY_BLOCKS_DIR_PATH . '/dist/block/spider-pickup-slider/script.js' )
);

register_block_type(
	__DIR__,
	[
		'script'          => ! is_admin() ? 'snow-monkey-blocks/spider-pickup-slider' : null,
		'render_callback' => function( $attributes, $content ) {
			return DynamicBlocks::render( 'spider-pickup-slider', $attributes, $content );
		},
	]
);

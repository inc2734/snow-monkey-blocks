<?php
/**
 * @package snow-monkey-blocks
 * @author inc2734
 * @license GPL-2.0+
 */

use Snow_Monkey\Plugin\Blocks\App\DynamicBlocks;

wp_register_style(
	'snow-monkey-blocks/limited-datetime/editor',
	SNOW_MONKEY_BLOCKS_DIR_URL . '/dist/block/limited-datetime/editor.css',
	[],
	filemtime( SNOW_MONKEY_BLOCKS_DIR_PATH . '/dist/block/limited-datetime/editor.css' )
);

register_block_type(
	__DIR__,
	[
		'render_callback' => function( $attributes, $content ) {
			return DynamicBlocks::render( 'limited-datetime', $attributes, $content );
		},
	]
);

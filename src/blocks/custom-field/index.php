<?php
/**
 * @package snow-monkey-blocks
 * @author inc2734
 * @license GPL-2.0+
 */

use Snow_Monkey\Plugin\Blocks;
use Snow_Monkey\Plugin\Blocks\App\DynamicBlocks;

wp_register_style(
	'snow-monkey-blocks/custom-field/editor',
	SNOW_MONKEY_BLOCKS_DIR_URL . '/dist/blocks/custom-field/editor.css',
	array( 'snow-monkey-blocks/accordion' ),
	filemtime( SNOW_MONKEY_BLOCKS_DIR_PATH . '/dist/blocks/custom-field/editor.css' )
);

register_block_type(
	__DIR__,
	array(
		'render_callback' => function( $attributes, $content ) {
			return DynamicBlocks::render( 'custom-field', $attributes, $content );
		},
	)
);

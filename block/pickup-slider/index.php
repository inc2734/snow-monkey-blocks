<?php
/**
 * @package snow-monkey-blocks
 * @author inc2734
 * @license GPL-2.0+
 */

use Snow_Monkey\Plugin\Blocks;
use Snow_Monkey\Plugin\Blocks\App\DynamicBlocks;

register_block_type(
	__DIR__,
	[
		'render_callback' => function( $attributes, $content ) {
			return DynamicBlocks::render( 'pickup-slider', $attributes, $content );
		},
	]
);

/**
 * nopro
 */
if ( ! Blocks\is_pro() && ! is_admin() ) {
	wp_enqueue_style(
		'snow-monkey-blocks/pickup-slider/nopro',
		SNOW_MONKEY_BLOCKS_DIR_URL . '/dist/block/pickup-slider/nopro.css',
		[],
		filemtime( SNOW_MONKEY_BLOCKS_DIR_PATH . '/dist/block/pickup-slider/nopro.css' )
	);
}

/**
 * nopro
 */
if ( ! Blocks\is_pro() && is_admin() ) {
	wp_enqueue_style(
		'snow-monkey-blocks/pickup-slider/nopro/editor',
		SNOW_MONKEY_BLOCKS_DIR_URL . '/dist/block/pickup-slider/nopro-editor.css',
		[],
		filemtime( SNOW_MONKEY_BLOCKS_DIR_PATH . '/dist/block/pickup-slider/nopro-editor.css' )
	);
}

<?php
/**
 * @package snow-monkey-blocks
 * @author inc2734
 * @license GPL-2.0+
 */

use Snow_Monkey\Plugin\Blocks;
use Snow_Monkey\Plugin\Blocks\App\DynamicBlocks;

wp_register_style(
	'snow-monkey-blocks/taxonomy-terms',
	SNOW_MONKEY_BLOCKS_DIR_URL . '/dist/block/taxonomy-terms/style.css',
	[],
	filemtime( SNOW_MONKEY_BLOCKS_DIR_PATH . '/dist/block/taxonomy-terms/style.css' )
);

register_block_type(
	__DIR__,
	[
		'render_callback' => function( $attributes ) {
			return DynamicBlocks::render( 'taxonomy-terms', $attributes );
		},
	]
);

/**
 * nopro
 */
if ( ! Blocks\is_pro() && ! is_admin() ) {
	wp_enqueue_style(
		'snow-monkey-blocks/taxonomy-terms/nopro',
		SNOW_MONKEY_BLOCKS_DIR_URL . '/dist/block/taxonomy-terms/nopro.css',
		[],
		filemtime( SNOW_MONKEY_BLOCKS_DIR_PATH . '/dist/block/taxonomy-terms/nopro.css' )
	);
}

/**
 * nopro
 */
if ( ! Blocks\is_pro() && is_admin() ) {
	wp_enqueue_style(
		'snow-monkey-blocks/taxonomy-terms/nopro/editor',
		SNOW_MONKEY_BLOCKS_DIR_URL . '/dist/block/taxonomy-terms/nopro-editor.css',
		[],
		filemtime( SNOW_MONKEY_BLOCKS_DIR_PATH . '/dist/block/taxonomy-terms/nopro-editor.css' )
	);
}

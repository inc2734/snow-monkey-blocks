<?php
/**
 * @package snow-monkey-blocks
 * @author inc2734
 * @license GPL-2.0+
 */

use Snow_Monkey\Plugin\Blocks;
use Snow_Monkey\Plugin\Blocks\App\DynamicBlocks;

/**
 * editor_script
 */
$asset = include( SNOW_MONKEY_BLOCKS_DIR_PATH . '/dist/block/pickup-slider/editor.asset.php' );
wp_register_script(
	'snow-monkey-blocks/pickup-slider/editor',
	SNOW_MONKEY_BLOCKS_DIR_URL . '/dist/block/pickup-slider/editor.js',
	array_merge( $asset['dependencies'], [ 'snow-monkey-blocks-editor' ] ),
	filemtime( SNOW_MONKEY_BLOCKS_DIR_PATH . '/dist/block/pickup-slider/editor.js' ),
	true
);

register_block_type(
	__DIR__,
	[
		'editor_script'   => 'snow-monkey-blocks/pickup-slider/editor',
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

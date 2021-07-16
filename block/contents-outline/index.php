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
$asset = include( SNOW_MONKEY_BLOCKS_DIR_PATH . '/dist/block/contents-outline/editor.asset.php' );
wp_register_script(
	'snow-monkey-blocks/contents-outline/editor',
	SNOW_MONKEY_BLOCKS_DIR_URL . '/dist/block/contents-outline/editor.js',
	array_merge( $asset['dependencies'], [ 'snow-monkey-blocks-editor' ] ),
	filemtime( SNOW_MONKEY_BLOCKS_DIR_PATH . '/dist/block/contents-outline/editor.js' ),
	true
);

register_block_type(
	__DIR__,
	[
		'editor_script'   => 'snow-monkey-blocks/contents-outline/editor',
		'render_callback' => function( $attributes, $content ) {
			return DynamicBlocks::render( 'contents-outline', $attributes, $content );
		},
	]
);

/**
 * nopro
 */
if ( ! Blocks\is_pro() && ! is_admin() ) {
	wp_enqueue_style(
		'snow-monkey-blocks/contents-outline/nopro',
		SNOW_MONKEY_BLOCKS_DIR_URL . '/dist/block/contents-outline/nopro.css',
		[],
		filemtime( SNOW_MONKEY_BLOCKS_DIR_PATH . '/dist/block/contents-outline/nopro.css' )
	);
}

/**
 * nopro
 */
if ( ! Blocks\is_pro() && is_admin() ) {
	wp_enqueue_style(
		'snow-monkey-blocks/contents-outline/nopro/editor',
		SNOW_MONKEY_BLOCKS_DIR_URL . '/dist/block/contents-outline/nopro-editor.css',
		[],
		filemtime( SNOW_MONKEY_BLOCKS_DIR_PATH . '/dist/block/contents-outline/nopro-editor.css' )
	);
}

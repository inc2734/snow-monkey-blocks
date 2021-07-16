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
$asset = include( SNOW_MONKEY_BLOCKS_DIR_PATH . '/dist/block/like-me-box/editor.asset.php' );
wp_register_script(
	'snow-monkey-blocks/like-me-box/editor',
	SNOW_MONKEY_BLOCKS_DIR_URL . '/dist/block/like-me-box/editor.js',
	array_merge( $asset['dependencies'], [ 'snow-monkey-blocks-editor' ] ),
	filemtime( SNOW_MONKEY_BLOCKS_DIR_PATH . '/dist/block/like-me-box/editor.js' ),
	true
);

register_block_type(
	__DIR__,
	[
		'editor_script'   => 'snow-monkey-blocks/like-me-box/editor',
		'render_callback' => function( $attributes ) {
			return DynamicBlocks::render( 'like-me-box', $attributes );
		},
	]
);

/**
 * nopro
 */
if ( ! Blocks\is_pro() && ! is_admin() ) {
	wp_enqueue_style(
		'snow-monkey-blocks/like-me-box/nopro',
		SNOW_MONKEY_BLOCKS_DIR_URL . '/dist/block/like-me-box/nopro.css',
		[],
		filemtime( SNOW_MONKEY_BLOCKS_DIR_PATH . '/dist/block/like-me-box/nopro.css' )
	);
}

/**
 * nopro
 */
if ( ! Blocks\is_pro() && is_admin() ) {
	wp_enqueue_style(
		'snow-monkey-blocks/like-me-box/nopro/editor',
		SNOW_MONKEY_BLOCKS_DIR_URL . '/dist/block/like-me-box/nopro-editor.css',
		[],
		filemtime( SNOW_MONKEY_BLOCKS_DIR_PATH . '/dist/block/like-me-box/nopro-editor.css' )
	);
}

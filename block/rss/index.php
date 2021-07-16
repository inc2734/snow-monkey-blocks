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
$asset = include( SNOW_MONKEY_BLOCKS_DIR_PATH . '/dist/block/rss/editor.asset.php' );
wp_register_script(
	'snow-monkey-blocks/rss/editor',
	SNOW_MONKEY_BLOCKS_DIR_URL . '/dist/block/rss/editor.js',
	array_merge( $asset['dependencies'], [ 'snow-monkey-blocks-editor' ] ),
	filemtime( SNOW_MONKEY_BLOCKS_DIR_PATH . '/dist/block/rss/editor.js' ),
	true
);

register_block_type(
	__DIR__,
	[
		'editor_script'   => 'snow-monkey-blocks/rss/editor',
		'render_callback' => function( $attributes ) {
			return DynamicBlocks::render( 'rss', $attributes );
		},
	]
);

/**
 * nopro
 */
if ( ! Blocks\is_pro() && ! is_admin() ) {
	wp_enqueue_style(
		'snow-monkey-blocks/rss/nopro',
		SNOW_MONKEY_BLOCKS_DIR_URL . '/dist/block/rss/nopro.css',
		[],
		filemtime( SNOW_MONKEY_BLOCKS_DIR_PATH . '/dist/block/rss/nopro.css' )
	);
}

/**
 * nopro
 */
if ( ! Blocks\is_pro() && is_admin() ) {
	wp_enqueue_style(
		'snow-monkey-blocks/rss/nopro/editor',
		SNOW_MONKEY_BLOCKS_DIR_URL . '/dist/block/rss/nopro-editor.css',
		[],
		filemtime( SNOW_MONKEY_BLOCKS_DIR_PATH . '/dist/block/rss/nopro-editor.css' )
	);
}

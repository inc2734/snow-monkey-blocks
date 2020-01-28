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

/**
 * nopro
 */
wp_enqueue_script(
	'snow-monkey-blocks/like-me-box/nopro',
	! Blocks\is_pro() && ! is_admin() ? SNOW_MONKEY_BLOCKS_DIR_URL . '/dist/block/like-me-box/nopro.js' : null,
	[],
	filemtime( SNOW_MONKEY_BLOCKS_DIR_PATH . '/dist/block/like-me-box/nopro.js' ),
	true
);

/**
 * nopro
 */
wp_enqueue_style(
	'snow-monkey-blocks/like-me-box/nopro',
	! Blocks\is_pro() && ! is_admin() ? SNOW_MONKEY_BLOCKS_DIR_URL . '/dist/block/like-me-box/nopro.css' : null,
	[],
	filemtime( SNOW_MONKEY_BLOCKS_DIR_PATH . '/dist/block/like-me-box/nopro.css' )
);

/**
 * nopro
 */
wp_enqueue_style(
	'snow-monkey-blocks/like-me-box/nopro/editor',
	! Blocks\is_pro() && is_admin() ? SNOW_MONKEY_BLOCKS_DIR_URL . '/dist/block/like-me-box/nopro-editor.css' : null,
	[],
	filemtime( SNOW_MONKEY_BLOCKS_DIR_PATH . '/dist/block/like-me-box/nopro-editor.css' )
);

$attributes = include( SNOW_MONKEY_BLOCKS_DIR_PATH . '/block/like-me-box/attributes.php' );

register_block_type(
	'snow-monkey-blocks/like-me-box',
	[
		'editor_script'   => 'snow-monkey-blocks/like-me-box/editor',
		'attributes'      => $attributes,
		'render_callback' => function( $attributes ) {
			return DynamicBlocks::render( 'like-me-box', $attributes );
		},
	]
);

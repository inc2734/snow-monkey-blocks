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
$asset = include( SNOW_MONKEY_BLOCKS_DIR_PATH . '/dist/block/child-pages/editor.asset.php' );
wp_register_script(
	'snow-monkey-blocks/child-pages/editor',
	SNOW_MONKEY_BLOCKS_DIR_URL . '/dist/block/child-pages/editor.js',
	array_merge( $asset['dependencies'], [ 'snow-monkey-blocks-editor' ] ),
	filemtime( SNOW_MONKEY_BLOCKS_DIR_PATH . '/dist/block/child-pages/editor.js' ),
	true
);

/**
 * nopro
 */
wp_enqueue_script(
	'snow-monkey-blocks/child-pages/nopro',
	! Blocks\is_pro() && ! is_admin() ? SNOW_MONKEY_BLOCKS_DIR_URL . '/dist/block/child-pages/nopro.js' : null,
	[],
	filemtime( SNOW_MONKEY_BLOCKS_DIR_PATH . '/dist/block/child-pages/nopro.js' ),
	true
);

/**
 * nopro
 */
wp_enqueue_style(
	'snow-monkey-blocks/child-pages/nopro',
	! Blocks\is_pro() && ! is_admin() ? SNOW_MONKEY_BLOCKS_DIR_URL . '/dist/block/child-pages/nopro.css' : null,
	[],
	filemtime( SNOW_MONKEY_BLOCKS_DIR_PATH . '/dist/block/child-pages/nopro.css' )
);

/**
 * nopro
 */
wp_enqueue_style(
	'snow-monkey-blocks/child-pages/nopro/editor',
	! Blocks\is_pro() && is_admin() ? SNOW_MONKEY_BLOCKS_DIR_URL . '/dist/block/child-pages/nopro-editor.css' : null,
	[],
	filemtime( SNOW_MONKEY_BLOCKS_DIR_PATH . '/dist/block/child-pages/nopro-editor.css' )
);

$attributes = include( SNOW_MONKEY_BLOCKS_DIR_PATH . '/block/child-pages/attributes.php' );

register_block_type(
	'snow-monkey-blocks/child-pages',
	[
		'editor_script'   => 'snow-monkey-blocks/child-pages/editor',
		'attributes'      => $attributes,
		'render_callback' => function( $attributes, $content ) {
			return DynamicBlocks::render( 'child-pages', $attributes, $content );
		},
	]
);

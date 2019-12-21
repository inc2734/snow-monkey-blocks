<?php
/**
 * @package snow-monkey-blocks
 * @author inc2734
 * @license GPL-2.0+
 */

use Snow_Monkey\Plugin\Blocks;

/**
 * script
 */
wp_register_script(
	'snow-monkey-blocks/thumbnail-gallery',
	SNOW_MONKEY_BLOCKS_DIR_URL . '/dist/block/thumbnail-gallery/script.js',
	[],
	filemtime( SNOW_MONKEY_BLOCKS_DIR_PATH . '/dist/block/thumbnail-gallery/script.js' ),
	true
);

/**
 * style
 */
wp_register_style(
	'snow-monkey-blocks/thumbnail-gallery',
	SNOW_MONKEY_BLOCKS_DIR_URL . '/dist/block/thumbnail-gallery/style.css',
	[ 'snow-monkey-blocks' ],
	filemtime( SNOW_MONKEY_BLOCKS_DIR_PATH . '/dist/block/thumbnail-gallery/style.css' )
);

/**
 * editor_script
 */
$asset = include( SNOW_MONKEY_BLOCKS_DIR_PATH . '/dist/block/thumbnail-gallery/editor.asset.php' );
wp_register_script(
	'snow-monkey-blocks/thumbnail-gallery/editor',
	SNOW_MONKEY_BLOCKS_DIR_URL . '/dist/block/thumbnail-gallery/editor.js',
	array_merge( $asset['dependencies'], [ 'snow-monkey-blocks-editor' ] ),
	filemtime( SNOW_MONKEY_BLOCKS_DIR_PATH . '/dist/block/thumbnail-gallery/editor.js' ),
	true
);

/**
 * editor_style
 */
wp_register_style(
	'snow-monkey-blocks/thumbnail-gallery/editor',
	SNOW_MONKEY_BLOCKS_DIR_URL . '/dist/block/thumbnail-gallery/editor.css',
	[ 'snow-monkey-blocks-editor' ],
	filemtime( SNOW_MONKEY_BLOCKS_DIR_PATH . '/dist/block/thumbnail-gallery/editor.css' )
);

register_block_type(
	'snow-monkey-blocks/thumbnail-gallery',
	[
		'script'        => ! is_admin() ? 'snow-monkey-blocks/thumbnail-gallery' : null,
		'style'         => ! is_admin() ? 'snow-monkey-blocks/thumbnail-gallery' : null,
		'editor_script' => 'snow-monkey-blocks/thumbnail-gallery/editor',
		'editor_style'  => 'snow-monkey-blocks/thumbnail-gallery/editor',
	]
);

<?php
/**
 * @package snow-monkey-blocks
 * @author inc2734
 * @license GPL-2.0+
 */

/**
 * style
 */
wp_register_style(
	'snow-monkey-blocks/media-text',
	SNOW_MONKEY_BLOCKS_DIR_URL . '/dist/block/media-text/style.css',
	[ 'snow-monkey-blocks' ],
	filemtime( SNOW_MONKEY_BLOCKS_DIR_PATH . '/dist/block/media-text/style.css' )
);

/**
 * editor_script
 */
$asset = include( SNOW_MONKEY_BLOCKS_DIR_PATH . '/dist/block/media-text/editor.asset.php' );
wp_register_script(
	'snow-monkey-blocks/media-text/editor',
	SNOW_MONKEY_BLOCKS_DIR_URL . '/dist/block/media-text/editor.js',
	array_merge( $asset['dependencies'], [ 'snow-monkey-blocks-editor' ] ),
	filemtime( SNOW_MONKEY_BLOCKS_DIR_PATH . '/dist/block/media-text/editor.js' ),
	true
);

/**
 * editor_style
 */
wp_register_style(
	'snow-monkey-blocks/media-text/editor',
	SNOW_MONKEY_BLOCKS_DIR_URL . '/dist/block/media-text/editor.css',
	[ 'snow-monkey-blocks/media-text', 'snow-monkey-blocks-editor' ],
	filemtime( SNOW_MONKEY_BLOCKS_DIR_PATH . '/dist/block/media-text/editor.css' )
);

register_block_type(
	'snow-monkey-blocks/media-text',
	[
		'style'         => 'snow-monkey-blocks/media-text',
		'editor_script' => 'snow-monkey-blocks/media-text/editor',
		'editor_style'  => 'snow-monkey-blocks/media-text/editor',
	]
);

<?php
/**
 * @package snow-monkey-blocks
 * @author inc2734
 * @license GPL-2.0+
 */

$asset = include( SNOW_MONKEY_BLOCKS_DIR_PATH . '/dist/block/list/editor.asset.php' );

wp_register_script(
	'snow-monkey-blocks/list',
	SNOW_MONKEY_BLOCKS_DIR_URL . '/dist/block/list/app.js',
	[],
	filemtime( SNOW_MONKEY_BLOCKS_DIR_PATH . '/dist/block/list/app.js' ),
	true
);

wp_register_script(
	'snow-monkey-blocks/list/editor',
	SNOW_MONKEY_BLOCKS_DIR_URL . '/dist/block/list/editor.js',
	array_merge( $asset['dependencies'], [ 'snow-monkey-blocks-editor' ] ),
	filemtime( SNOW_MONKEY_BLOCKS_DIR_PATH . '/dist/block/list/editor.js' ),
	true
);

wp_register_style(
	'snow-monkey-blocks/list',
	SNOW_MONKEY_BLOCKS_DIR_URL . '/dist/block/list/front.css',
	[ 'snow-monkey-blocks' ],
	filemtime( SNOW_MONKEY_BLOCKS_DIR_PATH . '/dist/block/list/front.css' )
);

wp_register_style(
	'snow-monkey-blocks/list/editor',
	SNOW_MONKEY_BLOCKS_DIR_URL . '/dist/block/list/editor.css',
	[ 'snow-monkey-blocks/list', 'snow-monkey-blocks-editor' ],
	filemtime( SNOW_MONKEY_BLOCKS_DIR_PATH . '/dist/block/list/editor.css' )
);

register_block_type(
	'snow-monkey-blocks/list',
	[
		'style'         => 'snow-monkey-blocks/list',
		'script'        => ! is_admin() ? 'snow-monkey-blocks/list' : null,
		'editor_script' => 'snow-monkey-blocks/list/editor',
		'editor_style'  => 'snow-monkey-blocks/list/editor',
	]
);

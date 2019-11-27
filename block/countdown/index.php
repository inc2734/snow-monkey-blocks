<?php
/**
 * @package snow-monkey-blocks
 * @author inc2734
 * @license GPL-2.0+
 */

$asset = include( SNOW_MONKEY_BLOCKS_DIR_PATH . '/dist/block/countdown/editor.asset.php' );

wp_register_script(
	'snow-monkey-blocks/countdown',
	SNOW_MONKEY_BLOCKS_DIR_URL . '/dist/block/countdown/app.js',
	[ 'moment' ],
	filemtime( SNOW_MONKEY_BLOCKS_DIR_PATH . '/dist/block/countdown/app.js' ),
	true
);

wp_register_script(
	'snow-monkey-blocks/countdown/editor',
	SNOW_MONKEY_BLOCKS_DIR_URL . '/dist/block/countdown/editor.js',
	array_merge( $asset['dependencies'], [ 'snow-monkey-blocks-editor' ] ),
	filemtime( SNOW_MONKEY_BLOCKS_DIR_PATH . '/dist/block/countdown/editor.js' ),
	true
);

wp_register_style(
	'snow-monkey-blocks/countdown',
	SNOW_MONKEY_BLOCKS_DIR_URL . '/dist/block/countdown/front.css',
	[ 'snow-monkey-blocks' ],
	filemtime( SNOW_MONKEY_BLOCKS_DIR_PATH . '/dist/block/countdown/front.css' )
);

wp_register_style(
	'snow-monkey-blocks/countdown/editor',
	SNOW_MONKEY_BLOCKS_DIR_URL . '/dist/block/countdown/editor.css',
	[ 'snow-monkey-blocks/countdown', 'snow-monkey-blocks-editor' ],
	filemtime( SNOW_MONKEY_BLOCKS_DIR_PATH . '/dist/block/countdown/editor.css' )
);

register_block_type(
	'snow-monkey-blocks/countdown',
	[
		'script'        => ! is_admin() ? 'snow-monkey-blocks/countdown' : null,
		'style'         => 'snow-monkey-blocks/countdown',
		'editor_script' => 'snow-monkey-blocks/countdown/editor',
		'editor_style'  => 'snow-monkey-blocks/countdown/editor',
	]
);

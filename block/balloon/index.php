<?php
/**
 * @package snow-monkey-blocks
 * @author inc2734
 * @license GPL-2.0+
 */

$asset = include( SNOW_MONKEY_BLOCKS_DIR_PATH . '/dist/block/balloon/editor.asset.php' );

wp_register_script(
	'snow-monkey-blocks/balloon/editor',
	SNOW_MONKEY_BLOCKS_DIR_URL . '/dist/block/balloon/editor.js',
	array_merge( $asset['dependencies'], [ 'snow-monkey-blocks-editor' ] ),
	$asset['version'],
	true
);

wp_register_style(
	'snow-monkey-blocks/balloon',
	SNOW_MONKEY_BLOCKS_DIR_URL . '/dist/block/balloon/front.css',
	[ 'snow-monkey-blocks' ],
	$asset['version']
);

wp_register_style(
	'snow-monkey-blocks/balloon/editor',
	SNOW_MONKEY_BLOCKS_DIR_URL . '/dist/block/balloon/editor.css',
	[ 'snow-monkey-blocks/balloon' ],
	$asset['version']
);

register_block_type(
	'snow-monkey-blocks/balloon',
	[
		'style'         => 'snow-monkey-blocks/balloon',
		'editor_script' => 'snow-monkey-blocks/balloon/editor',
		'editor_style'  => 'snow-monkey-blocks/balloon/editor',
	]
);

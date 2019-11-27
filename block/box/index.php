<?php
/**
 * @package snow-monkey-blocks
 * @author inc2734
 * @license GPL-2.0+
 */

$asset = include( SNOW_MONKEY_BLOCKS_DIR_PATH . '/dist/block/box/editor.asset.php' );

wp_register_script(
	'snow-monkey-blocks/box/editor',
	SNOW_MONKEY_BLOCKS_DIR_URL . '/dist/block/box/editor.js',
	array_merge( $asset['dependencies'], [ 'snow-monkey-blocks-editor' ] ),
	$asset['version'],
	true
);

wp_register_style(
	'snow-monkey-blocks/box',
	SNOW_MONKEY_BLOCKS_DIR_URL . '/dist/block/box/front.css',
	[ 'snow-monkey-blocks' ],
	$asset['version']
);

wp_register_style(
	'snow-monkey-blocks/box/editor',
	SNOW_MONKEY_BLOCKS_DIR_URL . '/dist/block/box/editor.css',
	[ 'snow-monkey-blocks/box' ],
	$asset['version']
);

register_block_type(
	'snow-monkey-blocks/box',
	[
		'style'         => 'snow-monkey-blocks/box',
		'editor_script' => 'snow-monkey-blocks/box/editor',
		'editor_style'  => 'snow-monkey-blocks/box/editor',
	]
);

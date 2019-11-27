<?php
/**
 * @package snow-monkey-blocks
 * @author inc2734
 * @license GPL-2.0+
 */

$asset = include( SNOW_MONKEY_BLOCKS_DIR_PATH . '/dist/block/btn/editor.asset.php' );

wp_register_script(
	'snow-monkey-blocks/btn/editor',
	SNOW_MONKEY_BLOCKS_DIR_URL . '/dist/block/btn/editor.js',
	array_merge( $asset['dependencies'], [ 'snow-monkey-blocks-editor' ] ),
	$asset['version'],
	true
);

wp_register_style(
	'snow-monkey-blocks/btn',
	SNOW_MONKEY_BLOCKS_DIR_URL . '/dist/block/btn/front.css',
	[ 'snow-monkey-blocks' ],
	$asset['version']
);

wp_register_style(
	'snow-monkey-blocks/btn/editor',
	SNOW_MONKEY_BLOCKS_DIR_URL . '/dist/block/btn/editor.css',
	[ 'snow-monkey-blocks/btn' ],
	$asset['version']
);

register_block_type(
	'snow-monkey-blocks/btn',
	[
		'style'         => 'snow-monkey-blocks/btn',
		'editor_script' => 'snow-monkey-blocks/btn/editor',
		'editor_style'  => 'snow-monkey-blocks/btn/editor',
	]
);

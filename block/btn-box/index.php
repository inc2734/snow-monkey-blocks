<?php
/**
 * @package snow-monkey-blocks
 * @author inc2734
 * @license GPL-2.0+
 */

$asset = include( SNOW_MONKEY_BLOCKS_DIR_PATH . '/dist/block/btn-box/editor.asset.php' );

wp_register_script(
	'snow-monkey-blocks/btn-box/editor',
	SNOW_MONKEY_BLOCKS_DIR_URL . '/dist/block/btn-box/editor.js',
	array_merge( $asset['dependencies'], [ 'snow-monkey-blocks-editor' ] ),
	$asset['version'],
	true
);

wp_register_style(
	'snow-monkey-blocks/btn-box',
	SNOW_MONKEY_BLOCKS_DIR_URL . '/dist/block/btn-box/front.css',
	[ 'snow-monkey-blocks' ],
	$asset['version']
);

wp_register_style(
	'snow-monkey-blocks/btn-box/editor',
	SNOW_MONKEY_BLOCKS_DIR_URL . '/dist/block/btn-box/editor.css',
	[ 'snow-monkey-blocks/btn-box' ],
	$asset['version']
);

register_block_type(
	'snow-monkey-blocks/btn-box',
	[
		'style'         => 'snow-monkey-blocks/btn-box',
		'editor_script' => 'snow-monkey-blocks/btn-box/editor',
		'editor_style'  => 'snow-monkey-blocks/btn-box/editor',
	]
);

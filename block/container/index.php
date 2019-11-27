<?php
/**
 * @package snow-monkey-blocks
 * @author inc2734
 * @license GPL-2.0+
 */

use Snow_Monkey\Plugin\Blocks;

$asset = include( SNOW_MONKEY_BLOCKS_DIR_PATH . '/dist/block/container/editor.asset.php' );

wp_register_script(
	'snow-monkey-blocks/container/editor',
	SNOW_MONKEY_BLOCKS_DIR_URL . '/dist/block/container/editor.js',
	array_merge( $asset['dependencies'], [ 'snow-monkey-blocks-editor' ] ),
	filemtime( SNOW_MONKEY_BLOCKS_DIR_PATH . '/dist/block/container/editor.js' ),
	true
);

wp_register_style(
	'snow-monkey-blocks/container/editor',
	SNOW_MONKEY_BLOCKS_DIR_URL . '/dist/block/container/editor.css',
	[ 'snow-monkey-blocks-editor' ],
	filemtime( SNOW_MONKEY_BLOCKS_DIR_PATH . '/dist/block/container/editor.css' )
);

register_block_type(
	'snow-monkey-blocks/container',
	[
		'editor_script' => 'snow-monkey-blocks/container/editor',
		'editor_style'  => 'snow-monkey-blocks/container/editor',
	]
);

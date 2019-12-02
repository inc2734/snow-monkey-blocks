<?php
/**
 * @package snow-monkey-blocks
 * @author inc2734
 * @license GPL-2.0+
 */

use Snow_Monkey\Plugin\Blocks;

$asset = include( SNOW_MONKEY_BLOCKS_DIR_PATH . '/dist/block/slider/editor.asset.php' );

wp_register_style(
	'snow-monkey-blocks/slider',
	SNOW_MONKEY_BLOCKS_DIR_URL . '/dist/block/slider/front.css',
	[ 'snow-monkey-blocks' ],
	filemtime( SNOW_MONKEY_BLOCKS_DIR_PATH . '/dist/block/slider/front.css' )
);

wp_register_style(
	'snow-monkey-blocks/slider/editor',
	SNOW_MONKEY_BLOCKS_DIR_URL . '/dist/block/slider/editor.css',
	[ 'snow-monkey-blocks/slider', 'snow-monkey-blocks-editor' ],
	filemtime( SNOW_MONKEY_BLOCKS_DIR_PATH . '/dist/block/slider/editor.css' )
);

wp_register_script(
	'snow-monkey-blocks/slider',
	SNOW_MONKEY_BLOCKS_DIR_URL . '/dist/block/slider/app.js',
	[ 'slick-carousel' ],
	filemtime( SNOW_MONKEY_BLOCKS_DIR_PATH . '/dist/block/slider/app.js' ),
	true
);

wp_register_script(
	'snow-monkey-blocks/slider/editor',
	SNOW_MONKEY_BLOCKS_DIR_URL . '/dist/block/slider/editor.js',
	array_merge( $asset['dependencies'], [ 'snow-monkey-blocks-editor' ] ),
	filemtime( SNOW_MONKEY_BLOCKS_DIR_PATH . '/dist/block/slider/editor.js' ),
	true
);

register_block_type(
	'snow-monkey-blocks/slider',
	[
		'style'         => 'snow-monkey-blocks/slider',
		'script'        => ! is_admin() ?  'snow-monkey-blocks/slider' : null,
		'editor_script' => 'snow-monkey-blocks/slider/editor',
		'editor_style'  => 'snow-monkey-blocks/slider/editor',
	]
);

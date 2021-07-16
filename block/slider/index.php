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
	'snow-monkey-blocks/slider',
	SNOW_MONKEY_BLOCKS_DIR_URL . '/dist/block/slider/style.css',
	[ 'snow-monkey-blocks', 'slick-carousel-theme' ],
	filemtime( SNOW_MONKEY_BLOCKS_DIR_PATH . '/dist/block/slider/style.css' )
);

/**
 * editor_script
 */
$asset = include( SNOW_MONKEY_BLOCKS_DIR_PATH . '/dist/block/slider/editor.asset.php' );
wp_register_script(
	'snow-monkey-blocks/slider/editor',
	SNOW_MONKEY_BLOCKS_DIR_URL . '/dist/block/slider/editor.js',
	array_merge( $asset['dependencies'], [ 'snow-monkey-blocks-editor' ] ),
	filemtime( SNOW_MONKEY_BLOCKS_DIR_PATH . '/dist/block/slider/editor.js' ),
	true
);

/**
 * editor_style
 */
wp_register_style(
	'snow-monkey-blocks/slider/editor',
	SNOW_MONKEY_BLOCKS_DIR_URL . '/dist/block/slider/editor.css',
	[ 'snow-monkey-blocks-editor' ],
	filemtime( SNOW_MONKEY_BLOCKS_DIR_PATH . '/dist/block/slider/editor.css' )
);

register_block_type(
	__DIR__,
	[
		'style'         => ! is_admin() ? 'snow-monkey-blocks/slider' : null,
		'editor_script' => 'snow-monkey-blocks/slider/editor',
		'editor_style'  => 'snow-monkey-blocks/slider/editor',
	]
);

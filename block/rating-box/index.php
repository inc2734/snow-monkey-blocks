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
	'snow-monkey-blocks/rating-box',
	SNOW_MONKEY_BLOCKS_DIR_URL . '/dist/block/rating-box/style.css',
	[ 'snow-monkey-blocks' ],
	filemtime( SNOW_MONKEY_BLOCKS_DIR_PATH . '/dist/block/rating-box/style.css' )
);

/**
 * editor_script
 */
$asset = include( SNOW_MONKEY_BLOCKS_DIR_PATH . '/dist/block/rating-box/editor.asset.php' );
wp_register_script(
	'snow-monkey-blocks/rating-box/editor',
	SNOW_MONKEY_BLOCKS_DIR_URL . '/dist/block/rating-box/editor.js',
	array_merge( $asset['dependencies'], [ 'snow-monkey-blocks-editor' ] ),
	filemtime( SNOW_MONKEY_BLOCKS_DIR_PATH . '/dist/block/rating-box/editor.js' ),
	true
);

/**
 * editor_style
 */
wp_register_style(
	'snow-monkey-blocks/rating-box/editor',
	SNOW_MONKEY_BLOCKS_DIR_URL . '/dist/block/rating-box/editor.css',
	[ 'snow-monkey-blocks-editor', 'snow-monkey-blocks/rating-box' ],
	filemtime( SNOW_MONKEY_BLOCKS_DIR_PATH . '/dist/block/rating-box/editor.css' )
);

register_block_type_from_metadata(
	__DIR__,
	[
		'style'         => 'snow-monkey-blocks/rating-box',
		'editor_script' => 'snow-monkey-blocks/rating-box/editor',
		'editor_style'  => 'snow-monkey-blocks/rating-box/editor',
	]
);

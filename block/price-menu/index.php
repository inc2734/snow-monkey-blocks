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
	'snow-monkey-blocks/price-menu',
	SNOW_MONKEY_BLOCKS_DIR_URL . '/dist/block/price-menu/style.css',
	[ 'snow-monkey-blocks' ],
	filemtime( SNOW_MONKEY_BLOCKS_DIR_PATH . '/dist/block/price-menu/style.css' )
);

/**
 * editor_script
 */
$asset = include( SNOW_MONKEY_BLOCKS_DIR_PATH . '/dist/block/price-menu/editor.asset.php' );
wp_register_script(
	'snow-monkey-blocks/price-menu/editor',
	SNOW_MONKEY_BLOCKS_DIR_URL . '/dist/block/price-menu/editor.js',
	array_merge( $asset['dependencies'], [ 'snow-monkey-blocks-editor' ] ),
	filemtime( SNOW_MONKEY_BLOCKS_DIR_PATH . '/dist/block/price-menu/editor.js' ),
	true
);

/**
 * editor_style
 */
wp_register_style(
	'snow-monkey-blocks/price-menu/editor',
	SNOW_MONKEY_BLOCKS_DIR_URL . '/dist/block/price-menu/editor.css',
	[ 'snow-monkey-blocks-editor', 'snow-monkey-blocks/price-menu' ],
	filemtime( SNOW_MONKEY_BLOCKS_DIR_PATH . '/dist/block/price-menu/editor.css' )
);

register_block_type_from_metadata(
	__DIR__,
	[
		'style'         => 'snow-monkey-blocks/price-menu',
		'editor_script' => 'snow-monkey-blocks/price-menu/editor',
		'editor_style'  => 'snow-monkey-blocks/price-menu/editor',
	]
);

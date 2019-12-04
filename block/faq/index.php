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
	'snow-monkey-blocks/faq',
	SNOW_MONKEY_BLOCKS_DIR_URL . '/dist/block/faq/style.css',
	[ 'snow-monkey-blocks' ],
	filemtime( SNOW_MONKEY_BLOCKS_DIR_PATH . '/dist/block/faq/style.css' )
);

/**
 * editor_script
 */
$asset = include( SNOW_MONKEY_BLOCKS_DIR_PATH . '/dist/block/faq/editor.asset.php' );
wp_register_script(
	'snow-monkey-blocks/faq/editor',
	SNOW_MONKEY_BLOCKS_DIR_URL . '/dist/block/faq/editor.js',
	array_merge( $asset['dependencies'], [ 'snow-monkey-blocks-editor' ] ),
	filemtime( SNOW_MONKEY_BLOCKS_DIR_PATH . '/dist/block/faq/editor.js' ),
	true
);

/**
 * editor_style
 */
wp_register_style(
	'snow-monkey-blocks/faq/editor',
	SNOW_MONKEY_BLOCKS_DIR_URL . '/dist/block/faq/editor.css',
	[ 'snow-monkey-blocks/faq', 'snow-monkey-blocks-editor' ],
	filemtime( SNOW_MONKEY_BLOCKS_DIR_PATH . '/dist/block/faq/editor.css' )
);

register_block_type(
	'snow-monkey-blocks/faq',
	[
		'style'         => 'snow-monkey-blocks/faq',
		'editor_script' => 'snow-monkey-blocks/faq/editor',
		'editor_style'  => 'snow-monkey-blocks/faq/editor',
	]
);

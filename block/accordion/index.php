<?php
/**
 * @package snow-monkey-blocks
 * @author inc2734
 * @license GPL-2.0+
 */

/**
 * style
 */
if ( ! is_admin() ) {
	wp_register_style(
		'snow-monkey-blocks/accordion',
		SNOW_MONKEY_BLOCKS_DIR_URL . '/dist/block/accordion/style.css',
		[ 'snow-monkey-blocks' ],
		filemtime( SNOW_MONKEY_BLOCKS_DIR_PATH . '/dist/block/accordion/style.css' )
	);
} else {
	wp_register_style(
		'snow-monkey-blocks/accordion',
		SNOW_MONKEY_BLOCKS_DIR_URL . '/dist/block/accordion/editor.css',
		[ 'snow-monkey-blocks-editor' ],
		filemtime( SNOW_MONKEY_BLOCKS_DIR_PATH . '/dist/block/accordion/editor.css' )
	);
}

/**
 * editor_script
 */
$asset = include( SNOW_MONKEY_BLOCKS_DIR_PATH . '/dist/block/accordion/editor.asset.php' );
wp_register_script(
	'snow-monkey-blocks/accordion/editor',
	SNOW_MONKEY_BLOCKS_DIR_URL . '/dist/block/accordion/editor.js',
	array_merge( $asset['dependencies'], [ 'snow-monkey-blocks-editor' ] ),
	filemtime( SNOW_MONKEY_BLOCKS_DIR_PATH . '/dist/block/accordion/editor.js' ),
	true
);

register_block_type(
	__DIR__,
	[
		'style'         => 'snow-monkey-blocks/accordion',
		'editor_script' => 'snow-monkey-blocks/accordion/editor',
	]
);

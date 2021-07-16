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
		'snow-monkey-blocks/countdown',
		SNOW_MONKEY_BLOCKS_DIR_URL . '/dist/block/countdown/style.css',
		[ 'snow-monkey-blocks' ],
		filemtime( SNOW_MONKEY_BLOCKS_DIR_PATH . '/dist/block/countdown/style.css' )
	);
} else {
	wp_register_style(
		'snow-monkey-blocks/countdown',
		SNOW_MONKEY_BLOCKS_DIR_URL . '/dist/block/countdown/editor.css',
		[ 'snow-monkey-blocks-editor' ],
		filemtime( SNOW_MONKEY_BLOCKS_DIR_PATH . '/dist/block/countdown/editor.css' )
	);
}

/**
 * script
 */
wp_register_script(
	'snow-monkey-blocks/countdown',
	SNOW_MONKEY_BLOCKS_DIR_URL . '/dist/block/countdown/script.js',
	[],
	filemtime( SNOW_MONKEY_BLOCKS_DIR_PATH . '/dist/block/countdown/script.js' ),
	true
);

/**
 * editor_script
 */
$asset = include( SNOW_MONKEY_BLOCKS_DIR_PATH . '/dist/block/countdown/editor.asset.php' );
wp_register_script(
	'snow-monkey-blocks/countdown/editor',
	SNOW_MONKEY_BLOCKS_DIR_URL . '/dist/block/countdown/editor.js',
	array_merge( $asset['dependencies'], [ 'snow-monkey-blocks-editor' ] ),
	filemtime( SNOW_MONKEY_BLOCKS_DIR_PATH . '/dist/block/countdown/editor.js' ),
	true
);

register_block_type(
	__DIR__,
	[
		'script'        => ! is_admin() ? 'snow-monkey-blocks/countdown' : null,
		'style'         => 'snow-monkey-blocks/countdown',
		'editor_script' => 'snow-monkey-blocks/countdown/editor',
	]
);

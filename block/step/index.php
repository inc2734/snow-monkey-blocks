<?php
/**
 * @package snow-monkey-blocks
 * @author inc2734
 * @license GPL-2.0+
 */

use Snow_Monkey\Plugin\Blocks;

/**
 * style
 */
if ( ! is_admin() ) {
	wp_register_style(
		'snow-monkey-blocks/step',
		SNOW_MONKEY_BLOCKS_DIR_URL . '/dist/block/step/style.css',
		[ 'snow-monkey-blocks' ],
		filemtime( SNOW_MONKEY_BLOCKS_DIR_PATH . '/dist/block/step/style.css' )
	);
} else {
	wp_register_style(
		'snow-monkey-blocks/step',
		SNOW_MONKEY_BLOCKS_DIR_URL . '/dist/block/step/editor.css',
		[ 'snow-monkey-blocks-editor' ],
		filemtime( SNOW_MONKEY_BLOCKS_DIR_PATH . '/dist/block/step/editor.css' )
	);
}

/**
 * editor_script
 */
$asset = include( SNOW_MONKEY_BLOCKS_DIR_PATH . '/dist/block/step/editor.asset.php' );
wp_register_script(
	'snow-monkey-blocks/step/editor',
	SNOW_MONKEY_BLOCKS_DIR_URL . '/dist/block/step/editor.js',
	array_merge( $asset['dependencies'], [ 'snow-monkey-blocks-editor' ] ),
	filemtime( SNOW_MONKEY_BLOCKS_DIR_PATH . '/dist/block/step/editor.js' ),
	true
);

register_block_type(
	__DIR__,
	[
		'style'         => 'snow-monkey-blocks/step',
		'editor_script' => 'snow-monkey-blocks/step/editor',
	]
);

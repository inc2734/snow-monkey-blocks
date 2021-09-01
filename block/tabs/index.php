<?php
/**
 * @package snow-monkey-blocks
 * @author inc2734
 * @license GPL-2.0+
 */

use Snow_Monkey\Plugin\Blocks;

/**
 * script
 */
wp_register_script(
	'snow-monkey-blocks/tabs',
	SNOW_MONKEY_BLOCKS_DIR_URL . '/dist/block/tabs/script.js',
	[],
	filemtime( SNOW_MONKEY_BLOCKS_DIR_PATH . '/dist/block/tabs/script.js' ),
	true
);

/**
 * style
 */
if ( ! is_admin() ) {
	wp_register_style(
		'snow-monkey-blocks/tabs',
		SNOW_MONKEY_BLOCKS_DIR_URL . '/dist/block/tabs/style.css',
		[ 'snow-monkey-blocks' ],
		filemtime( SNOW_MONKEY_BLOCKS_DIR_PATH . '/dist/block/tabs/style.css' )
	);
} else {
	wp_register_style(
		'snow-monkey-blocks/tabs',
		SNOW_MONKEY_BLOCKS_DIR_URL . '/dist/block/tabs/editor.css',
		[ 'snow-monkey-blocks-editor' ],
		filemtime( SNOW_MONKEY_BLOCKS_DIR_PATH . '/dist/block/tabs/editor.css' )
	);
}

/**
 * editor_script
 */
$asset = include( SNOW_MONKEY_BLOCKS_DIR_PATH . '/dist/block/tabs/editor.asset.php' );
wp_register_script(
	'snow-monkey-blocks/tabs/editor',
	SNOW_MONKEY_BLOCKS_DIR_URL . '/dist/block/tabs/editor.js',
	array_merge( $asset['dependencies'], [ 'snow-monkey-blocks-editor' ] ),
	filemtime( SNOW_MONKEY_BLOCKS_DIR_PATH . '/dist/block/tabs/editor.js' ),
	true
);

register_block_type(
	__DIR__,
	[
		'script'        => ! is_admin() ? 'snow-monkey-blocks/tabs' : null,
		'style'         => 'snow-monkey-blocks/tabs',
		'editor_script' => 'snow-monkey-blocks/tabs/editor',
	]
);

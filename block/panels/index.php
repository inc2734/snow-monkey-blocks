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
	'snow-monkey-blocks/panels',
	SNOW_MONKEY_BLOCKS_DIR_URL . '/dist/block/panels/style.css',
	[ 'snow-monkey-blocks' ],
	filemtime( SNOW_MONKEY_BLOCKS_DIR_PATH . '/dist/block/panels/style.css' )
);

/**
 * editor_script
 */
$asset = include( SNOW_MONKEY_BLOCKS_DIR_PATH . '/dist/block/panels/editor.asset.php' );
wp_register_script(
	'snow-monkey-blocks/panels/editor',
	SNOW_MONKEY_BLOCKS_DIR_URL . '/dist/block/panels/editor.js',
	array_merge( $asset['dependencies'], [ 'snow-monkey-blocks-editor' ] ),
	filemtime( SNOW_MONKEY_BLOCKS_DIR_PATH . '/dist/block/panels/editor.js' ),
	true
);

/**
 * editor_style
 */
wp_register_style(
	'snow-monkey-blocks/panels/editor',
	SNOW_MONKEY_BLOCKS_DIR_URL . '/dist/block/panels/editor.css',
	[ 'snow-monkey-blocks-editor' ],
	filemtime( SNOW_MONKEY_BLOCKS_DIR_PATH . '/dist/block/panels/editor.css' )
);

register_block_type(
	'snow-monkey-blocks/panels',
	[
		'style'         => ! is_admin() ? 'snow-monkey-blocks/panels' : null,
		'editor_script' => 'snow-monkey-blocks/panels/editor',
		'editor_style'  => 'snow-monkey-blocks/panels/editor',
	]
);

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
wp_register_style(
	'snow-monkey-blocks/step',
	SNOW_MONKEY_BLOCKS_DIR_URL . '/dist/block/step/style.css',
	[ 'snow-monkey-blocks' ],
	filemtime( SNOW_MONKEY_BLOCKS_DIR_PATH . '/dist/block/step/style.css' )
);

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

/**
 * editor_style
 */
wp_register_style(
	'snow-monkey-blocks/step/editor',
	SNOW_MONKEY_BLOCKS_DIR_URL . '/dist/block/step/editor.css',
	[ 'snow-monkey-blocks-editor', 'snow-monkey-blocks/step' ],
	filemtime( SNOW_MONKEY_BLOCKS_DIR_PATH . '/dist/block/step/editor.css' )
);

register_block_type_from_metadata(
	__DIR__,
	[
		'style'         => 'snow-monkey-blocks/step',
		'editor_script' => 'snow-monkey-blocks/step/editor',
		'editor_style'  => 'snow-monkey-blocks/step/editor',
	]
);

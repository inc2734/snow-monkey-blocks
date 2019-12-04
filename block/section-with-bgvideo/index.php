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
	'snow-monkey-blocks/section-with-bgvideo',
	SNOW_MONKEY_BLOCKS_DIR_URL . '/dist/block/section-with-bgvideo/script.js',
	[],
	filemtime( SNOW_MONKEY_BLOCKS_DIR_PATH . '/dist/block/section-with-bgvideo/script.js' ),
	true
);

/**
 * style
 */
wp_register_style(
	'snow-monkey-blocks/section-with-bgvideo',
	SNOW_MONKEY_BLOCKS_DIR_URL . '/dist/block/section-with-bgvideo/style.css',
	[ 'snow-monkey-blocks' ],
	filemtime( SNOW_MONKEY_BLOCKS_DIR_PATH . '/dist/block/section-with-bgvideo/style.css' )
);

/**
 * editor_script
 */
$asset = include( SNOW_MONKEY_BLOCKS_DIR_PATH . '/dist/block/section-with-bgvideo/editor.asset.php' );
wp_register_script(
	'snow-monkey-blocks/section-with-bgvideo/editor',
	SNOW_MONKEY_BLOCKS_DIR_URL . '/dist/block/section-with-bgvideo/editor.js',
	array_merge( $asset['dependencies'], [ 'snow-monkey-blocks-editor' ] ),
	filemtime( SNOW_MONKEY_BLOCKS_DIR_PATH . '/dist/block/section-with-bgvideo/editor.js' ),
	true
);

/**
 * editor_style
 */
wp_register_style(
	'snow-monkey-blocks/section-with-bgvideo/editor',
	SNOW_MONKEY_BLOCKS_DIR_URL . '/dist/block/section-with-bgvideo/editor.css',
	[ 'snow-monkey-blocks/section-with-bgvideo', 'snow-monkey-blocks-editor' ],
	filemtime( SNOW_MONKEY_BLOCKS_DIR_PATH . '/dist/block/section-with-bgvideo/editor.css' )
);

/**
 * nopro
 */
wp_enqueue_style(
	'snow-monkey-blocks/section-with-bgvideo/nopro/editor',
	! Blocks\is_pro() && is_admin() ? SNOW_MONKEY_BLOCKS_DIR_URL . '/dist/block/section-with-bgvideo/nopro-editor.css' : null,
	[],
	filemtime( SNOW_MONKEY_BLOCKS_DIR_PATH . '/dist/block/section-with-bgvideo/nopro-editor.css' )
);

register_block_type(
	'snow-monkey-blocks/section-with-bgvideo',
	[
		'style'         => 'snow-monkey-blocks/section-with-bgvideo',
		'script'        => ! is_admin() ? 'snow-monkey-blocks/section-with-bgvideo' : null,
		'editor_script' => 'snow-monkey-blocks/section-with-bgvideo/editor',
		'editor_style'  => 'snow-monkey-blocks/section-with-bgvideo/editor',
	]
);

<?php
/**
 * @package snow-monkey-blocks
 * @author inc2734
 * @license GPL-2.0+
 */

use Snow_Monkey\Plugin\Blocks;

$asset = include( SNOW_MONKEY_BLOCKS_DIR_PATH . '/dist/block/section-with-bgvideo/editor.asset.php' );

wp_register_style(
	'snow-monkey-blocks/section-with-bgvideo',
	SNOW_MONKEY_BLOCKS_DIR_URL . '/dist/block/section-with-bgvideo/front.css',
	[ 'snow-monkey-blocks' ],
	filemtime( SNOW_MONKEY_BLOCKS_DIR_PATH . '/dist/block/section-with-bgvideo/front.css' )
);

wp_register_style(
	'snow-monkey-blocks/section-with-bgvideo/editor',
	SNOW_MONKEY_BLOCKS_DIR_URL . '/dist/block/section-with-bgvideo/editor.css',
	[ 'snow-monkey-blocks/section-with-bgvideo', 'snow-monkey-blocks-editor' ],
	filemtime( SNOW_MONKEY_BLOCKS_DIR_PATH . '/dist/block/section-with-bgvideo/editor.css' )
);

wp_register_style(
	'snow-monkey-blocks/section-with-bgvideo/nopro',
	SNOW_MONKEY_BLOCKS_DIR_URL . '/dist/block/section-with-bgvideo/nopro.css',
	[],
	filemtime( SNOW_MONKEY_BLOCKS_DIR_PATH . '/dist/block/section-with-bgvideo/nopro.css' )
);

wp_register_script(
	'snow-monkey-blocks/section-with-bgvideo',
	SNOW_MONKEY_BLOCKS_DIR_URL . '/dist/block/section-with-bgvideo/app.js',
	[],
	filemtime( SNOW_MONKEY_BLOCKS_DIR_PATH . '/dist/block/section-with-bgvideo/app.js' ),
	true
);

wp_register_script(
	'snow-monkey-blocks/section-with-bgvideo/editor',
	SNOW_MONKEY_BLOCKS_DIR_URL . '/dist/block/section-with-bgvideo/editor.js',
	array_merge( $asset['dependencies'], [ 'snow-monkey-blocks-editor' ] ),
	filemtime( SNOW_MONKEY_BLOCKS_DIR_PATH . '/dist/block/section-with-bgvideo/editor.js' ),
	true
);

register_block_type(
	'snow-monkey-blocks/section-with-bgvideo',
	[
		'style'         => ! Blocks\is_pro() ? 'snow-monkey-blocks/section-with-bgvideo/nopro' : 'snow-monkey-blocks/section-with-bgvideo',
		'script'        => ! is_admin() ?  'snow-monkey-blocks/section-with-bgvideo' : null,
		'editor_script' => 'snow-monkey-blocks/section-with-bgvideo/editor',
		'editor_style'  => 'snow-monkey-blocks/section-with-bgvideo/editor',
	]
);

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
	'snow-monkey-blocks/section-side-heading',
	SNOW_MONKEY_BLOCKS_DIR_URL . '/dist/block/section-side-heading/style.css',
	[ 'snow-monkey-blocks' ],
	filemtime( SNOW_MONKEY_BLOCKS_DIR_PATH . '/dist/block/section-side-heading/style.css' )
);

/**
 * editor_script
 */
$asset = include( SNOW_MONKEY_BLOCKS_DIR_PATH . '/dist/block/section-side-heading/editor.asset.php' );
wp_register_script(
	'snow-monkey-blocks/section-side-heading/editor',
	SNOW_MONKEY_BLOCKS_DIR_URL . '/dist/block/section-side-heading/editor.js',
	array_merge( $asset['dependencies'], [ 'snow-monkey-blocks-editor' ] ),
	filemtime( SNOW_MONKEY_BLOCKS_DIR_PATH . '/dist/block/section-side-heading/editor.js' ),
	true
);

/**
 * editor_style
 */
wp_register_style(
	'snow-monkey-blocks/section-side-heading/editor',
	SNOW_MONKEY_BLOCKS_DIR_URL . '/dist/block/section-side-heading/editor.css',
	[ 'snow-monkey-blocks/section-side-heading', 'snow-monkey-blocks-editor' ],
	filemtime( SNOW_MONKEY_BLOCKS_DIR_PATH . '/dist/block/section-side-heading/editor.css' )
);

/**
 * nopro
 */
wp_enqueue_style(
	'snow-monkey-blocks/section-side-heading/nopro/editor',
	! Blocks\is_pro() && is_admin() ? SNOW_MONKEY_BLOCKS_DIR_URL . '/dist/block/section-side-heading/nopro-editor.css' : null,
	[],
	filemtime( SNOW_MONKEY_BLOCKS_DIR_PATH . '/dist/block/section-side-heading/nopro-editor.css' )
);

register_block_type(
	'snow-monkey-blocks/section-side-heading',
	[
		'style'         => 'snow-monkey-blocks/section-side-heading',
		'editor_script' => 'snow-monkey-blocks/section-side-heading/editor',
		'editor_style'  => 'snow-monkey-blocks/section-side-heading/editor',
	]
);

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
	'snow-monkey-blocks/section-with-bgimage',
	SNOW_MONKEY_BLOCKS_DIR_URL . '/dist/block/section-with-bgimage/style.css',
	[ 'snow-monkey-blocks' ],
	filemtime( SNOW_MONKEY_BLOCKS_DIR_PATH . '/dist/block/section-with-bgimage/style.css' )
);

/**
 * editor_script
 */
$asset = include( SNOW_MONKEY_BLOCKS_DIR_PATH . '/dist/block/section-with-bgimage/editor.asset.php' );
wp_register_script(
	'snow-monkey-blocks/section-with-bgimage/editor',
	SNOW_MONKEY_BLOCKS_DIR_URL . '/dist/block/section-with-bgimage/editor.js',
	array_merge( $asset['dependencies'], [ 'snow-monkey-blocks-editor' ] ),
	filemtime( SNOW_MONKEY_BLOCKS_DIR_PATH . '/dist/block/section-with-bgimage/editor.js' ),
	true
);

/**
 * editor_style
 */
wp_register_style(
	'snow-monkey-blocks/section-with-bgimage/editor',
	SNOW_MONKEY_BLOCKS_DIR_URL . '/dist/block/section-with-bgimage/editor.css',
	[ 'snow-monkey-blocks/section-with-bgimage', 'snow-monkey-blocks-editor' ],
	filemtime( SNOW_MONKEY_BLOCKS_DIR_PATH . '/dist/block/section-with-bgimage/editor.css' )
);

/**
 * nopro
 */
wp_register_style(
	'snow-monkey-blocks/section-with-bgimage/nopro',
	SNOW_MONKEY_BLOCKS_DIR_URL . '/dist/block/section-with-bgimage/nopro.css',
	[],
	filemtime( SNOW_MONKEY_BLOCKS_DIR_PATH . '/dist/block/section-with-bgimage/nopro.css' )
);

register_block_type(
	'snow-monkey-blocks/section-with-bgimage',
	[
		'style'         => ! Blocks\is_pro() ? 'snow-monkey-blocks/section-with-bgimage/nopro' : 'snow-monkey-blocks/section-with-bgimage',
		'editor_script' => 'snow-monkey-blocks/section-with-bgimage/editor',
		'editor_style'  => 'snow-monkey-blocks/section-with-bgimage/editor',
	]
);

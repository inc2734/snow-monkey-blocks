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
	'snow-monkey-blocks/testimonial',
	SNOW_MONKEY_BLOCKS_DIR_URL . '/dist/block/testimonial/style.css',
	[ 'snow-monkey-blocks' ],
	filemtime( SNOW_MONKEY_BLOCKS_DIR_PATH . '/dist/block/testimonial/style.css' )
);

/**
 * editor_script
 */
$asset = include( SNOW_MONKEY_BLOCKS_DIR_PATH . '/dist/block/testimonial/editor.asset.php' );
wp_register_script(
	'snow-monkey-blocks/testimonial/editor',
	SNOW_MONKEY_BLOCKS_DIR_URL . '/dist/block/testimonial/editor.js',
	array_merge( $asset['dependencies'], [ 'snow-monkey-blocks-editor' ] ),
	filemtime( SNOW_MONKEY_BLOCKS_DIR_PATH . '/dist/block/testimonial/editor.js' ),
	true
);

/**
 * editor_style
 */
wp_register_style(
	'snow-monkey-blocks/testimonial/editor',
	SNOW_MONKEY_BLOCKS_DIR_URL . '/dist/block/testimonial/editor.css',
	[ 'snow-monkey-blocks-editor' ],
	filemtime( SNOW_MONKEY_BLOCKS_DIR_PATH . '/dist/block/testimonial/editor.css' )
);

register_block_type(
	'snow-monkey-blocks/testimonial',
	[
		'style'         => ! is_admin() ? 'snow-monkey-blocks/testimonial' : null,
		'editor_script' => 'snow-monkey-blocks/testimonial/editor',
		'editor_style'  => 'snow-monkey-blocks/testimonial/editor',
	]
);

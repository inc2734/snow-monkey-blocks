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
		'snow-monkey-blocks/spider-contents-slider',
		SNOW_MONKEY_BLOCKS_DIR_URL . '/dist/block/spider-contents-slider/style.css',
		[ 'snow-monkey-blocks', 'spider' ],
		filemtime( SNOW_MONKEY_BLOCKS_DIR_PATH . '/dist/block/spider-contents-slider/style.css' )
	);
} else {
	wp_register_style(
		'snow-monkey-blocks/spider-contents-slider',
		SNOW_MONKEY_BLOCKS_DIR_URL . '/dist/block/spider-contents-slider/editor.css',
		[ 'snow-monkey-blocks-editor', 'spider' ],
		filemtime( SNOW_MONKEY_BLOCKS_DIR_PATH . '/dist/block/spider-contents-slider/editor.css' )
	);
}

/**
 * editor_script
 */
$asset = include( SNOW_MONKEY_BLOCKS_DIR_PATH . '/dist/block/spider-contents-slider/editor.asset.php' );
wp_register_script(
	'snow-monkey-blocks/spider-contents-slider/editor',
	SNOW_MONKEY_BLOCKS_DIR_URL . '/dist/block/spider-contents-slider/editor.js',
	array_merge( $asset['dependencies'], [ 'snow-monkey-blocks-editor' ] ),
	filemtime( SNOW_MONKEY_BLOCKS_DIR_PATH . '/dist/block/spider-contents-slider/editor.js' ),
	true
);

register_block_type(
	__DIR__,
	[
		'style'         => 'snow-monkey-blocks/spider-contents-slider',
		'editor_script' => 'snow-monkey-blocks/spider-contents-slider/editor',
	]
);

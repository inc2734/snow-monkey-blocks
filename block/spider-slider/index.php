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
		'snow-monkey-blocks/spider-slider',
		SNOW_MONKEY_BLOCKS_DIR_URL . '/dist/block/spider-slider/style.css',
		[ 'snow-monkey-blocks', 'spider' ],
		filemtime( SNOW_MONKEY_BLOCKS_DIR_PATH . '/dist/block/spider-slider/style.css' )
	);
} else {
	wp_register_style(
		'snow-monkey-blocks/spider-slider',
		SNOW_MONKEY_BLOCKS_DIR_URL . '/dist/block/spider-slider/editor.css',
		[ 'snow-monkey-blocks-editor', 'spider' ],
		filemtime( SNOW_MONKEY_BLOCKS_DIR_PATH . '/dist/block/spider-slider/editor.css' )
	);
}

/**
 * script
 */
wp_register_script(
	'snow-monkey-blocks/spider-slider',
	SNOW_MONKEY_BLOCKS_DIR_URL . '/dist/block/spider-slider/script.js',
	[ 'spider' ],
	filemtime( SNOW_MONKEY_BLOCKS_DIR_PATH . '/dist/block/spider-slider/script.js' )
);

/**
 * editor_script
 */
$asset = include( SNOW_MONKEY_BLOCKS_DIR_PATH . '/dist/block/spider-slider/editor.asset.php' );
wp_register_script(
	'snow-monkey-blocks/spider-slider/editor',
	SNOW_MONKEY_BLOCKS_DIR_URL . '/dist/block/spider-slider/editor.js',
	array_merge( $asset['dependencies'], [ 'snow-monkey-blocks-editor' ] ),
	filemtime( SNOW_MONKEY_BLOCKS_DIR_PATH . '/dist/block/spider-slider/editor.js' ),
	true
);

register_block_type(
	__DIR__,
	[
		'script'        => ! is_admin() ? 'snow-monkey-blocks/spider-slider' : null,
		'style'         => 'snow-monkey-blocks/spider-slider',
		'editor_script' => 'snow-monkey-blocks/spider-slider/editor',
	]
);

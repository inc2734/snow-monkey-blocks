<?php
/**
 * @package snow-monkey-blocks
 * @author inc2734
 * @license GPL-2.0+
 */

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
 * style
 */
wp_register_style(
	'snow-monkey-blocks/spider-slider',
	SNOW_MONKEY_BLOCKS_DIR_URL . '/dist/block/spider-slider/style.css',
	[ 'snow-monkey-blocks', 'spider' ],
	filemtime( SNOW_MONKEY_BLOCKS_DIR_PATH . '/dist/block/spider-slider/style.css' )
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

/**
 * editor_style
 */
wp_register_style(
	'snow-monkey-blocks/spider-slider/editor',
	SNOW_MONKEY_BLOCKS_DIR_URL . '/dist/block/spider-slider/editor.css',
	[ 'snow-monkey-blocks-editor', 'snow-monkey-blocks/spider-slider' ],
	filemtime( SNOW_MONKEY_BLOCKS_DIR_PATH . '/dist/block/spider-slider/editor.css' )
);

register_block_type_from_metadata(
	__DIR__,
	[
		'script'        => ! is_admin() ? 'snow-monkey-blocks/spider-slider' : null,
		'style'         => 'snow-monkey-blocks/spider-slider',
		'editor_script' => 'snow-monkey-blocks/spider-slider/editor',
		'editor_style'  => 'snow-monkey-blocks/spider-slider/editor',
	]
);

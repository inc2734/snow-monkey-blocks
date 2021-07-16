<?php
/**
 * @package snow-monkey-blocks
 * @author inc2734, kmix-39
 * @license GPL-2.0+
 */

use Snow_Monkey\Plugin\Blocks\App\DynamicBlocks;

/**
 * script
 */
wp_register_script(
	'snow-monkey-blocks/categories-list',
	SNOW_MONKEY_BLOCKS_DIR_URL . '/dist/block/categories-list/script.js',
	[],
	filemtime( SNOW_MONKEY_BLOCKS_DIR_PATH . '/dist/block/categories-list/script.js' ),
	true
);

/**
 * style
 */
wp_register_style(
	'snow-monkey-blocks/categories-list',
	SNOW_MONKEY_BLOCKS_DIR_URL . '/dist/block/categories-list/style.css',
	[ 'snow-monkey-blocks' ],
	filemtime( SNOW_MONKEY_BLOCKS_DIR_PATH . '/dist/block/categories-list/style.css' )
);

/**
 * editor_script
 */
$asset = include( SNOW_MONKEY_BLOCKS_DIR_PATH . '/dist/block/categories-list/editor.asset.php' );
wp_register_script(
	'snow-monkey-blocks/categories-list/editor',
	SNOW_MONKEY_BLOCKS_DIR_URL . '/dist/block/categories-list/editor.js',
	array_merge( $asset['dependencies'], [ 'snow-monkey-blocks-editor' ] ),
	filemtime( SNOW_MONKEY_BLOCKS_DIR_PATH . '/dist/block/categories-list/editor.js' ),
	true
);

/**
 * editor_style
 */
wp_register_style(
	'snow-monkey-blocks/categories-list/editor',
	SNOW_MONKEY_BLOCKS_DIR_URL . '/dist/block/categories-list/editor.css',
	[ 'snow-monkey-blocks-editor' ],
	filemtime( SNOW_MONKEY_BLOCKS_DIR_PATH . '/dist/block/categories-list/editor.css' )
);

register_block_type(
	__DIR__,
	[
		'script'          => ! is_admin() ? 'snow-monkey-blocks/categories-list' : null,
		'style'           => ! is_admin() ? 'snow-monkey-blocks/categories-list' : null,
		'editor_script'   => 'snow-monkey-blocks/categories-list/editor',
		'editor_style'    => 'snow-monkey-blocks/categories-list/editor',
		'render_callback' => function( $attributes ) {
			return DynamicBlocks::render( 'categories-list', $attributes );
		},
	]
);

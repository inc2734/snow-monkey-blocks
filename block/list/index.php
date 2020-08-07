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
	'snow-monkey-blocks/list',
	SNOW_MONKEY_BLOCKS_DIR_URL . '/dist/block/list/script.js',
	[],
	filemtime( SNOW_MONKEY_BLOCKS_DIR_PATH . '/dist/block/list/script.js' ),
	true
);

/**
 * style
 */
wp_register_style(
	'snow-monkey-blocks/list',
	SNOW_MONKEY_BLOCKS_DIR_URL . '/dist/block/list/style.css',
	[ 'snow-monkey-blocks' ],
	filemtime( SNOW_MONKEY_BLOCKS_DIR_PATH . '/dist/block/list/style.css' )
);

/**
 * editor_script
 */
$asset = include( SNOW_MONKEY_BLOCKS_DIR_PATH . '/dist/block/list/editor.asset.php' );
wp_register_script(
	'snow-monkey-blocks/list/editor',
	SNOW_MONKEY_BLOCKS_DIR_URL . '/dist/block/list/editor.js',
	array_merge( $asset['dependencies'], [ 'snow-monkey-blocks-editor' ] ),
	filemtime( SNOW_MONKEY_BLOCKS_DIR_PATH . '/dist/block/list/editor.js' ),
	true
);

/**
 * editor_style
 */
wp_register_style(
	'snow-monkey-blocks/list/editor',
	SNOW_MONKEY_BLOCKS_DIR_URL . '/dist/block/list/editor.css',
	[ 'snow-monkey-blocks-editor', 'snow-monkey-blocks/list' ],
	filemtime( SNOW_MONKEY_BLOCKS_DIR_PATH . '/dist/block/list/editor.css' )
);

register_block_type_from_metadata(
	__DIR__,
	[
		'style'         => 'snow-monkey-blocks/list',
		'script'        => ! is_admin() ? 'snow-monkey-blocks/list' : null,
		'editor_script' => 'snow-monkey-blocks/list/editor',
		'editor_style'  => 'snow-monkey-blocks/list/editor',
	]
);

/**
 * excerpt_allowed_blocks
 */
add_filter(
	'excerpt_allowed_blocks',
	function( $allowed_blocks ) {
		return array_merge(
			$allowed_blocks,
			[
				'snow-monkey-blocks/lsit',
			]
		);
	}
);

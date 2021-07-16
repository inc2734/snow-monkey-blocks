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
		'snow-monkey-blocks/balloon',
		SNOW_MONKEY_BLOCKS_DIR_URL . '/dist/block/balloon/style.css',
		[ 'snow-monkey-blocks' ],
		filemtime( SNOW_MONKEY_BLOCKS_DIR_PATH . '/dist/block/balloon/style.css' )
	);
} else {
	wp_register_style(
		'snow-monkey-blocks/balloon',
		SNOW_MONKEY_BLOCKS_DIR_URL . '/dist/block/balloon/editor.css',
		[ 'snow-monkey-blocks-editor' ],
		filemtime( SNOW_MONKEY_BLOCKS_DIR_PATH . '/dist/block/balloon/editor.css' )
	);
}

/**
 * editor_script
 */
$asset = include( SNOW_MONKEY_BLOCKS_DIR_PATH . '/dist/block/balloon/editor.asset.php' );
wp_register_script(
	'snow-monkey-blocks/balloon/editor',
	SNOW_MONKEY_BLOCKS_DIR_URL . '/dist/block/balloon/editor.js',
	array_merge( $asset['dependencies'], [ 'snow-monkey-blocks-editor' ] ),
	filemtime( SNOW_MONKEY_BLOCKS_DIR_PATH . '/dist/block/balloon/editor.js' ),
	true
);

register_block_type(
	__DIR__,
	[
		'style'         => 'snow-monkey-blocks/balloon',
		'editor_script' => 'snow-monkey-blocks/balloon/editor',
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
				'snow-monkey-blocks/balloon',
			]
		);
	}
);

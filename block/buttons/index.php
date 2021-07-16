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
		'snow-monkey-blocks/buttons',
		SNOW_MONKEY_BLOCKS_DIR_URL . '/dist/block/buttons/style.css',
		[ 'snow-monkey-blocks' ],
		filemtime( SNOW_MONKEY_BLOCKS_DIR_PATH . '/dist/block/buttons/style.css' )
	);
} else {
	wp_register_style(
		'snow-monkey-blocks/buttons',
		SNOW_MONKEY_BLOCKS_DIR_URL . '/dist/block/buttons/editor.css',
		[ 'snow-monkey-blocks-editor' ],
		filemtime( SNOW_MONKEY_BLOCKS_DIR_PATH . '/dist/block/buttons/editor.css' )
	);
}

/**
 * editor_script
 */
$asset = include( SNOW_MONKEY_BLOCKS_DIR_PATH . '/dist/block/buttons/editor.asset.php' );
wp_register_script(
	'snow-monkey-blocks/buttons/editor',
	SNOW_MONKEY_BLOCKS_DIR_URL . '/dist/block/buttons/editor.js',
	array_merge( $asset['dependencies'], [ 'snow-monkey-blocks-editor' ] ),
	filemtime( SNOW_MONKEY_BLOCKS_DIR_PATH . '/dist/block/buttons/editor.js' ),
	true
);

register_block_type(
	__DIR__,
	[
		'style'         => 'snow-monkey-blocks/buttons',
		'editor_script' => 'snow-monkey-blocks/buttons/editor',
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
				'snow-monkey-blocks/buttons',
			]
		);
	}
);

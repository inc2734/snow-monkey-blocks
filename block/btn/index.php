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
		'snow-monkey-blocks/btn',
		SNOW_MONKEY_BLOCKS_DIR_URL . '/dist/block/btn/style.css',
		[ 'snow-monkey-blocks' ],
		filemtime( SNOW_MONKEY_BLOCKS_DIR_PATH . '/dist/block/btn/style.css' )
	);
} else {
	wp_register_style(
		'snow-monkey-blocks/btn',
		SNOW_MONKEY_BLOCKS_DIR_URL . '/dist/block/btn/editor.css',
		[ 'snow-monkey-blocks-editor' ],
		filemtime( SNOW_MONKEY_BLOCKS_DIR_PATH . '/dist/block/btn/editor.css' )
	);
}

/**
 * editor_script
 */
$asset = include( SNOW_MONKEY_BLOCKS_DIR_PATH . '/dist/block/btn/editor.asset.php' );
wp_register_script(
	'snow-monkey-blocks/btn/editor',
	SNOW_MONKEY_BLOCKS_DIR_URL . '/dist/block/btn/editor.js',
	array_merge( $asset['dependencies'], [ 'snow-monkey-blocks-editor' ] ),
	filemtime( SNOW_MONKEY_BLOCKS_DIR_PATH . '/dist/block/btn/editor.js' ),
	true
);

register_block_type(
	__DIR__,
	[
		'style'         => 'snow-monkey-blocks/btn',
		'editor_script' => 'snow-monkey-blocks/btn/editor',
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
				'snow-monkey-blocks/btn',
			]
		);
	}
);

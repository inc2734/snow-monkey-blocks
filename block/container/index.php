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
		'snow-monkey-blocks/container',
		SNOW_MONKEY_BLOCKS_DIR_URL . '/dist/block/container/style.css',
		[ 'snow-monkey-blocks' ],
		filemtime( SNOW_MONKEY_BLOCKS_DIR_PATH . '/dist/block/container/style.css' )
	);
} else {
	wp_register_style(
		'snow-monkey-blocks/container',
		SNOW_MONKEY_BLOCKS_DIR_URL . '/dist/block/container/editor.css',
		[ 'snow-monkey-blocks-editor' ],
		filemtime( SNOW_MONKEY_BLOCKS_DIR_PATH . '/dist/block/container/editor.css' )
	);
}


/**
 * editor_script
 */
$asset = include( SNOW_MONKEY_BLOCKS_DIR_PATH . '/dist/block/container/editor.asset.php' );
wp_register_script(
	'snow-monkey-blocks/container/editor',
	SNOW_MONKEY_BLOCKS_DIR_URL . '/dist/block/container/editor.js',
	array_merge( $asset['dependencies'], [ 'snow-monkey-blocks-editor' ] ),
	filemtime( SNOW_MONKEY_BLOCKS_DIR_PATH . '/dist/block/container/editor.js' ),
	true
);

register_block_type(
	__DIR__,
	[
		'style'         => 'snow-monkey-blocks/container',
		'editor_script' => 'snow-monkey-blocks/container/editor',
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
				'snow-monkey-blocks/container',
			]
		);
	}
);

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
if ( ! is_admin() ) {
	wp_register_style(
		'snow-monkey-blocks/section-with-bgimage',
		SNOW_MONKEY_BLOCKS_DIR_URL . '/dist/block/section-with-bgimage/style.css',
		[ 'snow-monkey-blocks', 'snow-monkey-blocks/section' ],
		filemtime( SNOW_MONKEY_BLOCKS_DIR_PATH . '/dist/block/section-with-bgimage/style.css' )
	);
} else {
	wp_register_style(
		'snow-monkey-blocks/section-with-bgimage',
		SNOW_MONKEY_BLOCKS_DIR_URL . '/dist/block/section-with-bgimage/editor.css',
		[ 'snow-monkey-blocks-editor', 'snow-monkey-blocks/section' ],
		filemtime( SNOW_MONKEY_BLOCKS_DIR_PATH . '/dist/block/section-with-bgimage/editor.css' )
	);
}

/**
 * editor_script
 */
$asset = include( SNOW_MONKEY_BLOCKS_DIR_PATH . '/dist/block/section-with-bgimage/editor.asset.php' );
wp_register_script(
	'snow-monkey-blocks/section-with-bgimage/editor',
	SNOW_MONKEY_BLOCKS_DIR_URL . '/dist/block/section-with-bgimage/editor.js',
	array_merge( $asset['dependencies'], [ 'snow-monkey-blocks-editor', 'snow-monkey-blocks/section/editor' ] ),
	filemtime( SNOW_MONKEY_BLOCKS_DIR_PATH . '/dist/block/section-with-bgimage/editor.js' ),
	true
);

register_block_type(
	__DIR__,
	[
		'style'         => 'snow-monkey-blocks/section-with-bgimage',
		'editor_script' => 'snow-monkey-blocks/section-with-bgimage/editor',
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
				'snow-monkey-blocks/section-with-bgimage',
			]
		);
	}
);

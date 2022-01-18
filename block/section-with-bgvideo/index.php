<?php
/**
 * @package snow-monkey-blocks
 * @author inc2734
 * @license GPL-2.0+
 */

use Snow_Monkey\Plugin\Blocks;

wp_register_style(
	'snow-monkey-blocks/section-with-bgvideo',
	SNOW_MONKEY_BLOCKS_DIR_URL . '/dist/block/section-with-bgvideo/style.css',
	[ 'snow-monkey-blocks/section', 'snow-monkey-blocks/section-with-bgimage' ],
	filemtime( SNOW_MONKEY_BLOCKS_DIR_PATH . '/dist/block/section-with-bgvideo/style.css' )
);

wp_register_style(
	'snow-monkey-blocks/section-with-bgvideo/editor',
	SNOW_MONKEY_BLOCKS_DIR_URL . '/dist/block/section-with-bgvideo/editor.css',
	[ 'snow-monkey-blocks/section-with-bgvideo' ],
	filemtime( SNOW_MONKEY_BLOCKS_DIR_PATH . '/dist/block/section-with-bgvideo/editor.css' )
);

wp_register_script(
	'snow-monkey-blocks/section-with-bgvideo',
	SNOW_MONKEY_BLOCKS_DIR_URL . '/dist/block/section-with-bgvideo/script.js',
	[],
	filemtime( SNOW_MONKEY_BLOCKS_DIR_PATH . '/dist/block/section-with-bgvideo/script.js' ),
	true
);

register_block_type(
	__DIR__,
	[
		'script' => ! is_admin() ? 'snow-monkey-blocks/section-with-bgvideo' : null,
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
				'snow-monkey-blocks/section-with-bgvideo',
			]
		);
	}
);

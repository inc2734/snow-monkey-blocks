<?php
/**
 * @package snow-monkey-blocks
 * @author inc2734
 * @license GPL-2.0+
 */

use Snow_Monkey\Plugin\Blocks;

wp_register_style(
	'snow-monkey-blocks/section-with-bgimage',
	SNOW_MONKEY_BLOCKS_DIR_URL . '/dist/block/section-with-bgimage/style.css',
	[ 'snow-monkey-blocks/section' ],
	filemtime( SNOW_MONKEY_BLOCKS_DIR_PATH . '/dist/block/section-with-bgimage/style.css' )
);

register_block_type(
	__DIR__
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

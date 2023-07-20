<?php
/**
 * @package snow-monkey-blocks
 * @author inc2734
 * @license GPL-2.0+
 */

use Snow_Monkey\Plugin\Blocks;

wp_register_style(
	generate_block_asset_handle( 'snow-monkey-blocks/section-side-heading', 'style' ),
	SNOW_MONKEY_BLOCKS_DIR_URL . '/dist/blocks/section-side-heading/style.css',
	array( generate_block_asset_handle( 'snow-monkey-blocks/section', 'style' ) ),
	filemtime( SNOW_MONKEY_BLOCKS_DIR_PATH . '/dist/blocks/section-side-heading/style.css' )
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
			array(
				'snow-monkey-blocks/section-side-heading',
			)
		);
	}
);

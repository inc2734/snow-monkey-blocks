<?php
/**
 * @package snow-monkey-blocks
 * @author inc2734
 * @license GPL-2.0+
 */

use Snow_Monkey\Plugin\Blocks;

wp_register_style(
	generate_block_asset_handle( 'snow-monkey-blocks/section-break-the-grid', 'style' ),
	SNOW_MONKEY_BLOCKS_DIR_URL . '/dist/blocks/section-break-the-grid/style.css',
	array( generate_block_asset_handle( 'snow-monkey-blocks/section', 'style' ) ),
	filemtime( SNOW_MONKEY_BLOCKS_DIR_PATH . '/dist/blocks/section-break-the-grid/style.css' )
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
				'snow-monkey-blocks/section-break-the-grid',
			)
		);
	}
);

/**
 * In the case of numerical values, "px" is sometimes auto-completed, so it should be removed.
 */
add_filter(
	'render_block_snow-monkey-blocks/section-break-the-grid',
	function( $block_content ) {
		$block_content = preg_replace(
			'|(--smb-section-break-the-grid--mask-opacity:\d+(?:\.\d+)?)px|',
			'$1',
			$block_content
		);
		return $block_content;
	}
);

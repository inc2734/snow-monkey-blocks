<?php
/**
 * @package snow-monkey-blocks
 * @author inc2734
 * @license GPL-2.0+
 */

register_block_type(
	__DIR__
);

/**
 * excerpt_allowed_blocks
 */
add_filter(
	'excerpt_allowed_blocks',
	function ( $allowed_blocks ) {
		return array_merge(
			$allowed_blocks,
			array(
				'snow-monkey-blocks/btn',
			)
		);
	}
);

add_filter(
	'render_block_snow-monkey-blocks/btn',
	function ( $block_content ) {
		return str_replace( 'href=""', '', $block_content );
	}
);

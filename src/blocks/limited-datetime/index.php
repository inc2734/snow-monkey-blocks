<?php
/**
 * @package snow-monkey-blocks
 * @author inc2734
 * @license GPL-2.0+
 */

use Snow_Monkey\Plugin\Blocks\App\DynamicBlocks;

register_block_type(
	__DIR__,
	array(
		'render_callback' => function ( $attributes, $content ) {
			return DynamicBlocks::render( 'limited-datetime', $attributes, $content );
		},
	)
);

add_filter(
	'render_block_snow-monkey-blocks/limited-datetime',
	function ( $block_content ) {
		if ( preg_match( '|^<div.*?>(.*?)</div>$|s', $block_content, $match ) ) {
			return trim( $match[1] );
		}
		return $block_content;
	}
);

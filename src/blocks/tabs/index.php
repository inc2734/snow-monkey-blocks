<?php
/**
 * @package snow-monkey-blocks
 * @author inc2734
 * @license GPL-2.0+
 */

use Snow_Monkey\Plugin\Blocks;

register_block_type(
	__DIR__
);

add_filter(
	'wp_kses_allowed_html',
	function ( $tags ) {
		$tags['button'] = wp_parse_args(
			array(
				'aria-selected' => true,
			),
			$tags['button']
		);

		return $tags;
	}
);

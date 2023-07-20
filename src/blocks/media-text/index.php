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
	function( $allowed_blocks ) {
		return array_merge(
			$allowed_blocks,
			array(
				'snow-monkey-blocks/media-text',
			)
		);
	}
);

add_filter(
	'render_block_snow-monkey-blocks/media-text',
	function( $block_content ) {
		if ( ! class_exists( '\WP_HTML_Tag_Processor' ) ) {
			return $block_content;
		}

		$p = new \WP_HTML_Tag_Processor( $block_content );

		if ( $p->next_tag() ) {
			if ( ! $p->get_attribute( 'data-sm-split-point' ) ) {
				$p->set_attribute( 'data-sm-split-point', 'lg' );
				return $p->get_updated_html();
			}
		}

		return $block_content;
	}
);

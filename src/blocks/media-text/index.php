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
				'snow-monkey-blocks/media-text',
			)
		);
	}
);

add_filter(
	'render_block_snow-monkey-blocks/media-text',
	function ( $block_content ) {
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

add_filter(
	'render_block_snow-monkey-blocks/media-text',
	function ( $content ) {
		$p1 = new WP_HTML_Tag_Processor( $content );
		$p1->next_tag( array( 'class_name' => 'is-layout-constrained' ) );
		$p1_class = $p1->get_attribute( 'class' );

		$p2 = new WP_HTML_Tag_Processor( $content );
		$p2->next_tag( array( 'class_name' => 'smb-media-text__body' ) );
		$p2_class = $p2->get_attribute( 'class' );

		if ( $p1_class === $p2_class ) {
			return $content;
		}

		$p1->remove_class( 'is-layout-constrained' );
		$p1->remove_class( 'wp-block-media-text-is-layout-constrained' );
		$p1->next_tag( array( 'class_name' => 'smb-media-text__body' ) );
		$p1->add_class( 'is-layout-constrained' );
		$p1->add_class( 'wp-block-media-text-is-layout-constrained' );
		return $p1->get_updated_html();
	}
);

<?php
/**
 * @package snow-monkey-blocks
 * @author inc2734
 * @license GPL-2.0+
 */

register_block_type(
	__DIR__,
	array(
		'script' => ! is_admin() ? 'spider' : null,
	)
);

add_filter(
	'render_block_snow-monkey-blocks/spider-contents-slider-item',
	function ( $content ) {
		$p1 = new WP_HTML_Tag_Processor( $content );
		$p1->next_tag( array( 'class_name' => 'is-layout-constrained' ) );
		$p1_class = $p1->get_attribute( 'class' );

		$p2 = new WP_HTML_Tag_Processor( $content );
		$p2->next_tag( array( 'class_name' => 'smb-spider-contents-slider__item' ) );
		$p2_class = $p2->get_attribute( 'class' );

		if ( $p1_class === $p2_class ) {
			return $content;
		}

		$p1->remove_class( 'is-layout-constrained' );
		$p1->remove_class( 'wp-block-spider-contents-slider-item-is-layout-constrained' );
		$p1->next_tag( array( 'class_name' => 'smb-spider-contents-slider__item' ) );
		$p1->add_class( 'is-layout-constrained' );
		$p1->add_class( 'wp-block-spider-contents-slider-item-is-layout-constrained' );
		return $p1->get_updated_html();
	}
);

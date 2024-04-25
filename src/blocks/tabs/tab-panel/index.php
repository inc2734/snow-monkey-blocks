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
	'render_block_snow-monkey-blocks/tab-panel',
	function ( $content ) {
		$p1 = new WP_HTML_Tag_Processor( $content );
		$p1->next_tag( array( 'class_name' => 'is-layout-constrained' ) );
		$p1_class = $p1->get_attribute( 'class' );

		$p2 = new WP_HTML_Tag_Processor( $content );
		$p2->next_tag( array( 'class_name' => 'smb-tab-panel__body' ) );
		$p2_class = $p2->get_attribute( 'class' );

		if ( $p1_class === $p2_class ) {
			return $content;
		}

		$p1->remove_class( 'is-layout-constrained' );
		$p1->remove_class( 'wp-block-tab-panel-is-layout-constrained' );
		$p1->next_tag( array( 'class_name' => 'smb-tab-panel__body' ) );
		$p1->add_class( 'is-layout-constrained' );
		$p1->add_class( 'wp-block-tab-panel-is-layout-constrained' );
		return $p1->get_updated_html();
	}
);

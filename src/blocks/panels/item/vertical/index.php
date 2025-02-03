<?php
/**
 * @package snow-monkey-blocks
 * @author inc2734
 * @license GPL-2.0+
 */

register_block_type(
	__DIR__
);

// Backward compatibility.
add_filter(
	'render_block_snow-monkey-blocks/panels-item',
	function ( $block_content ) {
		$p = new \WP_HTML_Tag_Processor( $block_content );
		$p->next_tag( array( 'class_name' => 'smb-panels__item' ) );
		$p->add_class( 'smb-panels__item--vertical' );
		return $p->get_updated_html();
	}
);

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
				'snow-monkey-blocks/hero-header',
			)
		);
	}
);

/**
 * In the case of numerical values, "px" is sometimes auto-completed, so it should be removed.
 */
add_filter(
	'render_block_snow-monkey-blocks/hero-header',
	function ( $block_content ) {
		$block_content = preg_replace(
			'|(--smb-hero-header--mask-opacity:\d+(?:\.\d+)?)px|',
			'$1',
			$block_content
		);
		return $block_content;
	}
);

add_filter(
	'render_block_snow-monkey-blocks/hero-header',
	function ( $content ) {
		$p1 = new WP_HTML_Tag_Processor( $content );
		$p1->next_tag( array( 'class_name' => 'is-layout-constrained' ) );
		$p1_class = $p1->get_attribute( 'class' );

		$p2 = new WP_HTML_Tag_Processor( $content );
		$p2->next_tag( array( 'class_name' => 'smb-hero-header__body' ) );
		$p2_class = $p2->get_attribute( 'class' );

		if ( $p1_class === $p2_class ) {
			return $content;
		}

		$p1->remove_class( 'is-layout-constrained' );
		$p1->remove_class( 'wp-block-hero-header-is-layout-constrained' );
		$p1->next_tag( array( 'class_name' => 'smb-hero-header__body' ) );
		$p1->add_class( 'is-layout-constrained' );
		$p1->add_class( 'wp-block-hero-header-is-layout-constrained' );
		return $p1->get_updated_html();
	}
);

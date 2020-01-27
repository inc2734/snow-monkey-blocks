<?php
/**
 * @package snow-monkey-blocks
 * @author inc2734
 * @license GPL-2.0+
 */

if ( ! shortcode_exists( 'wp_contents_outline' ) ) {
	return;
}

echo do_shortcode(
	sprintf(
		'[wp_contents_outline post_id="%1$d" selector=".c-entry__content, .c-entry__content .wp-block-group__inner-container" headings="%2$s" move_to_before_1st_heading="%3$s" id="%4$s" class="%5$s"]',
		get_the_ID(),
		$attributes['headings'],
		$attributes['moveToBefore1stHeading'] ? 'true' : 'false',
		! empty( $attributes['myAnchor'] ) ? $attributes['myAnchor'] : null,
		'smb-contents-outline'
	)
);

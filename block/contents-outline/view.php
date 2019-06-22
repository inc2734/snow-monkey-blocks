<?php
/**
 * @package snow-monkey-blocks
 * @author inc2734
 * @license GPL-2.0+
 */

echo do_shortcode(
	sprintf(
		'[wp_contents_outline post_id="%1$d" selector=".c-entry__content" headings="%2$s" move_to_before_1st_heading="%3$s"]',
		get_the_ID(),
		$attributes['headings'],
		$attributes['moveToBefore1stHeading'] ? 'true' : 'false'
	)
);

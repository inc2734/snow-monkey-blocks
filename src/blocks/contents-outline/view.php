<?php
/**
 * @package snow-monkey-blocks
 * @author inc2734
 * @license GPL-2.0+
 */

if ( ! shortcode_exists( 'wp_contents_outline' ) ) {
	return;
}

$move_to = array(
	'.c-entry__content',
);

$selectors = array(
	'.c-entry__content',
	'.c-entry__content .wp-block-group',
	'.c-entry__content .wp-block-group__inner-container',
);

if ( $attributes['includesSectionTitle'] ) {
	$selectors[] = '.smb-section__title';
	$selectors[] = '.smb-section__inner > .c-container';
	$selectors[] = '.smb-section-break-the-grid__content';
	$selectors[] = '.smb-section-side-heading > .smb-section__inner > .c-container > .c-row > .c-row__col:first-child';
	$selectors[] = '.smb-section__header';
}

if ( $attributes['includesSectionHeadings'] ) {
	$selectors[] = '.smb-section__body';
}

$anchor = ! empty( $attributes['myAnchor'] ) ? $attributes['myAnchor'] : null; // Backward compatible.
$anchor = ! empty( $attributes['anchor'] ) ? $attributes['anchor'] : $anchor;

$block_wrapper_attributes = get_block_wrapper_attributes(
	array(
		'class' => 'smb-contents-outline',
	)
);
?>
<div <?php echo wp_kses_post( $block_wrapper_attributes ); ?>>
	<?php
	echo do_shortcode(
		sprintf(
			'[wp_contents_outline post_id="%1$d" selector="%2$s" headings="%3$s" move_to_before_1st_heading="%4$s" move_to="%5$s" id="%6$s" title="%7$s"]',
			get_the_ID(),
			implode( ',', $selectors ),
			$attributes['headings'],
			$attributes['moveToBefore1stHeading'] ? 'true' : 'false',
			$attributes['moveToBefore1stHeading'] ? implode( ',', $move_to ) : '',
			$anchor,
			$attributes['title'] ? $attributes['title'] : __(
				'Contents outline',
				'snow-monkey-blocks'
			)
		)
	);
	?>
</div>

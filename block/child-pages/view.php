<?php
/**
 * @package snow-monkey-blocks
 * @author inc2734
 * @license GPL-2.0+
 *
 * @see https://github.com/inc2734/snow-monkey/blob/master/resources/template-parts/content/child-pages.php
 */

if ( class_exists( '\Framework\Helper' ) ) {
	$pages_query = \Framework\Helper::get_child_pages_query( get_the_ID() );
} elseif ( class_exists( '\Inc2734\Mimizuku_Core\Helper' ) ) {
	$pages_query = \Inc2734\Mimizuku_Core\Helper\get_child_pages_query( get_the_ID() );
}

if ( empty( $pages_query ) ) {
	return;
}

if ( ! $pages_query->have_posts() ) {
	return;
}

$force_sm_1col = null;
if ( in_array( $attributes['layout'], [ 'rich-media', 'panel' ], true ) ) {
	$sm_cols = (int) $attributes['smCols'];
	if ( 1 === $sm_cols ) {
		$force_sm_1col = 1;
	} elseif ( 2 === $sm_cols ) {
		$force_sm_1col = 0;
	}
}

$classnames[] = 'smb-child-pages';
if ( ! empty( $attributes['className'] ) ) {
	$classnames[] = $attributes['className'];
}
?>
<div class="<?php echo esc_attr( join( ' ', $classnames ) ); ?>">
	<?php
	if ( class_exists( '\Framework\Helper' ) ) {
		\Framework\Helper::get_template_part(
			'template-parts/content/child-pages',
			null,
			[
				'_context'             => 'snow-monkey-blocks/child-pages',
				'_entries_layout'      => $attributes['layout'],
				'_force_sm_1col'       => $force_sm_1col,
				'_item_thumbnail_size' => $attributes['itemThumbnailSizeSlug'],
				'_item_title_tag'      => $attributes['itemTitleTagName'],
				'_title'               => $attributes['title'],
				'_arrows'              => $attributes['arrows'],
				'_dots'                => $attributes['dots'],
				'_interval'            => $attributes['interval'],
			]
		);
	} else {
		get_template_part(
			'template-parts/child-pages',
			null,
			[
				'_context'             => 'snow-monkey-blocks/child-pages',
				'_entries_layout'      => $attributes['layout'],
				'_force_sm_1col'       => $force_sm_1col,
				'_item_thumbnail_size' => $attributes['itemThumbnailSizeSlug'],
				'_item_title_tag'      => $attributes['itemTitleTagName'],
				'_title'               => $attributes['title'],
				'_arrows'              => $attributes['arrows'],
				'_dots'                => $attributes['dots'],
				'_interval'            => $attributes['interval'],
			]
		);
	}
	?>
</div>

<?php
if ( isset( $child_page_title_callback ) ) {
	remove_filter( 'snow_monkey_child_pages_title', $child_page_title_callback, 9 );
}

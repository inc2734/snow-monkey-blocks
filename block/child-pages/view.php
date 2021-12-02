<?php
/**
 * @package snow-monkey-blocks
 * @author inc2734
 * @license GPL-2.0+
 *
 * @see https://github.com/inc2734/snow-monkey/blob/master/resources/template-parts/content/child-pages.php
 */

$parent_id = ! empty( $attributes['parent']['id'] ) ? $attributes['parent']['id'] : get_the_ID();

if ( class_exists( '\Framework\Helper' ) ) {
	$pages_query = \Framework\Helper::get_child_pages_query( $parent_id );
} elseif ( class_exists( '\Inc2734\Mimizuku_Core\Helper' ) ) {
	$pages_query = \Inc2734\Mimizuku_Core\Helper\get_child_pages_query( $parent_id );
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

ob_start();
if ( class_exists( '\Framework\Helper' ) ) {
	\Framework\Helper::get_template_part(
		'template-parts/content/child-pages',
		null,
		[
			'_context'             => 'snow-monkey-blocks/child-pages',
			'_parent_id'           => $parent_id,
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
			'_parent_id'           => ! empty( $attributes['parent']['id'] ) ? $attributes['parent']['id'] : get_the_ID(),
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
$child_pages = ob_get_clean();

if ( empty( $child_pages ) && defined( 'REST_REQUEST' ) && REST_REQUEST ) {
	$no_posts_text = __( 'No pages found.', 'snow-monkey-blocks' );
	if ( ! $no_posts_text ) {
		return;
	}
}
?>
<div class="<?php echo esc_attr( join( ' ', $classnames ) ); ?>">
	<?php
	if ( empty( $no_posts_text ) ) {
		// @codingStandardsIgnoreStart
		echo $child_pages;
		// @codingStandardsIgnoreEnd
	} else {
		echo wp_kses_post( apply_filters( 'the_content', $no_posts_text ) );
	}
	?>
</div>

<?php
if ( isset( $child_page_title_callback ) ) {
	remove_filter( 'snow_monkey_child_pages_title', $child_page_title_callback, 9 );
}

<?php
/**
 * @package snow-monkey-blocks
 * @author inc2734
 * @license GPL-2.0+
 *
 * @see https://github.com/inc2734/wp-awesome-widgets/blob/master/src/widget/widget.php
 * @see https://github.com/inc2734/snow-monkey/blob/master/resources/app/widget/snow-monkey-recent-posts/snow-monkey-recent-posts.php
 */

$widget_templates = apply_filters( 'inc2734_wp_awesome_widgets_widget_templates', 'templates/widget' );
$custom_template  = $widget_templates . '/recent-posts.php';
$default_template = get_template_directory() . '/app/widget/snow-monkey-recent-posts/_widget.php';

$force_sm_1col = null;
if ( in_array( $attributes['layout'], [ 'rich-media', 'panel' ], true ) ) {
	$sm_cols = (int) $attributes['smCols'];
	if ( 1 === $sm_cols ) {
		$force_sm_1col = 1;
	} elseif ( 2 === $sm_cols ) {
		$force_sm_1col = 0;
	}
}

$instance = [
	'title'               => null,
	'post-type'           => $attributes['postType'],
	'posts-per-page'      => $attributes['postsPerPage'],
	'layout'              => $attributes['layout'],
	'ignore-sticky-posts' => $attributes['ignoreStickyPosts'],
	'force-sm-1col'       => $force_sm_1col,
	'item-title-tag'      => $attributes['itemTitleTagName'],
	'item-thumbnail-size' => $attributes['itemThumbnailSizeSlug'],
	'display-item-meta'   => $attributes['forceDisplayItemMeta'] ? true : null,
	'display-item-terms'  => $attributes['forceDisplayItemTerms'] ? true : null,
	'link-text'           => null,
	'link-url'            => null,
	'arrows'              => $attributes['arrows'],
	'dots'                => $attributes['dots'],
	'interval'            => $attributes['interval'],
];

$anchor = ! empty( $attributes['myAnchor'] ) ? $attributes['myAnchor'] : null; // Backward compatible
$anchor = ! empty( $attributes['anchor'] ) ? $attributes['anchor'] : $anchor;

$widget_id  = 'snow_monkey_blocks_recent_posts-';
$widget_id .= ! empty( $anchor ) ? $anchor : rand();

$widget_args = [
	'before_widget' => '',
	'after_widget'  => '',
	'widget_id'     => $widget_id,
	'id'            => null,
];

// phpcs:disable VariableAnalysis.CodeAnalysis.VariableAnalysis.UnusedVariable
$args = [
	'_context' => 'snow-monkey-blocks/recent-posts',
];
// phpcs:enable

ob_start();

if ( file_exists( get_theme_file_path( $custom_template ) ) ) {
	include( get_theme_file_path( $custom_template ) );
} elseif ( file_exists( $default_template ) ) {
	include( $default_template );
}

$widget = ob_get_clean();

if ( empty( $widget ) ) {
	$no_posts_text = $attributes['noPostsText'];
	$no_posts_text = apply_filters( 'snow_monkey_blocks_recent_posts_no_posts_text', $no_posts_text, $widget_args, $instance );

	if ( ! $no_posts_text ) {
		return;
	}
}

$classnames[] = 'smb-recent-posts';
if ( ! empty( $attributes['className'] ) ) {
	$classnames[] = $attributes['className'];
}
?>
<div class="<?php echo esc_attr( join( ' ', $classnames ) ); ?>" id="<?php echo esc_attr( $anchor ); ?>">
	<?php
	if ( empty( $no_posts_text ) ) {
		// @codingStandardsIgnoreStart
		echo apply_filters( 'inc2734_wp_awesome_widgets_render_widget', $widget, $widget_args, $instance );
		// @codingStandardsIgnoreEnd
	} else {
		echo wp_kses_post( apply_filters( 'the_content', $no_posts_text ) );
	}
	?>
</div>

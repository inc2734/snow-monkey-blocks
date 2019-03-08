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

$instance = [
	'title'               => null,
	'posts-per-page'      => $attributes['postsPerPage'],
	'layout'              => $attributes['layout'],
	'ignore-sticky-posts' => $attributes['ignoreStickyPosts'],
	'link-text'           => null,
	'link-url'            => null,
];

$args     = [
	'before_widget' => '',
	'after_widget'  => '',
	'widget_id'     => 'inc2734_wp_awesome_widgets_pickup_slider_' . rand(),
	'id'            => null,
];

ob_start();

if ( file_exists( get_theme_file_path( $custom_template ) ) ) {
	include( get_theme_file_path( $custom_template ) );
} elseif ( file_exists( $default_template ) ) {
	include( $default_template );
}

$widget = ob_get_clean();

if ( empty( $widget ) ) {
	return;
}
?>
<div class="smb-recent-posts">
	<?php
	// @codingStandardsIgnoreStart
	echo apply_filters( 'inc2734_wp_awesome_widgets_render_widget', $widget, $args, $instance );
	// @codingStandardsIgnoreEnd
	?>
</div>

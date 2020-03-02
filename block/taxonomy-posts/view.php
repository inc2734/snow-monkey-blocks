<?php
/**
 * @package snow-monkey-blocks
 * @author inc2734
 * @license GPL-2.0+
 *
 * @see https://github.com/inc2734/wp-awesome-widgets/blob/master/src/widget/widget.php
 * @see https://github.com/inc2734/snow-monkey/blob/master/resources/app/widget/snow-monkey-taxonomy-posts/snow-monkey-taxonomy-posts.php
 */

$widget_templates = apply_filters( 'inc2734_wp_awesome_widgets_widget_templates', 'templates/widget' );
$custom_template  = $widget_templates . '/taxonomy-posts.php';
$default_template = get_template_directory() . '/app/widget/snow-monkey-taxonomy-posts/_widget.php';

$instance = [
	'title'               => null,
	'taxonomy'            => $attributes['taxonomy'] . '@' . $attributes['termId'],
	'posts-per-page'      => $attributes['postsPerPage'],
	'layout'              => $attributes['layout'],
	'ignore-sticky-posts' => $attributes['ignoreStickyPosts'],
	'link-text'           => null,
	'link-url'            => null,
];

$widget_id  = 'snow_monkey_blocks_taxonomy_posts-';
$widget_id .= ! empty( $attributes['myAnchor'] ) ? $attributes['myAnchor'] : rand();

$args     = [
	'before_widget' => '',
	'after_widget'  => '',
	'widget_id'     => $widget_id,
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
	$no_posts_text = $attributes['noPostsText'];
	$no_posts_text = apply_filters( 'snow_monkey_blocks_taxonomy_posts_no_posts_text', $no_posts_text, $args, $instance );

	if ( ! $no_posts_text ) {
		return;
	}
}

$classnames[] = 'smb-taxonomy-posts';
$classnames[] = $attributes['className'];
?>
<div class="<?php echo esc_attr( join( ' ', $classnames ) ); ?>" id="<?php echo esc_attr( $attributes['myAnchor'] ); ?>">
	<?php
	if ( empty( $no_posts_text ) ) {
		// @codingStandardsIgnoreStart
		echo apply_filters( 'inc2734_wp_awesome_widgets_render_widget', $widget, $args, $instance );
		// @codingStandardsIgnoreEnd
	} else {
		echo wp_kses_post( apply_filters( 'the_content', $no_posts_text ) );
	}
	?>
</div>

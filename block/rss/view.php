<?php
$widget_templates = apply_filters( 'inc2734_wp_awesome_widgets_widget_templates', 'templates/widget' );
$custom_template  = $widget_templates . '/rss.php';
$default_template = get_template_directory() . '/app/widget/snow-monkey-rss/_widget.php';

$instance = [
	'feed-url'       => $attributes['feedURL'],
	'title'          => null,
	'posts-per-page' => $attributes['postsPerPage'],
	'layout'         => $attributes['layout'],
	'link-text'      => null,
	'link-url'       => null,
];

$widget_id  = 'snow_monkey_blocks_rss-';
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
	$no_posts_text = apply_filters( 'snow_monkey_blocks_rss_no_posts_text', $no_posts_text, $args, $instance );

	if ( ! $no_posts_text ) {
		return;
	}
}

$classnames[] = 'smb-rss';
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

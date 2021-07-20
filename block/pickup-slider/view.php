<?php
/**
 * @package snow-monkey-blocks
 * @author inc2734
 * @license GPL-2.0+
 *
 * @see https://github.com/inc2734/wp-awesome-widgets/blob/master/src/widget/widget.php
 * @see https://github.com/inc2734/wp-awesome-widgets/blob/master/src/widget/pickup-slider/_widget.php
 */

$attributes = wp_parse_args( $attributes, [] );
if ( ! $attributes ) {
	return;
}

$widget_templates = apply_filters( 'inc2734_wp_awesome_widgets_widget_templates', 'templates/widget' );
$custom_template  = $widget_templates . '/pickup-slider.php';
$default_template = get_template_directory() . '/vendor/inc2734/wp-awesome-widgets/src/widget/pickup-slider/_widget.php';

$instance = [
	'random'         => $attributes['random'],
	'link-type'      => $attributes['linkType'],
	'posts_per_page' => $attributes['postsPerPage'],
];

$anchor = ! empty( $attributes['myAnchor'] ) ? $attributes['myAnchor'] : null; // Backward compatible
$anchor = ! empty( $attributes['anchor'] ) ? $attributes['anchor'] : $anchor;

$widget_id  = 'snow_monkey_blocks_pickup_slider-';
$widget_id .= $anchor ? $anchor : rand();

$widget_args = [
	'before_widget' => '',
	'after_widget'  => '',
	'widget_id'     => $widget_id,
];

// phpcs:disable VariableAnalysis.CodeAnalysis.VariableAnalysis.UnusedVariable
$args = [
	'_context' => 'snow-monkey-blocks/pickup-slider',
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
	return;
}

$classnames[] = 'smb-pickup-slider';
if ( ! empty( $attributes['className'] ) ) {
	$classnames[] = $attributes['className'];
}
?>
<div class="<?php echo esc_attr( join( ' ', $classnames ) ); ?>" id="<?php echo esc_attr( $anchor ); ?>">
	<?php
	// @codingStandardsIgnoreStart
	echo apply_filters( 'inc2734_wp_awesome_widgets_render_widget', $widget, $widget_args, $instance );
	// @codingStandardsIgnoreEnd
	?>
</div>

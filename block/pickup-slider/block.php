<?php
/**
 * @package snow-monkey-blocks
 * @author inc2734
 * @license GPL-2.0+
 *
 * @see https://github.com/inc2734/wp-awesome-widgets/blob/master/src/widget/widget.php
 * @see https://github.com/inc2734/wp-awesome-widgets/blob/master/src/widget/pickup-slider/_widget.php
 */

$widget_templates = apply_filters( 'inc2734_wp_awesome_widgets_widget_templates', 'templates/widget' );
$custom_template  = $widget_templates . '/pickup-slider.php';
$default_template = get_template_directory() . '/vendor/inc2734/wp-awesome-widgets/src/widget/pickup-slider/_widget.php';

$instance = [
	'random' => $attributes['random'],
	'link-type' => $attributes['linkType'],
];

$args     = [
	'before_widget' => '',
	'after_widget'  => '',
	'widget_id'     => 'inc2734_wp_awesome_widgets_pickup_slider_' . rand(),
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
<div class="smb-pickup-slider">
	<?php
	// @codingStandardsIgnoreStart
	echo apply_filters( 'inc2734_wp_awesome_widgets_render_widget', $widget, $args, $instance );
	// @codingStandardsIgnoreEnd
	?>
</div>

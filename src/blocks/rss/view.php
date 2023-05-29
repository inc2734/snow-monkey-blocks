<?php
/**
 * @package snow-monkey-blocks
 * @author inc2734
 * @license GPL-2.0+
 */

$widget_templates = apply_filters( 'inc2734_wp_awesome_widgets_widget_templates', 'templates/widget' );
$custom_template  = $widget_templates . '/rss.php';
$default_template = get_template_directory() . '/app/widget/snow-monkey-rss/_widget.php';

$force_sm_1col = null;
if ( in_array( $attributes['layout'], array( 'rich-media', 'panel' ), true ) ) {
	$sm_cols = (int) $attributes['smCols'];
	if ( 1 === $sm_cols ) {
		$force_sm_1col = 1;
	} elseif ( 2 === $sm_cols ) {
		$force_sm_1col = 0;
	}
}

$anchor = ! empty( $attributes['myAnchor'] ) ? $attributes['myAnchor'] : null; // Backward compatible
$anchor = ! empty( $attributes['anchor'] ) ? $attributes['anchor'] : $anchor;

$client_id  = ! empty( $attributes['clientId'] ) ? $attributes['clientId'] : rand();
$widget_id  = 'snow_monkey_blocks_rss-';
$widget_id .= ! empty( $anchor ) ? $anchor : $client_id;

$widget_args = array(
	'before_widget' => '',
	'after_widget'  => '',
	'widget_id'     => $widget_id,
	'id'            => null,
);

// @see themes/snow-monkey/app/widget/snow-monkey-recent-rss/_widget.php
$widget_number = explode( '-', $widget_args['widget_id'] );
if ( 1 < count( $widget_number ) ) {
	array_shift( $widget_number );
	$widget_number = implode( '-', $widget_number );
} else {
	$widget_number = $widget_number[0];
}

$instance = array(
	'entries_id'     => $widget_number,
	'feed-url'       => $attributes['feedURL'],
	'title'          => null,
	'posts-per-page' => $attributes['postsPerPage'],
	'layout'         => $attributes['layout'],
	'gap'            => $attributes['gap'],
	'force-sm-1col'  => $force_sm_1col,
	'item-title-tag' => $attributes['itemTitleTagName'],
	'link-text'      => null,
	'link-url'       => null,
	'arrows'         => $attributes['arrows'],
	'dots'           => $attributes['dots'],
	'interval'       => $attributes['interval'],
);

// phpcs:disable VariableAnalysis.CodeAnalysis.VariableAnalysis.UnusedVariable
$args = array(
	'_context' => 'snow-monkey-blocks/rss',
);
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
	$no_posts_text = apply_filters( 'snow_monkey_blocks_rss_no_posts_text', $no_posts_text, $widget_args, $instance );

	if ( ! $no_posts_text ) {
		return;
	}
}

$classnames[] = 'smb-rss';
if ( ! empty( $attributes['className'] ) ) {
	$classnames[] = $attributes['className'];
}

$block_wrapper_attributes = get_block_wrapper_attributes(
	array(
		'class' => implode( ' ', $classnames ),
		'id'    => $anchor,
	)
);
?>
<div <?php echo $block_wrapper_attributes; ?>>
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

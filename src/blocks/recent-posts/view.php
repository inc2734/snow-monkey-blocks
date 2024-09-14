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
if ( in_array( $attributes['layout'], array( 'rich-media', 'panel' ), true ) ) {
	$sm_cols = (int) $attributes['smCols'];
	if ( 1 === $sm_cols ) {
		$force_sm_1col = 1;
	} elseif ( 2 === $sm_cols ) {
		$force_sm_1col = 0;
	}
}

$anchor = ! empty( $attributes['myAnchor'] ) ? $attributes['myAnchor'] : null; // Backward compatible.
$anchor = ! empty( $attributes['anchor'] ) ? $attributes['anchor'] : $anchor;

$client_id  = ! empty( $attributes['clientId'] ) ? $attributes['clientId'] : wp_rand();
$widget_id  = 'snow_monkey_blocks_recent_posts-';
$widget_id .= ! empty( $anchor ) ? $anchor : $client_id;

$widget_args = array(
	'before_widget' => '',
	'after_widget'  => '',
	'widget_id'     => $widget_id,
	'id'            => null,
);

// @see themes/snow-monkey/app/widget/snow-monkey-recent-posts/_widget.php
$widget_number = explode( '-', $widget_args['widget_id'] );
if ( 1 < count( $widget_number ) ) {
	array_shift( $widget_number );
	$widget_number = implode( '-', $widget_number );
} else {
	$widget_number = $widget_number[0];
}

$instance = array(
	'entries_id'           => $widget_number,
	'title'                => null,
	'post-type'            => $attributes['postType'],
	'taxonomy'             => ! empty( $attributes['taxonomy'] ) && ! empty( $attributes['termId'] ) ? $attributes['taxonomy'] . '@' . $attributes['termId'] : false,
	'authors'              => $attributes['authors'],
	'posts-per-page'       => $attributes['postsPerPage'],
	'layout'               => $attributes['layout'],
	'gap'                  => $attributes['gap'],
	'ignore-sticky-posts'  => $attributes['ignoreStickyPosts'],
	'force-sm-1col'        => $force_sm_1col,
	'item-title-tag'       => $attributes['itemTitleTagName'],
	'item-thumbnail-size'  => $attributes['itemThumbnailSizeSlug'],
	'display-item-meta'    => 'post' === $attributes['postType'] || $attributes['forceDisplayItemMeta'],
	'display-item-terms'   => 'post' === $attributes['postType'] || $attributes['forceDisplayItemTerms'],
	'display-item-excerpt' => isset( $attributes['displayItemExcerpt'] ) ? $attributes['displayItemExcerpt'] : null,
	'link-text'            => null,
	'link-url'             => null,
	'arrows'               => $attributes['arrows'],
	'dots'                 => $attributes['dots'],
	'interval'             => $attributes['interval'],
	'autoplayButton'       => $attributes['autoplayButton'],
);

$instance = wp_parse_args(
	$instance,
	array(
		'display-item-author'    => $instance['display-item-meta'] && isset( $attributes['displayItemAuthor'] ) ? $attributes['displayItemAuthor'] : null,
		'display-item-published' => $instance['display-item-meta'] && isset( $attributes['displayItemPublished'] ) ? $attributes['displayItemPublished'] : null,
		'display-item-modified'  => $instance['display-item-meta'] && isset( $attributes['displayItemModified'] ) ? $attributes['displayItemModified'] : null,
	)
);

// phpcs:disable VariableAnalysis.CodeAnalysis.VariableAnalysis.UnusedVariable
$args = array(
	'_context' => 'snow-monkey-blocks/recent-posts',
);
// phpcs:enable

$add_tax_query = function ( $args ) use ( $instance ) {
	$taxonomy_arr = explode( '@', $instance['taxonomy'] );

	$args['tax_query'] = array_merge(
		isset( $args['tax_query'] ) ? $args['tax_query'] : array(),
		array(
			array(
				'taxonomy' => $taxonomy_arr[0],
				'terms'    => $taxonomy_arr[1],
				'field'    => 'term_id',
			),
		)
	);

	return $args;
};
if ( $instance['taxonomy'] ) {
	add_filter(
		'snow_monkey_recent_posts_widget_args_' . $widget_number,
		$add_tax_query,
		9
	);
}

$add_authors_query = function ( $args ) use ( $instance ) {
	$args['author__in'] = array_merge(
		isset( $args['author__in'] ) ? $args['author__in'] : array(),
		$instance['authors']
	);

	return $args;
};
if ( $instance['authors'] ) {
	add_filter(
		'snow_monkey_recent_posts_widget_args_' . $widget_number,
		$add_authors_query,
		9
	);
}

ob_start();

if ( file_exists( get_theme_file_path( $custom_template ) ) ) {
	include get_theme_file_path( $custom_template );
} elseif ( file_exists( $default_template ) ) {
	include $default_template;
}

$widget = ob_get_clean();

remove_filter(
	'snow_monkey_recent_posts_widget_args_' . $widget_number,
	$add_tax_query,
	9
);

remove_filter(
	'snow_monkey_recent_posts_widget_args_' . $widget_number,
	$add_authors_query,
	9
);

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

$block_wrapper_attributes = get_block_wrapper_attributes(
	array(
		'class' => implode( ' ', $classnames ),
		'id'    => $anchor,
	)
);
?>
<div <?php echo wp_kses_post( $block_wrapper_attributes ); ?>>
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

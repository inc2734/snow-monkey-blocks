<?php
/**
 * @package snow-monkey-blocks
 * @author inc2734
 * @license GPL-2.0+
 */

$query_args = [
	'post_type'      => 'post',
	'posts_per_page' => $attributes['postsPerPage'],
];
$query_args = apply_filters( 'snow_monkey_blocks_recent_posts_args', $query_args );
$_post_type = empty( $query_args['post_type'] ) ? '' : $query_args['post_type'];

$recent_posts_query = new WP_Query(
	array_merge(
		$query_args,
		[
			'ignore_sticky_posts' => true,
			'no_found_rows'       => true,
			'suppress_filters'    => true,
		]
	)
);

if ( ! $recent_posts_query->have_posts() ) {
	return;
}

$infeed_ads      = get_option( 'mwt-google-infeed-ads' );
$data_infeed_ads = ( $infeed_ads ) ? 'true' : 'false';
$archive_layout  = $attributes['layout'];
?>
<div class="smb-recent-posts">
	<ul class="c-entries c-entries--<?php echo esc_attr( $archive_layout ); ?>" data-has-infeed-ads="<?php echo esc_attr( $data_infeed_ads ); ?>">
		<?php while ( $recent_posts_query->have_posts() ) : ?>
			<?php $recent_posts_query->the_post(); ?>
			<li class="c-entries__item">
				<?php
				$args = [
					'widget_layout' => $attributes['layout'],
				];

				$template_slug = 'template-parts/loop/entry-summary';
				if ( function_exists( '\wpvc_get_template_part' ) ) {
					\wpvc_get_template_part(
						$template_slug,
						$_post_type,
						$args
					);
				} elseif ( function_exists( '\Inc2734\Mimizuku_Core\Helper\get_template_part' ) ) {
					\Inc2734\Mimizuku_Core\Helper\get_template_part(
						$template_slug,
						$_post_type,
						$args
					);
				} elseif ( method_exists( '\Framework\Helper', 'get_template_part' ) ) {
					\Framework\Helper::get_template_part(
						$template_slug,
						$_post_type,
						$args
					);
				}
				?>
			</li>
		<?php endwhile; ?>
		<?php wp_reset_postdata(); ?>
	</ul>
</div>

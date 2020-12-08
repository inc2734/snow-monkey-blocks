<?php
/**
 * @package snow-monkey-blocks
 * @author inc2734, kmix-39
 * @license GPL-2.0+
 */

$categories = get_categories(
	[
		'pad_counts' => true,
		'orderby'    => $attributes['orderby'],
		'order'      => $attributes['order'],
	]
);

$exclusion_ids = [];
if ( isset( $attributes['exclusionCategories'] ) && ! empty( $attributes['exclusionCategories'] ) ) {
	$exclusion_ids = explode( ',', $attributes['exclusionCategories'] );
	$exclusion_ids = array_map(
		function( $value ) {
			return (int) $value;
		},
		$exclusion_ids
	);
}

$classnames[] = 'smb-categories-list';
if ( ! empty( $attributes['className'] ) ) {
	$classnames[] = $attributes['className'];
}
?>
<div class="<?php echo esc_attr( join( ' ', $classnames ) ); ?>">
	<ul class="smb-categories-list__list">
		<?php foreach ( $categories as $category ) : ?>
			<?php
			$category_detail = get_category( $category );
			if ( in_array( $category_detail->term_id, $exclusion_ids, true ) ) {
				continue;
			}
			?>
			<li class="smb-categories-list__item smb-categories-list__item__slug-<?php echo esc_html( $category_detail->term_id ); ?>">
				<div class="smb-categories-list__item__count">
					<?php echo esc_html( $category_detail->count ); ?>
					<span><?php esc_html_e( 'articles', 'snow-monkey-blocks' ); ?></span>
				</div>

				<div class="smb-categories-list__item__detail">
					<div class="smb-categories-list__item__category-name">
						<a href="<?php echo esc_url( get_category_link( $category_detail->term_id ) ); ?>">
							<?php echo esc_html( $category_detail->cat_name ); ?>
						</a>
					</div>

					<?php if ( $category_detail->category_description ) : ?>
						<div class="smb-categories-list__item__category-description">
							<?php echo wp_kses_post( $category_detail->category_description ); ?>
						</div>
					<?php endif; ?>

					<?php if ( ! empty( $attributes['articles'] ) ) : ?>
						<div class="smb-categories-list__item__recent-label">
							<?php esc_html_e( 'Recent posts', 'snow-monkey-blocks' ); ?>
						</div>
						<ul class="smb-categories-list__item__list">
							<?php
							$_wp_query = new \WP_Query(
								[
									'cat'                 => $category_detail->term_id,
									'posts_per_page'      => (string) $attributes['articles'],
									'order'               => 'DESC',
									'ignore_sticky_posts' => true,
									'no_found_rows'       => true,
									'suppress_filters'    => true,
								]
							);
							?>
							<?php if ( $_wp_query->have_posts() ) : ?>
								<?php while ( $_wp_query->have_posts() ) : ?>
									<?php $_wp_query->the_post(); ?>
									<li>
										<a href="<?php the_permalink(); ?>">
											<?php echo wp_kses_post( '' === get_the_title() ? __( '(no title)', 'snow-monkey-blocks' ) : get_the_title() ); ?>
										</a>
									</li>
								<?php endwhile; ?>
								<?php wp_reset_postdata(); ?>
							<?php endif; ?>
						</ul>
					<?php endif; ?>
				</div>
			</li>
		<?php endforeach; ?>
	</ul>
</div>

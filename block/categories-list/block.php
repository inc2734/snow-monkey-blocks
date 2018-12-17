<?php
/**
 * @package snow-monkey-blocks
 * @author kmix-39
 * @license GPL-2.0+
 */

$categories = get_categories();

ob_start();
?>
<ul class="smb-categories-list">
	<?php foreach ( $categories as $category ) : ?>
		<?php $category_detail = get_category( $category ); ?>

		<li class="smb-categories-list__cat">
			<h4>
				<?php echo esc_html( $category_detail->count ); ?>
				<span><?php esc_html_e( 'articles', 'snow-monkey-blocks' ); ?></span>
			</h4>

			<div class="detail">
				<h5>
					<a href="<?php echo esc_url( get_category_link( $category_detail->term_id ) ); ?>">
						<?php echo esc_html( $category_detail->cat_name ); ?>
					</a>
				</h5>
				<span class="description">
					<?php echo wp_kses_post( $category_detail->category_description ); ?>
				</span>

				<?php if ( ! empty( $attributes['articles'] ) ) : ?>
					<h6><?php echo esc_html( sprintf( __( '%1$d latest_posts', 'snow-monkey-blocks' ), $attributes['articles'] ) ); ?></h6>
					<ul class="latest-articles-list">
						<?php
						$_wp_query = new \WP_Query(
							[
								'category'            => $category_detail->term_id,
								'showposts'           => (string) $attributes['articles'],
								'order'               => 'ASC',
								'ignore_sticky_posts' => true,
								'no_found_rows'       => true,
								'suppress_filters'    => true,
							]
						);
						?>
						<?php if ( $_wp_query->have_posts() ) : ?>
							<?php while ( $_wp_query->have_posts() ) : ?>
								<?php $_wp_query->the_post(); ?>
								<li><a href="<?php the_permalink(); ?>"><?php the_title(); ?></a></li>
							<?php endwhile; ?>
							<?php wp_reset_postdata(); ?>
						<?php endif; ?>
					</ul>
				<?php endif; ?>
			</div>
		</li>
	<?php endforeach; ?>
</ul>
<?php
echo wp_kses_post( ob_get_clean() );

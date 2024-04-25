<?php
/**
 * @package inc2734/wp-awesome-widgets
 * @author inc2734
 * @license GPL-2.0+
 */

$query_args = array(
	'post_type'        => 'any',
	'posts_per_page'   => 0 === $attributes['postsPerPage'] ? -1 : $attributes['postsPerPage'],
	'suppress_filters' => false,
	'tax_query'        => array(
		array(
			'taxonomy' => 'post_tag',
			'terms'    => array( 'pickup' ),
			'field'    => 'slug',
		),
	),
);

if ( $attributes['random'] ) {
	$query_args = array_merge(
		$query_args,
		array(
			'orderby' => 'rand',
		)
	);
}

$query = new WP_Query(
	array_merge(
		$query_args,
		array(
			'ignore_sticky_posts' => true,
			'no_found_rows'       => true,
		)
	)
);

if ( ! $query->have_posts() ) {
	return;
}

$classnames[] = 'smb-spider-pickup-slider';
if ( ! empty( $attributes['className'] ) ) {
	$classnames[] = $attributes['className'];
}
if ( isset( $attributes['align'] ) ) {
	if ( 'full' === $attributes['align'] ) {
		$classnames[] = 'alignfull';
	} elseif ( 'wide' === $attributes['align'] ) {
		$classnames[] = 'alignwide';
	}
}

$block_wrapper_attributes = get_block_wrapper_attributes(
	array(
		'class' => implode( ' ', $classnames ),
	)
);
?>

<div
	<?php echo wp_kses_post( $block_wrapper_attributes ); ?>
	data-interval="<?php echo esc_attr( 0 < $attributes['interval'] ? $attributes['interval'] * 1000 : null ); ?>"
	data-fade="<?php echo esc_attr( $attributes['fade'] ? 'true' : 'false' ); ?>"
>
	<div class="spider">
		<div class="spider__canvas">
			<?php $index = 0; ?>
			<?php while ( $query->have_posts() ) : ?>
				<?php
				$query->the_post();
				$thumbnail_size = wp_is_mobile() ? 'large' : 'full';
				?>
				<div class="spider__slide" data-id="<?php echo esc_attr( $index ); ?>">
					<?php the_post_thumbnail( $thumbnail_size, array( 'class' => 'spider__figure' ) ); ?>

					<div class="smb-spider-pickup-slider__item">
						<div class="smb-spider-pickup-slider__item__title">
							<a href="<?php the_permalink(); ?>"><?php the_title(); ?></a>
						</div>

						<ul class="smb-spider-pickup-slider__item__meta c-meta">
							<li class="c-meta__item c-meta__item--author"><?php echo get_avatar( get_post()->post_author ); ?><?php echo esc_html( get_the_author() ); ?></li>
							<li class="c-meta__item"><?php echo esc_html( get_the_time( get_option( 'date_format' ) ) ); ?></li>
						</ul>
					</div>
				</div>
				<?php ++$index; ?>
			<?php endwhile; ?>
			<?php wp_reset_postdata(); ?>
		</div>

		<?php if ( $attributes['arrows'] ) : ?>
			<button class="spider__arrow" data-direction="prev">Prev</button>
			<button class="spider__arrow" data-direction="next">Next</button>
		<?php endif; ?>
	</div>

	<?php if ( ( 0 < $attributes['interval'] && $attributes['autoplayButton'] ) || $attributes['dots'] ) : ?>
		<div
			class="spider__dots"
			data-thumbnails="<?php echo esc_attr( $attributes['dotsToThumbnail'] ? 'true' : 'false' ); ?>"
		>
			<?php if ( $attributes['autoplayButton'] ) : ?>
				<button class="spider__stop">
					<svg
						width="12"
						height="16"
						viewBox="0 0 12 16"
						fill="none"
						xmlns="http://www.w3.org/2000/svg"
						title="<?php esc_html_e( 'Pause autoplay', 'snow-monkey-blocks' ); ?>"
					>
						<rect
							width="5"
							height="16"
							fill="currentColor"
						></rect>
						<rect
							x="7"
							width="5"
							height="16"
							fill="currentColor"
						></rect>
					</svg>
				</button>
				<button class="spider__start">
					<svg
						width="12"
						height="16"
						viewBox="0 0 12 16"
						fill="none"
						xmlns="http://www.w3.org/2000/svg"
						title="<?php esc_html_e( 'Start autoplay', 'snow-monkey-blocks' ); ?>"
					>
						<path
							d="M12 8L-2.29967e-06 16L-2.29967e-06 0L12 8Z"
							fill="currentColor"
						></path>
					</svg>
				</button>
			<?php endif; ?>

			<?php if ( $attributes['dots'] ) : ?>
				<?php $index = 0; ?>
				<?php while ( $query->have_posts() ) : ?>
					<?php
					$query->the_post();
					?>
						<button
							class="spider__dot"
							data-id="<?php echo esc_attr( $index ); ?>"
							<?php if ( $attributes['dotsToThumbnail'] ) : ?>
								data-has-thumbnail="<?php echo esc_attr( has_post_thumbnail() ? 'true' : 'false' ); ?>"
							<?php endif; ?>
						>
							<?php if ( $attributes['dotsToThumbnail'] ) : ?>
								<?php the_post_thumbnail( 'medium', array( 'class' => 'spider__figure' ) ); ?>
							<?php else : ?>
								<?php echo esc_html( $index ); ?>
							<?php endif; ?>
						</button>
					<?php ++$index; ?>
				<?php endwhile; ?>
				<?php wp_reset_postdata(); ?>
			<?php endif; ?>
		</div>
	<?php endif; ?>
</div>

<?php
/**
 * @package snow-monkey-blocks
 * @author inc2734
 * @license GPL-2.0+
 */

if ( empty( $attributes['taxonomy'] ) ) {
	return;
}

$args = array(
	'taxonomy' => $attributes['taxonomy'],
	'orderby'  => $attributes['orderby'],
	'order'    => $attributes['order'],
	'parent'   => 0,
);

$args = apply_filters( 'snow_monkey_blocks_taxonomy_terms_args', $args, $attributes );

$terms = get_terms( $args );
if ( is_wp_error( $terms ) || ! $terms ) {
	return;
}

$classnames[] = 'smb-taxonomy-terms';
if ( ! empty( $attributes['className'] ) ) {
	$classnames[] = $attributes['className'];
}

$block_style = isset( $attributes['className'] )
							&& preg_match( '|(is-style-[^ "\']+)|', $attributes['className'], $match )
								? $match[1]
								: false;

$block_wrapper_attributes = get_block_wrapper_attributes(
	array(
		'class' => implode( ' ', $classnames ),
	)
);
?>

<div <?php echo wp_kses_post( $block_wrapper_attributes ); ?>>
	<ul class="smb-taxonomy-terms__list">
		<?php foreach ( $terms as $_term ) : ?>
			<?php
			$term_link = get_term_link( $_term );
			if ( is_wp_error( $term_link ) ) {
				continue;
			}
			?>
			<li class="smb-taxonomy-terms__item">
				<a
					href="<?php echo esc_url( $term_link ); ?>"
					class="<?php echo esc_attr( 'is-style-tag' === $block_style ? 'tag-cloud-link' : '' ); ?>"
				>
					<?php echo esc_html( $_term->name ); ?>
					<?php if ( $attributes['displayCount'] ) : ?>
						<span class="smb-taxonomy-terms__item__count"><span><?php echo esc_html( $_term->count ); ?></span></span>
					<?php endif; ?>
				</a>
			</li>
		<?php endforeach; ?>
	</ul>
</div>

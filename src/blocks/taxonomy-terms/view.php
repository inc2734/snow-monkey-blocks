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
if ( ! $terms ) {
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

<div <?php echo $block_wrapper_attributes; ?>>
	<ul class="smb-taxonomy-terms__list">
		<?php foreach ( $terms as $_term ) : ?>
			<li class="smb-taxonomy-terms__item">
				<a
					href="<?php echo esc_url( get_term_link( $_term ) ); ?>"
					class="<?php echo esc_attr( 'is-style-tag' === $block_style ? 'tag-cloud-link' : '' ); ?>"
				><?php echo esc_html( $_term->name ); ?></a>
			</li>
		<?php endforeach; ?>
	</ul>
</div>

<?php
/**
 * @package snow-monkey-blocks
 * @author inc2734
 * @license GPL-2.0+
 */

$name = ! empty( $attributes['name'] ) ? $attributes['name'] : false;

if ( ! $name ) {
	return;
}

if ( ! isset( $block->context['postId'] ) ) {
	return;
}

$post_id = $block->context['postId'];
$value   = get_post_meta( $post_id, $name, true );
$value   = apply_filters( 'snow_monkey_blocks_custom_field_value', $value, $name, $post_id );
if ( ! $value ) {
	return;
}
?>

<div <?php echo get_block_wrapper_attributes( array( 'class' => 'smb-custom-field' ) ); ?>>
	<?php echo $value; ?>
</div>

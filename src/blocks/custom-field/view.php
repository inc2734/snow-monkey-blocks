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

$post_id = get_the_ID();
$value   = get_post_meta( $post_id, $name, true );
$value   = apply_filters( 'snow_monkey_blocks_custom_field_value', $value, $name, $post_id );
if ( ! $value ) {
	return;
}
?>

<div class="smb-custom-field">
	<?php echo $value; ?>
</div>

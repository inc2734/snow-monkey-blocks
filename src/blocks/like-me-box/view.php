<?php
/**
 * @package snow-monkey-blocks
 * @author inc2734
 * @license GPL-2.0+
 */

use Framework\Helper;

$page_name = $attributes['pageName'];

if ( empty( $page_name ) ) {
	return;
}

$classnames[] = 'smb-like-me-box';
if ( ! empty( $attributes['className'] ) ) {
	$classnames[] = $attributes['className'];
}

$block_wrapper_attributes = get_block_wrapper_attributes(
	array(
		'class' => implode( ' ', $classnames ),
	)
);
?>
<div <?php echo wp_kses_post( $block_wrapper_attributes ); ?>>
	<?php
	$template_args = array(
		'_context'            => 'snow-monkey-blocks/like-me-box',
		'_facebook_page_name' => $page_name,
	);

	if ( class_exists( '\Framework\Helper' ) ) {
		\Framework\Helper::get_template_part(
			'template-parts/common/like-me-box',
			null,
			$template_args
		);
	} else {
		get_template_part(
			'template-parts/common/like-me-box',
			null,
			$template_args
		);
	}
	?>
</div>

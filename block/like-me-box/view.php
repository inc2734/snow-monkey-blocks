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
$classnames[] = $attributes['className'];
?>
<div class="<?php echo esc_attr( join( ' ', $classnames ) ); ?>">
	<?php
	Helper::get_template_part(
		'template-parts/common/like-me-box',
		null,
		[
			'_context'            => 'snow-monkey-blocks/like-me-box',
			'_facebook_page_name' => $page_name,
		]
	);
	?>
</div>

<?php
/**
 * @package snow-monkey-blocks
 * @author inc2734
 * @license GPL-2.0+
 *
 * @see https://github.com/inc2734/snow-monkey/blob/master/resources/template-parts/content/child-pages.php
 */

if ( class_exists( '\Framework\Helper' ) ) {
	$pages_query = \Framework\Helper::get_child_pages_query( get_the_ID() );
} else {
	$pages_query = \Inc2734\Mimizuku_Core\Helper\get_child_pages_query( get_the_ID() );
}

if ( ! $pages_query->have_posts() ) {
	return;
}

$classnames[] = 'smb-child-pages';
$classnames[] = $attributes['className'];
?>
<div class="<?php echo esc_attr( join( ' ', $classnames ) ); ?>">
	<?php
	if ( class_exists( '\Framework\Helper' ) ) {
		\Framework\Helper::get_template_part( 'template-parts/content/child-pages' );
	} else {
		get_template_part( 'template-parts/child-pages' );
	}
	?>
</div>

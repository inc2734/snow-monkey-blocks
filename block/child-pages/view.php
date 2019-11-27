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
} elseif ( class_exists( '\Inc2734\Mimizuku_Core\Helper' ) ) {
	$pages_query = \Inc2734\Mimizuku_Core\Helper\get_child_pages_query( get_the_ID() );
}

if ( empty( $pages_query ) ) {
	return;
}

if ( ! $pages_query->have_posts() ) {
	return;
}

if ( isset( $attributes['title'] ) ) {
	$title = $attributes['title'];
	$child_page_title_callback = function( $child_pages_title ) use ( $title ) {
		return $title;
	};
	add_filter( 'snow_monkey_child_pages_title', $child_page_title_callback, 9 );
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

<?php
if ( isset( $child_page_title_callback ) ) {
	remove_filter( 'snow_monkey_child_pages_title', $child_page_title_callback, 9 );
}

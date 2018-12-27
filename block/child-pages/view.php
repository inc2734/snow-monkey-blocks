<?php
/**
 * @package snow-monkey-blocks
 * @author inc2734
 * @license GPL-2.0+
 *
 * @see https://github.com/inc2734/snow-monkey/blob/master/resources/template-parts/content/child-pages.php
 */

use Framework\Helper;

$pages_query = Helper::get_child_pages_query( get_the_ID() );
if ( ! $pages_query->have_posts() ) {
	return;
}

Helper::get_template_part( 'template-parts/content/child-pages' );

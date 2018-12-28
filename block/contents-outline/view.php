<?php
/**
 * @package snow-monkey-blocks
 * @author inc2734
 * @license GPL-2.0+
 */

if ( class_exists( '\Framework\Helper' ) ) {
	\Framework\Helper::get_template_part( 'template-parts/content/contents-outline' );
} else {
	get_template_part( 'template-parts/contents-outline' );
}

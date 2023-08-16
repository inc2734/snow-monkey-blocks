<?php
/**
 * @package snow-monkey-blocks
 * @author inc2734
 * @license GPL-2.0+
 */

use Snow_Monkey\Plugin\Blocks;

wp_register_style(
	generate_block_asset_handle( 'snow-monkey-blocks/section-with-bgvideo', 'style' ),
	SNOW_MONKEY_BLOCKS_DIR_URL . '/dist/blocks/section-with-bgvideo/style.css',
	array(
		generate_block_asset_handle( 'snow-monkey-blocks/section', 'style' ),
		generate_block_asset_handle( 'snow-monkey-blocks/section-with-bgimage', 'style' ),
	),
	filemtime( SNOW_MONKEY_BLOCKS_DIR_PATH . '/dist/blocks/section-with-bgvideo/style.css' )
);

register_block_type(
	__DIR__
);

/**
 * excerpt_allowed_blocks
 */
add_filter(
	'excerpt_allowed_blocks',
	function( $allowed_blocks ) {
		return array_merge(
			$allowed_blocks,
			array(
				'snow-monkey-blocks/section-with-bgvideo',
			)
		);
	}
);

add_filter(
	'render_block_snow-monkey-blocks/section-with-bgvideo',
	function( $content ) {
		$p1 = new WP_HTML_Tag_Processor( $content );
		$p1->next_tag( array( 'class_name' => 'is-layout-constrained' ) );
		$p1_class = $p1->get_attribute( 'class' );

		$p2 = new WP_HTML_Tag_Processor( $content );
		$p2->next_tag( array( 'class_name' => 'smb-section__body' ) );
		$p2_class = $p2->get_attribute( 'class' );

		if ( $p1_class === $p2_class ) {
			return $content;
		}

		$p1->remove_class( 'is-layout-constrained' );
		$p1->remove_class( 'wp-block-section-with-bgvideo-is-layout-constrained' );
		$p1->next_tag( array( 'class_name' => 'smb-section__body' ) );
		$p1->add_class( 'is-layout-constrained' );
		$p1->add_class( 'wp-block-section-with-bgvideo-is-layout-constrained' );
		return $p1->get_updated_html();
	}
);

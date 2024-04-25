<?php
/**
 * @package snow-monkey-blocks
 * @author inc2734
 * @license GPL-2.0+
 */

register_block_type(
	__DIR__
);

add_filter(
	'render_block_snow-monkey-blocks/flex',
	function ( $block_content, $block ) {
		$p = new \WP_HTML_Tag_Processor( $block_content );
		$p->next_tag();
		$class = $p->get_attribute( 'class' );

		if ( isset( $block['attrs']['layout']['orientation'] ) ) {
			$target = 'is-' . $block['attrs']['layout']['orientation'];

			if ( false === strpos( $class, $target ) ) {
				$p->set_attribute( 'class', trim( $class . ' ' . $target ) );
			}
		} else {
			$p->set_attribute( 'class', trim( $class . ' is-vertical' ) );
		}

		$block_content = $p->get_updated_html();
		return $block_content;
	},
	10,
	2
);

/**
 * excerpt_allowed_blocks
 */
add_filter(
	'excerpt_allowed_blocks',
	function ( $allowed_blocks ) {
		return array_merge(
			$allowed_blocks,
			array(
				'snow-monkey-blocks/flexs',
			)
		);
	}
);

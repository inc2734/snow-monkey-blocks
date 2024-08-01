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
	function ( $block_content, $block, $instance ) {
		$block_type      = \WP_Block_Type_Registry::get_instance()->get_registered( $block['blockName'] );
		$global_settings = wp_get_global_settings();

		if ( current_theme_supports( 'disable-layout-styles' ) ) {
			return $block_content;
		}

		$gap_value = isset( $instance->attributes['style']['spacing']['blockGap'] )
			? $instance->attributes['style']['spacing']['blockGap']
			: null;

		if ( is_null( $gap_value ) ) {
			return $block_content;
		}

		// Dont support sides values.
		if ( is_array( $gap_value ) ) {
			if ( isset( $gap_value['top'] ) ) {
				$gap_value = $gap_value['top'];
			} else {
				return $block_content;
			}
		}

		if ( preg_match( '/var:preset\|([^\|]+)\|(.+)/', $gap_value, $match ) ) {
			$gap_value = 'var(--wp--preset--' . $match[1] . '--' . $match[2] . ')';
		}

		$block_gap = isset( $global_settings['spacing']['blockGap'] )
			? $global_settings['spacing']['blockGap']
			: null;

		$has_block_gap_support = isset( $block_gap );
		if ( ! $has_block_gap_support ) {
			return $block_content;
		}

		$p = new \WP_HTML_Tag_Processor( $block_content );
		$p->next_tag();
		$class = $p->get_attribute( 'class' );
		if ( ! preg_match( '|wp-container\-snow-monkey\-blocks\-flex\-is\-layout\-\d+|ms', $class, $match ) ) {
			return $block_content;
		}

		$selector = '.' . $match[0];

		wp_style_engine_get_stylesheet_from_css_rules(
			array(
				array(
					'selector'     => $selector,
					'declarations' => array( 'gap' => $gap_value ),
				),
			),
			array(
				'context'  => 'block-supports',
				'optimize' => true,
			)
		);

		return $block_content;
	},
	11,
	3
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

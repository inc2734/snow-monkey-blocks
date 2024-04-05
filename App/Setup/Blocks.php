<?php
/**
 * @package snow-monkey-blocks
 * @author inc2734
 * @license GPL-2.0+
 */

namespace Snow_Monkey\Plugin\Blocks\App\Setup;

class Blocks {

	/**
	 * constructor
	 */
	public function __construct() {
		/**
		 * Hooks.
		 */
		add_filter(
			'render_block',
			function ( $block_content, $block ) {
				$p = new \WP_HTML_Tag_Processor( $block_content );
				$p->next_tag();

				// --smb--flex-grow
				if ( isset( $block['attrs']['smb']['flexGrow'] ) ) {
					$style    = $p->get_attribute( 'style' );
					$property = '--smb--flex-grow:';
					if ( ! $style || false === strpos( $style, $property ) ) {
						$style = $style ? $style . ';' : $style;
						$p->set_attribute( 'style', trim( $style . $property . $block['attrs']['smb']['flexGrow'] ) );
					}
				}

				// --smb--flex-shrink
				if ( isset( $block['attrs']['smb']['flexShrink'] ) ) {
					$style    = $p->get_attribute( 'style' );
					$property = '--smb--flex-shrink:';
					if ( ! $style || false === strpos( $style, $property ) ) {
						$style = $style ? $style . ';' : $style;
						$p->set_attribute( 'style', trim( $style . $property . $block['attrs']['smb']['flexShrink'] ) );
					}
				}

				// --smb--flex-basis
				if ( isset( $block['attrs']['smb']['flexBasis'] ) ) {
					$style    = $p->get_attribute( 'style' );
					$property = '--smb--flex-basis:';
					if ( ! $style || false === strpos( $style, $property ) ) {
						$style = $style ? $style . ';' : $style;
						$p->set_attribute( 'style', trim( $style . $property . $block['attrs']['smb']['flexBasis'] ) );
					}
				}

				// --smb--justify-self
				if ( isset( $block['attrs']['smb']['justifySelf'] ) ) {
					$style    = $p->get_attribute( 'style' );
					$property = '--smb--justify-self:';
					if ( ! $style || false === strpos( $style, $property ) ) {
						$style = $style ? $style . ';' : $style;
						$p->set_attribute( 'style', trim( $style . $property . $block['attrs']['smb']['justifySelf'] ) );
					}
				}

				// --smb--align-self
				if ( isset( $block['attrs']['smb']['alignSelf'] ) ) {
					$style    = $p->get_attribute( 'style' );
					$property = '--smb--align-self:';
					if ( ! $style || false === strpos( $style, $property ) ) {
						$style = $style ? $style . ';' : $style;
						$p->set_attribute( 'style', trim( $style . $property . $block['attrs']['smb']['alignSelf'] ) );
					}
				}

				// --smb--grid-column
				if ( isset( $block['attrs']['smb']['gridColumn'] ) ) {
					$style    = $p->get_attribute( 'style' );
					$property = '--smb--grid-column:';
					if ( ! $style || false === strpos( $style, $property ) ) {
						$style = $style ? $style . ';' : $style;
						$p->set_attribute( 'style', trim( $style . $property . $block['attrs']['smb']['gridColumn'] ) );
					}
				}

				// --smb--grid-row
				if ( isset( $block['attrs']['smb']['gridRow'] ) ) {
					$style    = $p->get_attribute( 'style' );
					$property = '--smb--grid-row:';
					if ( ! $style || false === strpos( $style, $property ) ) {
						$style = $style ? $style . ';' : $style;
						$p->set_attribute( 'style', trim( $style . $property . $block['attrs']['smb']['gridRow'] ) );
					}
				}

				$block_content = $p->get_updated_html();
				return $block_content;
			},
			10,
			2
		);
	}
}

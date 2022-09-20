<?php
/**
 * @package snow-monkey-blocks
 * @author inc2734
 * @license GPL-2.0+
 */

namespace Snow_Monkey\Plugin\Blocks\App;

use Snow_Monkey\Plugin\Blocks;

class Helper {

	/**
	 * Return inner_html from DOMNode.
	 *
	 * @param \DOMNode $element DOMNode object.
	 * @return string
	 */
	public static function inner_html( \DOMNode $element ) {
		$inner_html = '';
		// phpcs:disable WordPress.NamingConventions.ValidVariableName.UsedPropertyNotSnakeCase
		$children = $element->childNodes;
		// phpcs:enable

		foreach ( $children as $child ) {
			// phpcs:disable WordPress.NamingConventions.ValidVariableName.UsedPropertyNotSnakeCase
			$inner_html .= $element->ownerDocument->saveHTML( $child );
			// phpcs:enable
		}

		return $inner_html;
	}
}

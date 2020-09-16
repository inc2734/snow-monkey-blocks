<?php
/**
 * @package snow-monkey-blocks
 * @author inc2734
 * @license GPL-2.0+
 */

namespace Snow_Monkey\Plugin\Blocks\App;

use Snow_Monkey\Plugin\Blocks;

class DynamicBlocks {

	/**
	 * Render template.
	 *
	 * @param string $slug Slug of the block view.
	 * @param array  $attributes This variable can be referenced in the template.
	 * @param string $content Inner content.
	 * @return string
	 */
	public static function render(
		$slug,
		// phpcs:disable VariableAnalysis.CodeAnalysis.VariableAnalysis.UnusedVariable
		$attributes,
		$content = null
		// phpcs:enable
	) {
		ob_start();
		include( SNOW_MONKEY_BLOCKS_DIR_PATH . '/block/' . $slug . '/view.php' );
		return ob_get_clean();
	}
}

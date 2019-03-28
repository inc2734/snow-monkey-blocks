<?php
/**
 * @package snow-monkey-blocks
 * @author inc2734
 * @license GPL-2.0+
 */

namespace Snow_Monkey\Plugin\Blocks\App\Setup;

use Snow_Monkey\Plugin\Blocks;

class DynamicBlocks {
	public function __construct() {
		foreach ( glob( SNOW_MONKEY_BLOCKS_DIR_PATH . '/block/*/block.php' ) as $file ) {
			include( $file );
		}
	}

	/**
	 * Render template
	 *
	 * @param string $slug
	 * @param array $attributes This variable can be referenced in the template.
	 * @return string
	 */
	public static function render( $slug, $attributes, $content = null ) {
		ob_start();
		include( SNOW_MONKEY_BLOCKS_DIR_PATH . '/block/' . $slug . '/view.php' );
		return ob_get_clean();
	}
}

<?php
/**
 * @package snow-monkey-blocks
 * @author inc2734
 * @license GPL-2.0+
 */

namespace Snow_Monkey\Plugin\Blocks\App\Api\BlockTemplates;

class Helper {

	/**
	 * Return block template html
	 *
	 * @param string $path
	 * @return string
	 */
	public static function render( $path ) {
		if ( ! file_exists( $path ) ) {
			return;
		}

		ob_start();
		include( $path );
		return ob_get_clean();
	}

	/**
	 * Return config
	 *
	 * @return array
	 */
	public static function load_config() {
		return include( __DIR__ . '/config.php' );
	}
}

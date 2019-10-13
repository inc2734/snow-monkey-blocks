<?php
/**
 * @package snow-monkey-blocks
 * @author inc2734
 * @license GPL-2.0+
 */

namespace Snow_Monkey\Plugin\Blocks\App\RestAPI;

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
	public static function load_config( $path ) {
		if ( ! file_exists( $path . '/config.php' ) ) {
			return [];
		}
		return include( $path . '/config.php' );
	}
}

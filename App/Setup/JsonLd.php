<?php
/**
 * @package snow-monkey-blocks
 * @author inc2734
 * @license GPL-2.0+
 */

namespace Snow_Monkey\Plugin\Blocks\App\Setup;

use Snow_Monkey\Plugin\Blocks\App\Model\JsonLd as JsonLdManager;

class JsonLd {

	/**
	 * Constructor.
	 */
	public function __construct() {
		add_action( 'wp_footer', array( $this, '_output' ) );
	}

	/**
	 * Output JSON-LD.
	 */
	public function _output() {
		JsonLdManager::start();
		JsonLdManager::output();
	}
}

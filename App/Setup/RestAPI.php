<?php
/**
 * @package snow-monkey-blocks
 * @author inc2734
 * @license GPL-2.0+
 */

namespace Snow_Monkey\Plugin\Blocks\App\Setup;

use Snow_Monkey\Plugin\Blocks;
use Snow_Monkey\Plugin\Blocks\App;

class RestAPI {

	public function __construct() {
		new App\RestAPI\BlockTemplatesCategories\EntryPoint();
		new App\RestAPI\BlockTemplatesPanel\EntryPoint();

		foreach ( glob( SNOW_MONKEY_BLOCKS_DIR_PATH . '/block/*/rest-api.php' ) as $file ) {
			include( $file );
		}
	}
}

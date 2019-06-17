<?php
/**
 * @package snow-monkey-blocks
 * @author inc2734
 * @license GPL-2.0+
 */

namespace Snow_Monkey\Plugin\Blocks\App\Setup;

use Snow_Monkey\Plugin\Blocks;
use Snow_Monkey\Plugin\Blocks\App\Api;

class RestApi {
	public function __construct() {
		// エディタ用
		new Api\TemplateCategories();
		new Api\TemplateParts();
		// ブロック用
		foreach ( glob( SNOW_MONKEY_BLOCKS_DIR_PATH . '/block/*/api.php' ) as $file ) {
			include( $file );
		}
	}
}

<?php
/**
 * @package snow-monkey-blocks
 * @author inc2734
 * @license GPL-2.0+
 */

use Snow_Monkey\Plugin\Blocks;

/**
 * script
 */
wp_register_script(
	'snow-monkey-blocks/tabs',
	SNOW_MONKEY_BLOCKS_DIR_URL . '/dist/block/tabs/script.js',
	[],
	filemtime( SNOW_MONKEY_BLOCKS_DIR_PATH . '/dist/block/tabs/script.js' ),
	true
);

register_block_type(
	__DIR__,
	[
		'script' => ! is_admin() ? 'snow-monkey-blocks/tabs' : null,
	]
);

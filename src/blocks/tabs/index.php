<?php
/**
 * @package snow-monkey-blocks
 * @author inc2734
 * @license GPL-2.0+
 */

use Snow_Monkey\Plugin\Blocks;

wp_register_style(
	'snow-monkey-blocks/tabs',
	SNOW_MONKEY_BLOCKS_DIR_URL . '/dist/blocks/tabs/style.css',
	array(),
	filemtime( SNOW_MONKEY_BLOCKS_DIR_PATH . '/dist/blocks/tabs/style.css' )
);

wp_register_style(
	'snow-monkey-blocks/tabs/editor',
	SNOW_MONKEY_BLOCKS_DIR_URL . '/dist/blocks/tabs/editor.css',
	array( 'snow-monkey-blocks/tabs' ),
	filemtime( SNOW_MONKEY_BLOCKS_DIR_PATH . '/dist/blocks/tabs/editor.css' )
);

register_block_type(
	__DIR__
);

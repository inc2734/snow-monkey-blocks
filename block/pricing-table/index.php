<?php
/**
 * @package snow-monkey-blocks
 * @author inc2734
 * @license GPL-2.0+
 */

use Snow_Monkey\Plugin\Blocks;
use Snow_Monkey\Plugin\Blocks\App\DynamicBlocks;

/**
 * style
 */
wp_register_style(
	'snow-monkey-blocks/pricing-table',
	SNOW_MONKEY_BLOCKS_DIR_URL . '/dist/block/pricing-table/style.css',
	[ 'snow-monkey-blocks' ],
	filemtime( SNOW_MONKEY_BLOCKS_DIR_PATH . '/dist/block/pricing-table/style.css' )
);

/**
 * editor_script
 */
$asset = include( SNOW_MONKEY_BLOCKS_DIR_PATH . '/dist/block/pricing-table/editor.asset.php' );
wp_register_script(
	'snow-monkey-blocks/pricing-table/editor',
	SNOW_MONKEY_BLOCKS_DIR_URL . '/dist/block/pricing-table/editor.js',
	array_merge( $asset['dependencies'], [ 'snow-monkey-blocks-editor' ] ),
	filemtime( SNOW_MONKEY_BLOCKS_DIR_PATH . '/dist/block/pricing-table/editor.js' ),
	true
);

/**
 * editor_style
 */
wp_register_style(
	'snow-monkey-blocks/pricing-table/editor',
	SNOW_MONKEY_BLOCKS_DIR_URL . '/dist/block/pricing-table/editor.css',
	[ 'snow-monkey-blocks/pricing-table', 'snow-monkey-blocks-editor' ],
	filemtime( SNOW_MONKEY_BLOCKS_DIR_PATH . '/dist/block/pricing-table/editor.css' )
);

register_block_type(
	'snow-monkey-blocks/pricing-table',
	[
		'style'         => 'snow-monkey-blocks/pricing-table',
		'editor_script' => 'snow-monkey-blocks/pricing-table/editor',
		'editor_style'  => 'snow-monkey-blocks/pricing-table/editor',
	]
);

<?php
/**
 * @package snow-monkey-blocks
 * @author inc2734
 * @license GPL-2.0+
 */

use Snow_Monkey\Plugin\Blocks;
use Snow_Monkey\Plugin\Blocks\App\DynamicBlocks;

/**
 * editor_script
 */
$asset = include( SNOW_MONKEY_BLOCKS_DIR_PATH . '/dist/block/pickup-slider/editor.asset.php' );
wp_register_script(
	'snow-monkey-blocks/pickup-slider/editor',
	SNOW_MONKEY_BLOCKS_DIR_URL . '/dist/block/pickup-slider/editor.js',
	array_merge( $asset['dependencies'], [ 'snow-monkey-blocks-editor' ] ),
	filemtime( SNOW_MONKEY_BLOCKS_DIR_PATH . '/dist/block/pickup-slider/editor.js' ),
	true
);

/**
 * nopro
 */
wp_enqueue_script(
	'snow-monkey-blocks/pickup-slider/nopro',
	! Blocks\is_pro() && ! is_admin() ? SNOW_MONKEY_BLOCKS_DIR_URL . '/dist/block/pickup-slider/nopro.js' : null,
	[],
	filemtime( SNOW_MONKEY_BLOCKS_DIR_PATH . '/dist/block/pickup-slider/nopro.js' ),
	true
);

/**
 * nopro
 */
wp_enqueue_style(
	'snow-monkey-blocks/pickup-slider/nopro',
	! Blocks\is_pro() && ! is_admin() ? SNOW_MONKEY_BLOCKS_DIR_URL . '/dist/block/pickup-slider/nopro.css' : null,
	[],
	filemtime( SNOW_MONKEY_BLOCKS_DIR_PATH . '/dist/block/pickup-slider/nopro.css' )
);

/**
 * nopro
 */
wp_enqueue_style(
	'snow-monkey-blocks/pickup-slider/nopro/editor',
	! Blocks\is_pro() && is_admin() ? SNOW_MONKEY_BLOCKS_DIR_URL . '/dist/block/pickup-slider/nopro-editor.css' : null,
	[],
	filemtime( SNOW_MONKEY_BLOCKS_DIR_PATH . '/dist/block/pickup-slider/nopro-editor.css' )
);

$attributes = include( SNOW_MONKEY_BLOCKS_DIR_PATH . '/block/pickup-slider/attributes.php' );
$supports   = include( SNOW_MONKEY_BLOCKS_DIR_PATH . '/block/pickup-slider/supports.php' );

register_block_type(
	'snow-monkey-blocks/pickup-slider',
	[
		'editor_script'   => 'snow-monkey-blocks/pickup-slider/editor',
		'attributes'      => $attributes,
		'supports'        => $supports,
		'render_callback' => function( $attributes, $content ) {
			return DynamicBlocks::render( 'pickup-slider', $attributes, $content );
		},
	]
);

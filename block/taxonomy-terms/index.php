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
	'snow-monkey-blocks/taxonomy-terms',
	SNOW_MONKEY_BLOCKS_DIR_URL . '/dist/block/taxonomy-terms/style.css',
	[ 'snow-monkey-blocks' ],
	filemtime( SNOW_MONKEY_BLOCKS_DIR_PATH . '/dist/block/taxonomy-terms/style.css' )
);

/**
 * editor_script
 */
$asset = include( SNOW_MONKEY_BLOCKS_DIR_PATH . '/dist/block/taxonomy-terms/editor.asset.php' );
wp_register_script(
	'snow-monkey-blocks/taxonomy-terms/editor',
	SNOW_MONKEY_BLOCKS_DIR_URL . '/dist/block/taxonomy-terms/editor.js',
	array_merge( $asset['dependencies'], [ 'snow-monkey-blocks-editor' ] ),
	filemtime( SNOW_MONKEY_BLOCKS_DIR_PATH . '/dist/block/taxonomy-terms/editor.js' ),
	true
);

/**
 * nopro
 */
wp_enqueue_script(
	'snow-monkey-blocks/taxonomy-terms/nopro',
	! Blocks\is_pro() && ! is_admin() ? SNOW_MONKEY_BLOCKS_DIR_URL . '/dist/block/taxonomy-terms/nopro.js' : null,
	[],
	filemtime( SNOW_MONKEY_BLOCKS_DIR_PATH . '/dist/block/taxonomy-terms/nopro.js' ),
	true
);

/**
 * nopro
 */
wp_enqueue_style(
	'snow-monkey-blocks/taxonomy-terms/nopro',
	! Blocks\is_pro() && ! is_admin() ? SNOW_MONKEY_BLOCKS_DIR_URL . '/dist/block/taxonomy-terms/nopro.css' : null,
	[],
	filemtime( SNOW_MONKEY_BLOCKS_DIR_PATH . '/dist/block/taxonomy-terms/nopro.css' )
);

/**
 * nopro
 */
wp_enqueue_style(
	'snow-monkey-blocks/taxonomy-terms/nopro/editor',
	! Blocks\is_pro() && is_admin() ? SNOW_MONKEY_BLOCKS_DIR_URL . '/dist/block/taxonomy-terms/nopro-editor.css' : null,
	[],
	filemtime( SNOW_MONKEY_BLOCKS_DIR_PATH . '/dist/block/taxonomy-terms/nopro-editor.css' )
);

$attributes = file_get_contents( __DIR__ . '/block/attributes.json' );
$attributes = json_decode( $attributes, true );

register_block_type(
	'snow-monkey-blocks/taxonomy-terms',
	[
		'style'           => 'snow-monkey-blocks/taxonomy-terms',
		'editor_script'   => 'snow-monkey-blocks/taxonomy-terms/editor',
		'attributes'      => $attributes,
		'render_callback' => function( $attributes ) {
			return DynamicBlocks::render( 'taxonomy-terms', $attributes );
		},
	]
);

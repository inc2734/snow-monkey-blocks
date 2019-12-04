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
$asset = include( SNOW_MONKEY_BLOCKS_DIR_PATH . '/dist/block/taxonomy-posts/editor.asset.php' );
wp_register_script(
	'snow-monkey-blocks/taxonomy-posts/editor',
	SNOW_MONKEY_BLOCKS_DIR_URL . '/dist/block/taxonomy-posts/editor.js',
	array_merge( $asset['dependencies'], [ 'snow-monkey-blocks-editor' ] ),
	filemtime( SNOW_MONKEY_BLOCKS_DIR_PATH . '/dist/block/taxonomy-posts/editor.js' ),
	true
);

/**
 * nopro
 */
wp_register_script(
	'snow-monkey-blocks/taxonomy-posts/nopro',
	SNOW_MONKEY_BLOCKS_DIR_URL . '/dist/block/taxonomy-posts/nopro.js',
	[],
	filemtime( SNOW_MONKEY_BLOCKS_DIR_PATH . '/dist/block/taxonomy-posts/nopro.js' ),
	true
);

/**
 * nopro
 */
wp_register_style(
	'snow-monkey-blocks/taxonomy-posts/nopro',
	SNOW_MONKEY_BLOCKS_DIR_URL . '/dist/block/taxonomy-posts/nopro.css',
	[],
	filemtime( SNOW_MONKEY_BLOCKS_DIR_PATH . '/dist/block/taxonomy-posts/nopro.css' )
);

$attributes = include( SNOW_MONKEY_BLOCKS_DIR_PATH . '/block/taxonomy-posts/attributes.php' );
$supports   = include( SNOW_MONKEY_BLOCKS_DIR_PATH . '/block/taxonomy-posts/supports.php' );

register_block_type(
	'snow-monkey-blocks/taxonomy-posts',
	[
		'script'          => ! Blocks\is_pro() && ! is_admin() ? 'snow-monkey-blocks/taxonomy-posts/nopro' : null,
		'style'           => ! Blocks\is_pro() ? 'snow-monkey-blocks/taxonomy-posts/nopro' : null,
		'editor_script'   => 'snow-monkey-blocks/taxonomy-posts/editor',
		'attributes'      => $attributes,
		'supports'        => $supports,
		'render_callback' => function( $attributes ) {
			return DynamicBlocks::render( 'taxonomy-posts', $attributes );
		},
	]
);

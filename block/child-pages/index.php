<?php
/**
 * @package snow-monkey-blocks
 * @author inc2734
 * @license GPL-2.0+
 */

use Snow_Monkey\Plugin\Blocks;
use Snow_Monkey\Plugin\Blocks\App\DynamicBlocks;

$asset      = include( SNOW_MONKEY_BLOCKS_DIR_PATH . '/dist/block/child-pages/editor.asset.php' );
$attributes = include( SNOW_MONKEY_BLOCKS_DIR_PATH . '/block/child-pages/attributes.php' );

wp_register_script(
	'snow-monkey-blocks/child-pages/editor',
	SNOW_MONKEY_BLOCKS_DIR_URL . '/dist/block/child-pages/editor.js',
	array_merge( $asset['dependencies'], [ 'snow-monkey-blocks-editor' ] ),
	filemtime( SNOW_MONKEY_BLOCKS_DIR_PATH . '/dist/block/child-pages/editor.js' ),
	true
);

wp_register_script(
	'snow-monkey-blocks/child-pages/nopro',
	SNOW_MONKEY_BLOCKS_DIR_URL . '/dist/block/child-pages/nopro.js',
	[],
	filemtime( SNOW_MONKEY_BLOCKS_DIR_PATH . '/dist/block/child-pages/nopro.js' ),
	true
);

wp_register_style(
	'snow-monkey-blocks/child-pages/nopro',
	SNOW_MONKEY_BLOCKS_DIR_URL . '/dist/block/child-pages/nopro.css',
	[],
	filemtime( SNOW_MONKEY_BLOCKS_DIR_PATH . '/dist/block/child-pages/nopro.css' )
);

register_block_type(
	'snow-monkey-blocks/child-pages',
	[
		'script'          => ! Blocks\is_pro() && ! is_admin() ? 'snow-monkey-blocks/child-pages/nopro' : null,
		'style'           => ! Blocks\is_pro() ? 'snow-monkey-blocks/child-pages/nopro' : null,
		'editor_script'   => 'snow-monkey-blocks/child-pages/editor',
		'attributes'      => $attributes,
		'render_callback' => function( $attributes, $content ) {
			return DynamicBlocks::render( 'child-pages', $attributes, $content );
		},
	]
);

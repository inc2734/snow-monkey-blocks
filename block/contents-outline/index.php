<?php
/**
 * @package snow-monkey-blocks
 * @author inc2734
 * @license GPL-2.0+
 */

use Snow_Monkey\Plugin\Blocks;
use Snow_Monkey\Plugin\Blocks\App\DynamicBlocks;

$asset      = include( SNOW_MONKEY_BLOCKS_DIR_PATH . '/dist/block/contents-outline/editor.asset.php' );
$attributes = include( SNOW_MONKEY_BLOCKS_DIR_PATH . '/block/contents-outline/attributes.php' );

wp_register_script(
	'snow-monkey-blocks/contents-outline/editor',
	SNOW_MONKEY_BLOCKS_DIR_URL . '/dist/block/contents-outline/editor.js',
	array_merge( $asset['dependencies'], [ 'snow-monkey-blocks-editor' ] ),
	filemtime( SNOW_MONKEY_BLOCKS_DIR_PATH . '/dist/block/contents-outline/editor.js' ),
	true
);

wp_register_script(
	'snow-monkey-blocks/contents-outline/nopro',
	SNOW_MONKEY_BLOCKS_DIR_URL . '/dist/block/contents-outline/nopro.js',
	[],
	filemtime( SNOW_MONKEY_BLOCKS_DIR_PATH . '/dist/block/contents-outline/nopro.js' ),
	true
);

wp_register_style(
	'snow-monkey-blocks/contents-outline/nopro',
	SNOW_MONKEY_BLOCKS_DIR_URL . '/dist/block/contents-outline/nopro.css',
	[],
	filemtime( SNOW_MONKEY_BLOCKS_DIR_PATH . '/dist/block/contents-outline/nopro.css' )
);

register_block_type(
	'snow-monkey-blocks/contents-outline',
	[
		'script'          => ! Blocks\is_pro() && ! is_admin() ? 'snow-monkey-blocks/contents-outline/nopro' : null,
		'style'           => ! Blocks\is_pro() ? 'snow-monkey-blocks/contents-outline/nopro' : null,
		'editor_script'   => 'snow-monkey-blocks/contents-outline/editor',
		'attributes'      => $attributes,
		'render_callback' => function( $attributes, $content ) {
			return DynamicBlocks::render( 'contents-outline', $attributes, $content );
		},
	]
);

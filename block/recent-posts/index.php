<?php
/**
 * @package snow-monkey-blocks
 * @author inc2734
 * @license GPL-2.0+
 */

use Snow_Monkey\Plugin\Blocks;
use Snow_Monkey\Plugin\Blocks\App\DynamicBlocks;

$asset      = include( SNOW_MONKEY_BLOCKS_DIR_PATH . '/dist/block/recent-posts/editor.asset.php' );
$attributes = include( SNOW_MONKEY_BLOCKS_DIR_PATH . '/block/recent-posts/attributes.php' );

wp_register_script(
	'snow-monkey-blocks/recent-posts/editor',
	SNOW_MONKEY_BLOCKS_DIR_URL . '/dist/block/recent-posts/editor.js',
	array_merge( $asset['dependencies'], [ 'snow-monkey-blocks-editor' ] ),
	filemtime( SNOW_MONKEY_BLOCKS_DIR_PATH . '/dist/block/recent-posts/editor.js' ),
	true
);

wp_register_script(
	'snow-monkey-blocks/recent-posts/nopro',
	SNOW_MONKEY_BLOCKS_DIR_URL . '/dist/block/recent-posts/nopro.js',
	[],
	filemtime( SNOW_MONKEY_BLOCKS_DIR_PATH . '/dist/block/recent-posts/nopro.js' ),
	true
);

wp_register_style(
	'snow-monkey-blocks/recent-posts/nopro',
	SNOW_MONKEY_BLOCKS_DIR_URL . '/dist/block/recent-posts/nopro.css',
	[],
	filemtime( SNOW_MONKEY_BLOCKS_DIR_PATH . '/dist/block/recent-posts/nopro.css' )
);

register_block_type(
	'snow-monkey-blocks/recent-posts',
	[
		'script'          => ! Blocks\is_pro() && ! is_admin() ? 'snow-monkey-blocks/recent-posts/nopro' : null,
		'style'           => ! Blocks\is_pro() ? 'snow-monkey-blocks/recent-posts/nopro' : null,
		'editor_script'   => 'snow-monkey-blocks/recent-posts/editor',
		'attributes'      => $attributes,
		'render_callback' => function( $attributes ) {
			return DynamicBlocks::render( 'recent-posts', $attributes );
		},
		'supports' => [
			'anchor' => false,
		],
	]
);

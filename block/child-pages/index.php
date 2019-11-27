<?php
/**
 * @package snow-monkey-blocks
 * @author inc2734
 * @license GPL-2.0+
 */

use Snow_Monkey\Plugin\Blocks\App\DynamicBlocks;
use Snow_Monkey\Plugin\Blocks;

$asset      = include( SNOW_MONKEY_BLOCKS_DIR_PATH . '/dist/block/child-pages/editor.asset.php' );
$attributes = include( SNOW_MONKEY_BLOCKS_DIR_PATH . '/block/child-pages/attributes.php' );

wp_register_script(
	'snow-monkey-blocks/child-pages/editor',
	SNOW_MONKEY_BLOCKS_DIR_URL . '/dist/block/child-pages/editor.js',
	array_merge( $asset['dependencies'], [ 'snow-monkey-blocks-editor' ] ),
	$asset['version'],
	true
);

wp_register_style(
	'snow-monkey-blocks/child-pages/nopro',
	SNOW_MONKEY_BLOCKS_DIR_URL . '/dist/block/child-pages/nopro.css',
	[],
	$asset['version']
);

register_block_type(
	'snow-monkey-blocks/child-pages',
	[
		'style'           => ! Blocks\is_pro() ? 'snow-monkey-blocks/child-pages/nopro' : null,
		'editor_script'   => 'snow-monkey-blocks/child-pages/editor',
		'attributes'      => $attributes,
		'render_callback' => function( $attributes, $content ) {
			return DynamicBlocks::render( 'child-pages', $attributes, $content );
		},
	]
);

add_action(
	'wp_enqueue_scripts',
	function() {
		if ( Blocks\is_pro() ) {
			return;
		}

		wp_register_script(
			'snow-monkey-blocks/child-pages/nopro',
			SNOW_MONKEY_BLOCKS_DIR_URL . '/dist/block/child-pages/nopro.js',
			[],
			filemtime( SNOW_MONKEY_BLOCKS_DIR_PATH . '/dist/block/child-pages/nopro.js' ),
			true
		);
	}
);

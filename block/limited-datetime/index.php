<?php
/**
 * @package snow-monkey-blocks
 * @author inc2734
 * @license GPL-2.0+
 */

use Snow_Monkey\Plugin\Blocks\App\DynamicBlocks;

$asset      = include( SNOW_MONKEY_BLOCKS_DIR_PATH . '/dist/block/limited-datetime/editor.asset.php' );
$attributes = include( SNOW_MONKEY_BLOCKS_DIR_PATH . '/block/limited-datetime/attributes.php' );

wp_register_script(
	'snow-monkey-blocks/limited-datetime/editor',
	SNOW_MONKEY_BLOCKS_DIR_URL . '/dist/block/limited-datetime/editor.js',
	array_merge( $asset['dependencies'], [ 'snow-monkey-blocks-editor' ] ),
	filemtime( SNOW_MONKEY_BLOCKS_DIR_PATH . '/dist/block/limited-datetime/editor.js' ),
	true
);

wp_register_style(
	'snow-monkey-blocks/limited-datetime/editor',
	SNOW_MONKEY_BLOCKS_DIR_URL . '/dist/block/limited-datetime/editor.css',
	[ 'snow-monkey-blocks-editor' ],
	filemtime( SNOW_MONKEY_BLOCKS_DIR_PATH . '/dist/block/limited-datetime/editor.css' )
);

register_block_type(
	'snow-monkey-blocks/limited-datetime',
	[
		'attributes'      => $attributes,
		'editor_script'   => 'snow-monkey-blocks/limited-datetime/editor',
		'editor_style'    => 'snow-monkey-blocks/limited-datetime/editor',
		'render_callback' => function( $attributes, $content ) {
			return DynamicBlocks::render( 'limited-datetime', $attributes, $content );
		},
	]
);

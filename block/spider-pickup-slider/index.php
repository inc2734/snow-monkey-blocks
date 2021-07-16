<?php
/**
 * @package snow-monkey-blocks
 * @author inc2734
 * @license GPL-2.0+
 */

use Snow_Monkey\Plugin\Blocks\App\DynamicBlocks;

/**
 * script
 */
wp_register_script(
	'snow-monkey-blocks/spider-pickup-slider',
	SNOW_MONKEY_BLOCKS_DIR_URL . '/dist/block/spider-pickup-slider/script.js',
	[ 'spider' ],
	filemtime( SNOW_MONKEY_BLOCKS_DIR_PATH . '/dist/block/spider-pickup-slider/script.js' )
);

/**
 * style
 */
wp_register_style(
	'snow-monkey-blocks/spider-pickup-slider',
	SNOW_MONKEY_BLOCKS_DIR_URL . '/dist/block/spider-pickup-slider/style.css',
	[ 'snow-monkey-blocks', 'spider' ],
	filemtime( SNOW_MONKEY_BLOCKS_DIR_PATH . '/dist/block/spider-pickup-slider/style.css' )
);

/**
 * editor_script
 */
$asset = include( SNOW_MONKEY_BLOCKS_DIR_PATH . '/dist/block/spider-pickup-slider/editor.asset.php' );
wp_register_script(
	'snow-monkey-blocks/spider-pickup-slider/editor',
	SNOW_MONKEY_BLOCKS_DIR_URL . '/dist/block/spider-pickup-slider/editor.js',
	array_merge( $asset['dependencies'], [ 'snow-monkey-blocks-editor' ] ),
	filemtime( SNOW_MONKEY_BLOCKS_DIR_PATH . '/dist/block/spider-pickup-slider/editor.js' ),
	true
);

register_block_type(
	__DIR__,
	[
		'style'           => ! is_admin() ? 'snow-monkey-blocks/spider-pickup-slider' : null,
		'script'          => ! is_admin() ? 'snow-monkey-blocks/spider-pickup-slider' : null,
		'editor_script'   => 'snow-monkey-blocks/spider-pickup-slider/editor',
		'render_callback' => function( $attributes, $content ) {
			return DynamicBlocks::render( 'spider-pickup-slider', $attributes, $content );
		},
	]
);

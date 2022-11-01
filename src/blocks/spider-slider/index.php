<?php
/**
 * @package snow-monkey-blocks
 * @author inc2734
 * @license GPL-2.0+
 */

wp_register_style(
	'snow-monkey-blocks/spider-slider',
	SNOW_MONKEY_BLOCKS_DIR_URL . '/dist/blocks/spider-slider/style.css',
	array( 'spider' ),
	filemtime( SNOW_MONKEY_BLOCKS_DIR_PATH . '/dist/blocks/spider-slider/style.css' )
);

wp_register_style(
	'snow-monkey-blocks/spider-slider/editor',
	SNOW_MONKEY_BLOCKS_DIR_URL . '/dist/blocks/spider-slider/editor.css',
	array( 'snow-monkey-blocks/spider-slider' ),
	filemtime( SNOW_MONKEY_BLOCKS_DIR_PATH . '/dist/blocks/spider-slider/editor.css' )
);

register_block_type(
	__DIR__
);

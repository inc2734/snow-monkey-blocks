<?php
/**
 * @package snow-monkey-blocks
 * @author inc2734
 * @license GPL-2.0+
 */

wp_register_style(
	generate_block_asset_handle( 'snow-monkey-blocks/spider-contents-slider', 'style' ),
	SNOW_MONKEY_BLOCKS_DIR_URL . '/dist/blocks/spider-contents-slider/style.css',
	array( generate_block_asset_handle( 'snow-monkey-blocks/spider-slider', 'style' ) ),
	filemtime( SNOW_MONKEY_BLOCKS_DIR_PATH . '/dist/blocks/spider-contents-slider/style.css' )
);

register_block_type(
	__DIR__,
	array(
		'script' => ! is_admin() ? 'spider' : null,
	)
);

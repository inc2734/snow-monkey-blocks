<?php
/**
 * @package snow-monkey-blocks
 * @author inc2734
 * @license GPL-2.0+
 */

wp_register_style(
	generate_block_asset_handle( 'snow-monkey-blocks/pricing-table', 'style' ),
	SNOW_MONKEY_BLOCKS_DIR_URL . '/dist/blocks/pricing-table/style.css',
	array( generate_block_asset_handle( 'snow-monkey-blocks/btn', 'style' ) ),
	filemtime( SNOW_MONKEY_BLOCKS_DIR_PATH . '/dist/blocks/pricing-table/style.css' )
);

register_block_type(
	__DIR__
);

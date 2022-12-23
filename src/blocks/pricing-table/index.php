<?php
/**
 * @package snow-monkey-blocks
 * @author inc2734
 * @license GPL-2.0+
 */

wp_register_style(
	'snow-monkey-blocks/pricing-table',
	SNOW_MONKEY_BLOCKS_DIR_URL . '/dist/blocks/pricing-table/style.css',
	array( 'snow-monkey-blocks/btn' ),
	filemtime( SNOW_MONKEY_BLOCKS_DIR_PATH . '/dist/blocks/pricing-table/style.css' )
);

register_block_type(
	__DIR__
);

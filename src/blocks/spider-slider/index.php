<?php
/**
 * @package snow-monkey-blocks
 * @author inc2734
 * @license GPL-2.0+
 */

register_block_type(
	__DIR__
);

/**
 * @todo I want to use wp_enqueue_block_style(),
 * but when I use spider-contents-slider or spider-pickup-slider,
 * the CSS for spider-slider is not loaded,
 * so I use wp_enqueue_style().
 */
add_action(
	'enqueue_block_assets',
	function () {
		wp_enqueue_style(
			generate_block_asset_handle( 'snow-monkey-blocks/spider-slider', 'style' ),
			SNOW_MONKEY_BLOCKS_DIR_URL . '/dist/blocks/spider-slider/style-index.css',
			array( 'spider' ),
			filemtime( __DIR__ . '/style-index.css' )
		);
	}
);

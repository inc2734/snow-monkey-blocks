<?php
/**
 * @package snow-monkey-blocks
 * @author inc2734
 * @license GPL-2.0+
 */

use Snow_Monkey\Plugin\Blocks\App\DynamicBlocks;

register_block_type(
	'snow-monkey-blocks/limited-datetime',
	[
		'attributes' => [
			'isUseStartDate' => [
				'type'    => 'boolean',
				'default' => false,
			],
			'startDate' => [
				'type'    => 'date',
				'default' => null,
			],
			'isUseEndDate' => [
				'type'    => 'boolean',
				'default' => false,
			],
			'endDate' => [
				'type'    => 'date',
				'default' => null,
			],
		],
		'render_callback' => function( $attributes, $content ) {
			return DynamicBlocks::render( 'limited-datetime', $attributes, $content );
		},
	]
);

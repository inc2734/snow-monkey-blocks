<?php
/**
 * @package snow-monkey-blocks
 * @author inc2734
 * @author kmix-39
 * @license GPL-2.0+
 */

namespace Snow_Monkey\Plugin\Blocks\App\RestAPI\BlockTemplateCategories;

use Snow_Monkey\Plugin\Blocks\App\RestAPI\Helper;

class EntryPoint {

	const REST_API_NAMESPACE = 'snow-monkey-blocks/v5';
	const REST_API_ROUTE = '/block-template-categories/';

	public function __construct() {
		add_action( 'rest_api_init', [ $this, '_rest_api_init' ] );
	}

	public function _rest_api_init() {
		register_rest_route(
			self::REST_API_NAMESPACE,
			self::REST_API_ROUTE,
			[
				'methods'  => 'GET',
				'callback' => [ $this, '_callback' ],
				'permission_callback' => function () {
					return current_user_can( 'edit_posts' );
				},
			]
		);
	}

	public function _callback() {
		$categories_config = apply_filters( 'snow_monkey_blocks_block_template_categories', Helper::load_config( __DIR__ ) );

		$result = [];

		foreach ( $categories_config as $category ) {
			$category = shortcode_atts(
				[
					'title' => null,
					'slug'  => null,
					'isPro' => false,
				],
				$category
			);

			if ( ! $category['title'] || ! $category['slug'] ) {
				continue;
			}

			$result[] = $category;
		}

		return $result;
	}
}

<?php
/**
 * @package snow-monkey-blocks
 * @author kmix-39
 * @license GPL-2.0+
 */

namespace Snow_Monkey\Plugin\Blocks\App\Api\TemplateCategories;

use Snow_Monkey\Plugin\Blocks\App\Setup\RestApi;

class TemplateCategories {

	const REST_API_NAMESPACE = 'snow-monkey-blocks/v3';
	const REST_API_ROUTE = '/template-categories/';

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
		$categories = [
			[
				'title' => _x( 'Headings', 'template-category', 'snow-monkey-blocks' ),
				'slug'  => 'smb-template-headings',
				'isPro' => false,
			],
			[
				'title' => _x( 'Features', 'template-category', 'snow-monkey-blocks' ),
				'slug'  => 'smb-template-features',
				'isPro' => false,
			],
			[
				'title' => _x( 'Pricing', 'template-category', 'snow-monkey-blocks' ),
				'slug'  => 'smb-template-pricing',
				'isPro' => false,
			],
			[
				'title' => _x( 'FAQ', 'template-category', 'snow-monkey-blocks' ),
				'slug'  => 'smb-template-faq',
				'isPro' => false,
			],
		];

		$result = [];

		foreach ( $categories as $category ) {
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

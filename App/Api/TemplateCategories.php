<?php
/**
 * @package snow-monkey-blocks
 * @author kmix-39
 * @license GPL-2.0+
 */

namespace Snow_Monkey\Plugin\Blocks\App\Api;

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
				'methods' => 'GET',
				'callback' => function() {
					$result = [];
					// 値のダミー処理
					// 本来ならここにカテゴリーの定義やらを書く事
					$categories = [
						[
							'title' => 'Header',
							'slug' => 'smb-template-header',
							'isPro' => false,
						],
						[
							'title' => 'Test',
							'slug' => 'smb-template-test',
							'isPro' => true,
						],
					];
					foreach ( $categories as $category ) {
						$result[] = [
							'title' => $category['title'],
							'slug'  => $category['slug'],
							'isPro' => $category['isPro'],
						];
					}
					// ダミーここまで

					return $result;
				},
				'permission_callback' => function () {
					return current_user_can( 'edit_posts' );
				},
			]
		);
	}
}

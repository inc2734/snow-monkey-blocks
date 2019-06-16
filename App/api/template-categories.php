<?php
/**
 * @package snow-monkey-blocks
 * @author kmix-39
 * @license GPL-2.0+
 */

use Snow_Monkey\Plugin\Blocks\App\Setup\RestApi;

add_action(
	'rest_api_init',
	function() {
		register_rest_route(
			'snow-monkey-blocks/v3',
			'/template-categories/',
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
);

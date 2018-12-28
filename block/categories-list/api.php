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
			'snow-monkey-blocks/v4',
			'/article-categories',
			[
				'methods' => 'GET',
				'callback' => function() {
					$result = [];
					$categories = get_categories();
					foreach ( $categories as $category ) {
						$category_detail = get_category( $category );
						$result[] = [
							'label' => $category_detail->cat_name,
							'value' => $category_detail->term_id,
						];
					}
					return $result;
				},
				'permission_callback' => function () {
					return current_user_can( 'edit_posts' );
				},
			]
		);
	}
);

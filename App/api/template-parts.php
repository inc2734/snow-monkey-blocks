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
			'/template-parts/',
			[
				'methods' => 'GET',
				'callback' => function() {
					$result = [];

					// 値のダミー処理
					// 本来ならここにカテゴリー毎のパーツ定義に関する処理を書く事
					if ( isset( $_REQUEST['slug'] ) ) {
						switch( $_REQUEST['slug'] ) {
							case 'smb-template-header' :
								// カテゴリーに対する取得処理
								break;
							case 'smb-template-test' :
								break;
						}
					}

					$parts = [
						[
							'title' => 'Test1',
							'screenshot' => 'http://placehold.it/32x32',
							'content' => '<!-- wp:snow-monkey-blocks/balloon {"balloonName":"Test"} -->
							<div class="wp-block-snow-monkey-blocks-balloon smb-balloon">
							<div class="smb-balloon__person">
							<div class="smb-balloon__figure">
							<img src="https://0.gravatar.com/avatar/00000000000000000000000000000000?s=128&amp;d=mp&amp;r=g" alt="" class="wp-image-0"/>
							</div>
							<div class="smb-balloon__name">Test</div>
							</div>
							<div class="smb-balloon__body"></div>
							</div>
							<!-- /wp:snow-monkey-blocks/balloon -->',
						],
						[
							'title' => 'Test2',
							'screenshot' => 'http://placehold.it/32x32',
							'content' => '<!-- wp:snow-monkey-blocks/balloon {"balloonName":"Test"} -->
							<div class="wp-block-snow-monkey-blocks-balloon smb-balloon">
							<div class="smb-balloon__person">
							<div class="smb-balloon__figure">
							<img src="https://0.gravatar.com/avatar/00000000000000000000000000000000?s=128&amp;d=mp&amp;r=g" alt="" class="wp-image-0"/>
							</div>
							<div class="smb-balloon__name">Test</div>
							</div>
							<div class="smb-balloon__body"></div>
							</div>
							<!-- /wp:snow-monkey-blocks/balloon -->',
						],
					];
					foreach ( $parts as $part ) {
						$result[] = [
							'title' => $part['title'],
							'screenshot'  => $part['screenshot'],
							'content' => $part['content'],
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
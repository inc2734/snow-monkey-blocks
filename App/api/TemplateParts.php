<?php
/**
 * @package snow-monkey-blocks
 * @author kmix-39
 * @license GPL-2.0+
 */

namespace Snow_Monkey\Plugin\Blocks\App\Api;

use Snow_Monkey\Plugin\Blocks\App\Setup\RestApi;

class TemplateParts {

	const NAMESPACE = 'snow-monkey-blocks/v3';
	const ROUTE = '/template-parts/';

	public function __construct() {
		add_action( 'rest_api_init', [ $this, '_rest_api_init' ] );
	}

	public function _rest_api_init() {
		register_rest_route(
			self::NAMESPACE,
			self::ROUTE,
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
							'isPro' => false,
							'screenshot' => 'http://placehold.it/640x640',
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
							'isPro' => true,
							'screenshot' => 'http://placehold.it/640x640',
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
							'isPro' => $part['isPro'],
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
}

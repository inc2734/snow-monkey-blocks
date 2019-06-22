<?php
/**
 * @package snow-monkey-blocks
 * @author kmix-39
 * @license GPL-2.0+
 */

namespace Snow_Monkey\Plugin\Blocks\App\Api\BlockTemplates;

use Snow_Monkey\Plugin\Blocks\App\Setup\RestApi;
use Snow_Monkey\Plugin\Blocks\App\Api\BlockTemplates\Helper;

class BlockTemplates {

	const REST_API_NAMESPACE = 'snow-monkey-blocks/v3';
	const REST_API_ROUTE     = '/block-templates/';

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
		$block_templates = Helper::load_config();

		$result = [];

		foreach ( $block_templates as $block_template ) {
			$block_template = shortcode_atts(
				[
					'category'   => null,
					'title'      => null,
					'isPro'      => false,
					'screenshot' => false,
					'content'    => false,
				],
				$block_template
			);

			if ( ! $block_template['category'] || ! $block_template['title'] || ! $block_template['content'] ) {
				continue;
			}

			$result[ $block_template['category'] ][] = $block_template;
		}

		if ( isset( $_REQUEST['slug'] ) && isset( $result[ $_REQUEST['slug'] ] ) ) {
			return $result[ $_REQUEST['slug'] ];
		}

		return [];
	}
}

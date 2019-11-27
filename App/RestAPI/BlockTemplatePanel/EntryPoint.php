<?php
/**
 * @package snow-monkey-blocks
 * @author inc2734
 * @author kmix-39
 * @license GPL-2.0+
 */

namespace Snow_Monkey\Plugin\Blocks\App\RestAPI\BlockTemplatePanel;

use Snow_Monkey\Plugin\Blocks\App\RestAPI\Helper;

class EntryPoint {

	const REST_API_NAMESPACE = 'snow-monkey-blocks/v5';
	const REST_API_ROUTE = '/block-template-panel/';

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
		if ( ! isset( $_REQUEST['slug'] ) ) {
			return [];
		}

		$panel_config = apply_filters( 'snow_monkey_blocks_block_templates', Helper::load_config( __DIR__ ) );

		$results = [];

		foreach ( $panel_config as $panel ) {
			$panel = shortcode_atts(
				[
					'category'   => null,
					'title'      => null,
					'isPro'      => false,
					'screenshot' => false,
					'content'    => false,
				],
				$panel
			);

			if ( ! $panel['category'] || ! $panel['title'] || ! $panel['content'] ) {
				continue;
			}

			$results[ $panel['category'] ][] = $panel;
		}

		if ( isset( $results[ $_REQUEST['slug'] ] ) ) {
			return $results[ $_REQUEST['slug'] ];
		}

		return [];
	}
}

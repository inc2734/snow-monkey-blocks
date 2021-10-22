<?php
/**
 * @package snow-monkey-blocks
 * @author inc2734
 * @license GPL-2.0+
 */

namespace Snow_Monkey\Plugin\Blocks\App\Setup;

use Snow_Monkey\Plugin\Blocks;

class BlockPatterns {

	/**
	 * constructor
	 */
	public function __construct() {
		if ( ! Blocks\is_pro() ) {
			return;
		}

		add_action( 'init', [ $this, '_register_block_patterns' ] );
	}

	/**
	 * Register block patterns.
	 *
	 * @return void
	 */
	public function _register_block_patterns() {
		$block_pattern_categories = [
			[
				'name'  => 'smb-headers',
				'label' => __( 'Headers', 'snow-monkey-blocks' ),
			],
			[
				'name'  => 'smb-features',
				'label' => __( 'Features', 'snow-monkey-blocks' ),
			],
			[
				'name'  => 'smb-text-with-image',
				'label' => __( 'Text with image', 'snow-monkey-blocks' ),
			],
			[
				'name'  => 'smb-pricing',
				'label' => __( 'Pricing', 'snow-monkey-blocks' ),
			],
			[
				'name'  => 'smb-faq',
				'label' => __( 'FAQ', 'snow-monkey-blocks' ),
			],
		];

		foreach ( $block_pattern_categories as $block_pattern_categorie ) {
			register_block_pattern_category(
				$block_pattern_categorie['name'],
				[
					'label' => '[Snow Monkey Blocks] ' . $block_pattern_categorie['label'],
				]
			);
		}

		register_block_pattern(
			'snow-monkey-blocks/header-1',
			[
				// translators: $1: number
				'title'      => sprintf( __( 'Header %1$s', 'snow-monkey-blocks' ), 1 ),
				'categories' => [ 'smb-headers' ],
				'content'    => $this->_render( SNOW_MONKEY_BLOCKS_DIR_PATH . '/patterns/header-1/pattern.php' ),
			]
		);

		register_block_pattern(
			'snow-monkey-blocks/header-2',
			[
				// translators: $1: number
				'title'      => sprintf( __( 'Header %1$s', 'snow-monkey-blocks' ), 2 ),
				'categories' => [ 'smb-headers' ],
				'content'    => $this->_render( SNOW_MONKEY_BLOCKS_DIR_PATH . '/patterns/header-2/pattern.php' ),
			]
		);

		register_block_pattern(
			'snow-monkey-blocks/header-3',
			[
				// translators: $1: number
				'title'      => sprintf( __( 'Header %1$s', 'snow-monkey-blocks' ), 3 ),
				'categories' => [ 'smb-headers' ],
				'content'    => $this->_render( SNOW_MONKEY_BLOCKS_DIR_PATH . '/patterns/header-3/pattern.php' ),
			]
		);

		register_block_pattern(
			'snow-monkey-blocks/feature-1',
			[
				// translators: $1: number
				'title'      => sprintf( __( 'Feature %1$s', 'snow-monkey-blocks' ), 1 ),
				'categories' => [ 'smb-features' ],
				'content'    => $this->_render( SNOW_MONKEY_BLOCKS_DIR_PATH . '/patterns/feature-1/pattern.php' ),
			]
		);

		register_block_pattern(
			'snow-monkey-blocks/feature-2',
			[
				// translators: $1: number
				'title'      => sprintf( __( 'Feature %1$s', 'snow-monkey-blocks' ), 2 ),
				'categories' => [ 'smb-features' ],
				'content'    => $this->_render( SNOW_MONKEY_BLOCKS_DIR_PATH . '/patterns/feature-2/pattern.php' ),
			]
		);

		register_block_pattern(
			'snow-monkey-blocks/feature-3',
			[
				// translators: $1: number
				'title'      => sprintf( __( 'Feature %1$s', 'snow-monkey-blocks' ), 3 ),
				'categories' => [ 'smb-features' ],
				'content'    => $this->_render( SNOW_MONKEY_BLOCKS_DIR_PATH . '/patterns/feature-3/pattern.php' ),
			]
		);

		register_block_pattern(
			'snow-monkey-blocks/feature-4',
			[
				// translators: $1: number
				'title'      => sprintf( __( 'Feature %1$s', 'snow-monkey-blocks' ), 4 ),
				'categories' => [ 'smb-features' ],
				'content'    => $this->_render( SNOW_MONKEY_BLOCKS_DIR_PATH . '/patterns/feature-4/pattern.php' ),
			]
		);

		register_block_pattern(
			'snow-monkey-blocks/feature-5',
			[
				// translators: $1: number
				'title'      => sprintf( __( 'Feature %1$s', 'snow-monkey-blocks' ), 5 ),
				'categories' => [ 'smb-features' ],
				'content'    => $this->_render( SNOW_MONKEY_BLOCKS_DIR_PATH . '/patterns/feature-5/pattern.php' ),
			]
		);

		register_block_pattern(
			'snow-monkey-blocks/feature-6',
			[
				// translators: $1: number
				'title'      => sprintf( __( 'Feature %1$s', 'snow-monkey-blocks' ), 6 ),
				'categories' => [ 'smb-features' ],
				'content'    => $this->_render( SNOW_MONKEY_BLOCKS_DIR_PATH . '/patterns/feature-6/pattern.php' ),
			]
		);

		register_block_pattern(
			'snow-monkey-blocks/text-with-image-1',
			[
				// translators: $1: number
				'title'      => sprintf( __( 'Text with image %1$s', 'snow-monkey-blocks' ), 1 ),
				'categories' => [ 'smb-text-with-image' ],
				'content'    => $this->_render( SNOW_MONKEY_BLOCKS_DIR_PATH . '/patterns/text-with-image-1/pattern.php' ),
			]
		);

		register_block_pattern(
			'snow-monkey-blocks/text-with-image-2',
			[
				// translators: $1: number
				'title'      => sprintf( __( 'Text with image %1$s', 'snow-monkey-blocks' ), 2 ),
				'categories' => [ 'smb-text-with-image' ],
				'content'    => $this->_render( SNOW_MONKEY_BLOCKS_DIR_PATH . '/patterns/text-with-image-2/pattern.php' ),
			]
		);

		register_block_pattern(
			'snow-monkey-blocks/text-with-image-3',
			[
				// translators: $1: number
				'title'      => sprintf( __( 'Text with image %1$s', 'snow-monkey-blocks' ), 3 ),
				'categories' => [ 'smb-text-with-image' ],
				'content'    => $this->_render( SNOW_MONKEY_BLOCKS_DIR_PATH . '/patterns/text-with-image-3/pattern.php' ),
			]
		);

		register_block_pattern(
			'snow-monkey-blocks/pricing-1',
			[
				// translators: $1: number
				'title'      => sprintf( __( 'Pricing %1$s', 'snow-monkey-blocks' ), 1 ),
				'categories' => [ 'smb-pricing' ],
				'content'    => $this->_render( SNOW_MONKEY_BLOCKS_DIR_PATH . '/patterns/pricing-1/pattern.php' ),
			]
		);

		register_block_pattern(
			'snow-monkey-blocks/faq-1',
			[
				// translators: $1: number
				'title'      => sprintf( __( 'FAQ %1$s', 'snow-monkey-blocks' ), 1 ),
				'categories' => [ 'smb-faq' ],
				'content'    => $this->_render( SNOW_MONKEY_BLOCKS_DIR_PATH . '/patterns/faq-1/pattern.php' ),
			]
		);

		register_block_pattern(
			'snow-monkey-blocks/faq-2',
			[
				// translators: $1: number
				'title'      => sprintf( __( 'FAQ %1$s', 'snow-monkey-blocks' ), 2 ),
				'categories' => [ 'smb-faq' ],
				'content'    => $this->_render( SNOW_MONKEY_BLOCKS_DIR_PATH . '/patterns/faq-2/pattern.php' ),
			]
		);
	}

	/**
	 * Return block pattern html
	 *
	 * @param string $path Path to the block pattern template path.
	 * @return string
	 */
	protected function _render( $path ) {
		$path = realpath( $path );
		if ( ! file_exists( $path ) ) {
			return;
		}

		ob_start();
		include( $path );
		return preg_replace( '/(\t|\r\n|\r|\n)/ms', '', ob_get_clean() );
	}
}

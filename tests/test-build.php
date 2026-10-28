<?php
/**
 * Integration tests for built block assets.
 *
 * @package Snow_Monkey_Blocks
 */

class Build_Test extends WP_UnitTestCase {

	/**
	 * Representative parent, child, dynamic, and slider blocks.
	 *
	 * @return array
	 */
	public static function block_names() {
		return array(
			array( 'snow-monkey-blocks/accordion' ),
			array( 'snow-monkey-blocks/accordion-item' ),
			array( 'snow-monkey-blocks/btn' ),
			array( 'snow-monkey-blocks/recent-posts' ),
			array( 'snow-monkey-blocks/spider-slider' ),
			array( 'snow-monkey-blocks/spider-pickup-slider' ),
			array( 'snow-monkey-blocks/spider-contents-slider' ),
			array( 'snow-monkey-blocks/spider-contents-slider-item' ),
		);
	}

	/**
	 * Built metadata must register blocks and their editor dependencies.
	 *
	 * @dataProvider block_names
	 * @param string $name Block name.
	 */
	public function test_built_block_is_registered( $name ) {
		$block = WP_Block_Type_Registry::get_instance()->get_registered( $name );
		$this->assertInstanceOf( WP_Block_Type::class, $block );
		$this->assertNotEmpty( $block->editor_script_handles );

		foreach ( $block->editor_script_handles as $handle ) {
			$this->assertTrue( wp_script_is( $handle, 'registered' ), $handle );
			$script = wp_scripts()->registered[ $handle ];
			foreach ( $script->deps as $dependency ) {
				$this->assertTrue( wp_script_is( $dependency, 'registered' ), $dependency );
			}
		}
	}

	/**
	 * Front-end assets must retain the paths used by the plugin.
	 */
	public function test_slider_assets_are_available() {
		$assets = new Snow_Monkey\Plugin\Blocks\App\Setup\Assets();
		$assets->_enqueue_block_assets();

		$this->assertTrue( wp_script_is( 'spider', 'enqueued' ) );
		$this->assertTrue( wp_style_is( 'spider', 'enqueued' ) );

		foreach ( array( 'dist/packages/spider/dist/js/spider.js', 'dist/packages/spider/dist/css/spider.css' ) as $path ) {
			$this->assertFileExists( SNOW_MONKEY_BLOCKS_DIR_PATH . '/' . $path );
			$this->assertGreaterThan( 0, filesize( SNOW_MONKEY_BLOCKS_DIR_PATH . '/' . $path ) );
		}
	}
}

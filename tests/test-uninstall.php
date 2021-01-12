<?php
use Snow_Monkey\Plugin\Blocks\App\Controller\Manager;

class Uninstall_Test extends WP_UnitTestCase {

	/**
	 * @test
	 */
	public function available_blocks() {
		update_option( Manager::AVAILABLE_BLOCKS_NAME, 1 );
		$this->assertSame( 1, get_option( Manager::AVAILABLE_BLOCKS_NAME ) );

		Manager::_uninstall();

		$this->assertFalse( get_option( Manager::AVAILABLE_BLOCKS_NAME ) );
	}
}

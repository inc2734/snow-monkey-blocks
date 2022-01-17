<?php
/**
 * @package snow-monkey-blocks
 * @author inc2734
 * @license GPL-2.0+
 */

namespace Snow_Monkey\Plugin\Blocks\App\Setup;

use Snow_Monkey\Plugin\Blocks;

class TextDomain {

	/**
	 * Constructor
	 */
	public function __construct() {
		add_filter( 'load_textdomain_mofile', [ $this, '_load_textdomain_mofile' ], 10, 2 );
		load_plugin_textdomain( 'snow-monkey-blocks', false, basename( SNOW_MONKEY_BLOCKS_DIR_PATH ) . '/languages' );
		add_action( 'enqueue_block_editor_assets', [ $this, '_enqueue_block_editor_assets' ], 1 );
	}

	/**
	 * When local .mo file exists, load this.
	 *
	 * @param string $mofile Path to the MO file.
	 * @param string $domain Text domain. Unique identifier for retrieving translated strings.
	 * @return string
	 */
	public function _load_textdomain_mofile( $mofile, $domain ) {
		if ( 'snow-monkey-blocks' === $domain ) {
			$mofilename   = basename( $mofile );
			$local_mofile = SNOW_MONKEY_BLOCKS_DIR_PATH . '/languages/' . $mofilename;
			if ( file_exists( $local_mofile ) ) {
				return $local_mofile;
			}
		}
		return $mofile;
	}

	/**
	 * Enqueue block script for editor.
	 */
	public function _enqueue_block_editor_assets() {
		$asset = include( SNOW_MONKEY_BLOCKS_DIR_PATH . '/dist/js/blocks.asset.php' );
		wp_enqueue_script(
			'snow-monkey-blocks-editor',
			SNOW_MONKEY_BLOCKS_DIR_URL . '/dist/js/blocks.js',
			$asset['dependencies'],
			filemtime( SNOW_MONKEY_BLOCKS_DIR_PATH . '/dist/js/blocks.js' ),
			false
		);

		wp_set_script_translations(
			'snow-monkey-blocks-editor',
			'snow-monkey-blocks',
			SNOW_MONKEY_BLOCKS_DIR_PATH . '/languages'
		);

		wp_localize_script(
			'snow-monkey-blocks-editor',
			'smb',
			[
				'pluginUrl' => SNOW_MONKEY_BLOCKS_DIR_URL,
				'pluginDir' => SNOW_MONKEY_BLOCKS_DIR_PATH,
				'isPro'     => Blocks\is_pro(),
			]
		);
	}
}

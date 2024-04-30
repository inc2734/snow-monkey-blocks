<?php
/**
 * @package snow-monkey-blocks
 * @author inc2734
 * @license GPL-2.0+
 */

namespace Snow_Monkey\Plugin\Blocks\App\Controller;

use WP_Block_Type_Registry;

class Manager {

	/**
	 * Setting page slug.
	 *
	 * @var string
	 */
	const MENU_SLUG = 'snow-monkey-blocks';

	/**
	 * Available blocks setting name.
	 *
	 * @var string
	 */
	const AVAILABLE_BLOCKS_NAME = 'smb-available-blocks';

	/**
	 * constructor
	 */
	public function __construct() {
		add_action( 'admin_menu', array( $this, '_admin_menu' ) );
		add_action( 'admin_init', array( $this, '_init_available_blocks_settings' ) );
		add_action( 'init', array( $this, '_unregister_block_type' ), 10000 );

		register_uninstall_hook(
			__FILE__,
			array( '\Snow_Monkey\Plugin\Blocks\App\Controller\Manager', '_uninstall' )
		);
	}

	/**
	 * Add admin menu.
	 */
	public function _admin_menu() {
		add_options_page(
			__( 'Snow Monkey Blocks', 'snow-monkey-blocks' ),
			__( 'Snow Monkey Blocks', 'snow-monkey-blocks' ),
			'manage_options',
			self::MENU_SLUG,
			function () {
				?>
				<div class="wrap">
					<h1><?php esc_html_e( 'Snow Monkey Blocks', 'snow-monkey-blocks' ); ?></h1>
					<form method="post" action="options.php">
						<?php
						settings_fields( self::MENU_SLUG );
						do_settings_sections( self::MENU_SLUG );
						submit_button();
						?>
					</form>

					<form method="post" action="options.php">
						<input type="hidden" name="smb-available-blocks[reset]" value="1">
						<?php
						settings_fields( self::MENU_SLUG );
						submit_button(
							esc_html__( 'Reset available blocks settings', 'snow-monkey-blocks' ),
							'secondary'
						);
						?>
					</form>
				</div>
				<?php
			}
		);
	}

	/**
	 * Initialize available blocks settings.
	 */
	public function _init_available_blocks_settings() {
		if ( ! $this->_is_option_page() && ! $this->_is_options_page() ) {
			return;
		}

		if ( $this->_is_options_page() && self::MENU_SLUG !== filter_input( INPUT_POST, 'option_page' ) ) {
			return;
		}

		$blocks = $this->get_blocks();

		// Initial update.
		// Default available is true.
		if ( ! get_option( self::AVAILABLE_BLOCKS_NAME ) ) {
			$initial_option = array();
			foreach ( $blocks as $block ) {
				$initial_option[ $block->name ] = 1;
			}
			update_option( self::AVAILABLE_BLOCKS_NAME, $initial_option );
		}

		register_setting(
			self::MENU_SLUG,
			self::AVAILABLE_BLOCKS_NAME,
			function ( $option ) use ( $blocks ) {
				if ( isset( $option['reset'] ) && '1' === $option['reset'] ) {
					return array();
				}

				$new_option = array();
				foreach ( $option as $key => $value ) {
					if ( false !== strpos( $key, 'snow-monkey-blocks/' ) ) {
						$new_option[ $key ] = $value;
					}
				}

				return $new_option;
			}
		);

		add_settings_section(
			self::AVAILABLE_BLOCKS_NAME,
			__( 'Available blocks', 'snow-monkey-blocks' ),
			function () {
			},
			self::MENU_SLUG
		);

		foreach ( $blocks as $block ) {
			add_settings_field(
				'available-' . $block->name,
				// phpcs:disable WordPress.WP.I18n.NonSingularStringLiteralText
				'<label for="available-' . $block->name . '">' . esc_html_x( $block->title ? $block->title : $block->name, 'block title', 'snow-monkey-blocks' ) . '</label>',
				// phpcs:enable
				function () use ( $block ) {
					$checked = 0 !== $this->_get_option( $block->name, self::AVAILABLE_BLOCKS_NAME );
					?>
					<input
						type="hidden"
						name="<?php echo esc_attr( self::AVAILABLE_BLOCKS_NAME ); ?>[<?php echo esc_attr( $block->name ); ?>]"
						value="0"
					>
					<input
						type="checkbox"
						id="available-<?php echo esc_attr( $block->name ); ?>"
						name="<?php echo esc_attr( self::AVAILABLE_BLOCKS_NAME ); ?>[<?php echo esc_attr( $block->name ); ?>]"
						value="1"
						<?php checked( true, $checked ); ?>
					>
					<span class="smb-available-block-toggle"></span>
					<?php
				},
				self::MENU_SLUG,
				self::AVAILABLE_BLOCKS_NAME
			);
		}
	}

	/**
	 * unregister_block_type() on front-end and post edit page.
	 */
	public function _unregister_block_type() {
		if ( $this->_is_option_page() ) {
			return;
		}

		$available_blocks = (array) get_option( self::AVAILABLE_BLOCKS_NAME );
		$blocks           = $this->get_blocks();

		// Set 1 when the block is added, since the block will be valueless.
		foreach ( $blocks as $block ) {
			if ( ! isset( $block->name, $available_blocks ) ) {
				$available_blocks[ $block->name ] = 1;
			}
		}

		foreach ( $available_blocks as $block_name => $available ) {
			if ( ! $available && WP_Block_Type_Registry::get_instance()->is_registered( $block_name ) ) {
				unregister_block_type( $block_name );
			}
		}
	}

	/**
	 * Uninstall
	 */
	public static function _uninstall() {
		delete_option( self::AVAILABLE_BLOCKS_NAME );
	}

	/**
	 * Get blocks of Snow Monkey Blocks.
	 *
	 * @return array
	 */
	protected function get_blocks() {
		$iterator = new \RecursiveDirectoryIterator( SNOW_MONKEY_BLOCKS_DIR_PATH . '/dist/blocks', \FilesystemIterator::SKIP_DOTS );
		$iterator = new \RecursiveIteratorIterator( $iterator );
		$blocks   = array();
		foreach ( $iterator as $file ) {
			if ( ! $file->isFile() ) {
				continue;
			}

			if ( 'block.json' !== $file->getBasename() ) {
				continue;
			}

			// phpcs:disable WordPress.WP.AlternativeFunctions.file_get_contents_file_get_contents
			$data = json_decode( file_get_contents( realpath( $file->getPathname() ) ) );
			// phpcs:enable

			$blocks[ $data->name ] = (object) array(
				'name'   => $data->name,
				'title'  => $data->title,
				'parent' => ! empty( $data->parent ) ? $data->parent : array(),
			);
		}
		ksort( $blocks );

		return array_filter(
			$blocks,
			function ( $block_type ) {
				return false !== strpos( $block_type->name, 'snow-monkey-blocks/' )
						&& false === strpos( $block_type->name, '--' )
						&& 'snow-monkey-blocks/btn' !== $block_type->name
						&& 'core/post-content' !== $block_type->name
						&& ! $block_type->parent;
			}
		);
	}

	/**
	 * Return option.
	 *
	 * @param string $key The option key name.
	 * @param string $option_name The option name.
	 * @return mixed
	 */
	protected function _get_option( $key, $option_name ) {
		$option = get_option( $option_name );
		if ( ! $option ) {
			return false;
		}

		return isset( $option[ $key ] ) ? (int) $option[ $key ] : false;
	}

	/**
	 * Return true is option page.
	 *
	 * @return boolean
	 */
	protected function _is_option_page() {
		$current_url = admin_url( '/options-general.php?page=' . static::MENU_SLUG ) ?? '';
		$current_url = preg_replace( '|^(.+)?(/wp-admin/.*?)$|', '$2', $current_url );
		$request_uri = filter_input( INPUT_SERVER, 'REQUEST_URI' ) ?? '';
		$request_uri = preg_replace( '|^(.+)?(/wp-admin/.*?)$|', '$2', $request_uri );
		return false !== strpos( $request_uri, $current_url );
	}

	/**
	 * Return true is options page.
	 *
	 * @return boolean
	 */
	protected function _is_options_page() {
		$current_url = admin_url( '/options.php' ) ?? '';
		$current_url = preg_replace( '|^(.+)?(/wp-admin/.*?)$|', '$2', $current_url );
		$request_uri = filter_input( INPUT_SERVER, 'REQUEST_URI' ) ?? '';
		$request_uri = preg_replace( '|^(.+)?(/wp-admin/.*?)$|', '$2', $request_uri );
		return false !== strpos( $request_uri, $current_url );
	}
}

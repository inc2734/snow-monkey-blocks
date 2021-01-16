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
		add_action( 'admin_menu', [ $this, '_admin_menu' ] );
		add_action( 'admin_init', [ $this, '_init_available_blocks_settings' ] );
		add_action( 'init', [ $this, '_unregister_block_type' ], 10000 );

		register_uninstall_hook(
			__FILE__,
			[ '\Snow_Monkey\Plugin\Blocks\App\Controller\Manager', '_uninstall' ]
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
			function() {
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
		$blocks = $this->get_blocks();

		if ( ! get_option( self::AVAILABLE_BLOCKS_NAME ) ) {
			$initial_option = [];
			foreach ( $blocks as $block ) {
				$initial_option[ $block->name ] = 1;
			}
			update_option( self::AVAILABLE_BLOCKS_NAME, $initial_option );
		}

		register_setting(
			self::MENU_SLUG,
			self::AVAILABLE_BLOCKS_NAME,
			function( $option ) use ( $blocks ) {
				if ( isset( $option['reset'] ) && '1' === $option['reset'] ) {
					return [];
				}

				$default_option = [];
				foreach ( $blocks as $block ) {
					$default_option[ $block->name ] = false;
				}

				$new_option = [];
				foreach ( $default_option as $key => $value ) {
					$new_option[ $key ] = ! empty( $option[ $key ] ) ? 1 : $value;
				}

				return $new_option;
			}
		);

		add_settings_section(
			self::AVAILABLE_BLOCKS_NAME,
			__( 'Available blocks', 'snow-monkey-blocks' ),
			function() {
			},
			self::MENU_SLUG
		);

		foreach ( $blocks as $block ) {
			add_settings_field(
				'available-' . $block->name,
				// phpcs:disable WordPress.WP.I18n.NonSingularStringLiteralText
				'<label for="available-' . $block->name . '">' . esc_html__( $block->title ? $block->title : $block->name, 'snow-monkey-blocks' ) . '</label>',
				// phpcs:enable
				function() use ( $block ) {
					?>
					<input
						type="checkbox"
						id="available-<?php echo esc_attr( $block->name ); ?>"
						name="<?php echo esc_attr( self::AVAILABLE_BLOCKS_NAME ); ?>[<?php echo esc_attr( $block->name ); ?>]"
						value="1"
						<?php checked( 1, $this->_get_option( $block->name, self::AVAILABLE_BLOCKS_NAME ) ); ?>
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
		$option_page_slug = str_replace(
			get_site_url(),
			'',
			admin_url( '/options-general.php?page=' . static::MENU_SLUG )
		);

		if ( $_SERVER['REQUEST_URI'] === $option_page_slug ) {
			return;
		}

		$available_blocks = (array) get_option( self::AVAILABLE_BLOCKS_NAME, [] );
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
		$blocks = WP_Block_Type_Registry::get_instance()->get_all_registered();
		return array_filter(
			$blocks,
			function( $block_type ) {
				return false !== strpos( $block_type->name, 'snow-monkey-blocks/' )
						&& 'snow-monkey-blocks/btn' !== $block_type->name
						&& false === strpos( $block_type->name, '--' );
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
}

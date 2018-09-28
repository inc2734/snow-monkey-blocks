<?php
/**
 * Plugin name: Snow Monkey Blocks
 * Version: 1.0.3
 * Text Domain: snow-monkey-blocks
 * Domain Path: /languages/
 *
 * @package snow-monkey-blocks
 * @author inc2734
 * @license GPL-2.0+
 */

namespace Snow_Monkey\Plugin\Blocks;

class Bootstrap {

	public function __construct() {
		add_action( 'plugins_loaded', [ $this, '_bootstrap' ] );
	}

	public function _bootstrap() {
		load_plugin_textdomain( 'snow-monkey-blocks', false, basename( __DIR__ ) . '/languages' );

		new App\Setup\Assets();

		add_filter( 'block_categories', [ $this, '_block_categories' ] );
		add_action( 'wp_loaded', [ $this, '_customizer_styles' ] );
		add_action( 'add_meta_boxes', [ $this, '_add_pr_meta_box' ] );
	}

	/**
	 * Add block category
	 *
	 * @param array $categories
	 * @return array
	 */
	public function _block_categories( $categories ) {
		$categories[] = [
			'slug'  => 'smb',
			'title' => __( 'Snow Monkey Blocks', 'snow-monkey-blocks' )
								. __( '[Common blocks]', 'snow-monkey-blocks' ),
		];
		$categories[] = [
			'slug'  => 'smb-section',
			'title' => __( 'Snow Monkey Blocks', 'snow-monkey-blocks' )
								. __( '[Sections]', 'snow-monkey-blocks' ),
		];

		return $categories;
	}

	/**
	 * Add meta box for the Snow Monkey PR when the Gutenberg page or not using the Snow Monkey
	 *
	 * @param string $post_type
	 * @return void
	 */
	public function _add_pr_meta_box( $post_type ) {
		if ( ! is_gutenberg_page() || is_snow_monkey() ) {
			return;
		}

		add_meta_box(
			'snow-monkey-pr',
			__( '[ PR ] Premium WordPress Theme Snow Monkey' ),
			[ $this, '_pr_meta_box_html' ],
			$post_type,
			'normal'
		);
	}

	/**
	 * Display Snow Monkey PR meta box html
	 *
	 * @return void
	 */
	public function _pr_meta_box_html() {
		?>
		<p>
			<?php
			echo sprintf(
				esc_html__( 'Snow Monkey Blocks is optimized for the %1$sSnow Monkey%2$s theme, but it can also be used with other themes.', 'snow-monkey-blocks' ),
				'<a href="https://snow-monkey.2inc.org/" target="_blank">',
				'</a>'
			);
			echo sprintf(
				esc_html__( 'When used together with the %1$sSnow Monkey%2$s theme, it can be displayed with the most beautiful balance, and it is displayed on the edit screen with the same design as the front screen.', 'snow-monkey-blocks' ),
				'<a href="https://snow-monkey.2inc.org/" target="_blank">',
				'</a>'
			);
			?>
		</p>
		<?php
	}

	/**
	 * Apply styles from customizer settings of Snow Monkey
	 *
	 * @return void
	 */
	public function _customizer_styles() {
		if ( ! is_snow_monkey() ) {
			return;
		}

		\Inc2734\Mimizuku_Core\Core::include_files( __DIR__ . '/block/' );
	}
}

require_once( __DIR__ . '/vendor/autoload.php' );
new \Snow_Monkey\Plugin\Blocks\Bootstrap();

/**
 * Directory url of this plugin
 *
 * @var string
 */
define( 'SNOW_MONKEY_BLOCKS_DIR_URL', plugin_dir_url( __FILE__ ) );

/**
 * Directory path of this plugin
 *
 * @var string
 */
define( 'SNOW_MONKEY_BLOCKS_DIR_PATH', plugin_dir_path( __FILE__ ) );

/**
 * Whether pro version
 *
 * @return boolean
 */
function is_pro() {
	return apply_filters( 'snow_monkey_blocks_pro', false );
}

/**
 * Return true when Snow Monkey is enabled
 *
 * @return boolean
 */
function is_snow_monkey() {
	return 'snow-monkey' === get_template() || 'snow-monkey/resources' === get_template();
}

<?php
/**
 * Plugin name: Snow Monkey Blocks
 * Version: 12.1.0
 * Description: Gutenberg blocks collection made by MonkeyWrench.
 * Author: inc2734
 * Author URI: https://2inc.org
 * License: GPL2 or later
 * License URI: https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain: snow-monkey-blocks
 *
 * @package snow-monkey-blocks
 * @author inc2734
 * @license GPL-2.0+
 */

namespace Snow_Monkey\Plugin\Blocks;

use FilesystemIterator;
use RecursiveDirectoryIterator;
use RecursiveIteratorIterator;

class Bootstrap {

	/**
	 * constructor
	 */
	public function __construct() {
		add_action( 'plugins_loaded', [ $this, '_bootstrap' ] );
	}

	/**
	 * bootstrap
	 */
	public function _bootstrap() {
		new App\Setup\TextDomain();
		new App\Setup\Assets();
		new App\Setup\BlockPatterns();
		new App\Controller\Manager();

		add_filter( 'block_categories_all', [ $this, '_block_categories_all' ] );
		add_action( 'init', [ $this, '_register_blocks' ] );
		add_action( 'add_meta_boxes', [ $this, '_add_pr_meta_box' ] );
		add_action( 'the_content', [ $this, '_the_content_for_slider' ], 11 );
	}

	/**
	 * Add block categories.
	 *
	 * @param array $categories Array of block categories.
	 * @return array
	 */
	public function _block_categories_all( $categories ) {
		$slugs = array_column( $categories, 'slug' );

		if ( ! in_array( 'smb', $slugs, true ) ) {
			$categories[] = [
				'slug'  => 'smb',
				'title' => __( 'Snow Monkey Blocks', 'snow-monkey-blocks' )
									. ' '
									. __( '[Common blocks]', 'snow-monkey-blocks' ),
			];
		}

		if ( ! in_array( 'smb-section', $slugs, true ) ) {
			$categories[] = [
				'slug'  => 'smb-section',
				'title' => __( 'Snow Monkey Blocks', 'snow-monkey-blocks' )
									. ' '
									. __( '[Sections]', 'snow-monkey-blocks' ),
			];
		}

		if ( ! in_array( 'smb-deprecated', $slugs, true ) ) {
			$categories[] = [
				'slug'  => 'smb-deprecated',
				'title' => __( 'Snow Monkey Blocks', 'snow-monkey-blocks' )
									. ' '
									. __( '[Deprecated]', 'snow-monkey-blocks' ),
			];
		}

		return $categories;
	}

	/**
	 * Register blocks.
	 */
	public function _register_blocks() {
		$iterator = new RecursiveDirectoryIterator( SNOW_MONKEY_BLOCKS_DIR_PATH . '/block', FilesystemIterator::SKIP_DOTS );
		$iterator = new RecursiveIteratorIterator( $iterator );
		foreach ( $iterator as $file ) {
			if ( ! $file->isFile() ) {
				continue;
			}

			if ( 'index.php' !== $file->getBasename() ) {
				continue;
			}

			include_once( realpath( $file->getPathname() ) );
		}
	}

	/**
	 * Add meta box for the Snow Monkey PR when the Gutenberg page or not using the Snow Monkey.
	 *
	 * @param string $post_type The post type.
	 * @return void
	 */
	public function _add_pr_meta_box( $post_type ) {
		if ( ! is_block_editor() || is_pro() ) {
			return;
		}

		add_meta_box(
			'snow-monkey-pr',
			__( '[ PR ] Premium WordPress Theme Snow Monkey', 'snow-monkey-blocks' ),
			[ $this, '_pr_meta_box_html' ],
			$post_type,
			'normal'
		);
	}

	/**
	 * Display Snow Monkey PR meta box html.
	 *
	 * @return void
	 */
	public function _pr_meta_box_html() {
		?>
		<p>
			<?php
			echo sprintf(
				// translators: %1$s: Start a tag, %2$s: End a tag
				esc_html__( 'Snow Monkey Blocks is optimized for the %1$sSnow Monkey%2$s theme, but it can also be used with other themes.', 'snow-monkey-blocks' ),
				'<a href="https://snow-monkey.2inc.org/" target="_blank">',
				'</a>'
			);
			echo sprintf(
				// translators: %1$s: Start a tag, %2$s: End a tag
				esc_html__( 'When used together with the %1$sSnow Monkey%2$s theme, it can be displayed with the most beautiful balance, and it is displayed on the edit screen with the same design as the front screen.', 'snow-monkey-blocks' ),
				'<a href="https://snow-monkey.2inc.org/" target="_blank">',
				'</a>'
			);
			?>
		</p>
		<?php
	}

	/**
	 * Because the data attribute is destroyed by the influence of wptexturize, it corrects it.
	 *
	 * @param string $content The post content.
	 * @return string
	 */
	public function _the_content_for_slider( $content ) {
		$content = preg_replace_callback(
			'|data-slick="\{([^}]+?)\}"|',
			function( $matches ) {
				$matches[0] = str_replace( '"', '\'', $matches[0] );
				$matches[0] = str_replace( '&quot;', '"', $matches[0] );
				return $matches[0];
			},
			$content
		);
		return $content;
	}
}

require_once( __DIR__ . '/vendor/autoload.php' );

/**
 * Directory url of this plugin.
 *
 * @var string
 */
define( 'SNOW_MONKEY_BLOCKS_DIR_URL', untrailingslashit( plugin_dir_url( __FILE__ ) ) );

/**
 * Directory path of this plugin.
 *
 * @var string
 */
define( 'SNOW_MONKEY_BLOCKS_DIR_PATH', untrailingslashit( plugin_dir_path( __FILE__ ) ) );

/**
 * Whether pro edition.
 *
 * @return boolean
 */
function is_pro() {
	$is_pro = 'snow-monkey' === get_template() || 'snow-monkey/resources' === get_template();
	return apply_filters( 'snow_monkey_blocks_pro', $is_pro );
}

/**
 * Return true when active the Gutenberg plugin.
 *
 * @return boolean
 */
function is_gutenberg_page() {
	$post = get_post();
	if ( ! $post ) {
		return false;
	}

	return function_exists( '\is_gutenberg_page' ) && \is_gutenberg_page();
}

/**
 * Return true when the page has block editor.
 *
 * @return boolean
 */
function is_block_editor() {
	return is_gutenberg_page()
				|| ( function_exists( '\use_block_editor_for_post' )
				&& \use_block_editor_for_post( get_post() ) );
}

new \Snow_Monkey\Plugin\Blocks\Bootstrap();

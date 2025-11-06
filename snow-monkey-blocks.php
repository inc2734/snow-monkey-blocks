<?php
/**
 * Plugin name: Snow Monkey Blocks
 * Version: 24.1.6
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
		add_action( 'plugins_loaded', array( $this, '_bootstrap' ) );
	}

	/**
	 * bootstrap
	 */
	public function _bootstrap() {
		new App\Setup\TextDomain();
		new App\Setup\Assets();
		new App\Setup\Blocks();
		new App\Setup\JsonLd();
		new App\Controller\Manager();

		add_filter( 'block_categories_all', array( $this, '_block_categories_all' ) );
		add_action( 'init', array( $this, '_register_blocks' ) );
		add_action( 'add_meta_boxes', array( $this, '_add_pr_meta_box' ) );
		add_filter( 'the_content', array( $this, '_the_content_for_slider' ), 11 );
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
			$categories[] = array(
				'slug'  => 'smb',
				'title' => __( 'Snow Monkey Blocks', 'snow-monkey-blocks' )
									. ' '
									. __( '[Common]', 'snow-monkey-blocks' ),
			);
		}

		if ( ! in_array( 'smb-section', $slugs, true ) ) {
			$categories[] = array(
				'slug'  => 'smb-section',
				'title' => __( 'Snow Monkey Blocks', 'snow-monkey-blocks' )
									. ' '
									. __( '[Sections]', 'snow-monkey-blocks' ),
			);
		}

		if ( ! in_array( 'smb-layout', $slugs, true ) ) {
			$categories[] = array(
				'slug'  => 'smb-layout',
				'title' => __( 'Snow Monkey Blocks', 'snow-monkey-blocks' )
									. ' '
									. __( '[Layout]', 'snow-monkey-blocks' ),
			);
		}

		if ( ! in_array( 'smb-deprecated', $slugs, true ) ) {
			$categories[] = array(
				'slug'  => 'smb-deprecated',
				'title' => __( 'Snow Monkey Blocks', 'snow-monkey-blocks' )
									. ' '
									. __( '[Deprecated]', 'snow-monkey-blocks' ),
			);
		}

		return $categories;
	}

	/**
	 * Register blocks.
	 * Organize your load order taking dependencies into account.
	 */
	public function _register_blocks() {
		include_once __DIR__ . '/dist/blocks/accordion/index.php';
		include_once __DIR__ . '/dist/blocks/accordion/item/index.php';
		include_once __DIR__ . '/dist/blocks/alert/index.php';
		include_once __DIR__ . '/dist/blocks/balloon/index.php';
		include_once __DIR__ . '/dist/blocks/box/index.php';
		include_once __DIR__ . '/dist/blocks/btn/index.php';
		include_once __DIR__ . '/dist/blocks/btn-box/index.php';
		include_once __DIR__ . '/dist/blocks/buttons/index.php';
		include_once __DIR__ . '/dist/blocks/categories-list/index.php';
		include_once __DIR__ . '/dist/blocks/child-pages/index.php';
		include_once __DIR__ . '/dist/blocks/container/index.php';
		include_once __DIR__ . '/dist/blocks/contents-outline/index.php';
		include_once __DIR__ . '/dist/blocks/countdown/index.php';
		include_once __DIR__ . '/dist/blocks/custom-field/index.php';
		include_once __DIR__ . '/dist/blocks/directory-structure/index.php';
		include_once __DIR__ . '/dist/blocks/directory-structure/item/directory/index.php';
		include_once __DIR__ . '/dist/blocks/directory-structure/item/file/index.php';
		include_once __DIR__ . '/dist/blocks/evaluation-star/index.php';
		include_once __DIR__ . '/dist/blocks/faq/index.php';
		include_once __DIR__ . '/dist/blocks/faq/item/index.php';
		include_once __DIR__ . '/dist/blocks/flex/index.php';
		include_once __DIR__ . '/dist/blocks/grid/index.php';
		include_once __DIR__ . '/dist/blocks/hero-header/index.php';
		include_once __DIR__ . '/dist/blocks/information/index.php';
		include_once __DIR__ . '/dist/blocks/information/item/index.php';
		include_once __DIR__ . '/dist/blocks/items/index.php';
		include_once __DIR__ . '/dist/blocks/items/item/free/index.php';
		include_once __DIR__ . '/dist/blocks/items/item/standard/index.php';
		include_once __DIR__ . '/dist/blocks/items/item/banner/index.php';
		include_once __DIR__ . '/dist/blocks/items/item/item/index.php';
		include_once __DIR__ . '/dist/blocks/items/item/block-link/index.php';
		include_once __DIR__ . '/dist/blocks/like-me-box/index.php';
		include_once __DIR__ . '/dist/blocks/limited-datetime/index.php';
		include_once __DIR__ . '/dist/blocks/list/index.php';
		include_once __DIR__ . '/dist/blocks/media-text/index.php';
		include_once __DIR__ . '/dist/blocks/panels/index.php';
		include_once __DIR__ . '/dist/blocks/panels/item/free/index.php';
		include_once __DIR__ . '/dist/blocks/panels/item/horizontal/index.php';
		include_once __DIR__ . '/dist/blocks/panels/item/vertical/index.php';
		include_once __DIR__ . '/dist/blocks/panels/item/block-link/index.php';
		include_once __DIR__ . '/dist/blocks/pattern-inserter/index.php';
		include_once __DIR__ . '/dist/blocks/pickup-slider/index.php';
		include_once __DIR__ . '/dist/blocks/price-menu/index.php';
		include_once __DIR__ . '/dist/blocks/price-menu/item/index.php';
		include_once __DIR__ . '/dist/blocks/pricing-table/index.php';
		include_once __DIR__ . '/dist/blocks/pricing-table/item/index.php';
		include_once __DIR__ . '/dist/blocks/rating-box/index.php';
		include_once __DIR__ . '/dist/blocks/rating-box/item/index.php';
		include_once __DIR__ . '/dist/blocks/read-more-box/index.php';
		include_once __DIR__ . '/dist/blocks/recent-posts/index.php';
		include_once __DIR__ . '/dist/blocks/rss/index.php';
		include_once __DIR__ . '/dist/blocks/section/index.php';
		include_once __DIR__ . '/dist/blocks/section-break-the-grid/index.php';
		include_once __DIR__ . '/dist/blocks/section-side-heading/index.php';
		include_once __DIR__ . '/dist/blocks/section-with-bgimage/index.php';
		include_once __DIR__ . '/dist/blocks/section-with-bgvideo/index.php';
		include_once __DIR__ . '/dist/blocks/slider/index.php';
		include_once __DIR__ . '/dist/blocks/slider/item/index.php';
		include_once __DIR__ . '/dist/blocks/spider-slider/index.php';
		include_once __DIR__ . '/dist/blocks/spider-pickup-slider/index.php';
		include_once __DIR__ . '/dist/blocks/spider-contents-slider/index.php';
		include_once __DIR__ . '/dist/blocks/spider-contents-slider/item/index.php';
		include_once __DIR__ . '/dist/blocks/step/index.php';
		include_once __DIR__ . '/dist/blocks/step/item/free/index.php';
		include_once __DIR__ . '/dist/blocks/step/item/standard/index.php';
		include_once __DIR__ . '/dist/blocks/tabs/index.php';
		include_once __DIR__ . '/dist/blocks/tabs/tab-panel/index.php';
		include_once __DIR__ . '/dist/blocks/taxonomy-posts/index.php';
		include_once __DIR__ . '/dist/blocks/taxonomy-terms/index.php';
		include_once __DIR__ . '/dist/blocks/testimonial/index.php';
		include_once __DIR__ . '/dist/blocks/testimonial/item/index.php';
		include_once __DIR__ . '/dist/blocks/thumbnail-gallery/index.php';
		include_once __DIR__ . '/dist/blocks/thumbnail-gallery/item/index.php';
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
			array( $this, '_pr_meta_box_html' ),
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
			printf(
				// translators: %1$s: Start a tag, %2$s: End a tag.
				esc_html__( 'Snow Monkey Blocks is optimized for the %1$sSnow Monkey%2$s theme, but it can also be used with other themes.', 'snow-monkey-blocks' ),
				'<a href="https://snow-monkey.2inc.org/" target="_blank">',
				'</a>'
			);
			printf(
				// translators: %1$s: Start a tag, %2$s: End a tag.
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
			function ( $matches ) {
				$matches[0] = str_replace( '"', '\'', $matches[0] );
				$matches[0] = str_replace( '&quot;', '"', $matches[0] );
				return $matches[0];
			},
			$content
		);
		return $content;
	}
}

require_once __DIR__ . '/vendor/autoload.php';

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

<?php
/**
 * @package snow-monkey-blocks
 * @author inc2734
 * @license GPL-2.0+
 */

namespace Snow_Monkey\Plugin\Blocks\App\Model;

class JsonLd {

	/**
	 * Instance.
	 *
	 * @var JsonLd
	 */
	private static $singleton;

	/**
	 * Data for JSON-LD.
	 *
	 * @var array
	 */
	protected $data = array();

	/**
	 * Constructor.
	 */
	private function __construct() {
	}

	/**
	 * Get instance.
	 *
	 * @return JsonLd
	 */
	public static function start() {
		if ( ! isset( static::$singleton ) ) {
			static::$singleton = new JsonLd();
		}
		return static::$singleton;
	}

	/**
	 * Add data.
	 *
	 * @param string $type @type.
	 * @param array  $data Dataset.
	 */
	public static function add( $type, $data ) {
		static::$singleton->data[ $type ][] = $data;
	}

	/**
	 * Generate JSON-LD.
	 *
	 * @return array
	 */
	public static function generate() {
		$data    = static::$singleton->data;
		$newdata = array();

		foreach ( $data as $type => $dataset ) {
			$newdata[ $type ]['@context'] = 'https://schema.org';
			$newdata[ $type ]['@type']    = $type;

			foreach ( $dataset as $value ) {
				if ( ! $value ) {
					continue;
				}
				$newdata[ $type ] = array_merge_recursive( $newdata[ $type ], $value );
			}
		}

		return $newdata;
	}

	/**
	 * Output JSON-LD.
	 */
	public static function output() {
		$data = static::generate();

		foreach ( $data as $dataset ) {
			?>
			<script type="application/ld+json">
				<?php echo wp_json_encode( $dataset, JSON_UNESCAPED_UNICODE ); ?>
			</script>
			<?php
		}
	}
}

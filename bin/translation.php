<?php
/**
 * @package snow-monkey-blocks
 * @author inc2734
 * @license GPL-2.0+
 */

$translation_dir = __DIR__ . '/../.translation';
$block_dirs      = [
	__DIR__ . '/../block/*',
	__DIR__ . '/../block/*/*',
	__DIR__ . '/../block/*/*/*',
];

$bundle_file = $translation_dir . '/translation.php';
if ( file_exists( $bundle_file ) ) {
	unlink( $bundle_file );
}
file_put_contents( $bundle_file, "<?php\n", FILE_APPEND | LOCK_EX );

function put_contents( $value, $bundle_file ) {
	$value = str_replace( '\'', '\\\'', $value );
	$value = str_replace( '"', '\\"', $value );

	file_put_contents(
		$bundle_file,
		"__( '{$value}', 'snow-monkey-blocks' );\n",
		FILE_APPEND | LOCK_EX
	);
};

function put( $value, $bundle_file ) {
	if ( is_array( $value ) ) {
		foreach ( $value as $_value ) {
			put_contents( $_value, $bundle_file );
		}
	} else {
		put_contents( $value, $bundle_file );
	}
}

foreach ( $block_dirs as $block_dir ) {
	$jsons = glob( $block_dir . '/block.json' );
	foreach ( $jsons as $json ) {
		$data = file_get_contents( $json );
		$data = json_decode( $data );
		if ( $data->title ) {
			put( $data->title, $bundle_file );
		}
		if ( $data->description ) {
			put( $data->description, $bundle_file );
		}
		if ( $data->keywords ) {
			put( $data->keywords, $bundle_file );
		}
		if ( $data->styles ) {
			foreach ( $data->styles as $style ) {
				if ( $style->label ) {
					put( $style->label, $bundle_file );
				}
			}
		}
	}
}




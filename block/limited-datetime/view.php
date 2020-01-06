<?php
/**
 * @package snow-monkey-blocks
 * @author inc2734
 * @license GPL-2.0+
 */

$is_render = false;
$now_date = date_i18n( 'U' );

$is_use_start_date = ! empty( $attributes['isUseStartDate'] ) ? $attributes['isUseStartDate'] : false;
$start_date = null;
if ( $is_use_start_date && ! empty( $attributes['startDate'] ) ) {
	$correction_start_date = substr_replace( $attributes['startDate'], '00', -2, 3 );
	$start_date = date_i18n( 'U', strtotime( $correction_start_date ) );
}

$is_use_end_date = ! empty( $attributes['isUseEndDate'] ) ? $attributes['isUseEndDate'] : false;
$end_date = null;
if ( $is_use_end_date && ! empty( $attributes['endDate'] ) ) {
	$correction_end_date = substr_replace( $attributes['endDate'], '00', -2, 3 );
	$end_time = date_i18n( 'U', strtotime( $correction_end_date ) );
}

try {
	if ( null === $start_date ) {
		if ( null !== $end_date && $now_date <= $end_date ) {
			$is_render = true;
		}
	} elseif ( $now_date >= $start_date ) {
		if ( null === $end_date || $now_date <= $end_date ) {
			$is_render = true;
		}
	}
} catch ( Exception $e ) {
	$is_render = false;
}

if ( $is_render ) {
	echo $content; // XSS ok.
}

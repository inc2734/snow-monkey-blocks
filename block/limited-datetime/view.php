<?php
/**
 * @package snow-monkey-blocks
 * @author inc2734
 * @license GPL-2.0+
 */

$is_use_start_date = ! empty( $attributes['isUseStartDate'] ) ? $attributes['isUseStartDate'] : false;
$start_date        = $is_use_start_date && isset( $attributes['startDate'] ) ? $attributes['startDate'] : false;

$is_use_end_date = ! empty( $attributes['isUseEndDate'] ) ? $attributes['isUseEndDate'] : false;
$end_date        = $is_use_end_date && isset( $attributes['endDate'] ) ? $attributes['endDate'] : false;

if ( ! $start_date && ! $end_date ) {
	echo $content; // XSS ok.
	return;
}

$current_date = wp_date( 'Y-m-d\TH:i:s' );
$current_date = strtotime( $current_date );

if ( $start_date ) {
	$start_date = strtotime( $start_date );

	if ( $start_date > $current_date ) {
		return;
	}
}

if ( $end_date ) {
	$end_date = strtotime( $end_date );

	if ( $end_date < $current_date ) {
		return;
	}
}

echo $content; // XSS ok.

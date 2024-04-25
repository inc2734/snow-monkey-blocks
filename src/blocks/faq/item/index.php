<?php
/**
 * @package snow-monkey-blocks
 * @author inc2734
 * @license GPL-2.0+
 */

use Snow_Monkey\Plugin\Blocks\App\Model\JsonLd;
use Snow_Monkey\Plugin\Blocks\App\Helper;

register_block_type(
	__DIR__,
	array(
		'render_callback' => function ( $attributes, $content ) {
			$dom = new \DOMDocument();
			// phpcs:disable WordPress.PHP.NoSilencedErrors.Discouraged
			@$dom->loadHTML( mb_convert_encoding( $content, 'HTML-ENTITIES', 'auto' ) );
			// phpcs:enable
			$xpath = new \DOMXPath( $dom );

			$question_item = $xpath->query( '//*[@class="smb-faq__item__question__body"]' )->item( 0 );
			$question      = $question_item ? Helper::inner_html( $question_item ) : null;
			$answer_item   = $xpath->query( '//*[@class="smb-faq__item__answer__body"]' )->item( 0 );
			$answer        = $answer_item ? Helper::inner_html( $answer_item ) : null;

			JsonLd::start();
			JsonLd::add(
				'FAQPage',
				array(
					'mainEntity' => array(
						array(
							'@type'          => 'Question',
							'name'           => $question,
							'acceptedAnswer' => array(
								'@type' => 'Answer',
								'text'  => $answer,
							),
						),
					),
				)
			);

			return $content;
		},
	)
);

add_filter(
	'render_block_snow-monkey-blocks/faq-item',
	function ( $content ) {
		$p1 = new WP_HTML_Tag_Processor( $content );
		$p1->next_tag( array( 'class_name' => 'is-layout-constrained' ) );
		$p1_class = $p1->get_attribute( 'class' );

		$p2 = new WP_HTML_Tag_Processor( $content );
		$p2->next_tag( array( 'class_name' => 'smb-faq__item__answer__body' ) );
		$p2_class = $p2->get_attribute( 'class' );

		if ( $p1_class === $p2_class ) {
			return $content;
		}

		$p1->remove_class( 'is-layout-constrained' );
		$p1->remove_class( 'wp-block-faq-item-is-layout-constrained' );
		$p1->next_tag( array( 'class_name' => 'smb-faq__item__answer__body' ) );
		$p1->add_class( 'is-layout-constrained' );
		$p1->add_class( 'wp-block-faq-item-is-layout-constrained' );
		return $p1->get_updated_html();
	}
);

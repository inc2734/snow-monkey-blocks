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
	[
		'render_callback' => function( $attributes, $content ) {
			$dom = new \DOMDocument;
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
				[
					'mainEntity' => [
						[
							'@type'          => 'Question',
							'name'           => $question,
							'acceptedAnswer' => [
								'@type' => 'Answer',
								'text'  => $answer,
							],
						],
					],
				]
			);

			return $content;
		},
	]
);

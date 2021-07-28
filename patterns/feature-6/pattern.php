<?php
/**
 * @package snow-monkey-blocks
 * @author inc2734
 * @license GPL-2.0+
 */
?>

<!-- wp:snow-monkey-blocks/section {"backgroundColor":"#f7f7f7","align":"full"} -->
<div class="wp-block-snow-monkey-blocks-section alignfull smb-section smb-section--fit">
	<div class="smb-section__fixed-background" style="padding-top:0;padding-bottom:0">
		<div class="smb-section__background" style="background-color:#f7f7f7"></div>
	</div>
	<div class="smb-section__inner">
		<div class="c-container">
			<h2 class="smb-section__title">Lorem ipsum dolor sit amet</h2>
			<div class="smb-section__body">
				<!-- wp:paragraph {"align":"center"} -->
				<p class="has-text-align-center">consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
				<!-- /wp:paragraph -->

				<!-- wp:snow-monkey-blocks/items -->
				<div class="wp-block-snow-monkey-blocks-items smb-items">
					<div class="c-row c-row--margin" data-columns="1" data-md-columns="1" data-lg-columns="2">
						<!-- wp:snow-monkey-blocks/items--banner {"url":"#","maskOpacity":0.7,"imageSize":"wide"} -->
						<div class="wp-block-snow-monkey-blocks-items--banner c-row__col">
							<div class="smb-items__banner smb-items__banner--wide">
								<div class="smb-items__banner__figure">
									<div class="smb-items__banner__figure__mask"></div>
									<img src="<?php echo esc_url( SNOW_MONKEY_BLOCKS_DIR_URL ); ?>/dist/img/photos/0023_xlarge.jpg" alt="" class="wp-image-0" style="opacity:0.7"/>
								</div>
								<div class="smb-items__banner__body">
									<div class="smb-items__banner__title">Lorem ipsum dolor sit amet</div>
									<div class="smb-items__banner__lede">consectetur adipiscing elit</div>
								</div>
								<div class="smb-items__banner__action"><a href="#">Lorem ipsum dolor sit amet</a></div>
							</div>
						</div>
						<!-- /wp:snow-monkey-blocks/items--banner -->
						<!-- wp:snow-monkey-blocks/items--banner {"url":"#","maskOpacity":0.7,"imageSize":"wide"} -->
						<div class="wp-block-snow-monkey-blocks-items--banner c-row__col">
							<div class="smb-items__banner smb-items__banner--wide">
								<div class="smb-items__banner__figure">
									<div class="smb-items__banner__figure__mask"></div>
									<img src="<?php echo esc_url( SNOW_MONKEY_BLOCKS_DIR_URL ); ?>/dist/img/photos/0127_xlarge.jpg" alt="" class="wp-image-0" style="opacity:0.7"/>
								</div>
								<div class="smb-items__banner__body">
									<div class="smb-items__banner__title">Lorem ipsum dolor sit amet</div>
									<div class="smb-items__banner__lede">consectetur adipiscing elit</div>
								</div>
								<div class="smb-items__banner__action"><a href="#">Lorem ipsum dolor sit amet</a></div>
							</div>
						</div>
						<!-- /wp:snow-monkey-blocks/items--banner -->
					</div>
				</div>
				<!-- /wp:snow-monkey-blocks/items -->
			</div>
		</div>
	</div>
</div>
<!-- /wp:snow-monkey-blocks/section -->

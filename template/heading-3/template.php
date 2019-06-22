<?php
/**
 * @package snow-monkey-blocks
 * @author inc2734
 * @license GPL-2.0+
 */
?>

<!-- wp:snow-monkey-blocks/section-with-bgimage {"titleTagName":"none","imageID":1,"height":"wide","maskColor":"#000000","maskOpacity":0.8,"align":"full"} -->
<div class="wp-block-snow-monkey-blocks-section-with-bgimage alignfull smb-section smb-section-with-bgimage smb-section-with-bgimage--left smb-section-with-bgimage--wide" style="color:#fff">
	<div class="smb-section-with-bgimage__mask" style="background-color:#000000"></div>
	<div class="smb-section-with-bgimage__bgimage" style="opacity:0.8">
		<img src="<?php echo esc_url( SNOW_MONKEY_BLOCKS_DIR_URL ); ?>/dist/img/photos/clouds-in-sky-over-fields.jpg" alt="" class="wp-image-1"/>
	</div>
	<div class="c-container">
		<div class="smb-section__body">
			<!-- wp:paragraph {"align":"center","fontSize":"medium","className":"u-slim-width"} -->
			<p style="text-align:center" class="has-medium-font-size u-slim-width">
				Lorem ipsum dolor sit amet, consectetur adipiscing elit
			</p>
			<!-- /wp:paragraph -->

			<!-- wp:paragraph {"className":"u-slim-width"} -->
			<p class="u-slim-width">
				sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
			</p>
			<!-- /wp:paragraph -->

			<!-- wp:button {"customTextColor":"#ffffff","align":"center","className":"is-style-outline"} -->
			<div class="wp-block-button aligncenter is-style-outline">
				<a class="wp-block-button__link has-text-color" href="https://example.com" style="color:#ffffff">Button</a>
			</div>
			<!-- /wp:button -->
		</div>
	</div>
</div>
<!-- /wp:snow-monkey-blocks/section-with-bgimage -->

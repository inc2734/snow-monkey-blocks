=== Snow Monkey Blocks ===
Contributors: inc2734, mayukojpn, livevalue, kmix39, kngsmym
Donate link: https://www.amazon.co.jp/registry/wishlist/39ANKRNSTNW40
Tags: gutenberg, block, blocks, editor, gutenberg blocks, page builder, landing page, microcopy, steps, call to action
Requires at least: 5.0
Tested up to: 5.1
Stable tag: 3.4.1
Requires PHP: 5.6
License: GPLv2 or later
License URI: https://www.gnu.org/licenses/gpl-2.0.html

Gutenberg blocks collection made by MonkeyWrench.

== Description ==

Snow Monkey Blocks is a collection of content blocks for <a href="https://wordpress.org/plugins/gutenberg/" target="_blank">Gutenberg</a>. With using this plugin, you can create and publish landing pages or highly designed page quickly and easily. Of course, you don't need to write any code.

With Snow Monkey Blocks, you add blocks such as features, checklists, FAQs, steps, testimonials, CTA to <a href="https://wordpress.org/plugins/gutenberg/" target="_blank">Gutenberg</a> and quickly and easily launch responsive landing pages without programming knowledge.

Snow Monkey Blocks is optimized for the <a href="https://snow-monkey.2inc.org/" target="_blank">Snow Monkey</a> theme, but it can also be used with other themes. With using <a href="https://snow-monkey.2inc.org/" target="_blank">Snow Monkey</a> and this plugin together, output will be perfect designed and will be same view of edit screen.

https://www.youtube.com/watch?v=uD6omb4TLdA&t=283s

= Module blocks =

* Alert
* Balloon
* Box
* Button
* Button box (Button with microcopy)
* FAQ
* Icon list
* Pricing table
* Rating box
* Step
* Testimonial
* Items
* Slider
* Panels
* Media text
* Thumbnail gallery
* Recent posts (Can be used only with Snow Monkey)
* Taxonomy posts (Can be used only with Snow Monkey)
* Pickup slider (Can be used only with Snow Monkey)
* Categories list
* Contents outline (Can be used only with Snow Monkey)
* Evaluation star
* Child pages (Can be used only with Snow Monkey)
* Accordion
* Limited datetime

= Section blocks =

By default these blocks are restricted. If you are using the theme that has 1 column template, you can activate these blocks using filter hooks.

* Section
* Section with background image
* Section with background video

= Formatter =

* Text highlighter

== Installation ==

This plugin can be installed directly from your site.

1. Log in and navigate to Plugins → Add New.
1. Type “Snow Monkey Blocks” into the Search and hit Enter.
1. Locate the Snow Monkey Blocks plugin in the list of search results and click Install Now.
1. Once installed, click the Activate link.

== Frequently Asked Questions ==

= Can Snow Monkey Blocks be used with any theme? =

Yes! You can use Snow Monkey Blocks with any theme, but we recommend using our <a href="https://snow-monkey.2inc.org/" target="_blank">Snow Monkey</a> theme for the best presentation. Other themes may require adjustment of margin between blocks.

== Screenshots ==

1. Alert blocks
2. Balloon blocks
3. Box block (Color can be set freely)
4. Button block (Color can be set freely)
5. Button box block (Color can be set freely)
6. FAQ block (The number of FAQ sets can be increased or decreased freely)
7. Icon list block
8. Pricing table block (The number of columns can be increased or decreased freely)
9. Rating box block (The number of ratings can be increased or decreased freely)
10. Step block (The number of steps can be increased or decreased freely)
11. Testimonial block (The number of items can be increased or decreased freely)
12. Items block (The number of items can be increased or decreased freely)
13. Slider block (The number of images can be increased or decreased freely)
14. Panel block (The number of items can be increased or decreased freely)
15. Media text block
16. Thumbnail gallery block (The number of images can be increased or decreased freely)
17. Categories list block
18. Evaluation star block
19. Accordion block
20. Limited datetime block (The number of items can be increased or decreased freely)

== Changelog ==

= 3.5.0 =
* [Button] Add styles setting.
* [Button box] Add styles setting.

= 3.4.1 =
* [Section with background video] Changed to display thumbnail instead of video for mobile.

= 3.4.0 =
* Fix vertical margin of some blocks.
* Fix bug that the input probrem at the spotlight mode.
* Add description of blocks.
* Add fade setting to the slider block.

= 3.3.0 =
* Add limited datetime block.
* Add toggle arrow to the accordion block.
* Refactoring category list block.

= 3.2.1 =
* Refactoring taxonomy posts block.
* Refactoring recent posts block.

= 3.2.0 =
* Add taxonomy posts block. This block working on Snow Monkey v5.4.7
* Add post type setting to the recent posts block.

= 3.1.6 =
* Add id to the recent posts block. So you can use `snow_monkey_recent_posts_widget_args_<id>` hook.

= 3.1.5 =
* Fix notice error at className of dynamic blocks.

= 3.1.4 =
* Fix bug that broken dynamic blocks when set custom class name.

= 3.1.3 =
* Add anchor setting to the section with background image block and the section with background video block.

= 3.1.2 =
* Deprecated the items > item block.
* Add the items > item (standard) block.
* Add the items > item (block link) block.

= 3.1.0 =
* Add the section with background video block.
* Add arrow setting to the thumbnail gallery block.
* Add ignore sticky posts setting to the related posts block.
* Apply masonry layout to the category list block on editor.

= 3.0.10 =
* Fixed bug that the block toolbar was not fixed.
* Fixed bug that blocks containing link elements are broken.
* Refactoring slider block.
* Refactoring thumbnail gallery block.

= 3.0.9 =
* Fixed bug that image of panel block (landscape) shrinks on IE11
* Fixed bug that layout of the section (with background image) block collapses on IE11
* Fixed bug that layout of the slider block collapses on IE11
* Fixed bug that layout of the step block collapses on IE11
* Fixed bug that accordion block does not work correctly on IE11

= 3.0.8 =
* Fix bug that setting of right image is not reflected in the step block.
* Change URL input from TextControl to URLInput.
* Add display order settings to the category list block.

= 3.0.7 =
* Add exclude feature to the category list block.

= 3.0.6 =
* Allow mutual conversion of child blocks of the item block.
* Changed to display child block addition button of repeatable blocks.
* Fix to reflect additional CSS class setting when editing.

= 3.0.5 =
* Add horizontal panel item.

= 3.0.4 =
* Fix duplicate slash in file path.
* Changed so that you can reconfigure without deleting the image.
* Removed unneed files.

= 3.0.3 =
* Fixed bug that the contents outline heading restrictions are not reflected.
* The item summary of the step block to InnerBlocks.
* The item of items block is supported block link.
* Add a simple layout with only text display on recent post block.

= 3.0.2 =
* Changed to add padding that is same of level of divider when section divider set.

= 3.0.1 =
* Fix bug that the accordion block and the child pages block not working on Snow Monkey v4
* Fix bug that title of the section block can not be changed.

= 3.0.0 =
* Add the accordion block.
* Add the child pages block.
* Add parallax setting to the section with background image block.
* Add text color setting to the section with background image block.
* Add item title tag setting to the panel block and the items block.
* Add anchor setting to the section block.
* Fix the categories list block styles on mobile.
* Refactoring repeatable blocks.
* Refactoring color settings panel.

= 2.1.0 =
* Add the categories list block.
* Add the content outline block.
* Add the evaluation star block.
* Fix RangeControl bug.

= 2.0.0 =
* Fixed bug that the recent post blocks are not displayed in Snow Monkey v5.
* If the position of the image in the media text block is on the left side, on the smartphone, change the image so that the image is displayed at the top.
* Add the thumbnail gallery block.
* Remove the section with image block.

= 1.7.7 =
* Fixed bug that Japanese translation was not applied in WordPress 5.0
* Support Snow Monkey v5

= 1.7.6 =
* WordPress 5.0 compatible

= 1.7.5 =
* Fix bug that column size of medium window size setting of the panel and items block is not working.
* Add link color setting of the step block.
* Add .wp-image-xxxxx to img.

= 1.7.4 =
* Fixed a bug that Gutenberg toolbar did not become sticky.

= 1.7.3 =
* Improve the usability of UI on Gutenberg.

= 1.7.2 =
* Fix text color of the section with bgimage block.

= 1.7.1 =
* Add the media text block.

= 1.7.0 =
* Add the recent posts block.
* Add the pickup slider block.
* Add triangle divider.

= 1.6.2 =
* Fix ColorPalette bug.
* Fix section-with-image block bug.

= 1.6.1 =
* Add alignwide and alignfull setting to the slider block.

= 1.6.0 =
* Add shape divider settings to the section block.

= 1.5.2 =
* Fix the icon list block bug.
* Support direct file upload and drag and drop upload at MediaPlaceholder on some blocks.

= 1.5.1 =
* Some fixes for the panel block.

= 1.5.0 =
* Add panel block.
* Add sm and md col width setting to the items block.
* Add caption setting to the slider block.

= 1.4.2 =
* Fix that the slick-carousel is not install installed.

= 1.4.1 =
* Fix bug that autoSpeed settings of slider does not work properly.
* Change to prevent image setting by D&D and direct file upload in MediaPlaceholder.
* Refactoring icon list block. The icon renderd with JavaScript.

= 1.4.0 =
* Add slider block
* Add repeatable item add/remove button.

= 1.3.0 =
* Add image field to the pricing table block.
* Add image sizes to the section with image block.

= 1.2.1 =
* Gutenberg 4.2.0 compatible
* Remove section-with-items block

= 1.2.0 =
* Add text highlighter.
* Fix iconlist block bug.

= 1.1.3 =
* Remove styles for Snow Monkey

= 1.1.2 =
* Fix bug that media is not set in repeater blocks.

= 1.1.1 =
* Update readme.txt

= 1.1.0 =
* Add items block.

= 1.0.10 =
* Fixed bug that Snow Monkey accent color is not reflected.
* Changed to run only when Gutenberg is enabled.

= 1.0.9 =
* Change snow-monkey-blocks/section-has-bgimage to snow-monkey-blocks/section-with-bgimage
* Change snow-monkey-blocks/section-has-image to snow-monkey-blocks/section-with-image
* Change snow-monkey-blocks/section-has-items to snow-monkey-blocks/section-with-items

= 1.0.8 =
* Fix about translations.

= 1.0.7 =
* Fixed a bug that balloon block can not be set as avatar image if image size to be uploaded is small.
* Add button size setting of the button box block.
* Add conetnts width setting of section block.

= 1.0.6 =
* Fixed a bug in Gutenberg where alert block text color is not reflected.
* Fixed a bug that layout of testmonial block might collapse on Gutenberg.

= 1.0.5 =
* Update build process.

= 1.0.4 =
* Add filter hook `snow_monkey_blocks_enqueue_fontawesome`
* Add filter hook `snow_monkey_blocks_enqueue_fallback_style`

= 1.0.3 =
* Initial release.

== Upgrade Notice ==

Nothing in particular.

== 3rd party resources ==

= Font Awesome =

WebSite: https://fontawesome.com/
License: https://fontawesome.com/license/free

= slick =

WebSite: http://kenwheeler.github.io/slick/
License: https://github.com/kenwheeler/slick/blob/master/LICENSE

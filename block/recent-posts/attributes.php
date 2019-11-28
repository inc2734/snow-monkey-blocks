<?php
/**
 * @package snow-monkey-blocks
 * @author inc2734
 * @license GPL-2.0+
 */

return [
	'postType' => [
		'type'    => 'string',
		'default' => 'post',
	],
	'postsPerPage' => [
		'type'    => 'number',
		'default' => 6,
	],
	'layout' => [
		'type'    => 'string',
		'default' => 'rich-media',
	],
	'ignoreStickyPosts' => [
		'type'    => 'boolean',
		'default' => true,
	],
	'className' => [
		'type'    => 'string',
		'default' => '',
	],
	'myAnchor' => [
		'type'    => 'string',
		'default' => '',
	],
];

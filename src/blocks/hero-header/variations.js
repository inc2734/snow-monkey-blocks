import { __ } from '@wordpress/i18n';

import icon from './icon';
import IconLeftTopOut from './icons/left-top-out';
import IconRightTopOut from './icons/right-top-out';
import IconLeftBottomOut from './icons/left-bottom-out';
import IconRightBottomOut from './icons/right-bottom-out';
import IconLeftTopIn from './icons/left-top-in';
import IconRightTopIn from './icons/right-top-in';
import IconLeftBottomIn from './icons/left-bottom-in';
import IconRightBottomIn from './icons/right-bottom-in';
import IconCenter from './icons/center';

export default [
	{
		name: 'default',
		isDefault: true,
		title: __( 'Default', 'snow-monkey-blocks' ),
		scope: [ 'block' ],
		icon: () => (
			<div
				style={ {
					color: '#aaa',
					width: '48px',
					height: '48px',
					padding: '4px',
				} }
			>
				{ icon }
			</div>
		),
		attributes: {
			mediaUrl: `${ smb.pluginUrl }/dist/img/photos/stocksnap_wrn48fo5mr.jpg`,
		},
	},
	{
		name: 'left-top-out',
		title: __( 'Left / Top / Out', 'snow-monkey-blocks' ),
		scope: [ 'block' ],
		icon: IconLeftTopOut,
		attributes: {
			mediaUrl: `${ smb.pluginUrl }/dist/img/photos/stocksnap_wrn48fo5mr.jpg`,
			figureGridColumnStart: '2',
			figureGridRowStart: '2',
			bodyAlignSelf: 'start',
			bodyJustifySelf: 'start',
			bodyGridColumnEnd: '-2',
			bodyGridRowEnd: '-2',
			bodyMaxWidth: '38rem',
		},
		innerBlocks: [
			{
				name: 'core/paragraph',
				attributes: {
					content:
						'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cill',
				},
			},
		],
	},
	{
		name: 'right-top-out',
		title: __( 'Right / Top / Out', 'snow-monkey-blocks' ),
		scope: [ 'block' ],
		icon: IconRightTopOut,
		attributes: {
			mediaUrl: `${ smb.pluginUrl }/dist/img/photos/stocksnap_wrn48fo5mr.jpg`,
			figureGridColumnEnd: '-2',
			figureGridRowStart: '2',
			bodyAlignSelf: 'start',
			bodyJustifySelf: 'end',
			bodyGridColumnStart: '2',
			bodyGridRowEnd: '-2',
			bodyMaxWidth: '38rem',
		},
		innerBlocks: [
			{
				name: 'core/paragraph',
				attributes: {
					content:
						'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cill',
				},
			},
		],
	},
	{
		name: 'left-bottom-out',
		title: __( 'Left / Bottom / Out', 'snow-monkey-blocks' ),
		scope: [ 'block' ],
		icon: IconLeftBottomOut,
		attributes: {
			mediaUrl: `${ smb.pluginUrl }/dist/img/photos/stocksnap_wrn48fo5mr.jpg`,
			figureGridColumnStart: '2',
			figureGridRowEnd: '-2',
			figureGridRowStart: '2',
			bodyAlignSelf: 'end',
			bodyJustifySelf: 'start',
			bodyGridColumnEnd: '-2',
			bodyGridRowStart: '2',
			bodyMaxWidth: '38rem',
		},
		innerBlocks: [
			{
				name: 'core/paragraph',
				attributes: {
					content:
						'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cill',
				},
			},
		],
	},
	{
		name: 'right-bottom-out',
		title: __( 'Right / Bottom / Out', 'snow-monkey-blocks' ),
		scope: [ 'block' ],
		icon: IconRightBottomOut,
		attributes: {
			mediaUrl: `${ smb.pluginUrl }/dist/img/photos/stocksnap_wrn48fo5mr.jpg`,
			figureGridColumnEnd: '-2',
			figureGridRowEnd: '-2',
			bodyAlignSelf: 'end',
			bodyJustifySelf: 'end',
			bodyGridColumnStart: '2',
			bodyGridRowStart: '2',
			bodyMaxWidth: '38rem',
		},
		innerBlocks: [
			{
				name: 'core/paragraph',
				attributes: {
					content:
						'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cill',
				},
			},
		],
	},
	{
		name: 'left-top-in',
		title: __( 'Left / Top / In', 'snow-monkey-blocks' ),
		scope: [ 'block' ],
		icon: IconLeftTopIn,
		attributes: {
			mediaUrl: `${ smb.pluginUrl }/dist/img/photos/stocksnap_wrn48fo5mr.jpg`,
			bodyAlignSelf: 'start',
			bodyJustifySelf: 'start',
			bodyMaxWidth: '38rem',
			bodyPadding: {
				top: 'var:preset|spacing|40',
				right: 'var:preset|spacing|40',
				bottom: 'var:preset|spacing|40',
				left: 'var:preset|spacing|40',
			},
			align: 'wide',
		},
		innerBlocks: [
			{
				name: 'core/paragraph',
				attributes: {
					content:
						'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cill',
				},
			},
		],
	},
	{
		name: 'right-top-in',
		title: __( 'Right / Top / In', 'snow-monkey-blocks' ),
		scope: [ 'block' ],
		icon: IconRightTopIn,
		attributes: {
			mediaUrl: `${ smb.pluginUrl }/dist/img/photos/stocksnap_wrn48fo5mr.jpg`,
			bodyAlignSelf: 'start',
			bodyJustifySelf: 'end',
			bodyMaxWidth: '38rem',
			bodyPadding: {
				top: 'var:preset|spacing|40',
				right: 'var:preset|spacing|40',
				bottom: 'var:preset|spacing|40',
				left: 'var:preset|spacing|40',
			},
			align: 'wide',
		},
		innerBlocks: [
			{
				name: 'core/paragraph',
				attributes: {
					content:
						'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cill',
				},
			},
		],
	},
	{
		name: 'left-bottom-in',
		title: __( 'Left / Bottom / In', 'snow-monkey-blocks' ),
		scope: [ 'block' ],
		icon: IconLeftBottomIn,
		attributes: {
			mediaUrl: `${ smb.pluginUrl }/dist/img/photos/stocksnap_wrn48fo5mr.jpg`,
			bodyAlignSelf: 'end',
			bodyJustifySelf: 'start',
			bodyMaxWidth: '38rem',
			bodyPadding: {
				top: 'var:preset|spacing|40',
				right: 'var:preset|spacing|40',
				bottom: 'var:preset|spacing|40',
				left: 'var:preset|spacing|40',
			},
			align: 'wide',
		},
		innerBlocks: [
			{
				name: 'core/paragraph',
				attributes: {
					content:
						'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cill',
				},
			},
		],
	},
	{
		name: 'right-bottom-in',
		title: __( 'Right / Bottom / In', 'snow-monkey-blocks' ),
		scope: [ 'block' ],
		icon: IconRightBottomIn,
		attributes: {
			mediaUrl: `${ smb.pluginUrl }/dist/img/photos/stocksnap_wrn48fo5mr.jpg`,
			bodyAlignSelf: 'end',
			bodyJustifySelf: 'end',
			bodyMaxWidth: '38rem',
			bodyPadding: {
				top: 'var:preset|spacing|40',
				right: 'var:preset|spacing|40',
				bottom: 'var:preset|spacing|40',
				left: 'var:preset|spacing|40',
			},
			align: 'wide',
		},
		innerBlocks: [
			{
				name: 'core/paragraph',
				attributes: {
					content:
						'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cill',
				},
			},
		],
	},
	{
		name: 'center',
		title: __( 'Center', 'snow-monkey-blocks' ),
		scope: [ 'block' ],
		icon: IconCenter,
		attributes: {
			mediaUrl: `${ smb.pluginUrl }/dist/img/photos/stocksnap_wrn48fo5mr.jpg`,
			bodyAlignSelf: 'center',
			bodyJustifySelf: 'center',
			bodyMaxWidth: '38rem',
			bodyPadding: {
				top: 'var:preset|spacing|40',
				right: 'var:preset|spacing|40',
				bottom: 'var:preset|spacing|40',
				left: 'var:preset|spacing|40',
			},
			align: 'full',
		},
		innerBlocks: [
			{
				name: 'core/paragraph',
				attributes: {
					content:
						'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cill',
				},
			},
		],
	},
];

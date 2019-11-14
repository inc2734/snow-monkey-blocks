'use strict';

import { toNumber } from '../../src/js/helper/helper';

import {
	PanelBody,
	SelectControl,
	RangeControl,
	ServerSideRender,
	ToggleControl,
	TextControl,
} from '@wordpress/components';

import {
	useSelect,
} from '@wordpress/data';

import {
	InspectorControls,
	InspectorAdvancedControls,
} from '@wordpress/editor';

import {
	Fragment,
	useMemo,
} from '@wordpress/element';

import {
	__,
} from '@wordpress/i18n';

export default function( { attributes, setAttributes } ) {
	const { postType, postsPerPage, layout, ignoreStickyPosts, myAnchor } = attributes;
	const { getPostTypes } = useSelect( ( select ) => select( 'core' ) );

	const allPostTypes = getPostTypes( { per_page: -1 } ) || [];

	const postTypes = useMemo(
		() => allPostTypes.filter( ( type ) => type.viewable && ! type.hierarchical && 'media' !== type.rest_base ),
		[ allPostTypes ]
	);

	return (
		<Fragment>
			<InspectorControls>
				<PanelBody title={ __( 'Block Settings', 'snow-monkey-blocks' ) }>
					<SelectControl
						label={ __( 'Post Type', 'snow-monkey-blocks' ) }
						value={ postType }
						onChange={ ( value ) => setAttributes( { postType: value } ) }
						options={ postTypes.map( ( _postType ) => ( { label: _postType.name, value: _postType.slug } ) ) }
					/>

					<RangeControl
						label={ __( 'Number of posts', 'snow-monkey-blocks' ) }
						value={ postsPerPage }
						onChange={ ( value ) => setAttributes( { postsPerPage: toNumber( value, 1, 12 ) } ) }
						min="1"
						max="12"
					/>

					<SelectControl
						label={ __( 'Layout', 'snow-monkey-blocks' ) }
						value={ layout }
						onChange={ ( value ) => setAttributes( { layout: value } ) }
						options={ [
							{
								value: 'rich-media',
								label: __( 'Rich media', 'snow-monkey-blocks' ),
							},
							{
								value: 'simple',
								label: __( 'Simple', 'snow-monkey-blocks' ),
							},
							{
								value: 'text',
								label: __( 'Text', 'snow-monkey-blocks' ),
							},
						] }
					/>

					<ToggleControl
						label={ __( 'Ignore sticky posts', 'snow-monkey-blocks' ) }
						checked={ ignoreStickyPosts }
						onChange={ ( value ) => setAttributes( { ignoreStickyPosts: value } ) }
					/>
				</PanelBody>
			</InspectorControls>
			<InspectorAdvancedControls>
				<TextControl
					label={ __( 'HTML Anchor', 'snow-monkey-blocks' ) }
					help={ __( 'Anchors lets you link directly to a section on a page.', 'snow-monkey-blocks' ) }
					value={ myAnchor || '' }
					onChange={ ( value ) => setAttributes( { myAnchor: value.replace( /[\s#]/g, '-' ) } ) }
				/>
			</InspectorAdvancedControls>

			<ServerSideRender
				block="snow-monkey-blocks/recent-posts"
				attributes={ attributes }
			/>
		</Fragment>
	);
}

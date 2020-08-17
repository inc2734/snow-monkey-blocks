import { times } from 'lodash';

import ServerSideRender from '@wordpress/server-side-render';
import { __ } from '@wordpress/i18n';

import {
	PanelBody,
	Placeholder,
	SelectControl,
	RangeControl,
	TextControl,
	TextareaControl,
	Button,
	ToolbarGroup,
	BaseControl,
} from '@wordpress/components';

import {
	InspectorControls,
	InspectorAdvancedControls,
	BlockControls,
} from '@wordpress/block-editor';

import { useState } from '@wordpress/element';

import { toNumber } from '../../src/js/helper/helper';

export default function( { attributes, setAttributes } ) {
	const [ isEditing, setIsEditing ] = useState( ! attributes.feedURL );

	const {
		feedURL,
		postsPerPage,
		layout,
		smCols,
		noPostsText,
		itemTitleTagName,
		myAnchor,
	} = attributes;

	const itemTitleTagNames = [ 'h2', 'h3', 'h4' ];

	const onChangeFeedURL = ( value ) =>
		setAttributes( {
			feedURL: value,
		} );

	const onSubmitFeedURL = ( event ) => {
		event.preventDefault();

		if ( feedURL ) {
			setIsEditing( false );
		}
	};

	const onChangePostsPerPage = ( value ) =>
		setAttributes( {
			postsPerPage: toNumber( value, 1, 12 ),
		} );

	const onChangeLayout = ( value ) =>
		setAttributes( {
			layout: value,
		} );

	const onChangeSmCols = ( value ) =>
		setAttributes( {
			smCols: toNumber( value ),
		} );

	const onChangeNoPostsText = ( value ) =>
		setAttributes( {
			noPostsText: value,
		} );

	const onChangeMyAnchor = ( value ) =>
		setAttributes( {
			myAnchor: value.replace( /[\s#]/g, '-' ),
		} );

	if ( isEditing ) {
		return (
			<Placeholder icon="rss" label="RSS">
				<form
					onSubmit={ onSubmitFeedURL }
					className="wp-block-rss__placeholder-form"
				>
					<TextControl
						placeholder={ __(
							'Enter URL here…',
							'snow-monkey-blocks'
						) }
						value={ feedURL }
						onChange={ onChangeFeedURL }
						className="wp-block-rss__placeholder-input"
					/>
					<Button isPrimary type="submit">
						{ __( 'Use URL', 'snow-monkey-blocks' ) }
					</Button>
				</form>
			</Placeholder>
		);
	}

	return (
		<>
			<BlockControls>
				<ToolbarGroup
					controls={ [
						{
							icon: 'edit',
							title: __( 'Edit RSS URL' ),
							onClick: () => setIsEditing( true ),
						},
					] }
				/>
			</BlockControls>

			<InspectorControls>
				<PanelBody
					title={ __( 'Block Settings', 'snow-monkey-blocks' ) }
				>
					<RangeControl
						label={ __( 'Number of posts', 'snow-monkey-blocks' ) }
						value={ postsPerPage }
						onChange={ onChangePostsPerPage }
						min="1"
						max="12"
					/>

					<SelectControl
						label={ __( 'Layout', 'snow-monkey-blocks' ) }
						value={ layout }
						onChange={ onChangeLayout }
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
							{
								value: 'panel',
								label: __( 'Panels', 'snow-monkey-blocks' ),
							},
						] }
					/>

					<BaseControl
						label={ __( 'Title Tag', 'snow-monkey-blocks' ) }
						id="snow-monkey-blocks/rss/item-title-tag-name"
					>
						<div className="smb-list-icon-selector">
							{ times( itemTitleTagNames.length, ( index ) => {
								const onClickItemTitleTagName = () =>
									setAttributes( {
										itemTitleTagName:
											itemTitleTagNames[ index ],
									} );

								const isPrimary =
									itemTitleTagName ===
									itemTitleTagNames[ index ];
								return (
									<Button
										isDefault={ ! isPrimary }
										isPrimary={ isPrimary }
										onClick={ onClickItemTitleTagName }
									>
										{ itemTitleTagNames[ index ] }
									</Button>
								);
							} ) }
						</div>
					</BaseControl>

					{ ( layout === 'layout' || layout === 'panel' ) && (
						<SelectControl
							label={ __(
								'Number of columns displayed on mobile device',
								'snow-monkey-blocks'
							) }
							value={ smCols }
							onChange={ onChangeSmCols }
							options={ [
								{
									value: 0,
									label: __(
										'Default',
										'snow-monkey-blocks'
									),
								},
								{
									value: 1,
									label: __(
										'1 column',
										'snow-monkey-blocks'
									),
								},
								{
									value: 2,
									label: __(
										'2 columns',
										'snow-monkey-blocks'
									),
								},
							] }
						/>
					) }

					<TextareaControl
						label={ __(
							'Text if no posts matched',
							'snow-monkey-blocks'
						) }
						help={ __( 'Allow HTML', 'snow-monkey-blocks' ) }
						value={ noPostsText || '' }
						onChange={ onChangeNoPostsText }
					/>
				</PanelBody>
			</InspectorControls>

			<InspectorAdvancedControls>
				<TextControl
					label={ __( 'HTML Anchor', 'snow-monkey-blocks' ) }
					help={ __(
						'Anchors lets you link directly to a section on a page.',
						'snow-monkey-blocks'
					) }
					value={ myAnchor || '' }
					onChange={ onChangeMyAnchor }
				/>
			</InspectorAdvancedControls>

			<ServerSideRender
				block="snow-monkey-blocks/rss"
				attributes={ attributes }
				className="components-disabled"
			/>
		</>
	);
}

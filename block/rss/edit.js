import { times } from 'lodash';

import ServerSideRender from '@wordpress/server-side-render';
import { __, sprintf } from '@wordpress/i18n';

import {
	BaseControl,
	Button,
	Disabled,
	PanelBody,
	Placeholder,
	RangeControl,
	SelectControl,
	TextControl,
	TextareaControl,
	ToggleControl,
	ToolbarButton,
} from '@wordpress/components';

import { InspectorControls, BlockControls } from '@wordpress/block-editor';

import { useState } from '@wordpress/element';

import { toNumber } from '@smb/helper';

export default function ( { attributes, setAttributes } ) {
	const [ isEditing, setIsEditing ] = useState( ! attributes.feedURL );

	const {
		feedURL,
		postsPerPage,
		layout,
		smCols,
		noPostsText,
		itemTitleTagName,
		arrows,
		dots,
		interval,
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

	const onChangeArrows = ( value ) =>
		setAttributes( {
			arrows: value,
		} );

	const onChangeDots = ( value ) =>
		setAttributes( {
			dots: value,
		} );

	const onChangeInterval = ( value ) =>
		setAttributes( {
			interval: toNumber( value, 0, 10 ),
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
			<BlockControls group="block">
				<ToolbarButton
					icon="edit"
					title={ __( 'Edit RSS URL', 'snow-monkey-blocks' ) }
					onClick={ () => setIsEditing( true ) }
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
								value: 'text2',
								label: __( 'Text 2', 'snow-monkey-blocks' ),
							},
							{
								value: 'panel',
								label: __( 'Panels', 'snow-monkey-blocks' ),
							},
							{
								value: 'carousel',
								label: sprintf(
									// translators: %1$s: Layout
									__(
										'Carousel (%1$s)',
										'snow-monkey-blocks'
									),
									__( 'Rich media', 'snow-monkey-blocks' )
								),
							},
						] }
					/>

					{ 'carousel' === layout && (
						<>
							<ToggleControl
								label={ __(
									'Display arrows',
									'snow-monkey-blocks'
								) }
								checked={ arrows }
								onChange={ onChangeArrows }
							/>

							<ToggleControl
								label={ __(
									'Display dots',
									'snow-monkey-blocks'
								) }
								checked={ dots }
								onChange={ onChangeDots }
							/>

							<RangeControl
								label={ __(
									'Autoplay Speed in seconds',
									'snow-monkey-blocks'
								) }
								help={ __(
									'If "0", no scroll.',
									'snow-monkey-blocks'
								) }
								value={ interval }
								onChange={ onChangeInterval }
								min="0"
								max="10"
							/>
						</>
					) }

					<BaseControl
						label={ __(
							'Title Tag of each items',
							'snow-monkey-blocks'
						) }
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
										isPrimary={ isPrimary }
										isSecondary={ ! isPrimary }
										onClick={ onClickItemTitleTagName }
										key={ index }
									>
										{ itemTitleTagNames[ index ] }
									</Button>
								);
							} ) }
						</div>
					</BaseControl>

					{ ( 'rich-media' === layout || 'panel' === layout ) && (
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

			<Disabled>
				<ServerSideRender
					block="snow-monkey-blocks/rss"
					attributes={ attributes }
				/>
			</Disabled>
		</>
	);
}

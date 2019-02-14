'use strict';

import classnames from 'classnames';
import { schema } from './_schema.js';

const { times } = lodash;
const { registerBlockType, createBlock } = wp.blocks;
const { InspectorControls, RichText, MediaPlaceholder, MediaUpload, URLInput } = wp.editor;
const { PanelBody, SelectControl, BaseControl, Button } = wp.components;
const { Fragment } = wp.element;
const { __ } = wp.i18n;

registerBlockType( 'snow-monkey-blocks/panels--item--horizontal', {
	title: __( 'Item (Horizontal)', 'snow-monkey-blocks' ),
	icon: 'screenoptions',
	category: 'smb',
	parent: [ 'snow-monkey-blocks/panels' ],
	attributes: schema,

	edit( { attributes, setAttributes, isSelected, className } ) {
		const { titleTagName, title, summary, linkLabel, linkURL, linkTarget, imagePosition, imageID, imageURL } = attributes;

		const titleTagNames = [ 'div', 'h2', 'h3' ];

		const onSelectImage = ( media ) => {
			const newImageURL = !! media.sizes && !! media.sizes.large ? media.sizes.large.url : media.url;
			setAttributes( { imageURL: newImageURL, imageID: media.id } );
		};

		const renderMedia = () => {
			if ( ! imageURL ) {
				return (
					<MediaPlaceholder
						icon="format-image"
						labels={ { title: __( 'Image' ) } }
						onSelect={ onSelectImage }
						accept="image/*"
						allowedTypes={ [ 'image' ] }
					/>
				);
			}

			return (
				<Fragment>
					<MediaUpload
						onSelect={ onSelectImage }
						type="image"
						value={ imageID }
						render={ ( obj ) => {
							return (
								<Button className="image-button" onClick={ obj.open } style={ { padding: 0 } }>
									<img src={ imageURL } alt="" className={ `wp-image-${ imageID }` } />
								</Button>
							);
						} }
					/>
					{ isSelected &&
						<button
							className="smb-remove-button"
							onClick={ () => {
								setAttributes( { imageURL: '', imageID: 0 } );
							} }
						>{ __( 'Remove', 'snow-monkey-blocks' ) }</button>
					}
				</Fragment>
			);
		};

		return (
			<Fragment>
				<InspectorControls>
					<PanelBody title={ __( 'Item Settings', 'snow-monkey-blocks' ) }>
						<BaseControl label={ __( 'Title Tag', 'snow-monkey-blocks' ) }>
							<div className="smb-list-icon-selector">
								{ times( titleTagNames.length, ( index ) => {
									return (
										<Button
											isDefault
											isPrimary={ titleTagName === titleTagNames[ index ] }
											onClick={ () => setAttributes( { titleTagName: titleTagNames[ index ] } ) }
										>
											{ titleTagNames[ index ] }
										</Button>
									);
								} ) }
							</div>
						</BaseControl>

						<SelectControl
							label={ __( 'Image Position', 'snow-monkey-blocks' ) }
							value={ imagePosition }
							options={ [
								{
									value: 'right',
									label: __( 'Right side', 'snow-monkey-blocks' ),
								},
								{
									value: 'left',
									label: __( 'Left side', 'snow-monkey-blocks' ),
								},
							] }
							onChange={ ( value ) => setAttributes( { imagePosition: value } ) }
						/>
					</PanelBody>

					<PanelBody title={ __( 'Link Settings', 'snow-monkey-blocks' ) }>
						<BaseControl label={ __( 'URL', 'snow-monkey-blocks' ) }>
							<URLInput
								value={ linkURL }
								onChange={ ( value ) => setAttributes( { linkURL: value } ) }
							/>
						</BaseControl>

						<SelectControl
							label={ __( 'Target', 'snow-monkey-blocks' ) }
							value={ linkTarget }
							options={ [
								{
									value: '_self',
									label: __( '_self', 'snow-monkey-blocks' ),
								},
								{
									value: '_blank',
									label: __( '_blank', 'snow-monkey-blocks' ),
								},
							] }
							onChange={ ( value ) => setAttributes( { linkTarget: value } ) }
						/>
					</PanelBody>
				</InspectorControls>

				<div className="c-row__col">
					<div
						className={ classnames( 'smb-panels__item', 'smb-panels__item--horizontal', { 'smb-panels__item--reverse': 'right' === imagePosition }, className ) }
						href={ linkURL }
						target={ linkTarget }
					>
						{ ( !! imageID || isSelected ) &&
							<div className="smb-panels__item__figure">
								{ renderMedia() }
							</div>
						}

						<div className="smb-panels__item__body">
							{ ( ! RichText.isEmpty( title ) || isSelected ) &&
								<RichText
									tagName={ titleTagName }
									className="smb-panels__item__title"
									placeholder={ __( 'Write title...', 'snow-monkey-blocks' ) }
									value={ title }
									onChange={ ( value ) => setAttributes( { title: value } ) }
								/>
							}

							{ ( ! RichText.isEmpty( summary ) || isSelected ) &&
								<RichText
									className="smb-panels__item__content"
									placeholder={ __( 'Write content...', 'snow-monkey-blocks' ) }
									value={ summary }
									onChange={ ( value ) => setAttributes( { summary: value } ) }
								/>
							}

							{ ( ! RichText.isEmpty( linkLabel ) || isSelected ) &&
								<div className="smb-panels__item__action">
									<RichText
										className="smb-panels__item__link"
										value={ linkLabel }
										placeholder={ __( 'Link', 'snow-monkey-blocks' ) }
										formattingControls={ [] }
										onChange={ ( value ) => setAttributes( { linkLabel: value } ) }
									/>
								</div>
							}
						</div>
					</div>
				</div>
			</Fragment>
		);
	},

	save( { attributes } ) {
		const { titleTagName, title, summary, linkLabel, linkURL, linkTarget, imagePosition, imageID, imageURL } = attributes;

		const renderItem = ( itemContent ) => {
			if ( !! linkURL ) {
				return (
					<a
						className={ classnames( 'smb-panels__item', 'smb-panels__item--horizontal', { 'smb-panels__item--reverse': 'right' === imagePosition } ) }
						href={ linkURL }
						target={ linkTarget }
					>
						{ itemContent }
					</a>
				);
			}

			return (
				<div
					className={ classnames( 'smb-panels__item', 'smb-panels__item--horizontal', { 'smb-panels__item--reverse': 'right' === imagePosition } ) }
					href={ linkURL }
					target={ linkTarget }
				>
					{ itemContent }
				</div>
			);
		};

		return (
			<div className="c-row__col">
				{
					renderItem(
						<Fragment>
							{ !! imageID &&
								<div className="smb-panels__item__figure">
									<img src={ imageURL } alt="" className={ `wp-image-${ imageID }` } />
								</div>
							}

							<div className="smb-panels__item__body">
								{ ! RichText.isEmpty( title ) &&
									<RichText.Content
										tagName={ titleTagName }
										className="smb-panels__item__title"
										value={ title }
									/>
								}

								{ ! RichText.isEmpty( summary ) &&
									<div className="smb-panels__item__content">
										<RichText.Content value={ summary } />
									</div>
								}

								{ ! RichText.isEmpty( linkLabel ) &&
									<div className="smb-panels__item__action">
										<div className="smb-panels__item__link">
											<RichText.Content value={ linkLabel } />
										</div>
									</div>
								}
							</div>
						</Fragment>
					)
				}
			</div>
		);
	},

	transforms: {
		to: [
			{
				type: 'block',
				blocks: [ 'snow-monkey-blocks/panels--item' ],
				transform: ( attributes ) => {
					return createBlock( 'snow-monkey-blocks/panels--item', attributes );
				},
			},
		],
	},
} );

'use strict';

import classnames from 'classnames';
import { schema } from './_schema.js';
import { deprecated } from './_deprecated.js';

const { times } = lodash;
const { registerBlockType, createBlock } = wp.blocks;
const { InspectorControls, RichText, MediaPlaceholder, MediaUpload, URLInput } = wp.editor;
const { PanelBody, SelectControl, BaseControl, Button } = wp.components;
const { Fragment } = wp.element;
const { __ } = wp.i18n;

registerBlockType( 'snow-monkey-blocks/panels--item', {
	title: __( 'Item', 'snow-monkey-blocks' ),
	description: __( 'It is a child block of the panels block.', 'snow-monkey-blocks' ),
	icon: 'screenoptions',
	category: 'smb',
	parent: [ 'snow-monkey-blocks/panels' ],
	attributes: schema,

	edit( { attributes, setAttributes, isSelected, className } ) {
		const { titleTagName, title, summary, linkLabel, linkURL, linkTarget, imageID, imageURL, imageAlt } = attributes;

		const titleTagNames = [ 'div', 'h2', 'h3' ];

		const onSelectImage = ( media ) => {
			const newImageURL = !! media.sizes && !! media.sizes.large ? media.sizes.large.url : media.url;
			setAttributes( { imageURL: newImageURL, imageID: media.id, imageAlt: media.alt } );
		};

		const PanelsItemFigureImg = () => {
			return ! imageURL ? (
				<MediaPlaceholder
					icon="format-image"
					labels={ { title: __( 'Image' ) } }
					onSelect={ onSelectImage }
					accept="image/*"
					allowedTypes={ [ 'image' ] }
				/>
			) : (
				<Fragment>
					<MediaUpload
						onSelect={ onSelectImage }
						type="image"
						value={ imageID }
						render={ ( obj ) => {
							return (
								<Button className="image-button" onClick={ obj.open } style={ { padding: 0 } }>
									<img src={ imageURL } alt={ imageAlt } className={ `wp-image-${ imageID }` } />
								</Button>
							);
						} }
					/>
					{ isSelected &&
						<button
							className="smb-remove-button"
							onClick={ () => {
								setAttributes( { imageURL: '', imageAlt: '', imageID: 0 } );
							} }
						>{ __( 'Remove', 'snow-monkey-blocks' ) }</button>
					}
				</Fragment>
			);
		};

		const classes = classnames( 'c-row__col', className );

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

				<div className={ classes }>
					<div
						className="smb-panels__item"
						href={ linkURL }
						target={ linkTarget }
					>
						{ ( !! imageID || isSelected ) &&
							<div className="smb-panels__item__figure">
								<PanelsItemFigureImg />
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

	save( { attributes, className } ) {
		const { titleTagName, title, summary, linkLabel, linkURL, linkTarget, imageID, imageURL, imageAlt } = attributes;

		const PanelsItemContent = () => {
			return (
				<Fragment>
					{ !! imageID &&
						<div className="smb-panels__item__figure">
							<img src={ imageURL } alt={ imageAlt } className={ `wp-image-${ imageID }` } />
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
			);
		};

		const classes = classnames( 'c-row__col', className );

		const PanelsItem = () => {
			return ( !! linkURL ? () => {
				return (
					<a
						className="smb-panels__item"
						href={ linkURL }
						target={ '_self' === linkTarget ? undefined : linkTarget }
						rel={ '_self' === linkTarget ? undefined : 'noopener noreferrer' }
					>
						<PanelsItemContent />
					</a>
				);
			} : () => {
				return (
					<div className="smb-panels__item">
						<PanelsItemContent />
					</div>
				);
			} ).call( this );
		};

		return (
			<div className={ classes }>
				<PanelsItem />
			</div>
		);
	},

	deprecated: deprecated,

	transforms: {
		to: [
			{
				type: 'block',
				blocks: [ 'snow-monkey-blocks/panels--item--horizontal' ],
				transform: ( attributes ) => {
					return createBlock( 'snow-monkey-blocks/panels--item--horizontal', attributes );
				},
			},
		],
	},
} );

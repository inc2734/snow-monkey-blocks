'use strict';

const { times } = lodash;
const { registerBlockType } = wp.blocks;
const { InspectorControls, RichText, MediaPlaceholder } = wp.editor;
const { PanelBody, SelectControl, TextControl, BaseControl, Button } = wp.components;
const { Fragment } = wp.element;
const { __ } = wp.i18n;

registerBlockType( 'snow-monkey-blocks/panels--item', {
	title: __( 'Item', 'snow-monkey-blocks' ),
	icon: 'screenoptions',
	category: 'smb',
	parent: [ 'snow-monkey-blocks/panels' ],
	attributes: {
		titleTagName: {
			type: 'string',
			default: 'div',
		},
		title: {
			source: 'html',
			selector: '.smb-panels__item__title',
		},
		summary: {
			source: 'html',
			selector: '.smb-panels__item__content',
		},
		linkLabel: {
			source: 'html',
			selector: '.smb-panels__item__link',
		},
		linkURL: {
			type: 'string',
			source: 'attribute',
			selector: '.smb-panels__item',
			attribute: 'href',
			default: '',
		},
		linkTarget: {
			type: 'string',
			source: 'attribute',
			selector: '.smb-panels__item',
			attribute: 'target',
			default: '_self',
		},
		imageID: {
			type: 'number',
			default: 0,
		},
		imageURL: {
			type: 'string',
			source: 'attribute',
			selector: '.smb-panels__item__figure > img',
			attribute: 'src',
			default: '',
		},
	},

	edit( { attributes, setAttributes, isSelected } ) {
		const { titleTagName, title, summary, linkLabel, linkURL, linkTarget, imageID, imageURL } = attributes;

		const titleTagNames = [ 'div', 'h2', 'h3' ];

		const renderMedia = () => {
			if ( ! imageURL ) {
				return (
					<MediaPlaceholder
						icon="format-image"
						labels={ { title: __( 'Image' ) } }
						onSelect={ ( media ) => {
							const newImageURL = !! media.sizes && !! media.sizes.large ? media.sizes.large.url : media.url;
							setAttributes( { imageURL: newImageURL } );
							setAttributes( { imageID: media.id } );
						} }
						accept="image/*"
						allowedTypes={ [ 'image' ] }
					/>
				);
			}

			return (
				<Fragment>
					<img src={ imageURL } alt="" className={ `wp-image-${ imageID }` } />
					<button
						className="smb-remove-button"
						onClick={ () => {
							setAttributes( { imageURL: '' } );
							setAttributes( { imageID: 0 } );
						} }
					>{ __( 'Remove', 'snow-monkey-blocks' ) }</button>
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
					</PanelBody>

					<PanelBody title={ __( 'Link Settings', 'snow-monkey-blocks' ) }>
						<TextControl
							label={ __( 'URL', 'snow-monkey-blocks' ) }
							value={ linkURL }
							onChange={ ( value ) => setAttributes( { linkURL: value } ) }
						/>

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
						className="smb-panels__item"
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
		const { titleTagName, title, summary, linkLabel, linkURL, linkTarget, imageID, imageURL } = attributes;

		const renderItem = ( itemContent ) => {
			if ( !! linkURL ) {
				return (
					<a
						className="smb-panels__item"
						href={ linkURL }
						target={ linkTarget }
					>
						{ itemContent }
					</a>
				);
			}

			return (
				<div
					className="smb-panels__item"
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
} );

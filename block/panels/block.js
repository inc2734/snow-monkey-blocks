'use strict';

import toNumber from '../../src/js/helper/to-number';
import generateUpdatedAttribute from '../../src/js/helper/generate-updated-attribute';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { schema } from './_schema.js';
import { deprecated } from './_deprecated.js';

const { times, get } = lodash;
const { registerBlockType } = wp.blocks;
const { InspectorControls, RichText, MediaPlaceholder } = wp.editor;
const { PanelBody, RangeControl, SelectControl, TextControl, ToggleControl, BaseControl, Button, TabPanel, Dashicon } = wp.components;
const { Fragment } = wp.element;
const { __, sprintf } = wp.i18n;

const generateColClasses = ( sm, md, lg ) => {
	let colClasses = [];
	colClasses.push( 'c-row__col' );
	colClasses.push( `c-row__col--1-${ sm }` );
	colClasses.push( `c-row__col--md-1-${ md }` );
	colClasses.push( `c-row__col--lg-1-${ lg }` );
	colClasses = colClasses.join( ' ' );
	return colClasses;
};

registerBlockType( 'snow-monkey-blocks/panels', {
	title: __( 'Panels', 'snow-monkey-blocks' ),
	icon: 'screenoptions',
	category: 'smb',
	attributes: schema,

	edit( { attributes, setAttributes, isSelected } ) {
		const { columns, sm, md, lg, imagePadding, itemTitleTagName, items } = attributes;

		const itemTitleTagNames = [ 'div', 'h2', 'h3' ];

		return (
			<Fragment>
				<InspectorControls>
					<PanelBody title={ __( 'Columns Settings', 'snow-monkey-blocks' ) }>
						<RangeControl
							label={ __( 'Columns', 'snow-monkey-blocks' ) }
							value={ columns }
							onChange={ ( value ) => setAttributes( { columns: toNumber( value, 1, 24 ) } ) }
							min="1"
							max="24"
						/>

						<TabPanel
							className="smb-inspector-tabs"
							tabs={ [
								{
									name: 'desktop',
									title: <Dashicon icon="desktop" />,
								},
								{
									name: 'tablet',
									title: <Dashicon icon="tablet" />,
								},
								{
									name: 'mobile',
									title: <Dashicon icon="smartphone" />,
								},
							] }>
							{
								( tab ) => {
									if ( tab.name ) {
										if ( 'desktop' === tab.name ) {
											return (
												<RangeControl
													label={ __( 'Columns per row (large window)', 'snow-monkey-blocks' ) }
													value={ lg }
													onChange={ ( value ) => setAttributes( { lg: toNumber( value, 1, 4 ) } ) }
													min="1"
													max="4"
												/>
											);
										}

										if ( 'tablet' === tab.name ) {
											return (
												<RangeControl
													label={ __( 'Columns per row (Medium window)', 'snow-monkey-blocks' ) }
													value={ md }
													onChange={ ( value ) => setAttributes( { md: toNumber( value, 1, 4 ) } ) }
													min="1"
													max="4"
												/>
											);
										}

										if ( 'mobile' === tab.name ) {
											return (
												<RangeControl
													label={ __( 'Columns per row (Small window)', 'snow-monkey-blocks' ) }
													value={ sm }
													onChange={ ( value ) => setAttributes( { sm: toNumber( value, 1, 4 ) } ) }
													min="1"
													max="4"
												/>
											);
										}
									}
								}
							}
						</TabPanel>
					</PanelBody>

					<PanelBody title={ __( 'Panels Settings', 'snow-monkey-blocks' ) }>
						<ToggleControl
							label={ __( 'Set padding around images', 'snow-monkey-blocks' ) }
							checked={ imagePadding }
							onChange={ ( value ) => setAttributes( { imagePadding: value } ) }
						/>

						<BaseControl label={ __( 'Item Title Tag', 'snow-monkey-blocks' ) }>
							<div className="smb-list-icon-selector">
								{ times( itemTitleTagNames.length, ( index ) => {
									return (
										<Button
											isDefault
											isPrimary={ itemTitleTagName === itemTitleTagNames[ index ] }
											onClick={ () => setAttributes( { itemTitleTagName: itemTitleTagNames[ index ] } ) }
										>
											{ itemTitleTagNames[ index ] }
										</Button>
									);
								} ) }
							</div>
						</BaseControl>
					</PanelBody>

					{ times( columns, ( index ) => {
						const linkURL = get( items, [ index, 'linkURL' ], '' );
						const linkTarget = get( items, [ index, 'linkTarget' ], '_self' );

						return (
							<PanelBody
								title={ sprintf( __( '(%d) Link Settings', 'snow-monkey-blocks' ), index + 1 ) }
								initialOpen={ false }
							>
								<TextControl
									label={ __( 'URL', 'snow-monkey-blocks' ) }
									value={ linkURL }
									onChange={ ( value ) => setAttributes( { items: generateUpdatedAttribute( items, index, 'linkURL', value ) } ) }
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
									onChange={ ( value ) => setAttributes( { items: generateUpdatedAttribute( items, index, 'linkTarget', value ) } ) }
								/>
							</PanelBody>
						);
					} ) }
				</InspectorControls>

				<div className={ `smb-panels smb-panels--sm-${ sm } smb-panels--md-${ md } smb-panels--lg-${ lg }` } data-image-padding={ imagePadding }>
					<div className="c-row c-row--margin c-row--fill">
						{ times( columns, ( index ) => {
							const itemTitle = get( items, [ index, 'title' ], '' );
							const summary = get( items, [ index, 'summary' ], '' );
							const linkLabel = get( items, [ index, 'linkLabel' ], '' );
							const linkURL = get( items, [ index, 'linkURL' ], '' );
							const linkTarget = get( items, [ index, 'linkTarget' ], '_self' );
							const imageID = get( items, [ index, 'imageID' ], 0 );
							const imageURL = get( items, [ index, 'imageURL' ], '' );

							const renderMedia = () => {
								if ( ! imageURL ) {
									return (
										<MediaPlaceholder
											icon="format-image"
											labels={ { title: __( 'Image' ) } }
											onSelect={ ( media ) => {
												const newImageURL = !! media.sizes && !! media.sizes.large ? media.sizes.large.url : media.url;
												let newItems = items;
												newItems = generateUpdatedAttribute( newItems, index, 'imageURL', newImageURL );
												newItems = generateUpdatedAttribute( newItems, index, 'imageID', media.id );
												setAttributes( { items: newItems } );
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
												setAttributes( { items: generateUpdatedAttribute( items, index, 'imageURL', '' ) } );
												setAttributes( { items: generateUpdatedAttribute( items, index, 'imageID', 0 ) } );
											} }
										>{ __( 'Remove', 'snow-monkey-blocks' ) }</button>
									</Fragment>
								);
							};

							return (
								<div className={ generateColClasses( sm, md, lg ) }>
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
											{ ( ! RichText.isEmpty( itemTitle ) || isSelected ) &&
												<RichText
													tagName={ itemTitleTagName }
													className="smb-panels__item__title"
													placeholder={ __( 'Write title...', 'snow-monkey-blocks' ) }
													value={ itemTitle }
													onChange={ ( value ) => setAttributes( { items: generateUpdatedAttribute( items, index, 'title', value ) } ) }
												/>
											}

											{ ( ! RichText.isEmpty( summary ) || isSelected ) &&
												<RichText
													className="smb-panels__item__content"
													placeholder={ __( 'Write content...', 'snow-monkey-blocks' ) }
													value={ summary }
													onChange={ ( value ) => setAttributes( { items: generateUpdatedAttribute( items, index, 'summary', value ) } ) }
												/>
											}

											{ ( ! RichText.isEmpty( linkLabel ) || isSelected ) &&
												<div className="smb-panels__item__action">
													<RichText
														className="smb-panels__item__link"
														value={ linkLabel }
														placeholder={ __( 'Link', 'snow-monkey-blocks' ) }
														formattingControls={ [] }
														onChange={ ( value ) => setAttributes( { items: generateUpdatedAttribute( items, index, 'linkLabel', value ) } ) }
													/>
												</div>
											}
										</div>
									</div>

									{ index + 1 === columns && isSelected &&
										<div className="smb-add-item-button-wrapper">
											{ columns > 1 &&
												<button className="smb-remove-item-button" onClick={ () => setAttributes( { columns: columns - 1 } ) }>
													<FontAwesomeIcon icon="minus-circle" />
												</button>
											}

											<button className="smb-add-item-button" onClick={ () => setAttributes( { columns: columns + 1 } ) }>
												<FontAwesomeIcon icon="plus-circle" />
											</button>
										</div>
									}
								</div>
							);
						} ) }
					</div>
				</div>
			</Fragment>
		);
	},

	save( { attributes } ) {
		const { columns, sm, md, lg, imagePadding, itemTitleTagName, items } = attributes;

		return (
			<div className={ `smb-panels smb-panels--sm-${ sm } smb-panels--md-${ md } smb-panels--lg-${ lg }` } data-image-padding={ imagePadding }>
				<div className="c-row c-row--margin c-row--fill">
					{ times( columns, ( index ) => {
						const itemTitle = get( items, [ index, 'title' ], '' );
						const summary = get( items, [ index, 'summary' ], '' );
						const linkLabel = get( items, [ index, 'linkLabel' ], '' );
						const linkURL = get( items, [ index, 'linkURL' ], '' );
						const linkTarget = get( items, [ index, 'linkTarget' ], '_self' );
						const imageID = get( items, [ index, 'imageID' ], 0 );
						const imageURL = get( items, [ index, 'imageURL' ], '' );

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
							<div className={ generateColClasses( sm, md, lg ) }>
								{
									renderItem(
										<Fragment>
											{ !! imageID &&
												<div className="smb-panels__item__figure">
													<img src={ imageURL } alt="" className={ `wp-image-${ imageID }` } data-image-id={ imageID } />
												</div>
											}

											<div className="smb-panels__item__body">
												{ ! RichText.isEmpty( itemTitle ) &&
													<RichText.Content
														tagName={ itemTitleTagName }
														className="smb-panels__item__title"
														value={ itemTitle }
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
					} ) }
				</div>
			</div>
		);
	},

	deprecated: deprecated,
} );

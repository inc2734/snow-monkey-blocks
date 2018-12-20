'use strict';

import toNumber from '../../src/js/helper/to-number';
import generateUpdatedAttribute from '../../src/js/helper/generate-updated-attribute';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { schema } from './_schema.js';
import { deprecated } from './_deprecated.js';

const { times, get } = lodash;
const { registerBlockType } = wp.blocks;
const { InspectorControls, RichText, ColorPalette, MediaPlaceholder } = wp.editor;
const { PanelBody, RangeControl, SelectControl, TextControl, BaseControl, Button, TabPanel, Dashicon } = wp.components;
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

registerBlockType( 'snow-monkey-blocks/items', {
	title: __( 'Items', 'snow-monkey-blocks' ),
	icon: 'screenoptions',
	category: 'smb',
	attributes: schema,

	edit( { attributes, setAttributes, isSelected } ) {
		const { columns, sm, md, lg, itemTitleTagName, items } = attributes;

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

					<PanelBody title={ __( 'Items Settings', 'snow-monkey-blocks' ) }>
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
						const btnURL = get( items, [ index, 'btnURL' ], '' );
						const btnTarget = get( items, [ index, 'btnTarget' ], '_self' );
						const btnBackgroundColor = get( items, [ index, 'btnBackgroundColor' ], '' );
						const btnTextColor = get( items, [ index, 'btnTextColor' ], '' );

						return (
							<PanelBody
								title={ sprintf( __( '(%d) Button Settings', 'snow-monkey-blocks' ), index + 1 ) }
								initialOpen={ false }
							>
								<TextControl
									label={ __( 'URL', 'snow-monkey-blocks' ) }
									value={ btnURL }
									onChange={ ( value ) => setAttributes( { items: generateUpdatedAttribute( items, index, 'btnURL', value ) } ) }
								/>

								<SelectControl
									label={ __( 'Target', 'snow-monkey-blocks' ) }
									value={ btnTarget }
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
									onChange={ ( value ) => setAttributes( { items: generateUpdatedAttribute( items, index, 'btnTarget', value ) } ) }
								/>

								<BaseControl label={ __( 'Background Color', 'snow-monkey-blocks' ) }>
									<ColorPalette
										value={ btnBackgroundColor }
										onChange={ ( value ) => setAttributes( { items: generateUpdatedAttribute( items, index, 'btnBackgroundColor', value ) } ) }
									/>
								</BaseControl>

								<BaseControl label={ __( 'Text Color', 'snow-monkey-blocks' ) }>
									<ColorPalette
										value={ btnTextColor }
										onChange={ ( value ) => setAttributes( { items: generateUpdatedAttribute( items, index, 'btnTextColor', value ) } ) }
									/>
								</BaseControl>
							</PanelBody>
						);
					} ) }
				</InspectorControls>

				<div className={ `smb-items smb-items--sm-${ sm } smb-items--md-${ md } smb-items--lg-${ lg }` }>
					<div className="c-row c-row--margin">
						{ times( columns, ( index ) => {
							const itemTitle = get( items, [ index, 'title' ], '' );
							const lede = get( items, [ index, 'lede' ], '' );
							const summary = get( items, [ index, 'summary' ], '' );
							const btnLabel = get( items, [ index, 'btnLabel' ], '' );
							const btnURL = get( items, [ index, 'btnURL' ], '' );
							const btnTarget = get( items, [ index, 'btnTarget' ], '_self' );
							const btnBackgroundColor = get( items, [ index, 'btnBackgroundColor' ], '' );
							const btnTextColor = get( items, [ index, 'btnTextColor' ], '' );
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
									<div className="smb-items__item">
										{ ( !! imageID || isSelected ) &&
											<div className="smb-items__item__figure">
												{ renderMedia() }
											</div>
										}

										<RichText
											tagName={ itemTitleTagName }
											className="smb-items__item__title"
											placeholder={ __( 'Write title...', 'snow-monkey-blocks' ) }
											value={ itemTitle }
											onChange={ ( value ) => setAttributes( { items: generateUpdatedAttribute( items, index, 'title', value ) } ) }
										/>

										{ ( ! RichText.isEmpty( lede ) || isSelected ) &&
											<RichText
												className="smb-items__item__lede"
												placeholder={ __( 'Write lede...', 'snow-monkey-blocks' ) }
												value={ lede }
												onChange={ ( value ) => setAttributes( { items: generateUpdatedAttribute( items, index, 'lede', value ) } ) }
											/>
										}

										{ ( ! RichText.isEmpty( summary ) || isSelected ) &&
											<RichText
												className="smb-items__item__content"
												placeholder={ __( 'Write content...', 'snow-monkey-blocks' ) }
												value={ summary }
												onChange={ ( value ) => setAttributes( { items: generateUpdatedAttribute( items, index, 'summary', value ) } ) }
											/>
										}

										{ ( ! RichText.isEmpty( btnLabel ) || isSelected ) &&
											<div className="smb-items__item__action">
												<span className="smb-items__item__btn smb-btn"
													href={ btnURL }
													target={ btnTarget }
													style={ { backgroundColor: btnBackgroundColor } }
													data-background-color={ btnBackgroundColor }
													data-color={ btnTextColor }
												>
													<RichText
														className="smb-btn__label"
														style={ { color: btnTextColor } }
														value={ btnLabel }
														placeholder={ __( 'Button', 'snow-monkey-blocks' ) }
														formattingControls={ [] }
														onChange={ ( value ) => setAttributes( { items: generateUpdatedAttribute( items, index, 'btnLabel', value ) } ) }
													/>
												</span>
											</div>
										}
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
		const { columns, sm, md, lg, itemTitleTagName, items } = attributes;

		return (
			<div className={ `smb-items smb-items--sm-${ sm } smb-items--md-${ md } smb-items--lg-${ lg }` }>
				<div className="c-row c-row--margin">
					{ times( columns, ( index ) => {
						const itemTitle = get( items, [ index, 'title' ], '' );
						const lede = get( items, [ index, 'lede' ], '' );
						const summary = get( items, [ index, 'summary' ], '' );
						const btnLabel = get( items, [ index, 'btnLabel' ], '' );
						const btnURL = get( items, [ index, 'btnURL' ], '' );
						const btnTarget = get( items, [ index, 'btnTarget' ], '_self' );
						const btnBackgroundColor = get( items, [ index, 'btnBackgroundColor' ], '' );
						const btnTextColor = get( items, [ index, 'btnTextColor' ], '' );
						const imageID = get( items, [ index, 'imageID' ], 0 );
						const imageURL = get( items, [ index, 'imageURL' ], '' );

						return (
							<div className={ generateColClasses( sm, md, lg ) }>
								<div className="smb-items__item">
									{ !! imageID &&
										<div className="smb-items__item__figure">
											<img src={ imageURL } alt="" className={ `wp-image-${ imageID }` } data-image-id={ imageID } />
										</div>
									}

									<RichText.Content
										tagName={ itemTitleTagName }
										className="smb-items__item__title"
										value={ itemTitle }
									/>

									{ ! RichText.isEmpty( lede ) &&
										<div className="smb-items__item__lede">
											<RichText.Content value={ lede } />
										</div>
									}

									{ ! RichText.isEmpty( summary ) &&
										<div className="smb-items__item__content">
											<RichText.Content value={ summary } />
										</div>
									}

									{ ( ! RichText.isEmpty( btnLabel ) && !! btnURL ) &&
										<div className="smb-items__item__action">
											<a className="smb-items__item__btn smb-btn"
												href={ btnURL }
												target={ btnTarget }
												style={ { backgroundColor: btnBackgroundColor } }
												data-background-color={ btnBackgroundColor }
												data-color={ btnTextColor }
											>
												<span className="smb-btn__label" style={ { color: btnTextColor } }>
													<RichText.Content value={ btnLabel } />
												</span>
											</a>
										</div>
									}
								</div>
							</div>
						);
					} ) }
				</div>
			</div>
		);
	},

	deprecated: deprecated,
} );

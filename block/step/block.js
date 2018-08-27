'use strict';

import classnames from 'classnames';

const { get, times } = lodash;
const { registerBlockType } = wp.blocks;
const { RichText, InspectorControls, ColorPalette, MediaUpload } = wp.editor;
const { PanelBody, RangeControl, SelectControl, TextControl, BaseControl, Button } = wp.components;
const { Fragment } = wp.element;
const { __, sprintf } = wp.i18n;

registerBlockType( 'snow-monkey-awesome-custom-blocks/step', {
	title: __( 'Step', 'snow-monkey-awesome-custom-blocks' ),
	icon: 'editor-ol',
	category: 'smacb',
	attributes: {
		content: {
			type: 'array',
			source: 'query',
			selector: '.smacb-step__item',
			default: [],
			query: {
				title: {
					type: 'array',
					source: 'children',
					selector: '.smacb-step__item__title > span',
					default: [],
				},
				summary: {
					type: 'array',
					source: 'children',
					selector: '.smacb-step__item__summary',
					default: [],
				},
				numberColor: {
					type: 'string',
					source: 'attribute',
					selector: '.smacb-step__item__number',
					attribute: 'data-number-color',
					default: null,
				},
				imagePosition: {
					type: 'string',
					source: 'attribute',
					attribute: 'data-image-position',
					default: 'left',
				},
				imageID: {
					type: 'number',
					source: 'attribute',
					selector: '.smacb-step__item__figure > img',
					attribute: 'data-image-id',
					default: 0,
				},
				imageURL: {
					type: 'string',
					source: 'attribute',
					selector: '.smacb-step__item__figure > img',
					attribute: 'src',
					default: smacb.pluginURL + 'block/step/image.png',
				},
				linkLabel: {
					type: 'array',
					source: 'children',
					selector: '.smacb-step__item__link__label',
					default: [],
				},
				linkURL: {
					type: 'string',
					source: 'attribute',
					selector: '.smacb-step__item__link',
					attribute: 'href',
					default: '',
				},
				linkTarget: {
					type: 'string',
					source: 'attribute',
					selector: '.smacb-step__item__link',
					attribute: 'target',
					default: '_self',
				},
			},
		},
		rows: {
			type: 'number',
			default: 1,
		},
	},

	edit( { attributes, setAttributes, isSelected } ) {
		const { rows, content } = attributes;

		const generateUpdatedAttribute = ( parent, index, attribute, value ) => {
			const newParent = [ ...parent ];
			newParent[ index ] = get( newParent, index, {} );
			newParent[ index ][ attribute ] = value;
			return newParent;
		};

		return (
			<Fragment>
				<InspectorControls>
					<PanelBody title={ __( 'Step Settings', 'snow-monkey-awesome-custom-blocks' ) }>
						<RangeControl
							label={ __( 'Rows', 'snow-monkey-awesome-custom-blocks' ) }
							value={ rows }
							onChange={ ( value ) => setAttributes( { rows: value } ) }
							min="1"
							max="50"
						/>
					</PanelBody>

					{ times( rows, ( index ) => {
						const numberColor = get( content, [ index, 'numberColor' ], null );
						const imagePosition = get( content, [ index, 'imagePosition' ], 'left' );
						const linkURL = get( content, [ index, 'linkURL' ], '' );
						const linkTarget = get( content, [ index, 'linkTarget' ], '_self' );

						return (
							<PanelBody
								title={ sprintf( __( 'STEP.%d Settings', 'snow-monkey-awesome-custom-blocks' ), index + 1 ) }
								initialOpen={ false }
							>
								<SelectControl
									label={ __( 'Image Position', 'snow-monkey-awesome-custom-blocks' ) }
									value={ imagePosition }
									options={ [
										{
											value: 'left',
											label: __( 'Left side', 'snow-monkey-awesome-custom-blocks' ),
										},
										{
											value: 'center',
											label: __( 'Center', 'snow-monkey-awesome-custom-blocks' ),
										},
										{
											value: 'right',
											label: __( 'Right side', 'snow-monkey-awesome-custom-blocks' ),
										},
									] }
									onChange={ ( value ) => setAttributes( { content: generateUpdatedAttribute( content, index, 'imagePosition', value ) } ) }
								/>

								<BaseControl label={ __( 'Number Color', 'snow-monkey-awesome-custom-blocks' ) }>
									<ColorPalette
										value={ numberColor }
										onChange={ ( value ) => setAttributes( { content: generateUpdatedAttribute( content, index, 'numberColor', value ) } ) }
									/>
								</BaseControl>

								<TextControl
									label={ __( 'Link URL', 'snow-monkey-awesome-custom-blocks' ) }
									value={ linkURL }
									onChange={ ( value ) => setAttributes( { content: generateUpdatedAttribute( content, index, 'linkURL', value ) } ) }
								/>

								<SelectControl
									label={ __( 'Link Target', 'snow-monkey-awesome-custom-blocks' ) }
									value={ linkTarget }
									options={ [
										{
											value: '_self',
											label: __( '_self', 'snow-monkey-awesome-custom-blocks' ),
										},
										{
											value: '_blank',
											label: __( '_blank', 'snow-monkey-awesome-custom-blocks' ),
										},
									] }
									onChange={ ( value ) => setAttributes( { content: generateUpdatedAttribute( content, index, 'linkTarget', value ) } ) }
								/>
							</PanelBody>
						);
					} ) }
				</InspectorControls>

				<div className="smacb-step">
					<div className="smacb-step__body">
						{ times( rows, ( index ) => {
							const title = get( content, [ index, 'title' ], [] );
							const summary = get( content, [ index, 'summary' ], [] );
							const numberColor = get( content, [ index, 'numberColor' ], null );
							const imagePosition = get( content, [ index, 'imagePosition' ], 'left' );
							const imageID = get( content, [ index, 'imageID' ], 0 );
							const imageURL = get( content, [ index, 'imageURL' ], smacb.pluginURL + 'block/step/image.png' );
							const linkURL = get( content, [ index, 'linkURL' ], '' );
							const linkTarget = get( content, [ index, 'linkTarget' ], '_self' );
							const linkLabel = get( content, [ index, 'linkLabel' ], [] );

							const renderImage = ( obj ) => {
								return (
									<Button className="image-button" onClick={ obj.open } style={ { padding: 0 } }>
										<img src={ imageURL } alt="" />
									</Button>
								);
							};

							return (
								<div className={ classnames( 'smacb-step__item', { [ `smacb-step__item--image-${ imagePosition }` ]: !! imageID } ) } data-image-position={ imagePosition }>
									<div className="smacb-step__item__title">
										<div className="smacb-step__item__number" data-number-color={ numberColor } style={ { backgroundColor: numberColor } }>
											{ index + 1 }
										</div>
										<span>
											<RichText
												placeholder={ __( 'Write title…', 'snow-monkey-awesome-custom-blocks' ) }
												value={ title }
												formattingControls={ [] }
												multiline={ false }
												onChange={ ( value ) => setAttributes( { content: generateUpdatedAttribute( content, index, 'title', value ) } ) }
											/>
										</span>
									</div>

									{ ( !! imageID || isSelected ) &&
										<div className="smacb-step__item__figure">
											<MediaUpload
												onSelect={ ( media ) => {
													const newImageURL = !! media.sizes.large ? media.sizes.large.url : media.url;
													setAttributes( { content: generateUpdatedAttribute( content, index, 'imageURL', newImageURL ) } );
													setAttributes( { content: generateUpdatedAttribute( content, index, 'imageID', media.id ) } );
												} }
												type="image"
												value={ imageID }
												render={ renderImage }
											/>
										</div>
									}

									<div className="smacb-step__item__body">
										<RichText
											className="smacb-step__item__summary"
											placeholder={ __( 'Write content…', 'snow-monkey-awesome-custom-blocks' ) }
											value={ summary }
											multiline="p"
											onChange={ ( value ) => setAttributes( { content: generateUpdatedAttribute( content, index, 'summary', value ) } ) }
										/>

										{ ( ( linkLabel.length > 0 && !! linkURL ) || isSelected ) &&
											<span className="smacb-step__item__link" href={ linkURL } target={ linkTarget }>
												<i className="fas fa-arrow-circle-right" />
												<RichText
													className="smacb-step__item__link__label"
													placeholder={ __( 'Link text', 'snow-monkey-awesome-custom-blocks' ) }
													value={ linkLabel }
													formattingControls={ [] }
													multiline={ false }
													onChange={ ( value ) => setAttributes( { content: generateUpdatedAttribute( content, index, 'linkLabel', value ) } ) }
												/>
											</span>
										}
									</div>
								</div>
							);
						} ) }
					</div>
				</div>
			</Fragment>
		);
	},

	save( { attributes } ) {
		const { rows, content } = attributes;

		return (
			<div className="smacb-step">
				<div className="smacb-step__body">
					{ times( rows, ( index ) => {
						const title = get( content, [ index, 'title' ], [] );
						const summary = get( content, [ index, 'summary' ], [] );
						const numberColor = get( content, [ index, 'numberColor' ], null );
						const imagePosition = get( content, [ index, 'imagePosition' ], 'left' );
						const imageID = get( content, [ index, 'imageID' ], 0 );
						const imageURL = get( content, [ index, 'imageURL' ], smacb.pluginURL + 'block/step/image.png' );
						const linkURL = get( content, [ index, 'linkURL' ], '' );
						const linkTarget = get( content, [ index, 'linkTarget' ], '_self' );
						const linkLabel = get( content, [ index, 'linkLabel' ], [] );

						return (
							<div className={ classnames( 'smacb-step__item', { [ `smacb-step__item--image-${ imagePosition }` ]: !! imageID } ) } data-image-position={ imagePosition }>
								<div className="smacb-step__item__title">
									<div className="smacb-step__item__number" data-number-color={ numberColor } style={ { backgroundColor: numberColor } }>
										{ index + 1 }
									</div>
									<span>
										{ title }
									</span>
								</div>

								{ !! imageID &&
									<div className="smacb-step__item__figure">
										<img src={ imageURL } alt="" data-image-id={ imageID } />
									</div>
								}

								<div className="smacb-step__item__body">
									<div className="smacb-step__item__summary">
										{ summary }
									</div>

									{ linkLabel.length > 0 && !! linkURL &&
										<a className="smacb-step__item__link" href={ linkURL } target={ linkTarget }>
											<i className="fas fa-arrow-circle-right" />
											<span className="smacb-step__item__link__label">
												{ linkLabel }
											</span>
										</a>
									}
								</div>
							</div>
						);
					} ) }
				</div>
			</div>
		);
	},
} );

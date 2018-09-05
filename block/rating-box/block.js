'use strict';

const { get, times } = lodash;
const { registerBlockType } = wp.blocks;
const { RichText, InspectorControls, ColorPalette } = wp.editor;
const { PanelBody, RangeControl, BaseControl } = wp.components;
const { Fragment } = wp.element;
const { __, sprintf } = wp.i18n;

registerBlockType( 'snow-monkey-blocks/rating-box', {
	title: __( 'Rating box', 'snow-monkey-blocks' ),
	icon: 'editor-alignleft',
	category: 'smb',
	attributes: {
		ratings: {
			type: 'array',
			source: 'query',
			selector: '.smb-rating-box__item',
			default: [],
			query: {
				title: {
					type: 'array',
					source: 'children',
					selector: '.smb-rating-box__item__title',
					default: [],
				},
				rating: {
					type: 'number',
					source: 'attribute',
					attribute: 'data-rating',
					default: 0,
				},
				color: {
					type: 'string',
					source: 'attribute',
					attribute: 'data-color',
					default: null,
				},
			},
		},
		rows: {
			type: 'number',
			default: 1,
		},
	},

	edit( { attributes, setAttributes } ) {
		const { rows, ratings } = attributes;

		const generateUpdatedAttribute = ( parent, index, attribute, value ) => {
			const newParent = [ ...parent ];
			newParent[ index ] = get( newParent, index, {} );
			newParent[ index ][ attribute ] = value;
			return newParent;
		};

		return (
			<Fragment>
				<InspectorControls>
					<PanelBody title={ __( 'Rating box Settings', 'snow-monkey-blocks' ) }>
						<RangeControl
							label={ __( 'Rows', 'snow-monkey-blocks' ) }
							value={ rows }
							onChange={ ( value ) => setAttributes( { rows: value } ) }
							min="1"
							max="10"
						/>
					</PanelBody>

					{ times( rows, ( index ) => {
						const rating = get( ratings, [ index, 'rating' ], 0 );
						const color = get( ratings, [ index, 'color' ], '' );

						return (
							<PanelBody
								title={ sprintf( __( '(%d) Rating Settings', 'snow-monkey-blocks' ), index + 1 ) }
								initialOpen={ false }
							>
								<RangeControl
									label={ __( 'Rating', 'snow-monkey-blocks' ) }
									value={ rating }
									onChange={ ( value ) => setAttributes( { ratings: generateUpdatedAttribute( ratings, index, 'rating', value ) } ) }
									min="1"
									max="10"
								/>

								<BaseControl label={ __( 'Color', 'snow-monkey-blocks' ) }>
									<ColorPalette
										value={ color }
										onChange={ ( value ) => setAttributes( { ratings: generateUpdatedAttribute( ratings, index, 'color', value ) } ) }
									/>
								</BaseControl>
							</PanelBody>
						);
					} ) }
				</InspectorControls>

				<div className="smb-rating-box">
					<div className="smb-rating-box__body">
						{ times( rows, ( index ) => {
							const itemTitle = get( ratings, [ index, 'title' ], [] );
							const rating = get( ratings, [ index, 'rating' ], 0 );
							const color = get( ratings, [ index, 'color' ], '' );

							return (
								<div className="smb-rating-box__item" data-rating={ rating } data-color={ color }>
									<RichText
										className="smb-rating-box__item__title"
										placeholder={ __( 'Write title…', 'snow-monkey-blocks' ) }
										value={ itemTitle }
										formattingControls={ [] }
										multiline={ false }
										onChange={ ( value ) => setAttributes( { ratings: generateUpdatedAttribute( ratings, index, 'title', value ) } ) }
									/>

									<div className="smb-rating-box__item__evaluation">
										<div className="smb-rating-box__item__evaluation__bar">
											<div className="smb-rating-box__item__evaluation__numeric">
												{ rating }
											</div>
											<div className="smb-rating-box__item__evaluation__rating" style={ { width: `${ rating * 10 }%`, backgroundColor: color } }></div>
										</div>
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
		const { rows, ratings } = attributes;

		return (
			<div className="smb-rating-box">
				<div className="smb-rating-box__body">
					{ times( rows, ( index ) => {
						const title = get( ratings, [ index, 'title' ], [] );
						const rating = get( ratings, [ index, 'rating' ], 0 );
						const color = get( ratings, [ index, 'color' ], '' );

						return (
							<div className="smb-rating-box__item" data-rating={ rating } data-color={ color }>
								<div className="smb-rating-box__item__title" >
									{ title }
								</div>

								<div className="smb-rating-box__item__evaluation">
									<div className="smb-rating-box__item__evaluation__bar">
										<div className="smb-rating-box__item__evaluation__numeric">
											{ rating }
										</div>
										<div className="smb-rating-box__item__evaluation__rating" style={ { width: `${ rating * 10 }%`, backgroundColor: color } }></div>
									</div>
								</div>
							</div>
						);
					} ) }
				</div>
			</div>
		);
	},
} );

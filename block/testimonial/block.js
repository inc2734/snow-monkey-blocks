'use strict';

import generateUpdatedAttribute from '../../src/js/helper/generate-updated-attribute';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { deprecated } from './_deprecated.js';

const { times, get } = lodash;
const { registerBlockType } = wp.blocks;
const { RichText, MediaUpload, InspectorControls } = wp.editor;
const { Button, PanelBody, RangeControl } = wp.components;
const { Fragment } = wp.element;
const { __ } = wp.i18n;

registerBlockType( 'snow-monkey-blocks/testimonial', {
	title: __( 'Testimonial', 'snow-monkey-blocks' ),
	icon: 'admin-comments',
	category: 'smb',
	attributes: {
		items: {
			type: 'array',
			default: [],
			selector: '.smb-testimonial__item',
			source: 'query',
			query: {
				avatarID: {
					type: 'number',
					source: 'attribute',
					selector: '.smb-testimonial__item__figure > img',
					attribute: 'data-image-id',
					default: 0,
				},
				avatarURL: {
					type: 'string',
					source: 'attribute',
					selector: '.smb-testimonial__item__figure > img',
					attribute: 'src',
					default: 'https://0.gravatar.com/avatar/00000000000000000000000000000000?s=128&d=mp&r=g',
				},
				name: {
					source: 'html',
					selector: '.smb-testimonial__item__name',
				},
				lede: {
					source: 'html',
					selector: '.smb-testimonial__item__lede',
				},
				content: {
					source: 'html',
					selector: '.smb-testimonial__item__content',
				},
			},
		},
		columns: {
			type: 'number',
			default: 1,
		},
	},

	edit( { attributes, setAttributes, isSelected } ) {
		const { items, columns } = attributes;

		return (
			<Fragment>
				<InspectorControls>
					<PanelBody title={ __( 'Testimonial Settings', 'snow-monkey-blocks' ) }>
						<RangeControl
							label={ __( 'Columns', 'snow-monkey-blocks' ) }
							value={ columns }
							onChange={ ( value ) => setAttributes( { columns: value } ) }
							min="1"
							max="24"
						/>
					</PanelBody>
				</InspectorControls>

				<div className="smb-testimonial">
					<div className="smb-testimonial__body">
						<div className="c-row c-row--margin">
							{ times( columns, ( index ) => {
								const avatarID = get( items, [ index, 'avatarID' ], 0 );
								const avatarURL = get( items, [ index, 'avatarURL' ], 'https://0.gravatar.com/avatar/00000000000000000000000000000000?s=128&d=mp&r=g' );
								const name = get( items, [ index, 'name' ], '' );
								const lede = get( items, [ index, 'lede' ], '' );
								const content = get( items, [ index, 'content' ], '' );

								const renderAvatar = ( obj ) => {
									return (
										<Button className="image-button" onClick={ obj.open } style={ { padding: 0 } }>
											<img src={ avatarURL } alt="" className={ `wp-image-${ avatarID }` } />
										</Button>
									);
								};

								return (
									<div className="c-row__col c-row__col--1-1 c-row__col--md-1-2">
										<div className="smb-testimonial__item">
											{ ( !! avatarID || isSelected ) &&
												<div className="smb-testimonial__item__figure">
													<MediaUpload
														onSelect={ ( media ) => {
															const newAvatarURL = !! media.sizes.thumbnail ? media.sizes.thumbnail.url : media.url;
															setAttributes( { items: generateUpdatedAttribute( items, index, 'avatarURL', newAvatarURL ) } );
															setAttributes( { items: generateUpdatedAttribute( items, index, 'avatarID', media.id ) } );
														} }
														type="image"
														value={ avatarID }
														render={ renderAvatar }
													/>
												</div>
											}

											<div className="smb-testimonial__item__body">
												<div className="smb-testimonial__item__content">
													<RichText
														placeholder={ __( 'Write content...', 'snow-monkey-blocks' ) }
														value={ content }
														onChange={ ( value ) => setAttributes( { items: generateUpdatedAttribute( items, index, 'content', value ) } ) }
													/>
												</div>

												<RichText
													className="smb-testimonial__item__name"
													placeholder={ __( 'Write name...', 'snow-monkey-blocks' ) }
													value={ name }
													onChange={ ( value ) => setAttributes( { items: generateUpdatedAttribute( items, index, 'name', value ) } ) }
												/>

												{ ( ! RichText.isEmpty( lede ) || isSelected ) &&
													<RichText
														className="smb-testimonial__item__lede"
														placeholder={ __( 'Write lede...', 'snow-monkey-blocks' ) }
														value={ lede }
														onChange={ ( value ) => setAttributes( { items: generateUpdatedAttribute( items, index, 'lede', value ) } ) }
													/>
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
				</div>
			</Fragment>
		);
	},

	save( { attributes } ) {
		const { items, columns } = attributes;

		return (
			<div className="smb-testimonial">
				<div className="smb-testimonial__body">
					<div className="c-row c-row--margin">
						{ times( columns, ( index ) => {
							const avatarID = get( items, [ index, 'avatarID' ], 0 );
							const avatarURL = get( items, [ index, 'avatarURL' ], 'https://0.gravatar.com/avatar/00000000000000000000000000000000?s=128&d=mp&r=g' );
							const name = get( items, [ index, 'name' ], '' );
							const lede = get( items, [ index, 'lede' ], '' );
							const content = get( items, [ index, 'content' ], '' );

							return (
								<div className="c-row__col c-row__col--1-1 c-row__col--md-1-2">
									<div className="smb-testimonial__item">
										<div className="smb-testimonial__item__figure">
											<img src={ avatarURL } alt="" className={ `wp-image-${ avatarID }` } data-image-id={ avatarID } />
										</div>
										<div className="smb-testimonial__item__body">
											<div className="smb-testimonial__item__content">
												<RichText.Content value={ content } />
											</div>
											<div className="smb-testimonial__item__name">
												<RichText.Content value={ name } />
											</div>
											{ ! RichText.isEmpty( lede ) &&
												<div className="smb-testimonial__item__lede">
													<RichText.Content value={ lede } />
												</div>
											}
										</div>
									</div>
								</div>
							);
						} ) }
					</div>
				</div>
			</div>
		);
	},

	deprecated: deprecated,
} );

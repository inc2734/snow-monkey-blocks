'use strict';

import classnames from 'classnames';

const { registerBlockType } = wp.blocks;
const { PlainText, RichText, MediaUpload, InspectorControls } = wp.editor;
const { Button, PanelBody, SelectControl } = wp.components;
const { Fragment } = wp.element;
const { __ } = wp.i18n;

registerBlockType( 'snow-monkey-blocks/balloon', {
	title: __( 'Balloon', 'snow-monkey-blocks' ),
	icon: 'admin-comments',
	category: 'smb',
	attributes: {
		avatarID: {
			type: 'number',
			default: 0,
		},
		avatarURL: {
			type: 'string',
			source: 'attribute',
			selector: 'img',
			attribute: 'src',
			default: 'https://0.gravatar.com/avatar/00000000000000000000000000000000?s=128&d=mp&r=g',
		},
		balloonName: {
			type: 'string',
			default: '',
		},
		balloonBody: {
			type: 'array',
			source: 'children',
			selector: '.smb-balloon__body',
			default: [],
		},
		modifier: {
			type: 'string',
			default: '',
		},
	},

	edit( { attributes, setAttributes } ) {
		const { avatarID, avatarURL, balloonName, balloonBody, modifier } = attributes;

		const renderAvatar = ( obj ) => {
			return (
				<Button className="image-button" onClick={ obj.open } style={ { padding: 0 } }>
					<img src={ avatarURL } alt="" />
				</Button>
			);
		};

		return (
			<Fragment>
				<InspectorControls>
					<PanelBody title={ __( 'Balloon Settings', 'snow-monkey-blocks' ) }>
						<SelectControl
							label={ __( 'Type', 'snow-monkey-blocks' ) }
							value={ modifier }
							onChange={ ( value ) => setAttributes( { modifier: value } ) }
							options={ [
								{
									value: '',
									label: __( 'Normal balloon', 'snow-monkey-blocks' ),
								},
								{
									value: 'reverse',
									label: __( 'Reverse Balloon', 'snow-monkey-blocks' ),
								},
							] }
						/>
					</PanelBody>
				</InspectorControls>
				<div className={ classnames( 'smb-balloon', { [ `smb-balloon--${ modifier }` ]: !! modifier } ) }>
					<div className="smb-balloon__person">
						<div className="smb-balloon__figure">
							<MediaUpload
								onSelect={ ( media ) => setAttributes( { avatarURL: media.sizes.thumbnail.url, avatarID: media.id } ) }
								type="image"
								value={ avatarID }
								render={ renderAvatar }
							/>
						</div>
						<div className="smb-balloon__name">
							<PlainText
								value={ balloonName }
								placeholder={ __( 'Name', 'snow-monkey-blocks' ) }
								onChange={ ( value ) => setAttributes( { balloonName: value } ) }
							/>
						</div>
					</div>
					<div className="smb-balloon__body">
						<RichText
							tagName="div"
							multiline="p"
							value={ balloonBody }
							onChange={ ( value ) => setAttributes( { balloonBody: value } ) }
						/>
					</div>
				</div>
			</Fragment>
		);
	},

	save( { attributes } ) {
		const { avatarURL, balloonName, balloonBody, modifier } = attributes;

		return (
			<div className={ classnames( 'smb-balloon', { [ `smb-balloon--${ modifier }` ]: !! modifier } ) }>
				<div className="smb-balloon__person">
					<div className="smb-balloon__figure">
						<img src={ avatarURL } alt="" />
					</div>
					<div className="smb-balloon__name">
						{ balloonName }
					</div>
				</div>
				<div className="smb-balloon__body">
					{ balloonBody }
				</div>
			</div>
		);
	},
} );

'use strict';

import classnames from 'classnames';
import { deprecated } from './_deprecated.js';
import { schema } from './_schema.js';

const { registerBlockType } = wp.blocks;
const { PlainText, RichText, MediaUpload, InspectorControls, PanelColorSettings } = wp.editor;
const { Button, PanelBody, SelectControl } = wp.components;
const { Fragment } = wp.element;
const { __ } = wp.i18n;

registerBlockType( 'snow-monkey-blocks/balloon', {
	title: __( 'Balloon', 'snow-monkey-blocks' ),
	description: __( 'It is a block that can express a conversation.', 'snow-monkey-blocks' ),
	icon: 'admin-comments',
	category: 'smb',
	attributes: schema,

	edit( { attributes, setAttributes, className } ) {
		const { avatarID, avatarALT, avatarURL, avatarBorderColor, balloonName, balloonBody, modifier } = attributes;

		const renderAvatar = ( obj ) => {
			return (
				<Button className="image-button" onClick={ obj.open } style={ { padding: 0 } }>
					<img src={ avatarURL } alt={ avatarALT } className={ `wp-image-${ avatarID }` } />
				</Button>
			);
		};

		const balloonFigureStyles = {
			borderColor: avatarBorderColor || undefined,
		};

		const classes = classnames(
			{
				'smb-balloon': true,
				[ className ]: !! className,
				[ `smb-balloon--${ modifier }` ]: !! modifier,
			}
		);

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

					<PanelColorSettings
						title={ __( 'Color Settings', 'snow-monkey-blocks' ) }
						initialOpen={ false }
						colorSettings={ [
							{
								value: avatarBorderColor,
								onChange: ( value ) => setAttributes( { avatarBorderColor: value } ),
								label: __( 'Avatar Border Color', 'snow-monkey-blocks' ),
							},
						] }
					>
					</PanelColorSettings>
				</InspectorControls>

				<div className={ classes }>
					<div className="smb-balloon__person">
						<div
							className="smb-balloon__figure"
							style={ balloonFigureStyles }
						>
							<MediaUpload
								onSelect={ ( media ) => {
									const newAvatarURL = !! media.sizes.thumbnail ? media.sizes.thumbnail.url : media.url;
									setAttributes( { avatarURL: newAvatarURL, avatarID: media.id, avatarALT: media.alt } );
								} }
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

	save( { attributes, className } ) {
		const { avatarID, avatarALT, avatarURL, avatarBorderColor, balloonName, balloonBody, modifier } = attributes;

		const balloonFigureStyles = {
			borderColor: avatarBorderColor || undefined,
		};

		const classes = classnames(
			{
				'smb-balloon': true,
				[ className ]: !! className,
				[ `smb-balloon--${ modifier }` ]: !! modifier,
			}
		);

		return (
			<div className={ classes }>
				<div className="smb-balloon__person">
					<div
						className="smb-balloon__figure"
						style={ balloonFigureStyles }
					>
						<img src={ avatarURL } alt={ avatarALT } className={ `wp-image-${ avatarID }` } />
					</div>
					<div className="smb-balloon__name">
						{ balloonName }
					</div>
				</div>
				<div className="smb-balloon__body">
					<RichText.Content value={ balloonBody } />
				</div>
			</div>
		);
	},

	deprecated: deprecated,
} );

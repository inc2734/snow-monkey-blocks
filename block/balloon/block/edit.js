'use strict';

import classnames from 'classnames';

import {
	Button,
	PanelBody,
	SelectControl,
} from '@wordpress/components';

import {
	PlainText,
	RichText,
	MediaUpload,
	InspectorControls,
	PanelColorSettings,
} from '@wordpress/block-editor';

import {
	Fragment,
} from '@wordpress/element';

import {
	__,
} from '@wordpress/i18n';

export default function( { attributes, setAttributes, className } ) {
	const { avatarID, avatarAlt, avatarURL, avatarBorderColor, balloonName, balloonBody, modifier } = attributes;

	const renderAvatar = ( obj ) => {
		return (
			<Button className="image-button" onClick={ obj.open } style={ { padding: 0 } }>
				<img src={ avatarURL } alt={ avatarAlt } className={ `wp-image-${ avatarID }` } />
			</Button>
		);
	};

	const balloonFigureStyles = {
		borderColor: avatarBorderColor || undefined,
	};

	const classes = classnames(
		'smb-balloon',
		{
			[ className ]: !! className,
			[ `smb-balloon--${ modifier }` ]: !! modifier,
		}
	);

	return (
		<Fragment>
			<InspectorControls>
				<PanelBody title={ __( 'Block Settings', 'snow-monkey-blocks' ) }>
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
								setAttributes( { avatarURL: newAvatarURL, avatarID: media.id, avatarAlt: media.alt } );
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
}

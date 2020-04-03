'use strict';

import classnames from 'classnames';

import { Button, PanelBody, SelectControl } from '@wordpress/components';
import { __ } from '@wordpress/i18n';

import {
	PlainText,
	RichText,
	MediaUpload,
	InspectorControls,
	PanelColorSettings,
} from '@wordpress/block-editor';

export default function( { attributes, setAttributes, className } ) {
	const {
		avatarID,
		avatarAlt,
		avatarURL,
		avatarBorderColor,
		balloonName,
		balloonBody,
		modifier,
	} = attributes;

	const renderAvatar = ( obj ) => {
		return (
			<Button
				className="image-button"
				onClick={ obj.open }
				style={ { padding: 0 } }
			>
				<img
					src={ avatarURL }
					alt={ avatarAlt }
					className={ `wp-image-${ avatarID }` }
				/>
			</Button>
		);
	};

	const balloonFigureStyles = {
		borderColor: avatarBorderColor || undefined,
	};

	const classes = classnames( 'smb-balloon', {
		[ className ]: !! className,
		[ `smb-balloon--${ modifier }` ]: !! modifier,
	} );

	const onChangeModifier = ( value ) =>
		setAttributes( {
			modifier: value,
		} );

	const onChangeAvatarBorderColor = ( value ) =>
		setAttributes( {
			avatarBorderColor: value,
		} );

	const onSelectImage = ( media ) => {
		const newAvatarURL = !! media.sizes.thumbnail
			? media.sizes.thumbnail.url
			: media.url;

		setAttributes( {
			avatarURL: newAvatarURL,
			avatarID: media.id,
			avatarAlt: media.alt,
		} );
	};

	const onChangeBalloonName = ( value ) =>
		setAttributes( {
			balloonName: value,
		} );

	const onChangeBalloonBody = ( value ) =>
		setAttributes( {
			balloonBody: value,
		} );

	return (
		<>
			<InspectorControls>
				<PanelBody
					title={ __( 'Block Settings', 'snow-monkey-blocks' ) }
				>
					<SelectControl
						label={ __( 'Type', 'snow-monkey-blocks' ) }
						value={ modifier }
						onChange={ onChangeModifier }
						options={ [
							{
								value: '',
								label: __(
									'Normal balloon',
									'snow-monkey-blocks'
								),
							},
							{
								value: 'reverse',
								label: __(
									'Reverse Balloon',
									'snow-monkey-blocks'
								),
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
							onChange: onChangeAvatarBorderColor,
							label: __(
								'Avatar Border Color',
								'snow-monkey-blocks'
							),
						},
					] }
				></PanelColorSettings>
			</InspectorControls>

			<div className={ classes }>
				<div className="smb-balloon__person">
					<div
						className="smb-balloon__figure"
						style={ balloonFigureStyles }
					>
						<MediaUpload
							onSelect={ onSelectImage }
							type="image"
							value={ avatarID }
							render={ renderAvatar }
						/>
					</div>
					<div className="smb-balloon__name">
						<PlainText
							value={ balloonName }
							onChange={ onChangeBalloonName }
							placeholder={ __( 'Name', 'snow-monkey-blocks' ) }
						/>
					</div>
				</div>

				<RichText
					className="smb-balloon__body"
					multiline="p"
					value={ balloonBody }
					onChange={ onChangeBalloonBody }
				/>
			</div>
		</>
	);
}

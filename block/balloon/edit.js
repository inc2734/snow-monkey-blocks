import classnames from 'classnames';

import { Button, PanelBody, SelectControl } from '@wordpress/components';
import { __ } from '@wordpress/i18n';

import {
	ContrastChecker,
	InspectorControls,
	MediaUpload,
	PanelColorSettings,
	RichText,
	useBlockProps,
} from '@wordpress/block-editor';

export default function ( { attributes, setAttributes, className } ) {
	const {
		avatarID,
		avatarAlt,
		avatarURL,
		avatarBorderColor,
		backgroundColor,
		textColor,
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

	const bodyStyles = {
		backgroundColor: backgroundColor || undefined,
		borderColor: backgroundColor || undefined,
		color: textColor || undefined,
	};

	const classes = classnames( 'smb-balloon', {
		[ className ]: !! className,
		[ `smb-balloon--${ modifier }` ]: !! modifier,
	} );

	const blockProps = useBlockProps( {
		className: classes,
	} );

	const onChangeModifier = ( value ) =>
		setAttributes( {
			modifier: value,
		} );

	const onChangeAvatarBorderColor = ( value ) =>
		setAttributes( {
			avatarBorderColor: value,
		} );

	const onChangeBackgroundColor = ( value ) =>
		setAttributes( {
			backgroundColor: value,
		} );

	const onChangeTextColor = ( value ) =>
		setAttributes( {
			textColor: value,
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
									'Normal Balloon',
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
						{
							value: textColor,
							onChange: onChangeTextColor,
							label: __( 'Text Color', 'snow-monkey-blocks' ),
						},
						{
							value: backgroundColor,
							onChange: onChangeBackgroundColor,
							label: __(
								'Background Color',
								'snow-monkey-blocks'
							),
						},
					] }
				>
					<ContrastChecker
						backgroundColor={ backgroundColor }
						textColor={ textColor }
					/>
				</PanelColorSettings>
			</InspectorControls>

			<div { ...blockProps }>
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

					<RichText
						className="smb-balloon__name"
						value={ balloonName }
						onChange={ onChangeBalloonName }
						placeholder={ __( 'Name', 'snow-monkey-blocks' ) }
					/>
				</div>

				<RichText
					className="smb-balloon__body"
					multiline="p"
					value={ balloonBody }
					onChange={ onChangeBalloonBody }
					style={ bodyStyles }
				/>
			</div>
		</>
	);
}

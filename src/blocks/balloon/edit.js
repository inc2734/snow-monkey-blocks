import classnames from 'classnames';

import {
	BlockControls,
	ContrastChecker,
	InspectorControls,
	MediaUpload,
	RichText,
	__experimentalPanelColorGradientSettings as PanelColorGradientSettings,
	useBlockProps,
	useInnerBlocksProps,
} from '@wordpress/block-editor';

import { Button, ToolbarButton, ToolbarGroup } from '@wordpress/components';

import { pullLeft, pullRight } from '@wordpress/icons';
import { __ } from '@wordpress/i18n';

const TEMPLATE = [ [ 'core/paragraph' ] ];

export default function ( { attributes, setAttributes, className } ) {
	const {
		avatarID,
		avatarAlt,
		avatarURL,
		avatarBorderColor,
		backgroundColor,
		textColor,
		balloonName,
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

	const styles = {
		'--smb-balloon--background-color': backgroundColor || undefined,
		'--smb-balloon--border-color': backgroundColor || undefined,
		'--smb-balloon--color': textColor || undefined,
		'--smb-balloon--avatar-border-color': avatarBorderColor || undefined,
	};

	const classes = classnames( 'smb-balloon', {
		[ className ]: !! className,
		[ `smb-balloon--${ modifier }` ]: !! modifier,
	} );

	const blockProps = useBlockProps( {
		className: classes,
		style: styles,
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

	const innerBlocksProps = useInnerBlocksProps(
		{},
		{
			// allowedBlocks: ALLOWED_BLOCKS,
			template: TEMPLATE,
			templateLock: false,
		}
	);

	return (
		<>
			<InspectorControls>
				<PanelColorGradientSettings
					title={ __( 'Color', 'snow-monkey-blocks' ) }
					initialOpen={ false }
					settings={ [
						{
							colorValue: avatarBorderColor,
							onColorChange: onChangeAvatarBorderColor,
							label: __(
								'Avatar border color',
								'snow-monkey-blocks'
							),
						},
						{
							colorValue: backgroundColor,
							onColorChange: onChangeBackgroundColor,
							label: __(
								'Background color',
								'snow-monkey-blocks'
							),
						},
						{
							colorValue: textColor,
							onColorChange: onChangeTextColor,
							label: __( 'Text color', 'snow-monkey-blocks' ),
						},
					] }
					__experimentalHasMultipleOrigins={ true }
					__experimentalIsRenderedInSidebar={ true }
				>
					<ContrastChecker
						backgroundColor={ backgroundColor }
						textColor={ textColor }
					/>
				</PanelColorGradientSettings>
			</InspectorControls>

			<BlockControls gruop="block">
				<ToolbarGroup>
					<ToolbarButton
						icon={ pullLeft }
						title={ __(
							'Show avatar on left',
							'snow-monkey-blocks'
						) }
						isActive={ '' === modifier }
						onClick={ () => setAttributes( { modifier: '' } ) }
					/>

					<ToolbarButton
						icon={ pullRight }
						title={ __(
							'Show avatar on right',
							'snow-monkey-blocks'
						) }
						isActive={ 'reverse' === modifier }
						onClick={ () =>
							setAttributes( { modifier: 'reverse' } )
						}
					/>
				</ToolbarGroup>
			</BlockControls>

			<div { ...blockProps }>
				<div className="smb-balloon__person">
					<div className="smb-balloon__figure">
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

				<div className="smb-balloon__body" { ...innerBlocksProps } />
			</div>
		</>
	);
}

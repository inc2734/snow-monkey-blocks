import classnames from 'classnames';
import hexToRgba from 'hex-to-rgba';

import {
	InnerBlocks,
	useBlockProps,
	useInnerBlocksProps,
} from '@wordpress/block-editor';

import metadata from './block.json';

const blockAttributes = metadata.attributes;
const blockSupports = metadata.supports;

export default [
	{
		attributes: {
			...blockAttributes,
		},

		supports: {
			...blockSupports,
		},

		save( { attributes, className } ) {
			const {
				sliderId,
				contentPosition,
				contentPadding,
				border,
				boxShadow,
			} = attributes;

			const classes = classnames( 'spider__slide', className );

			const itemClasses = classnames(
				'smb-spider-contents-slider__item',
				{
					[ `smb-spider-contents-slider__item--p-${ contentPadding }` ]:
						!! contentPadding,
				}
			);

			const borderWidth = String( border.width ).match( /^\d+$/ )
				? `${ border.width }px`
				: border.width;

			const borderRadius = String( border.radius ).match( /^\d+$/ )
				? `${ border.radius }px`
				: border.radius;

			const styles = {
				'--smb-spider-contents-slider--slide-border-width':
					( !! border.color &&
						0 < parseInt( borderWidth ) &&
						borderWidth ) ||
					undefined,
				'--smb-spider-contents-slider--slide-border-color':
					border.color || undefined,
				'--smb-spider-contents-slider--slide-border-type':
					border.style || undefined,
				'--smb-spider-contents-slider--slide-border-radius':
					( 0 < parseInt( borderRadius ) && borderRadius ) ||
					undefined,
				'--smb-spider-contents-slider--slide-box-shadow':
					!! boxShadow.color
						? `0 0 ${ boxShadow.blur }px ${ hexToRgba(
								boxShadow.color,
								boxShadow.opacity
						  ) }`
						: undefined,
			};

			return (
				<div
					{ ...useBlockProps.save( {
						className: classes,
						style: styles,
					} ) }
					data-id={ sliderId }
					data-content-position={
						contentPosition?.replace( ' ', '-' ) || undefined
					}
				>
					<div
						{ ...useInnerBlocksProps.save( {
							className: itemClasses,
						} ) }
					/>
				</div>
			);
		},
	},
	{
		attributes: {
			...blockAttributes,
		},

		supports: {
			...blockSupports,
		},

		save( { attributes, className } ) {
			const {
				sliderId,
				contentPosition,
				contentPadding,
				border,
				boxShadow,
			} = attributes;

			const classes = classnames( 'spider__slide', className );

			const itemClasses = classnames(
				'smb-spider-contents-slider__item',
				{
					[ `smb-spider-contents-slider__item--p-${ contentPadding }` ]:
						!! contentPadding,
				}
			);

			const borderWidth = String( border.width ).match( /^\d+$/ )
				? `${ border.width }px`
				: border.width;

			const borderRadius = String( border.radius ).match( /^\d+$/ )
				? `${ border.radius }px`
				: border.radius;

			const styles = {
				'--smb-spider-contents-slider--slide-border-width':
					( !! border.color &&
						0 < parseInt( borderWidth ) &&
						borderWidth ) ||
					undefined,
				'--smb-spider-contents-slider--slide-border-color':
					border.color || undefined,
				'--smb-spider-contents-slider--slide-border-radius':
					( 0 < parseInt( borderRadius ) && borderRadius ) ||
					undefined,
				'--smb-spider-contents-slider--slide-box-shadow':
					!! boxShadow.color
						? `0 0 ${ boxShadow.blur }px ${ hexToRgba(
								boxShadow.color,
								boxShadow.opacity
						  ) }`
						: undefined,
			};

			return (
				<div
					{ ...useBlockProps.save( {
						className: classes,
						style: styles,
					} ) }
					data-id={ sliderId }
					data-content-position={
						contentPosition?.replace( ' ', '-' ) || undefined
					}
				>
					<div
						{ ...useInnerBlocksProps.save( {
							className: itemClasses,
						} ) }
					/>
				</div>
			);
		},
	},
	{
		attributes: {
			...blockAttributes,
		},

		supports: {
			...blockSupports,
		},

		save( { attributes, className } ) {
			const {
				sliderId,
				contentPosition,
				contentPadding,
				border,
				boxShadow,
			} = attributes;

			const classes = classnames( 'spider__slide', className );

			const itemClasses = classnames(
				'smb-spider-contents-slider__item',
				{
					[ `smb-spider-contents-slider__item--p-${ contentPadding }` ]:
						!! contentPadding,
				}
			);

			const borderWidth = String( border.width ).match( /^\d+$/ )
				? `${ border.width }px`
				: border.width;

			const borderRadius = String( border.radius ).match( /^\d+$/ )
				? `${ border.radius }px`
				: border.radius;

			const styles = {
				'--smb-spider-contents-slider--slide-border-width':
					( !! border.color && borderWidth ) || undefined,
				'--smb-spider-contents-slider--slide-border-color':
					border.color || undefined,
				'--smb-spider-contents-slider--slide-border-radius':
					borderRadius || undefined,
				'--smb-spider-contents-slider--slide-box-shadow':
					!! boxShadow.color
						? `0 0 ${ boxShadow.blur }px ${ hexToRgba(
								boxShadow.color,
								boxShadow.opacity
						  ) }`
						: undefined,
			};

			return (
				<div
					{ ...useBlockProps.save( {
						className: classes,
						style: styles,
					} ) }
					data-id={ sliderId }
					data-content-position={
						contentPosition?.replace( ' ', '-' ) || undefined
					}
				>
					<div
						{ ...useInnerBlocksProps.save( {
							className: itemClasses,
						} ) }
					/>
				</div>
			);
		},
	},
	{
		attributes: {
			...blockAttributes,
		},

		supports: {
			...blockSupports,
		},

		save( { attributes, className } ) {
			const {
				sliderId,
				contentPosition,
				contentPadding,
				border,
				boxShadow,
			} = attributes;

			const classes = classnames( 'spider__slide', className );

			const itemClasses = classnames(
				'smb-spider-contents-slider__item',
				{
					[ `smb-spider-contents-slider__item--p-${ contentPadding }` ]:
						!! contentPadding,
				}
			);

			const styles = {
				'--smb-spider-contents-slider--slide-border-width':
					( border.color && border.width ) || undefined,
				'--smb-spider-contents-slider--slide-border-color':
					border.color || undefined,
				'--smb-spider-contents-slider--slide-border-radius':
					border.radius || undefined,
				'--smb-spider-contents-slider--slide-box-shadow':
					!! boxShadow.color
						? `0 0 ${ boxShadow.blur }px ${ hexToRgba(
								boxShadow.color,
								boxShadow.opacity
						  ) }`
						: undefined,
			};

			return (
				<div
					{ ...useBlockProps.save( {
						className: classes,
						style: styles,
					} ) }
					data-id={ sliderId }
					data-content-position={
						contentPosition?.replace( ' ', '-' ) || undefined
					}
				>
					<div
						{ ...useInnerBlocksProps.save( {
							className: itemClasses,
						} ) }
					/>
				</div>
			);
		},
	},
	{
		attributes: {
			...blockAttributes,
		},

		supports: {
			...blockSupports,
		},

		save( { attributes, className } ) {
			const {
				sliderId,
				contentPosition,
				contentPadding,
				border,
				boxShadow,
				style,
				backgroundColor,
			} = attributes;

			const classes = classnames( 'spider__slide', className );

			const itemClasses = classnames(
				'smb-spider-contents-slider__item',
				{
					[ `smb-spider-contents-slider__item--p-${ contentPadding }` ]:
						!! contentPadding,
				}
			);

			const newStyles = {
				backgroundColor:
					( ! backgroundColor && style?.color?.background ) ||
					undefined,
				background:
					( ! backgroundColor && style?.color?.gradient ) ||
					undefined,
				borderColor: border.color || undefined,
				borderWidth: ( border.color && border.width ) || undefined,
				borderRadius: border.radius || undefined,
				boxShadow: !! boxShadow.color
					? `0 0 ${ boxShadow.blur }px ${ hexToRgba(
							boxShadow.color,
							boxShadow.opacity
					  ) }`
					: undefined,
			};

			return (
				<div
					{ ...useBlockProps.save( { className: classes } ) }
					data-id={ sliderId }
					data-content-position={
						contentPosition?.replace( ' ', '-' ) || undefined
					}
					style={ newStyles }
				>
					<div
						{ ...useInnerBlocksProps.save( {
							className: itemClasses,
						} ) }
					/>
				</div>
			);
		},
	},
	{
		attributes: {
			...blockAttributes,
		},

		save( { attributes, className } ) {
			const {
				sliderId,
				contentPosition,
				contentPadding,
				border,
				boxShadow,
				style,
			} = attributes;

			const classes = classnames( 'spider__slide', className );

			const itemClasses = classnames(
				'smb-spider-contents-slider__item',
				{
					[ `smb-spider-contents-slider__item--p-${ contentPadding }` ]:
						!! contentPadding,
				}
			);

			const styles = {
				background: style?.color?.background || undefined,
				borderColor: border.color || undefined,
				borderWidth: ( border.color && border.width ) || undefined,
				borderRadius: border.radius || undefined,
				boxShadow: !! boxShadow.color
					? `0 0 ${ boxShadow.blur }px ${ hexToRgba(
							boxShadow.color,
							boxShadow.opacity
					  ) }`
					: undefined,
			};

			return (
				<div
					{ ...useBlockProps.save( { className: classes } ) }
					data-id={ sliderId }
					data-content-position={
						contentPosition?.replace( ' ', '-' ) || undefined
					}
					style={ styles }
				>
					<div className={ itemClasses }>
						<InnerBlocks.Content />
					</div>
				</div>
			);
		},
	},
];

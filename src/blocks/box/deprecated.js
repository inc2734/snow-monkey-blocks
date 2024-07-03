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
			borderWidth: {
				type: 'number',
			},
			borderRadius: {
				type: 'number',
			},
			contentPadding: {
				type: 'string',
				default: '',
			},
		},

		supports: {
			...blockSupports,
		},

		save( { attributes, className } ) {
			const {
				backgroundColor,
				backgroundGradientColor,
				borderColor,
				textColor,
				borderWidth,
				borderRadius,
				opacity,
				contentPadding,
				boxShadow,
			} = attributes;

			const styles = {
				'--smb-box--color': textColor || undefined,
				'--smb-box--border-radius':
					0 <= borderRadius ? `${ borderRadius }px` : undefined,
				'--smb-box--box-shadow': !! boxShadow.color
					? `${ boxShadow.horizontal }px ${ boxShadow.vertical }px ${
							boxShadow.blur
					  }px ${ boxShadow.spread }px ${ hexToRgba(
							boxShadow.color,
							boxShadow.opacity
					  ) }`
					: undefined,
				'--smb-box--background-color': backgroundColor || undefined,
				'--smb-box--background-image':
					backgroundGradientColor || undefined,
				'--smb-box--background-opacity': String( opacity ),
				'--smb-box--border-color': borderColor || undefined,
				'--smb-box--border-width':
					0 <= borderWidth ? `${ borderWidth }px` : undefined,
			};

			const classes = classnames( 'smb-box', className, {
				[ `smb-box--p-${ contentPadding }` ]: !! contentPadding,
			} );

			return (
				<div
					{ ...useBlockProps.save( {
						className: classes,
						style: styles,
					} ) }
				>
					<div className="smb-box__background" />
					<div
						{ ...useInnerBlocksProps.save( {
							className: 'smb-box__body',
						} ) }
					/>
				</div>
			);
		},
	},
	{
		attributes: {
			...blockAttributes,
			borderRadius: {
				type: 'number',
			},
			borderWidth: {
				type: 'number',
			},
			contentPadding: {
				type: 'string',
				default: '',
			},
		},

		supports: {
			...blockSupports,
		},

		save( { attributes, className } ) {
			const {
				backgroundColor,
				backgroundGradientColor,
				borderColor,
				textColor,
				borderWidth,
				borderRadius,
				opacity,
				contentPadding,
				boxShadow,
			} = attributes;

			const boxStyles = {
				color: textColor || undefined,
				borderRadius:
					0 <= borderRadius ? `${ borderRadius }px` : undefined,
				boxShadow: !! boxShadow.color
					? `${ boxShadow.horizontal }px ${ boxShadow.vertical }px ${
							boxShadow.blur
					  }px ${ boxShadow.spread }px ${ hexToRgba(
							boxShadow.color,
							boxShadow.opacity
					  ) }`
					: undefined,
			};

			const backgroundStyles = {
				backgroundColor: backgroundColor || undefined,
				backgroundImage: backgroundGradientColor || undefined,
				borderColor: borderColor || undefined,
				borderWidth: borderWidth || undefined,
				borderRadius:
					0 <= borderRadius ? `${ borderRadius }px` : undefined,
				opacity,
			};

			const classes = classnames( 'smb-box', className, {
				[ `smb-box--p-${ contentPadding }` ]: !! contentPadding,
			} );

			return (
				<div
					{ ...useBlockProps.save( {
						className: classes,
						style: boxStyles,
					} ) }
				>
					<div
						className="smb-box__background"
						style={ backgroundStyles }
					/>
					<div
						{ ...useInnerBlocksProps.save( {
							className: 'smb-box__body',
						} ) }
					/>
				</div>
			);
		},
	},
	{
		attributes: {
			...blockAttributes,
			borderRadius: {
				type: 'number',
			},
			borderWidth: {
				type: 'number',
			},
			contentPadding: {
				type: 'string',
				default: '',
			},
		},

		save( { attributes, className } ) {
			const { backgroundColor, borderColor, textColor, borderWidth } =
				attributes;

			const boxStyles = {
				backgroundColor: backgroundColor || undefined,
				borderColor: borderColor || undefined,
				color: textColor || undefined,
				borderWidth: borderWidth || undefined,
			};

			const classes = classnames( 'smb-box', className );

			return (
				<div className={ classes } style={ boxStyles }>
					<div className="smb-box__body">
						<InnerBlocks.Content />
					</div>
				</div>
			);
		},
	},
	{
		attributes: {
			...blockAttributes,
			borderRadius: {
				type: 'number',
			},
			borderWidth: {
				type: 'number',
			},
			contentPadding: {
				type: 'string',
				default: '',
			},
		},

		save( { attributes } ) {
			const { backgroundColor, borderColor, textColor, borderWidth } =
				attributes;

			return (
				<div
					className="smb-box"
					style={ {
						backgroundColor,
						borderColor,
						color: textColor,
						borderWidth,
					} }
				>
					<div className="smb-box__body">
						<InnerBlocks.Content />
					</div>
				</div>
			);
		},
	},
];

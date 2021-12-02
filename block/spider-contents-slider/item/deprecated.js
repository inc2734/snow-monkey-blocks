import classnames from 'classnames';
import hexToRgba from 'hex-to-rgba';
import metadata from './block.json';

import { InnerBlocks, useBlockProps } from '@wordpress/block-editor';

const blockAttributes = metadata.attributes;

export default [
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
					[ `smb-spider-contents-slider__item--p-${ contentPadding }` ]: !! contentPadding,
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

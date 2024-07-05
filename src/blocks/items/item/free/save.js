import classnames from 'classnames';

import {
	useBlockProps,
	useInnerBlocksProps,
	__experimentalGetColorClassesAndStyles as getColorClassesAndStyles,
	__experimentalGetSpacingClassesAndStyles as getSpacingClassesAndStyles,
} from '@wordpress/block-editor';

export default function ( { attributes, className } ) {
	const colorProps = getColorClassesAndStyles( attributes );
	const spacingProps = getSpacingClassesAndStyles( attributes );

	const classes = classnames( 'c-row__col', className );

	const itemClasses = classnames(
		'smb-items__item',
		'smb-items__item--free',
		colorProps?.className,
		spacingProps?.className
	);

	return (
		<div { ...useBlockProps.save( { className: classes } ) }>
			<div className={ itemClasses }>
				<div
					{ ...useInnerBlocksProps.save( {
						className: 'smb-items__item__body',
						style: {
							...colorProps?.style,
							...spacingProps?.style,
						},
					} ) }
				/>
			</div>
		</div>
	);
}

import classnames from 'classnames';

import {
	useBlockProps,
	useInnerBlocksProps,
	__experimentalGetColorClassesAndStyles as getColorClassesAndStyles,
} from '@wordpress/block-editor';

export default function ( { attributes } ) {
	const colorProps = getColorClassesAndStyles( {
		style: {
			color: {
				...attributes?.style?.color,
			},
		},
		backgroundColor: attributes?.backgroundColor || undefined,
		textColor: attributes?.textColor || undefined,
		gradient: attributes?.gradient || undefined,
	} );

	const classes = 'c-row__col';

	const itemClasses = classnames(
		'smb-panels__item',
		'smb-panels__item--free',
		colorProps?.className
	);

	const itemStyles = colorProps?.style;

	return (
		<div { ...useBlockProps.save( { className: classes } ) }>
			<div className={ itemClasses } style={ itemStyles }>
				<div
					{ ...useInnerBlocksProps.save( {
						className: 'smb-panels__item__body',
					} ) }
				/>
			</div>
		</div>
	);
}

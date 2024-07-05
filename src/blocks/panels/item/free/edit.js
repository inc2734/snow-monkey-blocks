import classnames from 'classnames';

import {
	InnerBlocks,
	useBlockProps,
	useInnerBlocksProps,
	__experimentalUseColorProps as useColorProps,
} from '@wordpress/block-editor';

import { useSelect } from '@wordpress/data';

export default function ( { attributes, clientId } ) {
	const { templateLock } = attributes;

	const colorProps = useColorProps( {
		style: {
			color: {
				...attributes?.style?.color,
			},
		},
		backgroundColor: attributes?.backgroundColor || undefined,
		textColor: attributes?.textColor || undefined,
		gradient: attributes?.gradient || undefined,
	} );

	const hasInnerBlocks = useSelect(
		( select ) =>
			!! select( 'core/block-editor' ).getBlock( clientId )?.innerBlocks
				?.length,
		[ clientId ]
	);

	const classes = 'c-row__col';

	const itemClasses = classnames(
		'smb-panels__item',
		'smb-panels__item--free',
		colorProps?.className
	);

	const itemStyles = colorProps?.style;

	const blockProps = useBlockProps( {
		className: classes,
	} );

	const innerBlocksProps = useInnerBlocksProps(
		{
			className: 'smb-panels__item__body',
		},
		{
			templateLock,
			renderAppender: hasInnerBlocks
				? InnerBlocks.DefaultBlockAppender
				: InnerBlocks.ButtonBlockAppender,
		}
	);

	return (
		<div { ...blockProps }>
			<div className={ itemClasses } style={ itemStyles }>
				<div { ...innerBlocksProps } />
			</div>
		</div>
	);
}

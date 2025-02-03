import classnames from 'classnames';

import {
	useBlockProps,
	useInnerBlocksProps,
	__experimentalGetColorClassesAndStyles as getColorClassesAndStyles,
} from '@wordpress/block-editor';

import { __ } from '@wordpress/i18n';

export default function ( { attributes } ) {
	const { rel, linkURL, linkTarget, linkText } = attributes;

	const isHrefSet = !! linkURL;

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
		'smb-panels__item--block-link',
		colorProps?.className
	);

	const itemStyles = colorProps?.style;

	const actionClasses = classnames(
		'smb-panels__item__action',
		'smb-panels__item__action--nolabel'
	);

	return (
		<div { ...useBlockProps.save( { className: classes } ) }>
			<div className={ itemClasses } style={ itemStyles }>
				<div
					{ ...useInnerBlocksProps.save( {
						className: 'smb-panels__item__body',
					} ) }
				/>

				{ isHrefSet && (
					<div className={ actionClasses }>
						<a href={ linkURL } target={ linkTarget } rel={ rel }>
							<span className="screen-reader-text">
								{ linkText ??
									__( 'Learn more', 'snow-monkey-blocks' ) }
							</span>
						</a>
					</div>
				) }
			</div>
		</div>
	);
}

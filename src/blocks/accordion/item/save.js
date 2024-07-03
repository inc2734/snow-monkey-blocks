import classnames from 'classnames';

import {
	RichText,
	useBlockProps,
	useInnerBlocksProps,
	__experimentalGetSpacingClassesAndStyles as getSpacingClassesAndStyles,
} from '@wordpress/block-editor';

const { RawHTML } = wp.element;

export default function ( { attributes, className } ) {
	const { title, titleBackgroundColor, titleColor, initialState } =
		attributes;

	const spacingProps = getSpacingClassesAndStyles( attributes );

	const classes = classnames( 'smb-accordion__item', className );

	const myShortcode = `[snow-monkey-blocks-accordion-item-control checked="${ initialState }"]`;

	return (
		<div
			{ ...useBlockProps.save( {
				className: classes,
				style: {
					'--smb-accordion-item--background-color':
						titleBackgroundColor || undefined,
					'--smb-accordion-item--color': titleColor || undefined,
				},
			} ) }
		>
			<RawHTML>{ myShortcode }</RawHTML>

			<div className="smb-accordion__item__title">
				<RichText.Content
					tagName="span"
					className="smb-accordion__item__title__label"
					value={ title }
				/>
				<div className="smb-accordion__item__title__icon">
					<i className="fa-solid fa-angle-down"></i>
				</div>
			</div>
			<div
				{ ...useInnerBlocksProps.save( {
					className: 'smb-accordion__item__body',
					style: {
						...spacingProps.style,
					},
				} ) }
			/>
		</div>
	);
}

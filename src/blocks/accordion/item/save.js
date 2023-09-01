import classnames from 'classnames';

import {
	RichText,
	useBlockProps,
	useInnerBlocksProps,
} from '@wordpress/block-editor';

const { RawHTML } = wp.element;

export default function ( { attributes, className } ) {
	const { title, initialState } = attributes;
	const classes = classnames( 'smb-accordion__item', className );

	const myShortcode = `[snow-monkey-blocks-accordion-item-control checked="${ initialState }"]`;

	return (
		<div { ...useBlockProps.save( { className: classes } ) }>
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
				} ) }
			/>
		</div>
	);
}

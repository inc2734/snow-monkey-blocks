import classnames from 'classnames';

import {
	RichText,
	useBlockProps,
	useInnerBlocksProps,
} from '@wordpress/block-editor';

export default function ( { attributes, className } ) {
	const { title, initialState } = attributes;
	const classes = classnames( 'smb-accordion__item', className );

	return (
		<div { ...useBlockProps.save( { className: classes } ) }>
			<input
				type="checkbox"
				className="smb-accordion__item__control"
				checked={ initialState }
			/>
			<div className="smb-accordion__item__title">
				<RichText.Content
					tagName="span"
					className="smb-accordion__item__title__label"
					value={ title }
				/>
				<div className="smb-accordion__item__title__icon">
					<i className="fas fa-angle-down"></i>
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

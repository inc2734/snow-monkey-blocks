import classnames from 'classnames';

import {
	RichText,
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
		},
	},
	{
		attributes: {
			title: {
				type: 'string',
				source: 'html',
				selector: '.smb-accordion__item__title',
				default: '',
			},
		},

		save( { attributes, className } ) {
			const classes = classnames( 'smb-accordion__item', className );
			const { title } = attributes;

			return (
				<div className={ classes }>
					<div className="smb-accordion__item__title">
						<RichText.Content value={ title } />
					</div>
					<input
						type="checkbox"
						className="smb-accordion__item__control"
					/>
					<div className="smb-accordion__item__body">
						<InnerBlocks.Content />
					</div>
				</div>
			);
		},
	},
	{
		attributes: {
			title: {
				type: 'string',
				source: 'html',
				selector: '.smb-accordion__item__title',
				default: '',
			},
		},

		supports: {
			...blockSupports,
		},

		save( { attributes } ) {
			const { title } = attributes;

			return (
				<div className="smb-accordion__item">
					<div className="smb-accordion__item__title">
						<RichText.Content value={ title } />
					</div>
					<input
						type="checkbox"
						className="smb-accordion__item__control"
					/>
					<div className="smb-accordion__item__body">
						<InnerBlocks.Content />
					</div>
				</div>
			);
		},
	},
];

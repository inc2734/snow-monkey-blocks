import classnames from 'classnames';

import {
	RichText,
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
			const classes = classnames(
				'smb-directory-structure__item',
				'smb-directory-structure__item--directory',
				className
			);

			const itemNameClasses = 'smb-directory-structure__item__name';

			const itemListClasses = 'smb-directory-structure__item__list';

			const iconStyles = {
				color: attributes.iconColor || undefined,
			};

			return (
				<div { ...useBlockProps.save( { className: classes } ) }>
					<p>
						<span className="fa-fw" style={ iconStyles }>
							<i
								className={ `${ attributes.iconVendor } fa-${ attributes.iconClass }` }
							/>
						</span>
						<RichText.Content
							tagName="span"
							className={ itemNameClasses }
							value={ attributes.name }
						/>
					</p>
					<div
						{ ...useInnerBlocksProps.save( {
							className: itemListClasses,
						} ) }
					/>
				</div>
			);
		},
	},
];

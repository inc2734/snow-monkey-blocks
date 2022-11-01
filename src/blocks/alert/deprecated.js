import classnames from 'classnames';

import { RichText, useBlockProps } from '@wordpress/block-editor';

import metadata from './block.json';

const blockAttributes = metadata.attributes;

export default [
	{
		attributes: {
			...blockAttributes,
		},

		save( { attributes, className } ) {
			const { title, content, modifier, icon } = attributes;

			const classes = classnames( 'smb-alert', {
				[ className ]: !! className,
				[ `smb-alert--${ modifier }` ]: !! modifier,
			} );

			return (
				<div { ...useBlockProps.save( { className: classes } ) }>
					{ ! RichText.isEmpty( title ) && (
						<div className="smb-alert__title">
							<i className={ `fas fa-${ icon }` } />
							<strong>
								<RichText.Content value={ title } />
							</strong>
						</div>
					) }

					<div className="smb-alert__body">
						<RichText.Content value={ content } />
					</div>
				</div>
			);
		},
	},
	{
		attributes: {
			...blockAttributes,
		},

		save( { attributes } ) {
			const { title, content, modifier, icon } = attributes;

			return (
				<div
					className={ classnames( 'smb-alert', {
						[ `smb-alert--${ modifier }` ]: !! modifier,
					} ) }
				>
					{ ! RichText.isEmpty( title ) && (
						<div className="smb-alert__title">
							<i className={ `fas fa-${ icon }` } />
							<strong>
								<RichText.Content value={ title } />
							</strong>
						</div>
					) }

					<div className="smb-alert__body">
						<RichText.Content value={ content } />
					</div>
				</div>
			);
		},
	},
];

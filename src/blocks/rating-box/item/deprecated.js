import classnames from 'classnames';

import { RichText, useBlockProps } from '@wordpress/block-editor';

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
			const { title, rating, color } = attributes;

			const classes = classnames( 'smb-rating-box__item', className );

			const styles = {
				'--smb-rating-box--rating-background-color': color || undefined,
			};

			const itemEvaluationRatingStyles = {
				width: `${ rating * 10 }%`,
			};

			return (
				<div
					{ ...useBlockProps.save( {
						className: classes,
						style: styles,
					} ) }
				>
					<div className="smb-rating-box__item__title">
						<RichText.Content value={ title } />
					</div>

					<div className="smb-rating-box__item__evaluation">
						<div className="smb-rating-box__item__evaluation__bar">
							<div className="smb-rating-box__item__evaluation__numeric">
								{ rating }
							</div>
							<div
								className="smb-rating-box__item__evaluation__rating"
								style={ itemEvaluationRatingStyles }
							/>
						</div>
					</div>
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
			const { title, rating, color } = attributes;

			const classes = classnames( 'smb-rating-box__item', className );

			const itemEvaluationRatingStyles = {
				width: `${ rating * 10 }%`,
				backgroundColor: color || undefined,
			};

			return (
				<div { ...useBlockProps.save( { className: classes } ) }>
					<div className="smb-rating-box__item__title">
						<RichText.Content value={ title } />
					</div>

					<div className="smb-rating-box__item__evaluation">
						<div className="smb-rating-box__item__evaluation__bar">
							<div className="smb-rating-box__item__evaluation__numeric">
								{ rating }
							</div>
							<div
								className="smb-rating-box__item__evaluation__rating"
								style={ itemEvaluationRatingStyles }
							/>
						</div>
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
			const { title, rating, color } = attributes;

			return (
				<div className="smb-rating-box__item">
					<div className="smb-rating-box__item__title">
						<RichText.Content value={ title } />
					</div>

					<div className="smb-rating-box__item__evaluation">
						<div className="smb-rating-box__item__evaluation__bar">
							<div className="smb-rating-box__item__evaluation__numeric">
								{ rating }
							</div>
							<div
								className="smb-rating-box__item__evaluation__rating"
								style={ {
									width: `${ rating * 10 }%`,
									backgroundColor: color,
								} }
							/>
						</div>
					</div>
				</div>
			);
		},
	},
];

import { RichText } from '@wordpress/block-editor';

import metadata from './block.json';

const blockAttributes = metadata.attributes;

export default [
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

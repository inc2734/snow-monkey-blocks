'use strict';

import classnames from 'classnames';

import {
	RichText,
} from '@wordpress/block-editor';

export default function( { attributes, className } ) {
	const { title, price, lede, list, btnLabel, btnURL, btnTarget, btnBackgroundColor, btnTextColor, imageID, imageURL, imageAlt } = attributes;

	const classes = classnames( 'c-row__col', className );

	const btnStyles = {
		backgroundColor: btnBackgroundColor || undefined,
	};

	const btnLabelStyles = {
		color: btnTextColor || undefined,
	};

	return (
		<div className={ classes }>
			<div className="smb-pricing-table__item">
				{ !! imageID &&
					<div className="smb-pricing-table__item__figure">
						<img src={ imageURL } alt={ imageAlt } className={ `wp-image-${ imageID }` } />
					</div>
				}

				<div className="smb-pricing-table__item__title">
					<RichText.Content value={ title } />
				</div>

				{ ! RichText.isEmpty( price ) &&
					<div className="smb-pricing-table__item__price">
						<RichText.Content value={ price } />
					</div>
				}

				{ ! RichText.isEmpty( lede ) &&
					<div className="smb-pricing-table__item__lede">
						<RichText.Content value={ lede } />
					</div>
				}

				<ul>
					<RichText.Content value={ list } />
				</ul>

				{ ( ! RichText.isEmpty( btnLabel ) || !! btnURL ) &&
					<div className="smb-pricing-table__item__action">
						<a className="smb-pricing-table__item__btn smb-btn"
							href={ btnURL }
							style={ btnStyles }
							target={ '_self' === btnTarget ? undefined : btnTarget }
							rel={ '_self' === btnTarget ? undefined : 'noopener noreferrer' }
						>
							<span className="smb-btn__label" style={ btnLabelStyles }>
								<RichText.Content value={ btnLabel } />
							</span>
						</a>
					</div>
				}
			</div>
		</div>
	);
}

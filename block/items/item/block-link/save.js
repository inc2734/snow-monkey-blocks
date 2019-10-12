'use strict';

import classnames from 'classnames';

import {
	RichText,
} from '@wordpress/editor';

export default function( { attributes, className } ) {
	const { titleTagName, title, lede, summary, btnLabel, url, target, btnBackgroundColor, btnTextColor, imageID, imageURL, imageAlt } = attributes;

	const classes = classnames( 'c-row__col', className );

	const itemBtnLabelStyles = {
		color: btnTextColor || undefined,
	};

	const itemBtnStyles = {
		backgroundColor: btnBackgroundColor || undefined,
	};

	return (
		<div className={ classes }>
			<a
				className="smb-items__item"
				href={ url }
				target={ '_self' === target ? undefined : target }
				rel={ '_self' === target ? undefined : 'noopener noreferrer' }
			>
				{ !! imageID &&
					<div className="smb-items__item__figure">
						<img src={ imageURL } alt={ imageAlt } className={ `wp-image-${ imageID }` } />
					</div>
				}

				{ 'none' !== titleTagName &&
					<RichText.Content
						tagName={ titleTagName }
						className="smb-items__item__title"
						value={ title }
					/>
				}

				{ ! RichText.isEmpty( lede ) &&
					<div className="smb-items__item__lede">
						<RichText.Content value={ lede } />
					</div>
				}

				{ ! RichText.isEmpty( summary ) &&
					<div className="smb-items__item__content">
						<RichText.Content value={ summary } />
					</div>
				}

				{ ( ! RichText.isEmpty( btnLabel ) && !! url ) &&
					<div className="smb-items__item__action">
						<span className="smb-items__item__btn smb-btn" style={ itemBtnStyles }>
							<span className="smb-btn__label" style={ itemBtnLabelStyles }>
								<RichText.Content value={ btnLabel } />
							</span>
						</span>
					</div>
				}
			</a>
		</div>
	);
}

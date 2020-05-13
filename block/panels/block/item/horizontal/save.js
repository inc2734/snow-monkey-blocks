'use strict';

import classnames from 'classnames';

import { RichText } from '@wordpress/block-editor';

export default function( { attributes, className } ) {
	const {
		titleTagName,
		title,
		summary,
		linkLabel,
		linkURL,
		linkTarget,
		imagePosition,
		imageID,
		imageURL,
		imageAlt,
	} = attributes;

	const classes = classnames( 'c-row__col', className );

	const itemClasses = classnames(
		'smb-panels__item',
		'smb-panels__item--horizontal',
		{
			'smb-panels__item--reverse': 'right' === imagePosition,
		}
	);

	return (
		<div className={ classes }>
			<div className={ itemClasses }>
				{ !! imageURL && (
					<div className="smb-panels__item__figure">
						<img
							src={ imageURL }
							alt={ imageAlt }
							className={ `wp-image-${ imageID }` }
						/>
					</div>
				) }

				<div className="smb-panels__item__body">
					{ ! RichText.isEmpty( title ) &&
						'none' !== titleTagName && (
							<RichText.Content
								tagName={ titleTagName }
								className="smb-panels__item__title"
								value={ title }
							/>
						) }

					{ ! RichText.isEmpty( summary ) && (
						<div className="smb-panels__item__content">
							<RichText.Content value={ summary } />
						</div>
					) }

					{ ! RichText.isEmpty( linkLabel ) && (
						<div className="smb-panels__item__action">
							{ !! linkURL ? (
								<a
									href={ linkURL }
									target={
										'_self' === linkTarget
											? undefined
											: linkTarget
									}
									rel={
										'_self' === linkTarget
											? undefined
											: 'noopener noreferrer'
									}
								>
									<div className="smb-panels__item__link">
										<RichText.Content value={ linkLabel } />
									</div>
								</a>
							) : (
								<div className="smb-panels__item__link">
									<RichText.Content value={ linkLabel } />
								</div>
							) }
						</div>
					) }
				</div>
			</div>
		</div>
	);
}

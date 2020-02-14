'use strict';

import classnames from 'classnames';

import { RichText, InnerBlocks } from '@wordpress/block-editor';

export default function( { attributes, className } ) {
	const {
		title,
		numberColor,
		imagePosition,
		imageID,
		imageURL,
		imageAlt,
		linkLabel,
		linkURL,
		linkTarget,
		linkColor,
	} = attributes;

	const classes = classnames(
		'smb-step__item',
		`smb-step__item--image-${ imagePosition }`,
		className
	);

	const itemNumberStyles = {
		backgroundColor: numberColor || undefined,
	};

	const itemLinkStyles = {
		color: linkColor || undefined,
	};

	return (
		<div className={ classes }>
			<div className="smb-step__item__title">
				<div
					className="smb-step__item__number"
					style={ itemNumberStyles }
				/>
				<span>
					<RichText.Content value={ title } />
				</span>
			</div>

			<div className="smb-step__item__body">
				{ !! imageID && (
					<div className="smb-step__item__figure">
						<img
							src={ imageURL }
							alt={ imageAlt }
							className={ `wp-image-${ imageID }` }
						/>
					</div>
				) }

				<div className="smb-step__item__summary">
					<InnerBlocks.Content />

					{ ! RichText.isEmpty( linkLabel ) && (
						<a
							className="smb-step__item__link"
							href={ linkURL }
							style={ itemLinkStyles }
							target={
								'_self' === linkTarget ? undefined : linkTarget
							}
							rel={
								'_self' === linkTarget
									? undefined
									: 'noopener noreferrer'
							}
						>
							<i className="fas fa-arrow-circle-right" />
							<span className="smb-step__item__link__label">
								<RichText.Content value={ linkLabel } />
							</span>
						</a>
					) }
				</div>
			</div>
		</div>
	);
}

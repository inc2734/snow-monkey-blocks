import classnames from 'classnames';

import { RichText, useBlockProps } from '@wordpress/block-editor';

export default function ( { attributes, className } ) {
	const {
		titleTagName,
		title,
		summary,
		linkLabel,
		linkURL,
		linkTarget,
		imageID,
		imageURL,
		imageAlt,
		imageWidth,
		imageHeight,
	} = attributes;

	const classes = classnames( 'c-row__col', className );

	const actionClasses = classnames( 'smb-panels__item__action', {
		'smb-panels__item__action--nolabel': ! linkLabel,
	} );

	const linkLabelHtml = ! RichText.isEmpty( linkLabel ) && (
		<div className="smb-panels__item__link">
			<RichText.Content value={ linkLabel } />
		</div>
	);

	return (
		<div { ...useBlockProps.save( { className: classes } ) }>
			<div className="smb-panels__item">
				{ !! imageURL && (
					<div className="smb-panels__item__figure">
						<img
							src={ imageURL }
							alt={ imageAlt }
							width={ !! imageWidth && imageWidth }
							height={ !! imageHeight && imageHeight }
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

					{ ( ! RichText.isEmpty( linkLabel ) || !! linkURL ) && (
						<div className={ actionClasses }>
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
									{ linkLabelHtml }
								</a>
							) : (
								<>{ linkLabelHtml }</>
							) }
						</div>
					) }
				</div>
			</div>
		</div>
	);
}

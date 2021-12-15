import classnames from 'classnames';

import { useBlockProps, useInnerBlocksProps } from '@wordpress/block-editor';
import { __ } from '@wordpress/i18n';

export default function ( { attributes, className } ) {
	const { linkURL, linkTarget } = attributes;

	const classes = classnames( 'c-row__col', className );

	const itemClasses = classnames(
		'smb-panels__item',
		'smb-panels__item--block-link'
	);

	const actionClasses = classnames(
		'smb-panels__item__action',
		'smb-panels__item__action--nolabel'
	);

	return (
		<div { ...useBlockProps.save( { className: classes } ) }>
			<div className={ itemClasses }>
				<div
					{ ...useInnerBlocksProps.save( {
						className: 'smb-panels__item__body',
					} ) }
				/>

				{ !! linkURL && (
					<div className={ actionClasses }>
						<a
							href={ linkURL }
							target={
								'_self' === linkTarget ? undefined : linkTarget
							}
							rel={
								'_self' === linkTarget
									? undefined
									: 'noopener noreferrer'
							}
						>
							<span className="screen-reader-text">
								{ __( 'Link', 'snow-monkey-blocks' ) }
							</span>
						</a>
					</div>
				) }
			</div>
		</div>
	);
}

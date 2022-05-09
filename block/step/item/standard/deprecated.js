import classnames from 'classnames';
import { times } from 'lodash';

import {
	RichText,
	InnerBlocks,
	useBlockProps,
	useInnerBlocksProps,
} from '@wordpress/block-editor';
import { createBlock } from '@wordpress/blocks';

import metadata from './block.json';

const blockAttributes = metadata.attributes;

export default [
	{
		attributes: {
			...blockAttributes,
		},

		save( { attributes, className } ) {
			const {
				title,
				numberColor,
				imagePosition,
				imageID,
				imageURL,
				imageAlt,
				imageWidth,
				imageHeight,
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
				<div { ...useBlockProps.save( { className: classes } ) }>
					<div className="smb-step__item__title">
						<div
							className="smb-step__item__number"
							style={ itemNumberStyles }
						/>
						<RichText.Content tagName="span" value={ title } />
					</div>

					<div className="smb-step__item__body">
						{ !! imageURL && (
							<div className="smb-step__item__figure">
								<img
									src={ imageURL }
									alt={ imageAlt }
									width={ !! imageWidth && imageWidth }
									height={ !! imageHeight && imageHeight }
									className={ `wp-image-${ imageID }` }
								/>
							</div>
						) }

						<div
							{ ...useInnerBlocksProps.save( {
								className: 'smb-step__item__summary',
							} ) }
						/>

						{ ! RichText.isEmpty( linkLabel ) && (
							<a
								className="smb-step__item__link"
								href={ linkURL }
								style={ itemLinkStyles }
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
								<i className="fas fa-arrow-circle-right" />
								<RichText.Content
									tagName="span"
									className="smb-step__item__link__label"
									value={ linkLabel }
								/>
							</a>
						) }
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
			const {
				title,
				numberColor,
				imagePosition,
				imageID,
				imageURL,
				linkLabel,
				linkURL,
				linkTarget,
				linkColor,
			} = attributes;

			return (
				<div
					className={ `smb-step__item smb-step__item--image-${ imagePosition }` }
				>
					<div className="smb-step__item__title">
						<div
							className="smb-step__item__number"
							style={ { backgroundColor: numberColor } }
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
									alt=""
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
									style={ { color: linkColor } }
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
		},
	},
	{
		attributes: {
			...blockAttributes,
			linkTarget: {
				type: 'string',
				source: 'attribute',
				selector: '.smb-step__item__link',
				attribute: 'target',
				default: '_self',
			},
		},

		save( { attributes } ) {
			const {
				title,
				numberColor,
				imagePosition,
				imageID,
				imageURL,
				linkLabel,
				linkURL,
				linkTarget,
				linkColor,
			} = attributes;

			return (
				<div
					className={ `smb-step__item smb-step__item--image-${ imagePosition }` }
				>
					<div className="smb-step__item__title">
						<div
							className="smb-step__item__number"
							style={ { backgroundColor: numberColor } }
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
									alt=""
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
									target={ linkTarget }
									style={ { color: linkColor } }
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
		},
	},
	{
		attributes: {
			...blockAttributes,
		},

		migrate( attributes ) {
			const migratedInnerBlocks = () => {
				let summary = attributes.summary;
				if ( summary.match( '</p><p>' ) ) {
					summary = attributes.summary.split( '</p><p>' );
				} else {
					summary = attributes.summary.split();
				}

				return times( summary.length, ( index ) => {
					const content = summary[ index ]
						.replace( '<p>', '' )
						.replace( '</p>', '' );

					return createBlock( 'core/paragraph', {
						content,
					} );
				} );
			};

			return [ attributes, migratedInnerBlocks() ];
		},

		save( { attributes } ) {
			const {
				title,
				summary,
				numberColor,
				imagePosition,
				imageID,
				imageURL,
				linkLabel,
				linkURL,
				linkTarget,
				linkColor,
			} = attributes;

			return (
				<div
					className={ `smb-step__item smb-step__item--image-${ imagePosition }` }
				>
					<div className="smb-step__item__title">
						<div
							className="smb-step__item__number"
							style={ { backgroundColor: numberColor } }
						/>
						<span>
							<RichText.Content value={ title } />
						</span>
					</div>

					{ !! imageID && (
						<div className="smb-step__item__figure">
							<img
								src={ imageURL }
								alt=""
								className={ `wp-image-${ imageID }` }
							/>
						</div>
					) }

					<div className="smb-step__item__body">
						<div className="smb-step__item__summary">
							<RichText.Content value={ summary } />
						</div>

						{ ! RichText.isEmpty( linkLabel ) && (
							<a
								className="smb-step__item__link"
								href={ linkURL }
								target={ linkTarget }
								style={ { color: linkColor } }
							>
								<i className="fas fa-arrow-circle-right" />
								<span className="smb-step__item__link__label">
									<RichText.Content value={ linkLabel } />
								</span>
							</a>
						) }
					</div>
				</div>
			);
		},
	},
];

import classnames from 'classnames';

import { RichText, useBlockProps } from '@wordpress/block-editor';

import metadata from './block.json';

const blockAttributes = metadata.attributes;
const blockSupports = metadata.supports;

export default [
	{
		attributes: {
			...blockAttributes,
			backgroundColor: {
				type: 'string',
			},
			backgroundGradientColor: {
				type: 'string',
			},
			textColor: {
				type: 'string',
			},
		},

		supports: {
			...blockSupports,
			color: {
				background: false,
				gradients: false,
				text: false,
				link: false,
			},
		},

		migrate( attributes ) {
			const { backgroundColor, backgroundGradientColor, textColor } =
				attributes;

			let newAttributes = { ...attributes };

			if ( !! backgroundColor ) {
				newAttributes = {
					...newAttributes,
					backgroundColor: undefined,
					style: {
						...newAttributes?.style,
						color: {
							...newAttributes?.style?.color,
							background: backgroundColor,
						},
					},
				};
			}

			if ( !! backgroundGradientColor ) {
				newAttributes = {
					...newAttributes,
					backgroundGradientColor: undefined,
					style: {
						...newAttributes?.style,
						color: {
							...newAttributes?.style?.color,
							gradient: backgroundGradientColor,
						},
					},
				};
			}

			if ( !! textColor ) {
				newAttributes = {
					...newAttributes,
					textColor: undefined,
					style: {
						...newAttributes?.style,
						color: {
							...newAttributes?.style?.color,
							text: textColor,
						},
					},
				};
			}

			return newAttributes;
		},

		save( { attributes, className } ) {
			const {
				titleTagName,
				title,
				summary,
				backgroundColor,
				backgroundGradientColor,
				textColor,
				displayLink,
				linkLabel,
				linkURL,
				linkTarget,
				displayImage,
				imageID,
				imageURL,
				imageAlt,
				imageWidth,
				imageHeight,
			} = attributes;

			const classes = classnames( 'c-row__col', className );

			const itemClasses = 'smb-panels__item';

			const actionClasses = classnames( 'smb-panels__item__action', {
				'smb-panels__item__action--nolabel': ! linkLabel,
			} );

			const itemStyles = {
				'--smb-panel--background-color': backgroundColor,
				'--smb-panel--background-image': backgroundGradientColor,
				'--smb-panel--color': textColor,
			};

			return (
				<div { ...useBlockProps.save( { className: classes } ) }>
					<div className={ itemClasses } style={ itemStyles }>
						{ displayImage && (
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

							{ ( !! linkURL || displayLink ) && (
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
											{ displayLink && (
												<div className="smb-panels__item__link">
													<RichText.Content
														value={ linkLabel }
													/>
												</div>
											) }
										</a>
									) : (
										<>
											{ displayLink && (
												<div className="smb-panels__item__link">
													<RichText.Content
														value={ linkLabel }
													/>
												</div>
											) }
										</>
									) }
								</div>
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

		supports: {
			...blockSupports,
			color: {
				background: false,
				gradients: false,
				text: false,
				link: false,
			},
		},

		migrate( attributes ) {
			const { linkLabel, linkURL, imageURL } = attributes;

			if ( ! RichText.isEmpty( linkLabel ) || !! linkURL ) {
				attributes.displayLink = true;
			}

			if ( !! imageURL ) {
				attributes.displayImage = true;
			}

			return attributes;
		},

		save( { attributes, className } ) {
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

							{ ( ! RichText.isEmpty( linkLabel ) ||
								!! linkURL ) && (
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
		},
	},
	{
		attributes: {
			...blockAttributes,
			linkURL: {
				type: 'string',
				source: 'attribute',
				selector: '.smb-panels__item',
				attribute: 'href',
				default: '',
			},
			linkTarget: {
				type: 'string',
				source: 'attribute',
				selector: '.smb-panels__item',
				attribute: 'target',
				default: '_self',
			},
		},

		supports: {
			...blockSupports,
			color: {
				background: false,
				gradients: false,
				text: false,
				link: false,
			},
		},

		save( { attributes, className } ) {
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
			} = attributes;

			const panelsItemContent = (
				<>
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
								<div className="smb-panels__item__link">
									<RichText.Content value={ linkLabel } />
								</div>
							</div>
						) }
					</div>
				</>
			);

			const classes = classnames( 'c-row__col', className );

			return (
				<div className={ classes }>
					{ !! linkURL ? (
						<a
							className="smb-panels__item"
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
							{ panelsItemContent }
						</a>
					) : (
						<div className="smb-panels__item">
							{ panelsItemContent }
						</div>
					) }
				</div>
			);
		},
	},
	{
		attributes: {
			...blockAttributes,
			linkURL: {
				type: 'string',
				source: 'attribute',
				selector: '.smb-panels__item',
				attribute: 'href',
				default: '',
			},
			linkTarget: {
				type: 'string',
				source: 'attribute',
				selector: '.smb-panels__item',
				attribute: 'target',
				default: '_self',
			},
		},

		supports: {
			...blockSupports,
			color: {
				background: false,
				gradients: false,
				text: false,
				link: false,
			},
		},

		save( { attributes } ) {
			const {
				titleTagName,
				title,
				summary,
				linkLabel,
				linkURL,
				linkTarget,
				imageID,
				imageURL,
			} = attributes;

			const PanelsItemContent = () => {
				return (
					<>
						{ !! imageID && (
							<div className="smb-panels__item__figure">
								<img
									src={ imageURL }
									alt=""
									className={ `wp-image-${ imageID }` }
								/>
							</div>
						) }

						<div className="smb-panels__item__body">
							{ ! RichText.isEmpty( title ) && (
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
									<div className="smb-panels__item__link">
										<RichText.Content value={ linkLabel } />
									</div>
								</div>
							) }
						</div>
					</>
				);
			};

			const PanelsItem = () => {
				return (
					!! linkURL
						? () => {
								return (
									<a
										className="smb-panels__item"
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
										<PanelsItemContent />
									</a>
								);
						  }
						: () => {
								return (
									<div className="smb-panels__item">
										<PanelsItemContent />
									</div>
								);
						  }
				).call( this );
			};

			return (
				<div className="c-row__col">
					<PanelsItem />
				</div>
			);
		},
	},
	{
		attributes: {
			...blockAttributes,
			linkURL: {
				type: 'string',
				source: 'attribute',
				selector: '.smb-panels__item',
				attribute: 'href',
				default: '',
			},
			linkTarget: {
				type: 'string',
				source: 'attribute',
				selector: '.smb-panels__item',
				attribute: 'target',
				default: '_self',
			},
		},

		supports: {
			...blockSupports,
			color: {
				background: false,
				gradients: false,
				text: false,
				link: false,
			},
		},

		save( { attributes } ) {
			const {
				titleTagName,
				title,
				summary,
				linkLabel,
				linkURL,
				linkTarget,
				imageID,
				imageURL,
			} = attributes;

			const renderItem = ( itemContent ) => {
				if ( !! linkURL ) {
					return (
						<a
							className="smb-panels__item"
							href={ linkURL }
							target={ linkTarget }
						>
							{ itemContent }
						</a>
					);
				}

				return (
					<div
						className="smb-panels__item"
						href={ linkURL }
						target={ linkTarget }
					>
						{ itemContent }
					</div>
				);
			};

			return (
				<div className="c-row__col">
					{ renderItem(
						<>
							{ !! imageID && (
								<div className="smb-panels__item__figure">
									<img
										src={ imageURL }
										alt=""
										className={ `wp-image-${ imageID }` }
									/>
								</div>
							) }

							<div className="smb-panels__item__body">
								{ ! RichText.isEmpty( title ) && (
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
										<div className="smb-panels__item__link">
											<RichText.Content
												value={ linkLabel }
											/>
										</div>
									</div>
								) }
							</div>
						</>
					) }
				</div>
			);
		},
	},
];

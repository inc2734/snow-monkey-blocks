import classnames from 'classnames';

import { RichText } from '@wordpress/block-editor';

import metadata from './block.json';

const blockAttributes = metadata.attributes;

export default [
	{
		attributes: {
			...blockAttributes,
		},

		save( { attributes, className } ) {
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
												<RichText.Content
													value={ linkLabel }
												/>
											</div>
										</a>
									) : (
										<div className="smb-panels__item__link">
											<RichText.Content
												value={ linkLabel }
											/>
										</div>
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

		save( { attributes, className } ) {
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

			const itemClasses = classnames(
				'smb-panels__item',
				'smb-panels__item--horizontal',
				{
					'smb-panels__item--reverse': 'right' === imagePosition,
				}
			);

			return (
				<div className={ classes }>
					{ !! linkURL ? (
						<a
							className={ itemClasses }
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
						<div className={ itemClasses }>
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

		save( { attributes } ) {
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
				return !! linkURL ? (
					<a
						className={ classnames(
							'smb-panels__item',
							'smb-panels__item--horizontal',
							{
								'smb-panels__item--reverse':
									'right' === imagePosition,
							}
						) }
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
						<PanelsItemContent />
					</a>
				) : (
					<div
						className={ classnames(
							'smb-panels__item',
							'smb-panels__item--horizontal',
							{
								'smb-panels__item--reverse':
									'right' === imagePosition,
							}
						) }
					>
						<PanelsItemContent />
					</div>
				);
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

		save( { attributes } ) {
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
			} = attributes;

			const renderItem = ( itemContent ) => {
				if ( !! linkURL ) {
					return (
						<a
							className={ classnames(
								'smb-panels__item',
								'smb-panels__item--horizontal',
								{
									'smb-panels__item--reverse':
										'right' === imagePosition,
								}
							) }
							href={ linkURL }
							target={ linkTarget }
						>
							{ itemContent }
						</a>
					);
				}

				return (
					<div
						className={ classnames(
							'smb-panels__item',
							'smb-panels__item--horizontal',
							{
								'smb-panels__item--reverse':
									'right' === imagePosition,
							}
						) }
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

'use strict';

import classnames from 'classnames';
import { schema } from './_schema.js';

const { merge } = lodash;
const { RichText } = wp.editor;
const { Fragment } = wp.element;

export const deprecated = [
	{
		attributes: schema,

		save( { attributes } ) {
			const { titleTagName, title, summary, linkLabel, linkURL, linkTarget, imagePosition, imageID, imageURL } = attributes;

			const PanelsItemContent = () => {
				return (
					<Fragment>
						{ !! imageID &&
							<div className="smb-panels__item__figure">
								<img src={ imageURL } alt="" className={ `wp-image-${ imageID }` } />
							</div>
						}

						<div className="smb-panels__item__body">
							{ ! RichText.isEmpty( title ) &&
								<RichText.Content
									tagName={ titleTagName }
									className="smb-panels__item__title"
									value={ title }
								/>
							}

							{ ! RichText.isEmpty( summary ) &&
								<div className="smb-panels__item__content">
									<RichText.Content value={ summary } />
								</div>
							}

							{ ! RichText.isEmpty( linkLabel ) &&
								<div className="smb-panels__item__action">
									<div className="smb-panels__item__link">
										<RichText.Content value={ linkLabel } />
									</div>
								</div>
							}
						</div>
					</Fragment>
				);
			};

			const PanelsItem = () => {
				return !! linkURL ? (
					<a
						className={ classnames( 'smb-panels__item', 'smb-panels__item--horizontal', { 'smb-panels__item--reverse': 'right' === imagePosition } ) }
						href={ linkURL }
						target={ '_self' === linkTarget ? undefined : linkTarget }
						rel={ '_self' === linkTarget ? undefined : 'noopener noreferrer' }
					>
						<PanelsItemContent />
					</a>
				) : (
					<div
						className={ classnames( 'smb-panels__item', 'smb-panels__item--horizontal', { 'smb-panels__item--reverse': 'right' === imagePosition } ) }
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
		attributes: merge(
			schema,
			{
				linkTarget: {
					type: 'string',
					source: 'attribute',
					selector: '.smb-panels__item',
					attribute: 'target',
					default: '_self',
				},
			},
		),

		save( { attributes } ) {
			const { titleTagName, title, summary, linkLabel, linkURL, linkTarget, imagePosition, imageID, imageURL } = attributes;

			const renderItem = ( itemContent ) => {
				if ( !! linkURL ) {
					return (
						<a
							className={ classnames( 'smb-panels__item', 'smb-panels__item--horizontal', { 'smb-panels__item--reverse': 'right' === imagePosition } ) }
							href={ linkURL }
							target={ linkTarget }
						>
							{ itemContent }
						</a>
					);
				}

				return (
					<div
						className={ classnames( 'smb-panels__item', 'smb-panels__item--horizontal', { 'smb-panels__item--reverse': 'right' === imagePosition } ) }
						href={ linkURL }
						target={ linkTarget }
					>
						{ itemContent }
					</div>
				);
			};

			return (
				<div className="c-row__col">
					{
						renderItem(
							<Fragment>
								{ !! imageID &&
									<div className="smb-panels__item__figure">
										<img src={ imageURL } alt="" className={ `wp-image-${ imageID }` } />
									</div>
								}

								<div className="smb-panels__item__body">
									{ ! RichText.isEmpty( title ) &&
										<RichText.Content
											tagName={ titleTagName }
											className="smb-panels__item__title"
											value={ title }
										/>
									}

									{ ! RichText.isEmpty( summary ) &&
										<div className="smb-panels__item__content">
											<RichText.Content value={ summary } />
										</div>
									}

									{ ! RichText.isEmpty( linkLabel ) &&
										<div className="smb-panels__item__action">
											<div className="smb-panels__item__link">
												<RichText.Content value={ linkLabel } />
											</div>
										</div>
									}
								</div>
							</Fragment>
						)
					}
				</div>
			);
		},
	},
];

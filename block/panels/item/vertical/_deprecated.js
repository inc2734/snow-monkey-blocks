'use strict';

import { schema } from './_schema.js';

const { merge } = lodash;
const { RichText } = wp.editor;
const { Fragment } = wp.element;

export const deprecated = [
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
			const { titleTagName, title, summary, linkLabel, linkURL, linkTarget, imageID, imageURL } = attributes;

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

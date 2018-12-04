'use strict';

import classnames from 'classnames';
import divider from '../../src/js/helper/divider';

const { RichText, InnerBlocks } = wp.editor;

export const deprecated = [
	{
		attributes: {
			title: {
				source: 'html',
				selector: '.smb-section__title',
			},
			backgroundColor: {
				type: 'string',
			},
			contentsWidth: {
				type: 'string',
				default: null,
			},
			topDividerType: {
				type: 'string',
				default: 'tilt',
			},
			topDividerLevel: {
				type: 'number',
				default: 0,
			},
			topDividerColor: {
				type: 'string',
				default: '#fff',
			},
			bottomDividerType: {
				type: 'string',
				default: 'tilt',
			},
			bottomDividerLevel: {
				type: 'number',
				default: 0,
			},
			bottomDividerColor: {
				type: 'string',
				default: '#fff',
			},
		},

		save( { attributes } ) {
			const { title, backgroundColor, contentsWidth, topDividerType, topDividerLevel, topDividerColor, bottomDividerType, bottomDividerLevel, bottomDividerColor } = attributes;

			return (
				<div className="smb-section" style={ { backgroundColor: backgroundColor } }>
					{ !! topDividerLevel &&
						<div className="smb-section__divider smb-section__divider--top">
							{ divider( topDividerType, topDividerLevel, topDividerColor ) }
						</div>
					}

					{ !! bottomDividerLevel &&
						<div className="smb-section__divider smb-section__divider--bottom">
							{ divider( bottomDividerType, bottomDividerLevel, bottomDividerColor ) }
						</div>
					}

					<div className={ classnames( 'c-container', { 'u-slim-width': 'slim' === contentsWidth } ) }>
						{ ! RichText.isEmpty( title ) &&
							<h2 className="smb-section__title">
								<RichText.Content value={ title } />
							</h2>
						}

						<div className="smb-section__body">
							<InnerBlocks.Content />
						</div>
					</div>
				</div>
			);
		},
	},
];

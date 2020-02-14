'use strict';

import classnames from 'classnames';

import { RichText, InnerBlocks } from '@wordpress/block-editor';

import blockAttributes from './attributes';
import { getColumnSize } from '../../../src/js/helper/helper';

export default [
	{
		attributes: blockAttributes,

		save( { attributes } ) {
			const {
				title,
				imageID,
				imageURL,
				imagePosition,
				imageColumnSize,
			} = attributes;

			const { textColumnWidth, imageColumnWidth } = getColumnSize(
				imageColumnSize
			);

			return (
				<div className="smb-media-text">
					<div
						className={ classnames(
							'c-row',
							'c-row--margin',
							'c-row--middle',
							{ 'c-row--reverse': 'left' === imagePosition }
						) }
					>
						<div
							className={ `c-row__col c-row__col--1-1 c-row__col--lg-${ textColumnWidth }` }
						>
							{ ! RichText.isEmpty( title ) && (
								<h2 className="smb-media-text__title">
									<RichText.Content value={ title } />
								</h2>
							) }
							<div className="smb-media-text__body">
								<InnerBlocks.Content />
							</div>
						</div>
						<div
							className={ `c-row__col c-row__col--1-1 c-row__col--lg-${ imageColumnWidth }` }
						>
							<div className="smb-media-text__figure">
								{ imageURL && (
									<img
										src={ imageURL }
										alt=""
										className={ `wp-image-${ imageID }` }
									/>
								) }
							</div>
						</div>
					</div>
				</div>
			);
		},
	},
	{
		attributes: blockAttributes,

		save( { attributes } ) {
			const {
				title,
				imageURL,
				imagePosition,
				imageColumnSize,
			} = attributes;

			const { textColumnWidth, imageColumnWidth } = getColumnSize(
				imageColumnSize
			);

			return (
				<div className="smb-media-text">
					<div
						className={ classnames(
							'c-row',
							'c-row--margin',
							'c-row--middle',
							{ 'c-row--reverse': 'left' === imagePosition }
						) }
					>
						<div
							className={ `c-row__col c-row__col--1-1 c-row__col--lg-${ textColumnWidth }` }
						>
							{ ! RichText.isEmpty( title ) && (
								<h2 className="smb-media-text__title">
									<RichText.Content value={ title } />
								</h2>
							) }
							<div className="smb-media-text__body">
								<InnerBlocks.Content />
							</div>
						</div>
						<div
							className={ `c-row__col c-row__col--1-1 c-row__col--lg-${ imageColumnWidth }` }
						>
							<div className="smb-media-text__figure">
								{ imageURL && <img src={ imageURL } alt="" /> }
							</div>
						</div>
					</div>
				</div>
			);
		},
	},
];

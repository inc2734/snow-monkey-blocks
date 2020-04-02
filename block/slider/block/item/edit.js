'use strict';

import classnames from 'classnames';

import { Popover } from '@wordpress/components';

import { RichText } from '@wordpress/block-editor';

import { __ } from '@wordpress/i18n';

import Figure from '../../../../src/js/component/figure';
import LinkControl from '../../../../src/js/component/link-control';

export default function( {
	attributes,
	setAttributes,
	isSelected,
	className,
} ) {
	const { imageID, imageURL, imageAlt, caption, url, target } = attributes;

	const classes = classnames( 'smb-slider__item', className );

	const Item = () => {
		return (
			<>
				<div className="smb-slider__item__figure">
					<Figure
						src={ imageURL }
						id={ imageID }
						alt={ imageAlt }
						selectHandler={ ( media ) => {
							const newImageURL =
								!! media.sizes && !! media.sizes.large
									? media.sizes.large.url
									: media.url;
							setAttributes( {
								imageURL: newImageURL,
								imageID: media.id,
								imageAlt: media.alt,
							} );
						} }
						removeHandler={ () =>
							setAttributes( {
								imageURL: '',
								imageAlt: '',
								imageID: 0,
							} )
						}
						isSelected={ isSelected }
					/>
				</div>

				{ ( ! RichText.isEmpty( caption ) || isSelected ) && (
					<RichText
						className="smb-slider__item__caption"
						placeholder={ __(
							'Write caption...',
							'snow-monkey-blocks'
						) }
						value={ caption }
						onChange={ ( value ) =>
							setAttributes( { caption: value } )
						}
					/>
				) }
			</>
		);
	};

	return (
		<>
			{ !! url ? (
				<span
					className={ classes }
					href={ url }
					target={ '_self' === target ? undefined : target }
					rel={
						'_self' === target ? undefined : 'noopener noreferrer'
					}
				>
					<Item />
				</span>
			) : (
				<div className={ classes }>
					<Item />
				</div>
			) }

			{ isSelected && (
				<Popover position="bottom center">
					<LinkControl
						url={ url }
						target={ target }
						onChange={ ( { url, opensInNewTab } ) => {
							setAttributes( {
								url,
								target: ! opensInNewTab ? '_self' : '_blank',
							} );
						} }
					/>
				</Popover>
			) }
		</>
	);
}

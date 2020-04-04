'use strict';

import classnames from 'classnames';

import { __ } from '@wordpress/i18n';
import { useState, useEffect } from '@wordpress/element';

import { Button, Popover, ToolbarGroup } from '@wordpress/components';

import { RichText, BlockControls } from '@wordpress/block-editor';

import Figure from '../../../../src/js/component/figure';
import LinkControl from '../../../../src/js/component/link-control';

export default function( {
	attributes,
	setAttributes,
	isSelected,
	className,
} ) {
	const { imageID, imageURL, imageAlt, caption, url, target } = attributes;

	const [ isLinkUIOpen, setIsLinkUIOpen ] = useState( false );
	const toggleLinkUIOpen = () => setIsLinkUIOpen( ! isLinkUIOpen );
	const closeLinkUIOpen = () => setIsLinkUIOpen( false );
	useEffect( () => {
		if ( ! isSelected ) {
			closeLinkUIOpen();
		}
	}, [ isSelected ] );

	const classes = classnames( 'smb-slider__item', className );

	const onSelectImage = ( media ) => {
		const newImageURL =
			!! media.sizes && !! media.sizes.large
				? media.sizes.large.url
				: media.url;

		setAttributes( {
			imageURL: newImageURL,
			imageID: media.id,
			imageAlt: media.alt,
		} );
	};

	const onRemoveImage = () =>
		setAttributes( {
			imageURL: '',
			imageAlt: '',
			imageID: 0,
		} );

	const onChangeCaption = ( value ) =>
		setAttributes( {
			caption: value,
		} );

	const onChangeUrl = ( { url: newUrl, opensInNewTab } ) => {
		setAttributes( {
			url: newUrl,
			target: ! opensInNewTab ? '_self' : '_blank',
		} );
	};

	const Item = () => {
		return (
			<>
				<div className="smb-slider__item__figure">
					<Figure
						src={ imageURL }
						id={ imageID }
						alt={ imageAlt }
						onSelect={ onSelectImage }
						onRemove={ onRemoveImage }
						isSelected={ isSelected }
					/>

					{ isLinkUIOpen && (
						<Popover
							position="bottom center"
							onClose={ closeLinkUIOpen }
						>
							<LinkControl
								url={ url }
								target={ target }
								onChange={ onChangeUrl }
							/>
						</Popover>
					) }
				</div>

				{ ( ! RichText.isEmpty( caption ) || isSelected ) && (
					<RichText
						className="smb-slider__item__caption"
						placeholder={ __(
							'Write caption...',
							'snow-monkey-blocks'
						) }
						value={ caption }
						onChange={ onChangeCaption }
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

			<BlockControls>
				<ToolbarGroup>
					<Button
						icon="admin-links"
						className="components-toolbar__control"
						label={ __( 'Link', 'snow-monkey-blocks' ) }
						aria-expanded={ isLinkUIOpen }
						onClick={ toggleLinkUIOpen }
					/>
				</ToolbarGroup>
			</BlockControls>
		</>
	);
}

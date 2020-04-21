'use strict';

import classnames from 'classnames';

import { __ } from '@wordpress/i18n';
import { useState, useEffect } from '@wordpress/element';

import {
	PanelBody,
	SelectControl,
	Button,
	Popover,
	ToolbarGroup,
} from '@wordpress/components';

import {
	RichText,
	InspectorControls,
	PanelColorSettings,
	InnerBlocks,
	BlockControls,
} from '@wordpress/block-editor';

import Figure from '../../../../../src/js/component/figure';
import LinkControl from '../../../../../src/js/component/link-control';

export default function( {
	attributes,
	setAttributes,
	isSelected,
	className,
} ) {
	const {
		title,
		numberColor,
		imagePosition,
		imageID,
		imageURL,
		imageAlt,
		linkLabel,
		linkURL,
		linkTarget,
		linkColor,
	} = attributes;

	const [ isLinkUIOpen, setIsLinkUIOpen ] = useState( false );
	const toggleLinkUIOpen = () => setIsLinkUIOpen( ! isLinkUIOpen );
	const closeLinkUIOpen = () => setIsLinkUIOpen( false );
	useEffect( () => {
		if ( ! isSelected ) {
			closeLinkUIOpen();
		}
	}, [ isSelected ] );

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

	const onChangeImagePosition = ( value ) =>
		setAttributes( {
			imagePosition: value,
		} );

	const onChangeNumberColor = ( value ) =>
		setAttributes( {
			numberColor: value,
		} );

	const onChangeLinkColor = ( value ) =>
		setAttributes( {
			linkColor: value,
		} );

	const onChangeTitle = ( value ) =>
		setAttributes( {
			title: value,
		} );

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

	const onChangeLinkLabel = ( value ) =>
		setAttributes( {
			linkLabel: value,
		} );

	const onChangeLinkUrl = ( { url: newUrl, opensInNewTab } ) => {
		setAttributes( {
			linkURL: newUrl,
			linkTarget: ! opensInNewTab ? '_self' : '_blank',
		} );
	};

	return (
		<>
			<InspectorControls>
				<PanelBody
					title={ __( 'Block Settings', 'snow-monkey-blocks' ) }
				>
					<SelectControl
						label={ __( 'Image Position', 'snow-monkey-blocks' ) }
						value={ imagePosition }
						onChange={ onChangeImagePosition }
						options={ [
							{
								value: 'left',
								label: __( 'Left side', 'snow-monkey-blocks' ),
							},
							{
								value: 'center',
								label: __( 'Center', 'snow-monkey-blocks' ),
							},
							{
								value: 'right',
								label: __( 'Right side', 'snow-monkey-blocks' ),
							},
						] }
					/>
				</PanelBody>

				<PanelColorSettings
					title={ __( 'Color Settings', 'snow-monkey-blocks' ) }
					initialOpen={ false }
					colorSettings={ [
						{
							value: numberColor,
							onChange: onChangeNumberColor,
							label: __( 'Number Color', 'snow-monkey-blocks' ),
						},
						{
							value: linkColor,
							onChange: onChangeLinkColor,
							label: __( 'Link Color', 'snow-monkey-blocks' ),
						},
					] }
				></PanelColorSettings>
			</InspectorControls>

			<div className={ classes }>
				<div className="smb-step__item__title">
					<div
						className="smb-step__item__number"
						style={ itemNumberStyles }
					/>

					<RichText
						tagName="span"
						placeholder={ __(
							'Write title…',
							'snow-monkey-blocks'
						) }
						value={ title }
						multiline={ false }
						onChange={ onChangeTitle }
					/>
				</div>

				<div className="smb-step__item__body">
					{ ( !! imageID || isSelected ) && (
						<div className="smb-step__item__figure">
							<Figure
								src={ imageURL }
								id={ imageID }
								alt={ imageAlt }
								onSelect={ onSelectImage }
								onRemove={ onRemoveImage }
								isSelected={ isSelected }
							/>
						</div>
					) }

					<div className="smb-step__item__summary">
						<InnerBlocks />

						{ ( ! RichText.isEmpty( linkLabel ) || isSelected ) && (
							<span
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
								<RichText
									className="smb-step__item__link__label"
									placeholder={ __(
										'Link text',
										'snow-monkey-blocks'
									) }
									value={ linkLabel }
									allowedFormats={ [] }
									multiline={ false }
									onChange={ onChangeLinkLabel }
								/>

								{ isLinkUIOpen && (
									<Popover
										position="bottom center"
										onClose={ closeLinkUIOpen }
									>
										<LinkControl
											url={ linkURL }
											target={ linkTarget }
											onChange={ onChangeLinkUrl }
										/>
									</Popover>
								) }
							</span>
						) }
					</div>
				</div>
			</div>

			{ ! RichText.isEmpty( linkLabel ) && (
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
			) }
		</>
	);
}

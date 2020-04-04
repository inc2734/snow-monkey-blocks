'use strict';

import classnames from 'classnames';

import { __ } from '@wordpress/i18n';
import { useState, useEffect } from '@wordpress/element';

import { Button, Popover, ToolbarGroup } from '@wordpress/components';

import {
	RichText,
	InspectorControls,
	PanelColorSettings,
	ContrastChecker,
	BlockControls,
} from '@wordpress/block-editor';

import Figure from '../../../../src/js/component/figure';
import LinkControl from '../../../../src/js/component/link-control';

export default function( {
	attributes,
	setAttributes,
	isSelected,
	className,
} ) {
	const {
		title,
		price,
		lede,
		list,
		btnLabel,
		btnURL,
		btnTarget,
		btnBackgroundColor,
		btnTextColor,
		imageID,
		imageURL,
		imageAlt,
	} = attributes;

	const [ isLinkUIOpen, setIsLinkUIOpen ] = useState( false );
	const toggleLinkUIOpen = () => setIsLinkUIOpen( ! isLinkUIOpen );
	const closeLinkUIOpen = () => setIsLinkUIOpen( false );
	useEffect( () => {
		if ( ! isSelected ) {
			closeLinkUIOpen();
		}
	}, [ isSelected ] );

	const classes = classnames( 'c-row__col', className );

	const btnStyles = {
		backgroundColor: btnBackgroundColor || undefined,
	};

	const btnLabelStyles = {
		color: btnTextColor || undefined,
	};

	const onChangeBtnBackgroundColor = ( value ) =>
		setAttributes( {
			btnBackgroundColor: value,
		} );

	const onChangeBtnTextColor = ( value ) =>
		setAttributes( {
			btnTextColor: value,
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

	const onChangeTitle = ( value ) =>
		setAttributes( {
			title: value,
		} );

	const onChangePrice = ( value ) =>
		setAttributes( {
			price: value,
		} );

	const onChangeLede = ( value ) =>
		setAttributes( {
			lede: value,
		} );

	const onChangeList = ( value ) =>
		setAttributes( {
			list: value,
		} );

	const onChangeBtnLabel = ( value ) =>
		setAttributes( {
			btnLabel: value,
		} );

	const onChangeBtnUrl = ( { url: newUrl, opensInNewTab } ) => {
		setAttributes( {
			btnURL: newUrl,
			btnTarget: ! opensInNewTab ? '_self' : '_blank',
		} );
	};

	return (
		<>
			<InspectorControls>
				<PanelColorSettings
					title={ __( 'Color Settings', 'snow-monkey-blocks' ) }
					initialOpen={ false }
					colorSettings={ [
						{
							value: btnBackgroundColor,
							onChange: onChangeBtnBackgroundColor,
							label: __(
								'Background Color',
								'snow-monkey-blocks'
							),
						},
						{
							value: btnTextColor,
							onChange: onChangeBtnTextColor,
							label: __( 'Text Color', 'snow-monkey-blocks' ),
						},
					] }
				>
					<ContrastChecker
						backgroundColor={ btnBackgroundColor }
						textColor={ btnTextColor }
					/>
				</PanelColorSettings>
			</InspectorControls>

			<div className={ classes }>
				<div className="smb-pricing-table__item">
					{ ( !! imageID || isSelected ) && (
						<div className="smb-pricing-table__item__figure">
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

					<RichText
						className="smb-pricing-table__item__title"
						placeholder={ __(
							'Write title...',
							'snow-monkey-blocks'
						) }
						value={ title }
						allowedFormats={ [] }
						onChange={ onChangeTitle }
						keepPlaceholderOnFocus={ true }
					/>

					{ ( ! RichText.isEmpty( price ) || isSelected ) && (
						<RichText
							className="smb-pricing-table__item__price"
							placeholder={ __(
								'Write price...',
								'snow-monkey-blocks'
							) }
							value={ price }
							allowedFormats={ [] }
							onChange={ onChangePrice }
							keepPlaceholderOnFocus={ true }
						/>
					) }

					{ ( ! RichText.isEmpty( lede ) || isSelected ) && (
						<RichText
							className="smb-pricing-table__item__lede"
							placeholder={ __(
								'Write lede...',
								'snow-monkey-blocks'
							) }
							value={ lede }
							allowedFormats={ [] }
							onChange={ onChangeLede }
							keepPlaceholderOnFocus={ true }
						/>
					) }

					<RichText
						tagName="ul"
						multiline="li"
						value={ list }
						onChange={ onChangeList }
					/>

					{ ( ! RichText.isEmpty( btnLabel ) || isSelected ) && (
						<div className="smb-pricing-table__item__action">
							<span
								className="smb-pricing-table__item__btn smb-btn"
								href={ btnURL }
								style={ btnStyles }
								target={
									'_self' === btnTarget
										? undefined
										: btnTarget
								}
								rel={
									'_self' === btnTarget
										? undefined
										: 'noopener noreferrer'
								}
							>
								<RichText
									className="smb-btn__label"
									style={ btnLabelStyles }
									value={ btnLabel }
									keepPlaceholderOnFocus={ true }
									placeholder={ __(
										'Button',
										'snow-monkey-blocks'
									) }
									allowedFormats={ [] }
									onChange={ onChangeBtnLabel }
								/>
							</span>
						</div>
					) }
				</div>
			</div>

			{ ! RichText.isEmpty( btnLabel ) && isSelected && (
				<BlockControls>
					<ToolbarGroup>
						<Button
							icon="admin-links"
							className="components-toolbar__control"
							aria-expanded={ isLinkUIOpen }
							onClick={ toggleLinkUIOpen }
						/>
						{ isLinkUIOpen && (
							<Popover
								position="bottom center"
								onClose={ closeLinkUIOpen }
							>
								<LinkControl
									url={ btnURL }
									target={ btnTarget }
									onChange={ onChangeBtnUrl }
								/>
							</Popover>
						) }
					</ToolbarGroup>
				</BlockControls>
			) }
		</>
	);
}

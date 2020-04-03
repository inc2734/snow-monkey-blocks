'use strict';

import classnames from 'classnames';
import { times } from 'lodash';

import { InspectorControls, RichText } from '@wordpress/block-editor';

import { __ } from '@wordpress/i18n';

import { PanelBody, BaseControl, Button, Popover } from '@wordpress/components';

import Figure from '../../../../../src/js/component/figure';
import LinkControl from '../../../../../src/js/component/link-control';

export default function( {
	attributes,
	setAttributes,
	isSelected,
	className,
} ) {
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

	const titleTagNames = [ 'div', 'h2', 'h3', 'none' ];

	const classes = classnames( 'c-row__col', className );

	const onClickTitleTagName = ( value ) =>
		setAttributes( {
			titleTagName: value,
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

	const onChangeSummary = ( value ) =>
		setAttributes( {
			summary: value,
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
					<BaseControl
						label={ __( 'Title Tag', 'snow-monkey-blocks' ) }
						id="snow-monkey-blocks/panels--item/title-tag-name"
					>
						<div className="smb-list-icon-selector">
							{ times( titleTagNames.length, ( index ) => {
								return (
									<Button
										isDefault
										isPrimary={
											titleTagName ===
											titleTagNames[ index ]
										}
										onClick={ () =>
											onClickTitleTagName(
												titleTagNames[ index ]
											)
										}
									>
										{ titleTagNames[ index ] }
									</Button>
								);
							} ) }
						</div>
					</BaseControl>
				</PanelBody>
			</InspectorControls>

			<div className={ classes }>
				<div
					className="smb-panels__item"
					href={ linkURL }
					target={ linkTarget }
				>
					{ ( !! imageID || isSelected ) && (
						<div className="smb-panels__item__figure">
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

					<div className="smb-panels__item__body">
						{ ( ! RichText.isEmpty( title ) || isSelected ) &&
							'none' !== titleTagName && (
								<RichText
									tagName={ titleTagName }
									className="smb-panels__item__title"
									placeholder={ __(
										'Write title...',
										'snow-monkey-blocks'
									) }
									value={ title }
									onChange={ onChangeTitle }
									keepPlaceholderOnFocus={ true }
								/>
							) }

						{ ( ! RichText.isEmpty( summary ) || isSelected ) && (
							<RichText
								className="smb-panels__item__content"
								placeholder={ __(
									'Write content...',
									'snow-monkey-blocks'
								) }
								value={ summary }
								onChange={ onChangeSummary }
								keepPlaceholderOnFocus={ true }
							/>
						) }

						{ ( ! RichText.isEmpty( linkLabel ) || isSelected ) && (
							<div className="smb-panels__item__action">
								<RichText
									className="smb-panels__item__link"
									value={ linkLabel }
									placeholder={ __(
										'Link',
										'snow-monkey-blocks'
									) }
									allowedFormats={ [] }
									onChange={ onChangeLinkLabel }
									keepPlaceholderOnFocus={ true }
								/>
							</div>
						) }
					</div>
				</div>
			</div>

			{ isSelected && (
				<Popover position="bottom center">
					<LinkControl
						url={ linkURL }
						target={ linkTarget }
						onChange={ onChangeLinkUrl }
					/>
				</Popover>
			) }
		</>
	);
}

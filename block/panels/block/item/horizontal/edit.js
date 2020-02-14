'use strict';

import classnames from 'classnames';
import { times } from 'lodash';

import { InspectorControls, RichText, URLInput } from '@wordpress/block-editor';
import { __ } from '@wordpress/i18n';

import {
	PanelBody,
	SelectControl,
	BaseControl,
	Button,
} from '@wordpress/components';

import Figure from '../../../../../src/js/component/figure';

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
		imagePosition,
		imageID,
		imageURL,
		imageAlt,
	} = attributes;

	const titleTagNames = [ 'div', 'h2', 'h3', 'none' ];

	const classes = classnames( 'c-row__col', className );

	const itemClasses = classnames(
		'smb-panels__item',
		'smb-panels__item--horizontal',
		{
			'smb-panels__item--reverse': 'right' === imagePosition,
		}
	);

	return (
		<>
			<InspectorControls>
				<PanelBody
					title={ __( 'Block Settings', 'snow-monkey-blocks' ) }
				>
					<BaseControl
						label={ __( 'Title Tag', 'snow-monkey-blocks' ) }
						id="snow-monkey-blocks/panels--item--horizontal/title-tag-name"
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
											setAttributes( {
												titleTagName:
													titleTagNames[ index ],
											} )
										}
									>
										{ titleTagNames[ index ] }
									</Button>
								);
							} ) }
						</div>
					</BaseControl>

					<SelectControl
						label={ __( 'Image Position', 'snow-monkey-blocks' ) }
						value={ imagePosition }
						options={ [
							{
								value: 'right',
								label: __( 'Right side', 'snow-monkey-blocks' ),
							},
							{
								value: 'left',
								label: __( 'Left side', 'snow-monkey-blocks' ),
							},
						] }
						onChange={ ( value ) =>
							setAttributes( { imagePosition: value } )
						}
					/>
				</PanelBody>

				<PanelBody
					title={ __( 'Link Settings', 'snow-monkey-blocks' ) }
				>
					<BaseControl
						label={ __( 'URL', 'snow-monkey-blocks' ) }
						id="snow-monkey-blocks/panels--item--horizontal/link-url"
					>
						<URLInput
							value={ linkURL }
							onChange={ ( value ) =>
								setAttributes( { linkURL: value } )
							}
						/>
					</BaseControl>

					<SelectControl
						label={ __( 'Target', 'snow-monkey-blocks' ) }
						value={ linkTarget }
						options={ [
							{
								value: '_self',
								label: __( '_self', 'snow-monkey-blocks' ),
							},
							{
								value: '_blank',
								label: __( '_blank', 'snow-monkey-blocks' ),
							},
						] }
						onChange={ ( value ) =>
							setAttributes( { linkTarget: value } )
						}
					/>
				</PanelBody>
			</InspectorControls>

			<div className={ classes }>
				<div
					className={ itemClasses }
					href={ linkURL }
					target={ '_self' === linkTarget ? undefined : linkTarget }
					rel={
						'_self' === linkTarget
							? undefined
							: 'noopener noreferrer'
					}
				>
					{ ( !! imageID || isSelected ) && (
						<div className="smb-panels__item__figure">
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
									onChange={ ( value ) =>
										setAttributes( { title: value } )
									}
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
								onChange={ ( value ) =>
									setAttributes( { summary: value } )
								}
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
									onChange={ ( value ) =>
										setAttributes( { linkLabel: value } )
									}
									keepPlaceholderOnFocus={ true }
								/>
							</div>
						) }
					</div>
				</div>
			</div>
		</>
	);
}

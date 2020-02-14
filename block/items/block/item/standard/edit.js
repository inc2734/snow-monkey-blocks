'use strict';

import classnames from 'classnames';
import { times } from 'lodash';

import { __ } from '@wordpress/i18n';

import {
	PanelBody,
	SelectControl,
	BaseControl,
	Button,
} from '@wordpress/components';

import {
	InspectorControls,
	RichText,
	PanelColorSettings,
	ContrastChecker,
	URLInput,
} from '@wordpress/block-editor';

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
		lede,
		summary,
		btnLabel,
		url,
		target,
		btnBackgroundColor,
		btnTextColor,
		imageID,
		imageURL,
		imageAlt,
	} = attributes;

	const titleTagNames = [ 'div', 'h2', 'h3', 'none' ];

	const classes = classnames( 'c-row__col', className );

	const itemBtnLabelStyles = {
		color: btnTextColor || undefined,
	};

	const itemBtnStyles = {
		backgroundColor: btnBackgroundColor || undefined,
	};

	return (
		<>
			<InspectorControls>
				<PanelBody
					title={ __( 'Block Settings', 'snow-monkey-blocks' ) }
				>
					<BaseControl
						label={ __( 'Title Tag', 'snow-monkey-blocks' ) }
						id="snow-monkey-blocks/items--item--standard/title-tag-name"
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
				</PanelBody>

				<PanelBody
					title={ __( 'Button Settings', 'snow-monkey-blocks' ) }
				>
					<BaseControl
						label={ __( 'URL', 'snow-monkey-blocks' ) }
						id="snow-monkey-blocks/items--item--standard/url"
					>
						<URLInput
							value={ url }
							onChange={ ( value ) =>
								setAttributes( { url: value } )
							}
						/>
					</BaseControl>

					<SelectControl
						label={ __( 'Target', 'snow-monkey-blocks' ) }
						value={ target }
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
							setAttributes( { target: value } )
						}
					/>
				</PanelBody>

				<PanelColorSettings
					title={ __( 'Color Settings', 'snow-monkey-blocks' ) }
					initialOpen={ false }
					colorSettings={ [
						{
							value: btnBackgroundColor,
							onChange: ( value ) =>
								setAttributes( { btnBackgroundColor: value } ),
							label: __(
								'Background Color of Button',
								'snow-monkey-blocks'
							),
						},
						{
							value: btnTextColor,
							onChange: ( value ) =>
								setAttributes( { btnTextColor: value } ),
							label: __(
								'Text Color of Button',
								'snow-monkey-blocks'
							),
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
				<div className="smb-items__item">
					{ ( !! imageID || isSelected ) && (
						<div className="smb-items__item__figure">
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

					{ 'none' !== titleTagName && (
						<RichText
							tagName={ titleTagName }
							className="smb-items__item__title"
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

					{ ( ! RichText.isEmpty( lede ) || isSelected ) && (
						<RichText
							className="smb-items__item__lede"
							placeholder={ __(
								'Write lede...',
								'snow-monkey-blocks'
							) }
							value={ lede }
							onChange={ ( value ) =>
								setAttributes( { lede: value } )
							}
							keepPlaceholderOnFocus={ true }
						/>
					) }

					{ ( ! RichText.isEmpty( summary ) || isSelected ) && (
						<RichText
							className="smb-items__item__content"
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

					{ ( ! RichText.isEmpty( btnLabel ) || isSelected ) && (
						<div className="smb-items__item__action">
							<span
								className="smb-items__item__btn smb-btn"
								href={ url }
								style={ itemBtnStyles }
								target={
									'_self' === target ? undefined : target
								}
								rel={
									'_self' === target
										? undefined
										: 'noopener noreferrer'
								}
							>
								<RichText
									className="smb-btn__label"
									style={ itemBtnLabelStyles }
									value={ btnLabel }
									placeholder={ __(
										'Button',
										'snow-monkey-blocks'
									) }
									allowedFormats={ [] }
									onChange={ ( value ) =>
										setAttributes( { btnLabel: value } )
									}
									keepPlaceholderOnFocus={ true }
								/>
							</span>
						</div>
					) }
				</div>
			</div>
		</>
	);
}

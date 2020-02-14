'use strict';

import classnames from 'classnames';
import { times } from 'lodash';

import { Fragment } from '@wordpress/element';
import { __ } from '@wordpress/i18n';

import {
	PanelBody,
	SelectControl,
	BaseControl,
	Button,
	ToggleControl,
} from '@wordpress/components';

import {
	InspectorControls,
	RichText,
	PanelColorSettings,
	ContrastChecker,
	URLInput,
} from '@wordpress/block-editor';

import Figure from '../../../../src/js/component/figure';

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
		btnURL,
		btnTarget,
		btnBackgroundColor,
		btnTextColor,
		imageID,
		imageURL,
		imageAlt,
		isBlockLink,
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
		<Fragment>
			<InspectorControls>
				<PanelBody
					title={ __( 'Block Settings', 'snow-monkey-blocks' ) }
				>
					<BaseControl
						label={ __( 'Title Tag', 'snow-monkey-blocks' ) }
						id="snow-monkey-blocks/items--item/title-tag-name"
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

					<ToggleControl
						label={ __( 'Block link', 'snow-monkey-blocks' ) }
						description={ __(
							'Link is made not only to the button but to the whole block.',
							'snow-monkey-blocks'
						) }
						checked={ isBlockLink }
						onChange={ ( value ) =>
							setAttributes( { isBlockLink: value } )
						}
					/>
				</PanelBody>

				<PanelBody
					title={ __( 'Button Settings', 'snow-monkey-blocks' ) }
				>
					<BaseControl
						label={ __( 'URL', 'snow-monkey-blocks' ) }
						id="snow-monkey-blocks/items--item/btn-url"
					>
						<URLInput
							value={ btnURL }
							onChange={ ( value ) =>
								setAttributes( { btnURL: value } )
							}
						/>
					</BaseControl>

					<SelectControl
						label={ __( 'Target', 'snow-monkey-blocks' ) }
						value={ btnTarget }
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
							setAttributes( { btnTarget: value } )
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
						/>
					) }

					{ ( ! RichText.isEmpty( btnLabel ) || isSelected ) && (
						<div className="smb-items__item__action">
							<span
								className="smb-items__item__btn smb-btn"
								href={ btnURL }
								style={ itemBtnStyles }
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
								/>
							</span>
						</div>
					) }
				</div>
			</div>
		</Fragment>
	);
}

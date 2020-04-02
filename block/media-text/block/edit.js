'use strict';

import classnames from 'classnames';
import { times } from 'lodash';

import { __ } from '@wordpress/i18n';

import {
	PanelBody,
	SelectControl,
	Button,
	BaseControl,
	Popover,
} from '@wordpress/components';

import {
	RichText,
	InnerBlocks,
	InspectorControls,
} from '@wordpress/block-editor';

import { getColumnSize } from '../../../src/js/helper/helper';
import Figure from '../../../src/js/component/figure';
import LinkControl from '../../../src/js/component/link-control';

export default function( {
	attributes,
	setAttributes,
	isSelected,
	className,
} ) {
	const {
		titleTagName,
		title,
		imageID,
		imageURL,
		imageAlt,
		caption,
		imagePosition,
		imageColumnSize,
		url,
		target,
	} = attributes;

	const titleTagNames = [ 'h1', 'h2', 'h3', 'none' ];
	const { textColumnWidth, imageColumnWidth } = getColumnSize(
		imageColumnSize
	);

	const classes = classnames( 'smb-media-text', className );

	const rowClasses = classnames( 'c-row', 'c-row--margin', 'c-row--middle', {
		'c-row--reverse': 'left' === imagePosition,
	} );

	const textColumnClasses = classnames( 'c-row__col', 'c-row__col--1-1', [
		`c-row__col--lg-${ textColumnWidth }`,
	] );

	const imageColumnClasses = classnames( 'c-row__col', 'c-row__col--1-1', [
		`c-row__col--lg-${ imageColumnWidth }`,
	] );

	return (
		<>
			<InspectorControls>
				<PanelBody
					title={ __( 'Block Settings', 'snow-monkey-blocks' ) }
				>
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

					<SelectControl
						label={ __(
							'Image Column Size',
							'snow-monkey-blocks'
						) }
						value={ imageColumnSize }
						options={ [
							{
								value: 66,
								label: __( '66%', 'snow-monkey-blocks' ),
							},
							{
								value: 50,
								label: __( '50%', 'snow-monkey-blocks' ),
							},
							{
								value: 33,
								label: __( '33%', 'snow-monkey-blocks' ),
							},
							{
								value: 25,
								label: __( '25%', 'snow-monkey-blocks' ),
							},
						] }
						onChange={ ( value ) =>
							setAttributes( { imageColumnSize: value } )
						}
					/>

					<BaseControl
						label={ __( 'Title Tag', 'snow-monkey-blocks' ) }
						id="snow-monkey-blocks/media-text/title-tag-name"
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
			</InspectorControls>

			<div className={ classes }>
				<div className={ rowClasses }>
					<div className={ textColumnClasses }>
						{ ( ! RichText.isEmpty( title ) || isSelected ) &&
							'none' !== titleTagName && (
								<RichText
									className="smb-media-text__title"
									tagName={ titleTagName }
									value={ title }
									onChange={ ( value ) =>
										setAttributes( { title: value } )
									}
									allowedFormats={ [] }
									placeholder={ __(
										'Write title...',
										'snow-monkey-blocks'
									) }
								/>
							) }
						<div className="smb-media-text__body">
							<InnerBlocks />
						</div>
					</div>
					<div className={ imageColumnClasses }>
						<div className="smb-media-text__figure">
							<Figure
								src={ imageURL }
								id={ imageID }
								alt={ imageAlt }
								url={ url }
								target={ target }
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

							{ imageURL && isSelected && (
								<Popover position="bottom center">
									<LinkControl
										url={ url }
										target={ target }
										onChange={ ( {
											url,
											opensInNewTab,
										} ) => {
											setAttributes( {
												url,
												target: ! opensInNewTab
													? '_self'
													: '_blank',
											} );
										} }
									/>
								</Popover>
							) }
						</div>

						{ ( ! RichText.isEmpty( caption ) || isSelected ) && (
							<RichText
								className="smb-media-text__caption"
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
					</div>
				</div>
			</div>
		</>
	);
}

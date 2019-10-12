'use strict';

import classnames from 'classnames';
import { getColumnSize } from '../../src/js/helper/helper';
import Figure from '../../src/js/component/figure';

import {
	times,
} from 'lodash';

import {
	PanelBody,
	SelectControl,
	Button,
	BaseControl,
} from '@wordpress/components';

import {
	RichText,
	InnerBlocks,
	InspectorControls,
} from '@wordpress/editor';

import {
	Fragment,
} from '@wordpress/element';

import {
	__,
} from '@wordpress/i18n';

export default function( { attributes, setAttributes, isSelected, className } ) {
	const { titleTagName, title, imageID, imageURL, imageAlt, imagePosition, imageColumnSize } = attributes;

	const titleTagNames = [ 'h1', 'h2', 'h3', 'none' ];
	const { textColumnWidth, imageColumnWidth } = getColumnSize( imageColumnSize );

	const classes = classnames( 'smb-media-text', className );

	const rowClasses = classnames(
		'c-row',
		'c-row--margin',
		'c-row--middle',
		{
			'c-row--reverse': 'left' === imagePosition,
		}
	);

	const textColumnClasses = classnames( 'c-row__col', 'c-row__col--1-1', [ `c-row__col--lg-${ textColumnWidth }` ] );

	const imageColumnClasses = classnames( 'c-row__col', 'c-row__col--1-1', [ `c-row__col--lg-${ imageColumnWidth }` ] );

	return (
		<Fragment>
			<InspectorControls>
				<PanelBody title={ __( 'Block Settings', 'snow-monkey-blocks' ) }>
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
						onChange={ ( value ) => setAttributes( { imagePosition: value } ) }
					/>

					<SelectControl
						label={ __( 'Image Column Size', 'snow-monkey-blocks' ) }
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
						onChange={ ( value ) => setAttributes( { imageColumnSize: value } ) }
					/>

					<BaseControl label={ __( 'Title Tag', 'snow-monkey-blocks' ) }>
						<div className="smb-list-icon-selector">
							{ times( titleTagNames.length, ( index ) => {
								return (
									<Button
										isDefault
										isPrimary={ titleTagName === titleTagNames[ index ] }
										onClick={ () => setAttributes( { titleTagName: titleTagNames[ index ] } ) }
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
						{ ( ! RichText.isEmpty( title ) || isSelected ) && 'none' !== titleTagName &&
							<RichText
								className="smb-media-text__title"
								tagName={ titleTagName }
								value={ title }
								onChange={ ( value ) => setAttributes( { title: value } ) }
								formattingControls={ [] }
								placeholder={ __( 'Write title...', 'snow-monkey-blocks' ) }
							/>
						}
						<div className="smb-media-text__body">
							<InnerBlocks />
						</div>
					</div>
					<div className={ imageColumnClasses }>
						<div className="smb-media-text__figure">
							<Figure
								url={ imageURL }
								id={ imageID }
								alt={ imageAlt }
								selectHandler={ ( media ) => {
									const newImageURL = !! media.sizes && !! media.sizes.large ? media.sizes.large.url : media.url;
									setAttributes( { imageURL: newImageURL, imageID: media.id, imageAlt: media.alt } );
								} }
								removeHandler={ () => setAttributes( { imageURL: '', imageAlt: '', imageID: 0 } ) }
								isSelected={ isSelected }
							/>
						</div>
					</div>
				</div>
			</div>
		</Fragment>
	);
}

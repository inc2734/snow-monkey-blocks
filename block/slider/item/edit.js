'use strict';

import classnames from 'classnames';
import Figure from '../../../src/js/component/figure';

import {
	PanelBody,
	BaseControl,
	SelectControl,
} from '@wordpress/components';

import {
	RichText,
	InspectorControls,
	URLInput,
} from '@wordpress/block-editor';

import {
	Fragment,
} from '@wordpress/element';

import {
	__,
} from '@wordpress/i18n';

export default function( { attributes, setAttributes, isSelected, className } ) {
	const { imageID, imageURL, imageAlt, caption, url, target } = attributes;

	const classes = classnames( 'smb-slider__item', className );

	const Item = () => {
		return (
			<Fragment>
				<div className="smb-slider__item__figure">
					<Figure
						src={ imageURL }
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

				{ ( ! RichText.isEmpty( caption ) || isSelected ) &&
					<RichText
						className="smb-slider__item__caption"
						placeholder={ __( 'Write caption...', 'snow-monkey-blocks' ) }
						value={ caption }
						onChange={ ( value ) => setAttributes( { caption: value } ) }
					/>
				}
			</Fragment>
		);
	};

	return (
		<Fragment>
			<InspectorControls>
				<PanelBody title={ __( 'Block Settings', 'snow-monkey-blocks' ) }>
					<BaseControl label={ __( 'URL', 'snow-monkey-blocks' ) } id="snow-monkey-blocks/slider/item/url">
						<URLInput
							value={ url }
							onChange={ ( value ) => setAttributes( { url: value } ) }
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
						onChange={ ( value ) => setAttributes( { target: value } ) }
					/>
				</PanelBody>
			</InspectorControls>

			{ !! url ? (
				<span
					className={ classes }
					href={ url }
					target={ '_self' === target ? undefined : target }
					rel={ '_self' === target ? undefined : 'noopener noreferrer' }
				>
					<Item />
				</span>
			) : (
				<div className={ classes }>
					<Item />
				</div>
			) }
		</Fragment>
	);
}

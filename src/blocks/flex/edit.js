import classnames from 'classnames';
import hexToRgba from 'hex-to-rgba';

import {
	InnerBlocks,
	InspectorControls,
	useBlockProps,
	useInnerBlocksProps,
} from '@wordpress/block-editor';

import { useSelect } from '@wordpress/data';

import PanelBoxShadowSettings from '@smb/component/panel-box-shadow-settings';

import metadata from './block.json';

export default function ( { attributes, setAttributes, className, clientId } ) {
	const {
		boxShadow: { ...boxShadow },
		templateLock,
	} = attributes;

	const hasInnerBlocks = useSelect(
		( select ) =>
			!! select( 'core/block-editor' ).getBlock( clientId )?.innerBlocks
				?.length,
		[ clientId ]
	);

	const classes = classnames( 'smb-flex', className );

	const styles = {
		'--smb-flex--box-shadow': !! boxShadow.color
			? `${ boxShadow.horizontal }px ${ boxShadow.vertical }px ${
					boxShadow.blur
			  }px ${ boxShadow.spread }px ${ hexToRgba(
					boxShadow.color,
					boxShadow.opacity
			  ) }`
			: undefined,
	};

	const blockProps = useBlockProps( {
		className: classes,
		style: styles,
	} );

	const innerBlocksProps = useInnerBlocksProps( blockProps, {
		templateLock,
		renderAppender: hasInnerBlocks
			? undefined
			: InnerBlocks.ButtonBlockAppender,
	} );

	return (
		<>
			<InspectorControls group="styles">
				<PanelBoxShadowSettings
					settings={ [
						{
							colorValue: boxShadow.color,
							onColorChange: ( value ) => {
								boxShadow.color = value;

								setAttributes( {
									boxShadow: {
										...boxShadow,
									},
								} );
							},
							defaultValue:
								metadata.attributes.boxShadow.default.color,
						},
						{
							opacityValue: boxShadow.opacity,
							onOpacityChange: ( value ) => {
								boxShadow.opacity = value;

								setAttributes( {
									boxShadow: {
										...boxShadow,
									},
								} );
							},
							defaultValue:
								metadata.attributes.boxShadow.default.opacity,
						},
						{
							horizontalValue: boxShadow.horizontal,
							onHorizontalChange: ( value ) => {
								boxShadow.horizontal = value;

								setAttributes( {
									boxShadow: {
										...boxShadow,
									},
								} );
							},
							defaultValue:
								metadata.attributes.boxShadow.default
									.horizontal,
						},
						{
							blurValue: boxShadow.blur,
							onBlurChange: ( value ) => {
								boxShadow.blur = value;

								setAttributes( {
									boxShadow: {
										...boxShadow,
									},
								} );
							},
							defaultValue:
								metadata.attributes.boxShadow.default.blur,
						},
						{
							spreadValue: boxShadow.spread,
							onSpreadChange: ( value ) => {
								boxShadow.spread = value;

								setAttributes( {
									boxShadow: {
										...boxShadow,
									},
								} );
							},
							defaultValue:
								metadata.attributes.boxShadow.default.spread,
						},
					] }
				/>
			</InspectorControls>

			<div { ...innerBlocksProps } />
		</>
	);
}

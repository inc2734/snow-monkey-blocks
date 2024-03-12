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
	const { boxShadow, templateLock } = attributes;

	const hasInnerBlocks = useSelect(
		( select ) => {
			const { getBlock } = select( 'core/block-editor' );
			const block = getBlock( clientId );
			return !! ( block && block.innerBlocks.length );
		},
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
			? InnerBlocks.DefaultBlockAppender
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
								setAttributes( {
									boxShadow: {
										...boxShadow,
										color: value,
									},
								} );
							},
							defaultValue:
								metadata.attributes.boxShadow.default.color,
						},
						{
							opacityValue: boxShadow.opacity,
							onOpacityChange: ( value ) => {
								setAttributes( {
									boxShadow: {
										...boxShadow,
										opacity: value,
									},
								} );
							},
							defaultValue:
								metadata.attributes.boxShadow.default.opacity,
						},
						{
							horizontalValue: boxShadow.horizontal,
							onHorizontalChange: ( value ) => {
								setAttributes( {
									boxShadow: {
										...boxShadow,
										horizontal: value,
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
								setAttributes( {
									boxShadow: {
										...boxShadow,
										blur: value,
									},
								} );
							},
							defaultValue:
								metadata.attributes.boxShadow.default.blur,
						},
						{
							spreadValue: boxShadow.spread,
							onSpreadChange: ( value ) => {
								setAttributes( {
									boxShadow: {
										...boxShadow,
										spread: value,
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

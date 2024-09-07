import classnames from 'classnames';

import {
	InspectorControls,
	InnerBlocks,
	useBlockProps,
	useInnerBlocksProps,
	__experimentalUseMultipleOriginColorsAndGradients as useMultipleOriginColorsAndGradients,
	__experimentalColorGradientSettingsDropdown as ColorGradientSettingsDropdown,
} from '@wordpress/block-editor';

import { useSelect } from '@wordpress/data';
import { __ } from '@wordpress/i18n';

const ALLOWED_BLOCKS = [
	'snow-monkey-blocks/directory-structure-item-directory',
	'snow-monkey-blocks/directory-structure-item-file',
];

import metadata from './block.json';

export default function ( { attributes, setAttributes, className, clientId } ) {
	const { iconColor, templateLock } = attributes;

	const hasInnerBlocks = useSelect(
		( select ) =>
			!! select( 'core/block-editor' ).getBlock( clientId )?.innerBlocks
				?.length,
		[ clientId ]
	);

	const classes = classnames( 'smb-directory-structure', className );

	const styles = {
		'--smb-directory-structure--icon-color': iconColor || undefined,
	};

	const blockProps = useBlockProps( {
		className: classes,
		style: styles,
	} );

	const innerBlocksProps = useInnerBlocksProps( blockProps, {
		allowedBlocks: ALLOWED_BLOCKS,
		templateLock,
		renderAppender: hasInnerBlocks
			? InnerBlocks.DefaultBlockAppender
			: InnerBlocks.ButtonBlockAppender,
	} );

	return (
		<>
			<InspectorControls group="color">
				<ColorGradientSettingsDropdown
					settings={ [
						{
							colorValue: iconColor,
							onColorChange: ( value ) =>
								setAttributes( {
									iconColor: value,
								} ),
							resetAllFilter: () => ( {
								iconColor: metadata.iconColor,
							} ),
							label: __( 'Icon color', 'snow-monkey-blocks' ),
						},
					] }
					__experimentalIsRenderedInSidebar
					{ ...useMultipleOriginColorsAndGradients() }
					panelId={ clientId }
				/>
			</InspectorControls>

			<div { ...innerBlocksProps } />
		</>
	);
}

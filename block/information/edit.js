import classnames from 'classnames';

import {
	InnerBlocks,
	InspectorControls,
	useBlockProps,
	__experimentalUseInnerBlocksProps as useInnerBlocksProps,
} from '@wordpress/block-editor';

import { PanelBody, SelectControl, ToggleControl } from '@wordpress/components';
import { __ } from '@wordpress/i18n';

export default function ( { attributes, setAttributes, className } ) {
	const allowedBlocks = [ 'snow-monkey-blocks/information--item' ];
	const template = [ [ 'snow-monkey-blocks/information--item' ] ];

	const { labelColumnSize, smIsSplitColumn } = attributes;

	const classes = classnames( 'smb-information', className );

	const blockProps = useBlockProps( {
		className: classes,
	} );

	const innerBlocksProps = useInnerBlocksProps(
		{
			className: 'smb-information__body',
		},
		{
			allowedBlocks,
			template,
			templateLock: false,
			renderAppender: InnerBlocks.ButtonBlockAppender,
		}
	);

	const onChangeLabelColumnSize = ( value ) =>
		setAttributes( {
			labelColumnSize: parseInt( value ),
		} );

	const onChangeSmIsSplitColumn = ( value ) =>
		setAttributes( {
			smIsSplitColumn: ! value,
		} );

	return (
		<>
			<InspectorControls>
				<PanelBody
					title={ __( 'Block Settings', 'snow-monkey-blocks' ) }
				>
					<SelectControl
						label={ __(
							'Label Column Size',
							'snow-monkey-blocks'
						) }
						value={ labelColumnSize }
						options={ [
							{
								value: 33,
								label: __( '33%', 'snow-monkey-blocks' ),
							},
							{
								value: 25,
								label: __( '25%', 'snow-monkey-blocks' ),
							},
						] }
						onChange={ onChangeLabelColumnSize }
					/>

					<ToggleControl
						label={ __(
							"Don't split the column in a smartphone",
							'snow-monkey-blocks'
						) }
						checked={ ! smIsSplitColumn }
						onChange={ onChangeSmIsSplitColumn }
					/>
				</PanelBody>
			</InspectorControls>

			<div
				{ ...blockProps }
				data-sm-split-column={ smIsSplitColumn ? 'true' : undefined }
			>
				<div { ...innerBlocksProps } />
			</div>
		</>
	);
}

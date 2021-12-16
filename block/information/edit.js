import classnames from 'classnames';

import {
	InnerBlocks,
	InspectorControls,
	useBlockProps,
	useInnerBlocksProps,
} from '@wordpress/block-editor';

import { PanelBody, SelectControl, ToggleControl } from '@wordpress/components';
import { useSelect } from '@wordpress/data';
import { __ } from '@wordpress/i18n';

import { useMigrateDoubleHyphenToSingleHyphen } from '@smb/hooks';

const ALLOWED_BLOCKS = [ 'snow-monkey-blocks/information-item' ];
const TEMPLATE = [ [ 'snow-monkey-blocks/information-item' ] ];

export default function ( { attributes, setAttributes, className, clientId } ) {
	useMigrateDoubleHyphenToSingleHyphen( clientId, [
		{
			oldBlockName: 'snow-monkey-blocks/information--item',
			newBlockName: 'snow-monkey-blocks/information-item',
		},
	] );

	const hasInnerBlocks = useSelect(
		( select ) =>
			!! select( 'core/block-editor' ).getBlock( clientId )?.innerBlocks
				?.length,
		[ clientId ]
	);

	const {
		labelColumnSize,
		labelAlign,
		labelVerticalAlign,
		smIsSplitColumn,
	} = attributes;

	const classes = classnames( 'smb-information', className );

	const blockProps = useBlockProps( {
		className: classes,
	} );

	const innerBlocksProps = useInnerBlocksProps(
		{
			className: 'smb-information__body',
		},
		{
			allowedBlocks: ALLOWED_BLOCKS,
			template: TEMPLATE,
			templateLock: false,
			renderAppender: hasInnerBlocks
				? InnerBlocks.DefaultBlockAppender
				: InnerBlocks.ButtonBlockAppender,
		}
	);

	const onChangeLabelColumnSize = ( value ) =>
		setAttributes( {
			labelColumnSize: parseInt( value ),
		} );

	const onChangeLabelAlign = ( value ) =>
		setAttributes( {
			labelAlign: value,
		} );

	const onChangeLabelVerticalAlign = ( value ) =>
		setAttributes( {
			labelVerticalAlign: value,
		} );

	const onChangeSmIsSplitColumn = ( value ) =>
		setAttributes( {
			smIsSplitColumn: ! value,
		} );

	return (
		<>
			<InspectorControls>
				<PanelBody
					title={ __( 'Block settings', 'snow-monkey-blocks' ) }
				>
					<SelectControl
						label={ __(
							'Label column size',
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

					<SelectControl
						label={ __(
							'Label horizontal alignment',
							'snow-monkey-blocks'
						) }
						value={ labelAlign }
						options={ [
							{
								value: '',
								label: __( 'Left side', 'snow-monkey-blocks' ),
							},
							{
								value: 'right',
								label: __( 'Right side', 'snow-monkey-blocks' ),
							},
						] }
						onChange={ onChangeLabelAlign }
					/>

					<SelectControl
						label={ __(
							'Label vertical alignment',
							'snow-monkey-blocks'
						) }
						value={ labelVerticalAlign }
						options={ [
							{
								value: '',
								label: __( 'Top', 'snow-monkey-blocks' ),
							},
							{
								value: 'middle',
								label: __( 'Middle', 'snow-monkey-blocks' ),
							},
						] }
						onChange={ onChangeLabelVerticalAlign }
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
				data-label-align={ labelAlign || 'left' }
				data-label-vertical-align={ labelVerticalAlign || 'top' }
			>
				<div { ...innerBlocksProps } />
			</div>
		</>
	);
}

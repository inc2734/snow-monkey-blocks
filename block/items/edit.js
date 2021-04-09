import classnames from 'classnames';

import { PanelBody, RangeControl, ToggleControl } from '@wordpress/components';
import {
	BlockControls,
	BlockVerticalAlignmentToolbar,
	InnerBlocks,
	InspectorControls,
	useBlockProps,
	__experimentalUseInnerBlocksProps as useInnerBlocksProps,
} from '@wordpress/block-editor';
import { __ } from '@wordpress/i18n';

import { toNumber } from '@smb/helper';
import ResponsiveTabPanel from '@smb/component/responsive-tab-panel';

const ALLOWED_BLOCKS = [
	'snow-monkey-blocks/items--item--standard',
	'snow-monkey-blocks/items--item--block-link',
	'snow-monkey-blocks/items--banner',
	'snow-monkey-blocks/items--item--free',
];

const TEMPLATE = [ [ 'snow-monkey-blocks/items--item--standard' ] ];

export default function ( { attributes, setAttributes, className } ) {
	const { sm, md, lg, isGlue, isFill, verticalAlignment } = attributes;

	const classes = classnames( 'smb-items', className, {
		'smb-items--glue': isGlue,
		'smb-items--fill': isFill,
	} );

	const rowClasses = classnames( 'c-row', {
		'c-row--margin': ! isGlue,
		'c-row--middle': 'center' === verticalAlignment,
		'c-row--bottom': 'bottom' === verticalAlignment,
	} );

	const blockProps = useBlockProps( {
		className: classes,
	} );

	const innerBlocksProps = useInnerBlocksProps(
		{
			className: rowClasses,
		},
		{
			allowedBlocks: ALLOWED_BLOCKS,
			template: TEMPLATE,
			templateLock: false,
			renderAppender: InnerBlocks.ButtonBlockAppender,
			orientation: 'horizontal',
		}
	);

	const onChangeIsGlue = ( value ) =>
		setAttributes( {
			isGlue: value,
		} );

	const onChangeIsFill = ( value ) =>
		setAttributes( {
			isFill: value,
		} );

	const onChangeLg = ( value ) =>
		setAttributes( {
			lg: toNumber( value, 1, 6 ),
		} );

	const onChangeMd = ( value ) =>
		setAttributes( {
			md: toNumber( value, 1, 6 ),
		} );

	const onChangeSm = ( value ) =>
		setAttributes( {
			sm: toNumber( value, 1, 6 ),
		} );

	const onChangeVerticalAlignment = ( value ) =>
		setAttributes( {
			verticalAlignment: value,
		} );

	return (
		<>
			<InspectorControls>
				<PanelBody
					title={ __( 'Block Settings', 'snow-monkey-blocks' ) }
				>
					<ToggleControl
						label={ __(
							'Glue each item together',
							'snow-monkey-blocks'
						) }
						checked={ isGlue }
						onChange={ onChangeIsGlue }
					/>

					<ToggleControl
						label={ __(
							'Align the bottom of the button of each items (standard, block link item only).',
							'snow-monkey-blocks'
						) }
						checked={ isFill }
						onChange={ onChangeIsFill }
					/>

					<ResponsiveTabPanel
						desktop={ () => (
							<RangeControl
								label={ __(
									'Columns per row (Large window)',
									'snow-monkey-blocks'
								) }
								value={ lg }
								onChange={ onChangeLg }
								min="1"
								max="6"
							/>
						) }
						tablet={ () => (
							<RangeControl
								label={ __(
									'Columns per row (Medium window)',
									'snow-monkey-blocks'
								) }
								value={ md }
								onChange={ onChangeMd }
								min="1"
								max="6"
							/>
						) }
						mobile={ () => (
							<RangeControl
								label={ __(
									'Columns per row (Small window)',
									'snow-monkey-blocks'
								) }
								value={ sm }
								onChange={ onChangeSm }
								min="1"
								max="6"
							/>
						) }
					/>
				</PanelBody>
			</InspectorControls>

			<BlockControls>
				<BlockVerticalAlignmentToolbar
					onChange={ onChangeVerticalAlignment }
					value={ verticalAlignment }
				/>
			</BlockControls>

			<div { ...blockProps }>
				<div
					{ ...innerBlocksProps }
					data-columns={ sm }
					data-md-columns={ md }
					data-lg-columns={ lg }
				/>
			</div>
		</>
	);
}

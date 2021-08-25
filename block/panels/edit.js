import classnames from 'classnames';

import { PanelBody, RangeControl, ToggleControl } from '@wordpress/components';

import {
	BlockControls,
	InnerBlocks,
	InspectorControls,
	JustifyContentControl,
	useBlockProps,
	__experimentalUseInnerBlocksProps as useInnerBlocksProps,
} from '@wordpress/block-editor';

import { __ } from '@wordpress/i18n';

import { toNumber } from '@smb/helper';
import ResponsiveTabPanel from '@smb/component/responsive-tab-panel';

const ALLOWED_BLOCKS = [
	'snow-monkey-blocks/panels--item',
	'snow-monkey-blocks/panels--item--horizontal',
	'snow-monkey-blocks/panels--item--free',
];

const TEMPLATE = [ [ 'snow-monkey-blocks/panels--item' ] ];

const HORIZONTAL_JUSTIFY_CONTROLS = [
	'left',
	'center',
	'right',
	'space-between',
];

export default function ( { attributes, setAttributes, className } ) {
	const { sm, md, lg, imagePadding, contentJustification } = attributes;

	const classes = classnames( 'smb-panels', className );

	const blockProps = useBlockProps( {
		className: classes,
	} );

	const contentJustificationModifier =
		!! contentJustification && 'left' !== contentJustification
			? contentJustification.replace( 'space-', '' )
			: undefined;

	const rowClasses = classnames( 'c-row', 'c-row--margin', 'c-row--fill', {
		[ `c-row--${ contentJustificationModifier }` ]: contentJustification,
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

	const onChangeImagePadding = ( value ) =>
		setAttributes( {
			imagePadding: value,
		} );

	const onChangeContentJustification = ( value ) =>
		setAttributes( { contentJustification: value } );

	const justifyControls = HORIZONTAL_JUSTIFY_CONTROLS;

	return (
		<>
			<InspectorControls>
				<PanelBody
					title={ __( 'Block Settings', 'snow-monkey-blocks' ) }
				>
					<ResponsiveTabPanel
						desktop={ () => {
							return (
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
							);
						} }
						tablet={ () => {
							return (
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
							);
						} }
						mobile={ () => {
							return (
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
							);
						} }
					/>

					<ToggleControl
						label={ __(
							'Set padding around images',
							'snow-monkey-blocks'
						) }
						checked={ imagePadding }
						onChange={ onChangeImagePadding }
					/>
				</PanelBody>
			</InspectorControls>

			<BlockControls group="block">
				<JustifyContentControl
					allowedControls={ justifyControls }
					value={ contentJustification }
					onChange={ onChangeContentJustification }
				/>
			</BlockControls>

			<div { ...blockProps } data-image-padding={ imagePadding }>
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

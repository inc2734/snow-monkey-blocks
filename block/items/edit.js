import classnames from 'classnames';

import { PanelBody, RangeControl, ToggleControl } from '@wordpress/components';
import {
	InnerBlocks,
	InspectorControls,
	useBlockProps,
	__experimentalUseInnerBlocksProps as useInnerBlocksProps,
} from '@wordpress/block-editor';
import { __ } from '@wordpress/i18n';

import { toNumber } from '@smb/helper';
import ResponsiveTabPanel from '@smb/component/responsive-tab-panel';

export default function ( { attributes, setAttributes, className } ) {
	const { sm, md, lg, isGlue } = attributes;

	const allowedBlocks = [
		'snow-monkey-blocks/items--item--standard',
		'snow-monkey-blocks/items--item--block-link',
		'snow-monkey-blocks/items--banner',
	];
	const template = [ [ 'snow-monkey-blocks/items--item--standard' ] ];

	const classes = classnames( 'smb-items', className, {
		'smb-items--glue': isGlue,
	} );

	const rowClasses = classnames( 'c-row', {
		'c-row--margin': ! isGlue,
	} );

	const blockProps = useBlockProps( {
		className: classes,
	} );

	const innerBlocksProps = useInnerBlocksProps(
		{
			className: rowClasses,
		},
		{
			allowedBlocks,
			template,
			templateLock: false,
			renderAppender: InnerBlocks.ButtonBlockAppender,
		}
	);

	const onChangeIsGlue = ( value ) =>
		setAttributes( {
			isGlue: value,
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

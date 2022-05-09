import classnames from 'classnames';
import { times } from 'lodash';

import { BaseControl, Button, PanelBody } from '@wordpress/components';

import {
	InspectorControls,
	RichText,
	__experimentalPanelColorGradientSettings as PanelColorGradientSettings,
	useBlockProps,
} from '@wordpress/block-editor';

import { __ } from '@wordpress/i18n';

export default function ( { attributes, setAttributes, className, clientId } ) {
	const { content, icon, iconColor } = attributes;

	const iconList = [
		{
			value: 'angle-right',
			label: __( 'angle-right', 'snow-monkey-blocks' ),
		},
		{
			value: 'angles-right',
			label: __( 'angles-right', 'snow-monkey-blocks' ),
		},
		{
			value: 'circle-right',
			label: __( 'circle-right', 'snow-monkey-blocks' ),
		},
		{
			value: 'arrow-right',
			label: __( 'arrow-right', 'snow-monkey-blocks' ),
		},
		{
			value: 'check',
			label: __( 'check', 'snow-monkey-blocks' ),
		},
		{
			value: 'circle-check',
			label: __( 'circle-check', 'snow-monkey-blocks' ),
		},
		{
			value: 'square-check',
			label: __( 'square-check', 'snow-monkey-blocks' ),
		},
		{
			value: 'circle-chevron-right',
			label: __( 'circle-chevron-right', 'snow-monkey-blocks' ),
		},
		{
			value: 'hand-point-right',
			label: __( 'hand-point-right', 'snow-monkey-blocks' ),
		},
	];

	const classes = classnames( 'smb-list', className );

	const blockProps = useBlockProps( {
		className: classes,
	} );

	const onChangeIconColor = ( value ) =>
		setAttributes( {
			iconColor: value,
		} );

	const onChangeContent = ( value ) =>
		setAttributes( {
			content: value,
		} );

	return (
		<>
			<InspectorControls>
				<PanelColorGradientSettings
					title={ __( 'Color', 'snow-monkey-blocks' ) }
					initialOpen={ false }
					settings={ [
						{
							colorValue: iconColor,
							onColorChange: onChangeIconColor,
							label: __( 'Icon color', 'snow-monkey-blocks' ),
						},
					] }
					__experimentalHasMultipleOrigins={ true }
					__experimentalIsRenderedInSidebar={ true }
				></PanelColorGradientSettings>

				<PanelBody
					title={ __( 'Block settings', 'snow-monkey-blocks' ) }
				>
					<BaseControl
						label={ __( 'Icon', 'snow-monkey-blocks' ) }
						id="snow-monkey-blocks/list/icon"
					>
						<div className="smb-list-icon-selector">
							{ times( iconList.length, ( index ) => {
								const value = iconList[ index ].value;

								const onClickIcon = () =>
									setAttributes( {
										icon: value,
									} );

								const isPrimary = icon === value;
								return (
									<Button
										isPrimary={ isPrimary }
										onClick={ onClickIcon }
										key={ index }
									>
										<i
											className={ `fa-solid fa-${ iconList[ index ].value }` }
											title={ iconList[ index ].label }
										/>
									</Button>
								);
							} ) }
						</div>
					</BaseControl>
				</PanelBody>
			</InspectorControls>

			<div
				{ ...blockProps }
				data-icon={ icon }
				data-icon-color={ iconColor }
			>
				<style>
					{ `.editor-styles-wrapper [data-block="${ clientId }"] ul li::before, .customize-control-sidebar_block_editor [data-block="${ clientId }"] ul li::before { border-color: ${ iconColor } }` }
				</style>

				<RichText
					tagName="ul"
					multiline="li"
					value={ content }
					onChange={ onChangeContent }
				/>
			</div>
		</>
	);
}

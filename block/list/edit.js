import classnames from 'classnames';
import { times } from 'lodash';

import { BaseControl, Button, PanelBody } from '@wordpress/components';

import {
	InspectorControls,
	PanelColorSettings,
	RichText,
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
			value: 'angle-double-right',
			label: __( 'angle-double-right', 'snow-monkey-blocks' ),
		},
		{
			value: 'arrow-alt-circle-right',
			label: __( 'arrow-alt-circle-right', 'snow-monkey-blocks' ),
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
			value: 'check-circle',
			label: __( 'check-circle', 'snow-monkey-blocks' ),
		},
		{
			value: 'check-square',
			label: __( 'check-square', 'snow-monkey-blocks' ),
		},
		{
			value: 'chevron-circle-right',
			label: __( 'chevron-circle-right', 'snow-monkey-blocks' ),
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
				<PanelBody
					title={ __( 'Block Settings', 'snow-monkey-blocks' ) }
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
											className={ `fas fa-${ iconList[ index ].value }` }
											title={ iconList[ index ].label }
										/>
									</Button>
								);
							} ) }
						</div>
					</BaseControl>
				</PanelBody>

				<PanelColorSettings
					title={ __( 'Color Settings', 'snow-monkey-blocks' ) }
					initialOpen={ false }
					colorSettings={ [
						{
							value: iconColor,
							onChange: onChangeIconColor,
							label: __( 'Icon Color', 'snow-monkey-blocks' ),
						},
					] }
				></PanelColorSettings>
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

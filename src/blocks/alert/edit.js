import classnames from 'classnames';
import { times } from 'lodash';

import {
	InspectorControls,
	RichText,
	useBlockProps,
	useInnerBlocksProps,
} from '@wordpress/block-editor';

import {
	SelectControl,
	BaseControl,
	Button,
	__experimentalToolsPanel as ToolsPanel,
	__experimentalToolsPanelItem as ToolsPanelItem,
} from '@wordpress/components';

import { useEffect } from '@wordpress/element';
import { __ } from '@wordpress/i18n';

import FontAwesome from '@smb/component/font-awesome';

import metadata from './block.json';

const TEMPLATE = [ [ 'core/paragraph' ] ];

export default function ( {
	attributes,
	setAttributes,
	isSelected,
	className,
} ) {
	const { title, modifier, icon, templateLock } = attributes;

	useEffect( () => {
		if ( 'exclamation-circle' === icon ) {
			setAttributes( { icon: 'circle-exclamation' } );
		}
	}, [] );

	const iconList = [
		{
			value: 'circle-exclamation',
			label: __( 'circle-exclamation', 'snow-monkey-blocks' ),
		},
		{
			value: 'check',
			label: __( 'check', 'snow-monkey-blocks' ),
		},
		{
			value: 'circle-check',
			label: __( 'check-circle', 'snow-monkey-blocks' ),
		},
		{
			value: 'square-check',
			label: __( 'check-square', 'snow-monkey-blocks' ),
		},
		{
			value: 'hand-point-right',
			label: __( 'hand-point-right', 'snow-monkey-blocks' ),
		},
		{
			value: 'pen-to-square',
			label: __( 'edit', 'snow-monkey-blocks' ),
		},
		{
			value: 'lightbulb',
			label: __( 'lightbulb', 'snow-monkey-blocks' ),
		},
	];

	const classes = classnames( 'smb-alert', {
		[ className ]: !! className,
		[ `smb-alert--${ modifier }` ]: !! modifier,
	} );

	const blockProps = useBlockProps( {
		className: classes,
	} );

	const innerBlocksProps = useInnerBlocksProps(
		{
			className: 'smb-alert__body',
		},
		{
			// allowedBlocks: ALLOWED_BLOCKS,
			template: TEMPLATE,
			templateLock,
		}
	);

	return (
		<>
			<InspectorControls>
				<ToolsPanel
					label={ __( 'Block settings', 'snow-monkey-blocks' ) }
				>
					<ToolsPanelItem
						hasValue={ () =>
							modifier !== metadata.attributes.modifier.default
						}
						isShownByDefault
						label={ __( 'Type', 'snow-monkey-blocks' ) }
						onDeselect={ () =>
							setAttributes( {
								modifier: metadata.attributes.modifier.default,
							} )
						}
					>
						<SelectControl
							label={ __( 'Type', 'snow-monkey-blocks' ) }
							value={ modifier }
							onChange={ ( value ) =>
								setAttributes( { modifier: value } )
							}
							options={ [
								{
									value: '',
									label: __(
										'Normal alert',
										'snow-monkey-blocks'
									),
								},
								{
									value: 'warning',
									label: __(
										'Warning alert',
										'snow-monkey-blocks'
									),
								},
								{
									value: 'success',
									label: __(
										'Success alert',
										'snow-monkey-blocks'
									),
								},
								{
									value: 'remark',
									label: __(
										'Remark alert',
										'snow-monkey-blocks'
									),
								},
							] }
						/>
					</ToolsPanelItem>

					<ToolsPanelItem
						hasValue={ () =>
							icon !== metadata.attributes.icon.default
						}
						isShownByDefault
						label={ __( 'Icon', 'snow-monkey-blocks' ) }
						onDeselect={ () =>
							setAttributes( {
								icon: metadata.attributes.icon.default,
							} )
						}
					>
						<BaseControl
							label={ __( 'Icon', 'snow-monkey-blocks' ) }
							id="snow-monkey-blocks/alert/icon"
						>
							<div className="smb-list-icon-selector">
								{ times( iconList.length, ( index ) => {
									const onClickIcon = () =>
										setAttributes( {
											icon: iconList[ index ].value,
										} );

									return (
										<Button
											variant={
												icon ===
													iconList[ index ].value &&
												'primary'
											}
											onClick={ onClickIcon }
											key={ index }
										>
											<i
												className={ `fa-solid fa-${ iconList[ index ].value }` }
												title={
													iconList[ index ].label
												}
											/>
										</Button>
									);
								} ) }
							</div>
						</BaseControl>
					</ToolsPanelItem>
				</ToolsPanel>
			</InspectorControls>

			<div { ...blockProps }>
				{ ( ! RichText.isEmpty( title ) || isSelected ) && (
					<div className="smb-alert__title">
						<FontAwesome icon={ icon } />

						<RichText
							tagName="strong"
							multiline={ false }
							value={ title }
							placeholder={ __(
								'Write title…',
								'snow-monkey-blocks'
							) }
							onChange={ ( value ) =>
								setAttributes( {
									title: value,
								} )
							}
						/>
					</div>
				) }

				<div { ...innerBlocksProps } />
			</div>
		</>
	);
}

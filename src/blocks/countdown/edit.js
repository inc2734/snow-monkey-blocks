import classnames from 'classnames';

import {
	AlignmentToolbar,
	BlockControls,
	InspectorControls,
	__experimentalPanelColorGradientSettings as PanelColorGradientSettings,
	useBlockProps,
} from '@wordpress/block-editor';

import {
	__experimentalToolsPanel as ToolsPanel,
	__experimentalToolsPanelItem as ToolsPanelItem,
} from '@wordpress/components';

import { __ } from '@wordpress/i18n';

import DateTimePicker from '@smb/component/date-time-picker';

import metadata from './block.json';

export default function ( { attributes, setAttributes, className } ) {
	const { alignment, numericColor, clockColor, countdownTime } = attributes;

	const classes = classnames( 'smb-countdown', className );

	const listClasses = classnames( 'smb-countdown__list', {
		[ `align-${ alignment }` ]: !! alignment,
	} );

	const styles = {
		'--smb-countdown--numeric-color': numericColor || undefined,
		'--smb-countdown--clock-color': clockColor || undefined,
	};

	const blockProps = useBlockProps( {
		className: classes,
		style: styles,
	} );

	return (
		<>
			<BlockControls group="block">
				<AlignmentToolbar
					value={ alignment }
					onChange={ ( value ) =>
						setAttributes( {
							alignment: value,
						} )
					}
				/>
			</BlockControls>

			<InspectorControls group="styles">
				<PanelColorGradientSettings
					title={ __( 'Color', 'snow-monkey-blocks' ) }
					initialOpen={ false }
					settings={ [
						{
							colorValue: numericColor,
							onColorChange: ( value ) =>
								setAttributes( {
									numericColor: value,
								} ),
							label: __( 'Numeric color', 'snow-monkey-blocks' ),
						},
						{
							colorValue: clockColor,
							onColorChange: ( value ) =>
								setAttributes( {
									clockColor: value,
								} ),
							label: __( 'Clock color', 'snow-monkey-blocks' ),
						},
					] }
					__experimentalIsRenderedInSidebar
				></PanelColorGradientSettings>
			</InspectorControls>

			<InspectorControls>
				<ToolsPanel
					label={ __( 'Block settings', 'snow-monkey-blocks' ) }
				>
					<ToolsPanelItem
						hasValue={ () =>
							countdownTime !==
							metadata.attributes.countdownTime.default
						}
						isShownByDefault
						label={ __( 'Date time', 'snow-monkey-blocks' ) }
						onDeselect={ () =>
							setAttributes( {
								countdownTime:
									metadata.attributes.countdownTime.default,
							} )
						}
					>
						<DateTimePicker
							currentDate={ countdownTime }
							onChange={ ( value ) =>
								setAttributes( {
									countdownTime: value,
								} )
							}
							onReset={ () =>
								setAttributes( {
									countdownTime:
										metadata.attributes.countdownTime
											.default,
								} )
							}
						/>
					</ToolsPanelItem>
				</ToolsPanel>
			</InspectorControls>

			<div { ...blockProps }>
				<ul className={ listClasses } data-time={ countdownTime }>
					<li className="smb-countdown__list-item smb-countdown__list-item__days">
						<span className="smb-countdown__list-item__numeric">
							-
						</span>
						<span className="smb-countdown__list-item__clock">
							{ __( 'Days', 'snow-monkey-blocks' ) }
						</span>
					</li>
					<li className="smb-countdown__list-item smb-countdown__list-item__hours">
						<span className="smb-countdown__list-item__numeric">
							--
						</span>
						<span className="smb-countdown__list-item__clock">
							{ __( 'Hours', 'snow-monkey-blocks' ) }
						</span>
					</li>
					<li className="smb-countdown__list-item smb-countdown__list-item__minutes">
						<span className="smb-countdown__list-item__numeric">
							--
						</span>
						<span className="smb-countdown__list-item__clock">
							{ __( 'Minutes', 'snow-monkey-blocks' ) }
						</span>
					</li>
					<li className="smb-countdown__list-item smb-countdown__list-item__seconds">
						<span className="smb-countdown__list-item__numeric">
							--
						</span>
						<span className="smb-countdown__list-item__clock">
							{ __( 'Seconds', 'snow-monkey-blocks' ) }
						</span>
					</li>
				</ul>
			</div>
		</>
	);
}

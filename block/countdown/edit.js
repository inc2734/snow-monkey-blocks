import classnames from 'classnames';

import { PanelBody } from '@wordpress/components';
import { __ } from '@wordpress/i18n';

import {
	AlignmentToolbar,
	BlockControls,
	InspectorControls,
	PanelColorSettings,
	useBlockProps,
} from '@wordpress/block-editor';

import DateTimePicker from '@smb/component/date-time-picker';

export default function ( { attributes, setAttributes, className } ) {
	const { alignment, numericColor, clockColor, countdownTime } = attributes;

	const classes = classnames( 'smb-countdown', className );

	const listClasses = classnames( 'smb-countdown__list', {
		[ `align-${ alignment }` ]: !! alignment,
	} );

	const numericStyles = {
		color: numericColor || undefined,
	};

	const clockStyles = {
		color: clockColor || undefined,
	};

	const blockProps = useBlockProps( {
		className: classes,
	} );

	const onChangeAlignment = ( value ) =>
		setAttributes( {
			alignment: value,
		} );

	const onChangeCountdownTime = ( value ) =>
		setAttributes( {
			countdownTime: value,
		} );

	const onChangeNumericColor = ( value ) =>
		setAttributes( {
			numericColor: value,
		} );

	const onChangeClockColor = ( value ) =>
		setAttributes( {
			clockColor: value,
		} );

	return (
		<>
			<BlockControls>
				<AlignmentToolbar
					value={ alignment }
					onChange={ onChangeAlignment }
				/>
			</BlockControls>
			<InspectorControls>
				<PanelBody
					title={ __( 'Block Settings', 'snow-monkey-blocks' ) }
				>
					<DateTimePicker
						currentDate={ countdownTime }
						onChange={ onChangeCountdownTime }
					/>
				</PanelBody>
				<PanelColorSettings
					title={ __( 'Color Settings', 'snow-monkey-blocks' ) }
					initialOpen={ false }
					colorSettings={ [
						{
							value: numericColor,
							onChange: onChangeNumericColor,
							label: __( 'Numeric Color', 'snow-monkey-blocks' ),
						},
						{
							value: clockColor,
							onChange: onChangeClockColor,
							label: __( 'Clock Color', 'snow-monkey-blocks' ),
						},
					] }
				></PanelColorSettings>
			</InspectorControls>

			<div { ...blockProps }>
				<ul className={ listClasses } data-time={ countdownTime }>
					<li className="smb-countdown__list-item smb-countdown__list-item__days">
						<span
							className="smb-countdown__list-item__numeric"
							style={ numericStyles }
						>
							-
						</span>
						<span
							className="smb-countdown__list-item__clock"
							style={ clockStyles }
						>
							{ __( 'Days', 'snow-monkey-blocks' ) }
						</span>
					</li>
					<li className="smb-countdown__list-item smb-countdown__list-item__hours">
						<span
							className="smb-countdown__list-item__numeric"
							style={ numericStyles }
						>
							--
						</span>
						<span
							className="smb-countdown__list-item__clock"
							style={ clockStyles }
						>
							{ __( 'Hours', 'snow-monkey-blocks' ) }
						</span>
					</li>
					<li className="smb-countdown__list-item smb-countdown__list-item__minutes">
						<span
							className="smb-countdown__list-item__numeric"
							style={ numericStyles }
						>
							--
						</span>
						<span
							className="smb-countdown__list-item__clock"
							style={ clockStyles }
						>
							{ __( 'Minutes', 'snow-monkey-blocks' ) }
						</span>
					</li>
					<li className="smb-countdown__list-item smb-countdown__list-item__seconds">
						<span
							className="smb-countdown__list-item__numeric"
							style={ numericStyles }
						>
							--
						</span>
						<span
							className="smb-countdown__list-item__clock"
							style={ clockStyles }
						>
							{ __( 'Seconds', 'snow-monkey-blocks' ) }
						</span>
					</li>
				</ul>
			</div>
		</>
	);
}

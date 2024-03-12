import classnames from 'classnames';
import moment from 'moment';

import {
	InspectorControls,
	InnerBlocks,
	useBlockProps,
	useInnerBlocksProps,
} from '@wordpress/block-editor';

import {
	Placeholder,
	ToggleControl,
	__experimentalToolsPanel as ToolsPanel,
	__experimentalToolsPanelItem as ToolsPanelItem,
} from '@wordpress/components';

import { useSelect } from '@wordpress/data';
import { __ } from '@wordpress/i18n';

import DateTimePicker from '@smb/component/date-time-picker';

import metadata from './block.json';

export default function ( { attributes, setAttributes, className, clientId } ) {
	const { isUseStartDate, startDate, isUseEndDate, endDate, templateLock } =
		attributes;

	const hasInnerBlocks = useSelect(
		( select ) => {
			const { getBlock } = select( 'core/block-editor' );
			const block = getBlock( clientId );
			return !! ( block && block.innerBlocks.length );
		},
		[ clientId ]
	);

	const classes = classnames( 'smb-limited-datetime', className );

	const blockProps = useBlockProps();

	const innerBlocksProps = useInnerBlocksProps(
		{
			className: classes,
		},
		{
			templateLock,
			renderAppender: hasInnerBlocks
				? undefined
				: InnerBlocks.ButtonBlockAppender,
		}
	);

	let formatedStartDate = __( 'Not been set.', 'snow-monkey-blocks' );
	if ( isUseStartDate ) {
		if ( startDate !== null ) {
			formatedStartDate = moment( startDate ).format(
				'YYYY/MM/DD ddd HH:mm'
			);
		} else {
			formatedStartDate = __(
				'Not initialized properly.',
				'snow-monkey-blocks'
			);
		}
	}

	let formatedEndDate = __( 'Not been set.', 'snow-monkey-blocks' );
	if ( isUseEndDate ) {
		if ( endDate !== null ) {
			formatedEndDate = moment( endDate ).format(
				'YYYY/MM/DD ddd HH:mm'
			);
		} else {
			formatedEndDate = __(
				'Not initialized properly.',
				'snow-monkey-blocks'
			);
		}
	}

	return (
		<>
			<InspectorControls>
				<ToolsPanel
					label={ __( 'Block settings', 'snow-monkey-blocks' ) }
				>
					<ToolsPanelItem
						hasValue={ () =>
							isUseStartDate !==
							metadata.attributes.isUseStartDate.default
						}
						isShownByDefault
						label={ __( 'Start datetime', 'snow-monkey-blocks' ) }
						onDeselect={ () =>
							setAttributes( {
								isUseStartDate:
									metadata.attributes.isUseStartDate.default,
								startDate:
									metadata.attributes.startDate.default,
							} )
						}
					>
						<ToggleControl
							label={ __(
								'Use start datetime',
								'snow-monkey-blocks'
							) }
							checked={ isUseStartDate }
							onChange={ ( value ) =>
								setAttributes( {
									isUseStartDate: value,
								} )
							}
						/>

						{ isUseStartDate && (
							<DateTimePicker
								currentDate={ startDate }
								onChange={ ( value ) =>
									setAttributes( {
										startDate: value,
									} )
								}
								onReset={ () =>
									setAttributes( {
										startDate:
											metadata.attributes.startDate
												.default,
									} )
								}
							/>
						) }
					</ToolsPanelItem>

					<ToolsPanelItem
						hasValue={ () =>
							isUseEndDate !==
							metadata.attributes.isUseEndDate.default
						}
						isShownByDefault
						label={ __( 'End datetime', 'snow-monkey-blocks' ) }
						onDeselect={ () =>
							setAttributes( {
								isUseEndDate:
									metadata.attributes.isUseEndDate.default,
								endDate: metadata.attributes.endDate.default,
							} )
						}
					>
						<ToggleControl
							label={ __(
								'Use end datetime',
								'snow-monkey-blocks'
							) }
							checked={ isUseEndDate }
							onChange={ ( value ) =>
								setAttributes( {
									isUseEndDate: value,
								} )
							}
						/>
						{ isUseEndDate && (
							<DateTimePicker
								currentDate={ endDate }
								onChange={ ( value ) =>
									setAttributes( {
										endDate: value,
									} )
								}
								onReset={ () =>
									setAttributes( {
										endDate:
											metadata.attributes.endDate.default,
									} )
								}
							/>
						) }
					</ToolsPanelItem>
				</ToolsPanel>
			</InspectorControls>

			<div { ...blockProps }>
				<Placeholder
					className="smb-limited-datetime-placeholder"
					icon="calendar-alt"
					label={ __(
						'Only the set period is displayed',
						'snow-monkey-blocks'
					) }
				>
					<div className="c-row c-row--lg-margin">
						<div className="c-row__col c-row__col--1-1 c-row__col--lg-1-2">
							<dl>
								<dt>
									{ __(
										'Start datetime',
										'snow-monkey-blocks'
									) }
								</dt>
								<dd>{ formatedStartDate }</dd>
							</dl>
						</div>
						<div className="c-row__col c-row__col--1-1 c-row__col--lg-1-2">
							<dl>
								<dt>
									{ __(
										'End datetime',
										'snow-monkey-blocks'
									) }
								</dt>
								<dd>{ formatedEndDate }</dd>
							</dl>
						</div>
					</div>
				</Placeholder>

				<div { ...innerBlocksProps } />
			</div>
		</>
	);
}

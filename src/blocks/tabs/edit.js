import classnames from 'classnames';

import {
	InspectorControls,
	RichText,
	useBlockProps,
	useInnerBlocksProps,
	__experimentalGetColorClassesAndStyles as getColorClassesAndStyles,
} from '@wordpress/block-editor';

import {
	SelectControl,
	ToggleControl,
	__experimentalToolsPanel as ToolsPanel,
	__experimentalToolsPanelItem as ToolsPanelItem,
} from '@wordpress/components';

import {
	Icon,
	plus,
	chevronLeft,
	chevronRight,
	chevronUp,
	chevronDown,
	closeSmall,
} from '@wordpress/icons';

import { createBlock } from '@wordpress/blocks';
import { useDispatch, useSelect } from '@wordpress/data';
import { useEffect, useState } from '@wordpress/element';
import { __ } from '@wordpress/i18n';

const ALLOWED_BLOCKS = [ 'snow-monkey-blocks/tab-panel' ];

import metadata from './block.json';

export default function ( { attributes, setAttributes, className, clientId } ) {
	const {
		tabs: _tabs,
		matchHeight,
		tabsJustification,
		tabsId,
		orientation,
		templateLock,
	} = attributes;
	const tabs = JSON.parse( _tabs );

	const {
		removeBlocks,
		insertBlocks,
		moveBlocksUp,
		moveBlocksDown,
		updateBlockAttributes,
		selectBlock,
	} = useDispatch( 'core/block-editor' );

	const { getBlockOrder, getBlock } = useSelect( 'core/block-editor' );

	const [ currentTabPanelId, setCurrentTabPanelId ] = useState( undefined );
	const [ currentTabPanelAnchor, setCurrentTabPanelAnchor ] =
		useState( undefined );

	useEffect( () => {
		if ( 0 < tabs.length ) {
			setCurrentTabPanelId( tabs[ 0 ]?.tabPanelId );
			setCurrentTabPanelAnchor( tabs[ 0 ]?.anchor );
		}

		if ( ! tabsId ) {
			setAttributes( { tabsId: clientId } );
		}
		// Temporarily disabling exhaustive-deps to avoid introducing unexpected side effecst.
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [] );

	useEffect( () => {
		if ( 1 > tabs.length ) {
			return;
		}

		const tabPanelsClientIds = getBlockOrder( clientId );

		// Process for when currentTabPanelAnchor is not set.
		if ( ! currentTabPanelAnchor ) {
			const tabPanel = getBlock( tabPanelsClientIds[ 0 ] );
			setCurrentTabPanelId( tabPanel.attributes.tabPanelId );
			setCurrentTabPanelAnchor( tabPanel.attributes.anchor );
		}

		tabPanelsClientIds.forEach( ( tabPanelClientId, index ) => {
			const tabPanel = getBlock( tabPanelClientId );

			// Processing for when the anchor in the tab panel is changed.
			if ( tabPanel.attributes.tabPanelId === currentTabPanelId ) {
				setCurrentTabPanelAnchor( tabPanel.attributes.anchor );
			}

			updateBlockAttributes( tabPanelClientId, {
				ariaHidden: 0 === index ? 'false' : 'true',
			} );
		} );
		// Temporarily disabling exhaustive-deps to avoid introducing unexpected side effecst.
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [ clientId, _tabs ] );

	const dataMatchHeightBoolean =
		'vertical' === orientation ||
		( 'horizontal' === orientation && 'true' === matchHeight );

	const classes = classnames( 'smb-tabs', className );

	const blockProps = useBlockProps( {
		className: classes,
	} );

	const innerBlocksProps = useInnerBlocksProps(
		{
			className: 'smb-tabs__body',
		},
		{
			allowedBlocks: ALLOWED_BLOCKS,
			templateLock,
			renderAppender: false,
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
							orientation !==
							metadata.attributes.orientation.default
						}
						isShownByDefault
						label={ __( 'Tabs orientation', 'snow-monkey-blocks' ) }
						onDeselect={ () =>
							setAttributes( {
								orientation:
									metadata.attributes.orientation.default,
							} )
						}
					>
						<SelectControl
							label={ __(
								'Tabs orientation',
								'snow-monkey-blocks'
							) }
							value={ orientation }
							onChange={ ( value ) =>
								setAttributes( {
									orientation: value,
								} )
							}
							options={ [
								{
									value: 'horizontal',
									label: __(
										'Horizontal',
										'snow-monkey-blocks'
									),
								},
								{
									value: 'vertical',
									label: __(
										'Vertical',
										'snow-monkey-blocks'
									),
								},
							] }
						/>
					</ToolsPanelItem>

					{ 'horizontal' === orientation && (
						<>
							<ToolsPanelItem
								hasValue={ () =>
									matchHeight !==
									metadata.attributes.matchHeight.default
								}
								isShownByDefault
								label={ __(
									'Align the height of each tab panels',
									'snow-monkey-blocks'
								) }
								onDeselect={ () =>
									setAttributes( {
										matchHeight:
											metadata.attributes.matchHeight
												.default,
									} )
								}
							>
								<ToggleControl
									label={ __(
										'Align the height of each tab panels',
										'snow-monkey-blocks'
									) }
									checked={ 'true' === matchHeight }
									onChange={ ( value ) =>
										setAttributes( {
											matchHeight: value
												? 'true'
												: 'false',
										} )
									}
								/>
							</ToolsPanelItem>

							<ToolsPanelItem
								hasValue={ () =>
									tabsJustification !==
									metadata.attributes.tabsJustification
										.default
								}
								isShownByDefault
								label={ __(
									'Tabs justification',
									'snow-monkey-blocks'
								) }
								onDeselect={ () =>
									setAttributes( {
										tabsJustification:
											metadata.attributes
												.tabsJustification.default,
									} )
								}
							>
								<SelectControl
									label={ __(
										'Tabs justification',
										'snow-monkey-blocks'
									) }
									value={ tabsJustification }
									onChange={ ( value ) =>
										setAttributes( {
											tabsJustification: value,
										} )
									}
									options={ [
										{
											label: __(
												'Left',
												'snow-monkey-blocks'
											),
											value: 'flex-start',
										},
										{
											label: __(
												'Center',
												'snow-monkey-blocks'
											),
											value: 'center',
										},
										{
											label: __(
												'Right',
												'snow-monkey-blocks'
											),
											value: 'flex-end',
										},
										{
											label: __(
												'Stretch',
												'snow-monkey-blocks'
											),
											value: 'stretch',
										},
									] }
								/>
							</ToolsPanelItem>
						</>
					) }
				</ToolsPanel>
			</InspectorControls>

			<div
				{ ...blockProps }
				data-tabs-id={ tabsId }
				data-orientation={ orientation }
				data-match-height={
					dataMatchHeightBoolean ? 'true' : matchHeight
				}
				data-tabs-justification={
					'horizontal' === orientation ? tabsJustification : undefined
				}
			>
				<div
					className="smb-tabs__tabs"
					data-has-tabs={ 1 < tabs.length ? 'true' : 'false' }
				>
					{ tabs.map( ( tab, index ) => {
						const targetClientId =
							getBlockOrder( clientId )[ index ];

						const onClickTab = ( e ) => {
							setCurrentTabPanelId( tab?.tabPanelId );
							setCurrentTabPanelAnchor( tab?.anchor );

							if (
								e.target.classList.contains(
									'smb-tabs__tab'
								) &&
								0 !== e.clientX &&
								0 !== e.clientY &&
								0 !== e.pageX &&
								0 !== e.pageY
							) {
								selectBlock( targetClientId );
							}
						};

						const onChangeTitle = ( value ) => {
							tabs[ index ].title = value;
							setAttributes( { tabs: JSON.stringify( tabs ) } );
						};

						const onClickRemoveTabButton = () => {
							removeBlocks(
								!! targetClientId ? [ targetClientId ] : [],
								false
							);

							tabs.splice( index, 1 );
							setAttributes( { tabs: JSON.stringify( tabs ) } );

							setCurrentTabPanelId( tabs[ 0 ]?.tabPanelId );
							setCurrentTabPanelAnchor( tabs[ 0 ]?.anchor );
						};

						const onClickUpTabButton = () => {
							moveBlocksUp(
								!! targetClientId ? [ targetClientId ] : [],
								clientId
							);

							const targetTab = tabs[ index ];
							tabs.splice( index, 1 );
							tabs.splice( index - 1, 0, targetTab );
							setAttributes( { tabs: JSON.stringify( tabs ) } );

							setCurrentTabPanelId(
								tabs[ index - 1 ]?.tabPanelId
							);
							setCurrentTabPanelAnchor(
								tabs[ index - 1 ]?.anchor
							);
						};

						const onClickDownTabButton = () => {
							moveBlocksDown(
								!! targetClientId ? [ targetClientId ] : [],
								clientId
							);

							const targetTab = tabs[ index ];
							tabs.splice( index, 1 );
							tabs.splice( index + 1, 0, targetTab );
							setAttributes( { tabs: JSON.stringify( tabs ) } );

							setCurrentTabPanelId(
								tabs[ index + 1 ]?.tabPanelId
							);
							setCurrentTabPanelAnchor(
								tabs[ index + 1 ]?.anchor
							);
						};

						const colorProps = getColorClassesAndStyles( tab );

						return (
							<div
								className="smb-tabs__tab-wrapper"
								key={ `${ clientId }-${ index }` }
								aria-selected={
									currentTabPanelAnchor === tab?.anchor
										? 'true'
										: 'false'
								}
							>
								{ 0 < index && (
									<button
										className="smb-tabs__up-tab"
										onClick={ onClickUpTabButton }
										aria-label={
											'horizontal' === orientation
												? __(
														'Move to left',
														'snow-monkey-blocks'
												  )
												: __(
														'Move to up',
														'snow-monkey-blocks'
												  )
										}
									>
										<Icon
											icon={
												'horizontal' === orientation
													? chevronLeft
													: chevronUp
											}
										/>
									</button>
								) }

								{ 1 < tabs.length && (
									<button
										className="smb-tabs__remove-tab"
										onClick={ onClickRemoveTabButton }
										aria-label={ __(
											'Remove this tab',
											'snow-monkey-blocks'
										) }
									>
										<Icon icon={ closeSmall } />
									</button>
								) }

								{ tabs.length - 1 > index && (
									<button
										className="smb-tabs__down-tab"
										onClick={ onClickDownTabButton }
										aria-label={
											'horizontal' === orientation
												? __(
														'Move to right',
														'snow-monkey-blocks'
												  )
												: __(
														'Move to down',
														'snow-monkey-blocks'
												  )
										}
									>
										<Icon
											icon={
												'horizontal' === orientation
													? chevronRight
													: chevronDown
											}
										/>
									</button>
								) }

								<button
									className={ classnames(
										'smb-tabs__tab',
										colorProps?.className
									) }
									style={ colorProps?.style }
									role="tab"
									aria-controls={ tab?.anchor }
									aria-selected={
										currentTabPanelAnchor === tab?.anchor
											? 'true'
											: 'false'
									}
									onClick={ onClickTab }
								>
									<RichText
										value={ tab.title }
										onChange={ onChangeTitle }
										placeholder={ __(
											'Tab',
											'snow-monkey-blocks'
										) }
									/>
								</button>
							</div>
						);
					} ) }
					<div className="smb-tabs__tab-wrapper">
						<button
							className="smb-tabs__tab smb-tabs__add-tab"
							onClick={ () => {
								const tabPanel = createBlock(
									'snow-monkey-blocks/tab-panel'
								);
								const tabPanelId = `block-${ tabPanel.clientId }`;

								tabPanel.attributes.tabPanelId = tabPanelId;
								tabPanel.attributes.anchor = tabPanelId;
								insertBlocks(
									tabPanel,
									tabs.length,
									clientId,
									false
								);

								tabs.push( {
									tabPanelId,
									anchor: tabPanelId,
								} );
								setAttributes( {
									tabs: JSON.stringify( tabs ),
								} );

								setCurrentTabPanelId( tabPanelId );
								setCurrentTabPanelAnchor( tabPanelId );
							} }
						>
							<Icon icon={ plus } />
						</button>
					</div>
				</div>
				<div { ...innerBlocksProps } />

				{ !! currentTabPanelAnchor && ! dataMatchHeightBoolean && (
					<style>
						{ `[data-tabs-id="${ tabsId }"] > .smb-tabs__body > .smb-tab-panel:not(#${ currentTabPanelAnchor }) {display: none !important}` }
					</style>
				) }
				{ !! currentTabPanelAnchor && dataMatchHeightBoolean && (
					<style>
						{ tabs.map(
							( tab, index ) =>
								`[data-tabs-id="${ tabsId }"] > .smb-tabs__body > .smb-tab-panel:nth-child(${
									index + 1
								}) {left: ${ -100 * index }%}`
						) }

						{ `[data-tabs-id="${ tabsId }"] > .smb-tabs__body > .smb-tab-panel:not(#${ currentTabPanelAnchor }) {visibility: hidden !important}` }
					</style>
				) }
			</div>
		</>
	);
}

import classnames from 'classnames';

import {
	InspectorControls,
	RichText,
	useBlockProps,
	__experimentalUseInnerBlocksProps as useInnerBlocksProps,
} from '@wordpress/block-editor';

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
import { PanelBody, SelectControl, ToggleControl } from '@wordpress/components';
import { useDispatch, useSelect } from '@wordpress/data';
import { useEffect, useState } from '@wordpress/element';
import { __ } from '@wordpress/i18n';

const ALLOWED_BLOCKS = [ 'snow-monkey-blocks/tab-panel' ];

export default function ( { attributes, setAttributes, className, clientId } ) {
	const {
		tabs: _tabs,
		matchHeight,
		tabsJustification,
		tabsId,
		orientation,
	} = attributes;
	const tabs = JSON.parse( _tabs );

	const {
		removeBlocks,
		insertBlocks,
		moveBlocksUp,
		moveBlocksDown,
		updateBlockAttributes,
	} = useDispatch( 'core/block-editor' );

	const { getBlockOrder, getBlock } = useSelect( ( select ) => {
		return {
			getBlockOrder: select( 'core/block-editor' ).getBlockOrder,
			getBlock: select( 'core/block-editor' ).getBlock,
		};
	}, [] );

	const [ currentTabPanelId, setCurrentTabPanelId ] = useState( undefined );

	useEffect( () => {
		if ( 0 < tabs.length ) {
			setCurrentTabPanelId( tabs[ 0 ].tabPanelId );
		}

		if ( ! tabsId ) {
			setAttributes( { tabsId: clientId } );
		}
	}, [] );

	useEffect( () => {
		if ( 1 > tabs.length ) {
			return;
		}

		getBlockOrder( clientId ).forEach( ( tabPanelClientId ) => {
			const tab = getBlock( tabPanelClientId );
			updateBlockAttributes( tabPanelClientId, {
				ariaHidden:
					tab.attributes.tabPanelId === tabs[ 0 ].tabPanelId
						? 'false'
						: 'true',
			} );
		} );
	}, [ tabs.length ] );

	// For duplicate blcok.
	useEffect( () => {
		const sameTabsBlocks = document.querySelectorAll(
			`[data-tabs-id="${ tabsId }"]`
		);
		if ( 2 > sameTabsBlocks.length ) {
			return;
		}

		getBlockOrder( clientId ).forEach( ( tabPanelClientId, index ) => {
			const tabPanelId = `block-${ tabPanelClientId }`;
			tabs[ index ].tabPanelId = tabPanelId;
			updateBlockAttributes( tabPanelClientId, { tabPanelId } );
		} );

		setAttributes( { tabsId: clientId, tabs: JSON.stringify( tabs ) } );

		setCurrentTabPanelId( tabs[ 0 ].tabPanelId );
	}, [ clientId ] );

	const dataMatchHeightBoolean =
		'vertical' === orientation ||
		( 'horizontal' === orientation && 'true' === matchHeight );

	const onClickAddTabButton = () => {
		const tabPanel = createBlock( 'snow-monkey-blocks/tab-panel' );
		const tabPanelId = `block-${ tabPanel.clientId }`;

		tabPanel.attributes.tabPanelId = tabPanelId;
		insertBlocks( tabPanel, tabs.length, clientId, false );

		tabs.push( {
			tabPanelId,
		} );
		setAttributes( {
			tabs: JSON.stringify( tabs ),
		} );

		setCurrentTabPanelId( tabPanelId );
	};

	const onChangeOrientation = ( value ) =>
		setAttributes( {
			orientation: value,
		} );

	const onChangeMatchHeight = ( value ) =>
		setAttributes( {
			matchHeight: value ? 'true' : 'false',
		} );

	const onChangeTabsJustification = ( value ) =>
		setAttributes( {
			tabsJustification: value,
		} );

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
			templateLock: false,
			renderAppender: false,
		}
	);

	return (
		<>
			<InspectorControls>
				<PanelBody
					title={ __( 'Block Settings', 'snow-monkey-blocks' ) }
				>
					<SelectControl
						label={ __( 'Tabs orientation', 'snow-monkey-blocks' ) }
						value={ orientation }
						onChange={ onChangeOrientation }
						options={ [
							{
								value: 'horizontal',
								label: __( 'Horizontal', 'snow-monkey-blocks' ),
							},
							{
								value: 'vertical',
								label: __( 'Vertical', 'snow-monkey-blocks' ),
							},
						] }
					/>

					{ 'horizontal' === orientation && (
						<>
							<ToggleControl
								label={ __(
									'Align the height of each tab panels',
									'snow-monkey-blocks'
								) }
								checked={ 'true' === matchHeight }
								onChange={ onChangeMatchHeight }
							/>

							<SelectControl
								label={ __(
									'Tabs justification',
									'snow-monkey-blocks'
								) }
								value={ tabsJustification }
								onChange={ onChangeTabsJustification }
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
						</>
					) }
				</PanelBody>
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
						const onClickTab = () => {
							setCurrentTabPanelId( tab.tabPanelId );
						};

						const onChangeTitle = ( value ) => {
							tabs[ index ].title = value;
							setAttributes( { tabs: JSON.stringify( tabs ) } );
						};

						const onClickRemoveTabButton = () => {
							removeBlocks(
								getBlockOrder( clientId )[ index ],
								false
							);

							tabs.splice( index, 1 );
							setAttributes( { tabs: JSON.stringify( tabs ) } );

							setCurrentTabPanelId( tabs[ 0 ].tabPanelId );
						};

						const onClickUpTabButton = () => {
							moveBlocksUp(
								getBlockOrder( clientId )[ index ],
								clientId
							);

							const targetTab = tabs[ index ];
							tabs.splice( index, 1 );
							tabs.splice( index - 1, 0, targetTab );
							setAttributes( { tabs: JSON.stringify( tabs ) } );

							setCurrentTabPanelId(
								tabs[ index - 1 ].tabPanelId
							);
						};

						const onClickDownTabButton = () => {
							moveBlocksDown(
								getBlockOrder( clientId )[ index ],
								clientId
							);

							const targetTab = tabs[ index ];
							tabs.splice( index, 1 );
							tabs.splice( index + 1, 0, targetTab );
							setAttributes( { tabs: JSON.stringify( tabs ) } );

							setCurrentTabPanelId(
								tabs[ index + 1 ].tabPanelId
							);
						};

						return (
							<div
								className="smb-tabs__tab-wrapper"
								key={ `${ clientId }-${ index }` }
								aria-selected={
									currentTabPanelId === tab.tabPanelId
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
									className="smb-tabs__tab"
									role="tab"
									aria-controls={ tab.tabPanelId }
									aria-selected={
										currentTabPanelId === tab.tabPanelId
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
							onClick={ onClickAddTabButton }
						>
							<Icon icon={ plus } />
						</button>
					</div>
				</div>
				<div { ...innerBlocksProps } />

				{ !! currentTabPanelId && ! dataMatchHeightBoolean && (
					<style>
						{ `[data-tabs-id="${ tabsId }"] > .smb-tabs__body > .smb-tab-panel:not(#${ currentTabPanelId }) {display: none !important}` }
					</style>
				) }
				{ !! currentTabPanelId && dataMatchHeightBoolean && (
					<style>
						{ tabs.map(
							( tab, index ) =>
								`[data-tabs-id="${ tabsId }"] > .smb-tabs__body > .smb-tab-panel:nth-child(${
									index + 1
								}) {left: ${ -100 * index }%}`
						) }

						{ `[data-tabs-id="${ tabsId }"] > .smb-tabs__body > .smb-tab-panel:not(#${ currentTabPanelId }) {visibility: hidden !important}` }
					</style>
				) }
			</div>
		</>
	);
}

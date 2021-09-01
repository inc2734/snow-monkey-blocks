import classnames from 'classnames';

import {
	InspectorControls,
	RichText,
	useBlockProps,
	__experimentalUseInnerBlocksProps as useInnerBlocksProps,
} from '@wordpress/block-editor';

import { createBlock } from '@wordpress/blocks';
import { PanelBody, ToggleControl } from '@wordpress/components';
import { useDispatch, useSelect } from '@wordpress/data';
import { useEffect, useState } from '@wordpress/element';
import {
	Icon,
	plus,
	chevronLeft,
	chevronRight,
	closeSmall,
} from '@wordpress/icons';
import { __ } from '@wordpress/i18n';

const ALLOWED_BLOCKS = [ 'snow-monkey-blocks/tab-panel' ];

export default function ( { attributes, setAttributes, className, clientId } ) {
	const { tabs, matchHeight, tabsId } = attributes;
	const {
		removeBlocks,
		insertBlocks,
		moveBlocksUp,
		moveBlocksDown,
		updateBlockAttributes,
	} = useDispatch( 'core/block-editor' );

	const [ currentTabPanelId, setCurrentTabPanelId ] = useState( undefined );

	const { tabPanelClientIds, getBlock } = useSelect( ( select ) => {
		return {
			tabPanelClientIds: select( 'core/block-editor' ).getBlockOrder(
				clientId
			),
			getBlock: select( 'core/block-editor' ).getBlock,
		};
	} );

	const handleAddTab = () => {
		const tabPanel = createBlock( 'snow-monkey-blocks/tab-panel' );
		const tabPanelId = `block-${ tabPanel.clientId }`;

		tabPanel.attributes.tabPanelId = tabPanelId;
		insertBlocks( tabPanel, tabs.length, clientId );

		const newTabs = tabs.concat();
		newTabs.push( {
			tabPanelId,
		} );
		setAttributes( {
			tabs: newTabs,
		} );

		setCurrentTabPanelId( tabPanelId );
	};

	useEffect( () => {
		if ( 0 < tabs.length ) {
			setCurrentTabPanelId( tabs[ 0 ].tabPanelId );
		}

		if ( ! tabsId ) {
			setAttributes( { tabsId: clientId } );
		}
	}, [] );

	useEffect( () => {
		if ( 0 < tabs.length ) {
			tabPanelClientIds.forEach( ( tabPanelClientId ) => {
				const tab = getBlock( tabPanelClientId );
				updateBlockAttributes( tabPanelClientId, {
					ariaHidden:
						tab.attributes.tabPanelId === tabs[ 0 ].tabPanelId
							? 'false'
							: 'true',
				} );
			} );
		}
	}, [ tabs ] );

	const onChangeMatchHeight = ( value ) =>
		setAttributes( {
			matchHeight: value,
		} );

	const classes = classnames( 'smb-tabs', className, {
		'smb-tabs--match-height': matchHeight,
	} );

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
					<ToggleControl
						label={ __(
							'Align the height of each tab panels',
							'snow-monkey-blocks'
						) }
						checked={ matchHeight }
						onChange={ onChangeMatchHeight }
					/>
				</PanelBody>
			</InspectorControls>

			<div { ...blockProps } data-tabs-id={ tabsId }>
				<div
					className="smb-tabs__tabs"
					data-has-tabs={ 1 < tabs.length ? 'true' : 'false' }
				>
					{ tabs.map( ( tab, index ) => {
						const onClickTab = () => {
							setCurrentTabPanelId( tab.tabPanelId );
						};

						const onChangeTitle = ( value ) => {
							const newTabs = tabs.concat();
							newTabs[ index ].title = value;
							setAttributes( { tabs: newTabs } );
						};

						const onClickRemoveTabButton = () => {
							removeBlocks( tabPanelClientIds[ index ], false );

							const newTabs = tabs.concat();
							newTabs.splice( index, 1 );
							setAttributes( { tabs: newTabs } );

							if (
								currentTabPanelId === tabs[ index ].tabPanelId
							) {
								setCurrentTabPanelId( newTabs[ 0 ].tabPanelId );
							}
						};

						const onClickUpTabButton = () => {
							moveBlocksUp(
								tabPanelClientIds[ index ],
								clientId
							);

							const targetTab = tabs[ index ];
							const newTabs = tabs.concat();
							newTabs.splice( index, 1 );
							newTabs.splice( index - 1, 0, targetTab );
							setAttributes( { tabs: newTabs } );

							setCurrentTabPanelId(
								newTabs[ index - 1 ].tabPanelId
							);
						};

						const onClickDownTabButton = () => {
							moveBlocksDown(
								tabPanelClientIds[ index ],
								clientId
							);

							const targetTab = tabs[ index ];
							const newTabs = tabs.concat();
							newTabs.splice( index, 1 );
							newTabs.splice( index + 1, 0, targetTab );
							setAttributes( { tabs: newTabs } );

							setCurrentTabPanelId(
								newTabs[ index + 1 ].tabPanelId
							);
						};

						return (
							<div
								className="smb-tabs__tab-wrapper"
								key={ index }
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
									>
										<Icon icon={ chevronLeft } />
									</button>
								) }

								{ 1 < tabs.length && (
									<button
										className="smb-tabs__remove-tab"
										onClick={ onClickRemoveTabButton }
									>
										<Icon icon={ closeSmall } />
									</button>
								) }

								{ tabs.length - 1 > index && (
									<button
										className="smb-tabs__down-tab"
										onClick={ onClickDownTabButton }
									>
										<Icon icon={ chevronRight } />
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
					<button
						className="smb-tabs__tab smb-tabs__add-tab"
						onClick={ handleAddTab }
					>
						<Icon icon={ plus } />
					</button>
				</div>
				<div { ...innerBlocksProps } />

				{ !! currentTabPanelId && ! matchHeight && (
					<style>
						{ `[data-tabs-id="${ tabsId }"] > .smb-tabs__body > .smb-tab-panel:not(#${ currentTabPanelId }) {display: none !important}` }
					</style>
				) }
				{ !! currentTabPanelId && matchHeight && (
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

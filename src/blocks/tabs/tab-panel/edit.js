import classnames from 'classnames';

import {
	InnerBlocks,
	useBlockProps,
	useInnerBlocksProps,
} from '@wordpress/block-editor';

import { useDispatch, useSelect } from '@wordpress/data';
import { useEffect } from '@wordpress/element';

import { cleanEmptyObject } from '@smb/helper';

export default function ( { attributes, setAttributes, className, clientId } ) {
	const {
		tabPanelId,
		backgroundColor,
		textColor,
		anchor,
		style,
		templateLock,
	} = attributes;

	const { updateBlockAttributes } = useDispatch( 'core/block-editor' );

	const { getBlockParents, getBlockAttributes, getBlockOrder } =
		useSelect( 'core/block-editor' );

	const parentId = getBlockParents( clientId, true )[ 0 ];

	useEffect( () => {
		const _tabs = getBlockAttributes( parentId )?.tabs;
		if ( ! _tabs ) {
			return;
		}

		const tabs = JSON.parse( _tabs );
		const newTabs = getBlockOrder( parentId ).map(
			( tabPanelClientId, index ) => {
				const tab = tabs[ index ];

				if ( tabPanelClientId === clientId ) {
					const currentTabPanelId = `block-${ clientId }`;
					const newTabPanelId =
						tabPanelId !== currentTabPanelId
							? currentTabPanelId
							: tabPanelId;

					if ( tabPanelId !== newTabPanelId ) {
						setAttributes( {
							tabPanelId: newTabPanelId,
						} );
					}

					const newAnchor =
						anchor?.match( /^block(-([\da-z]+?)){5}$/ ) &&
						anchor !== newTabPanelId
							? newTabPanelId
							: anchor || newTabPanelId;

					if ( anchor !== newAnchor ) {
						setAttributes( {
							anchor: newAnchor,
						} );
					}

					return cleanEmptyObject( {
						...tab,
						anchor: newAnchor,
						tabPanelId: newTabPanelId,
						backgroundColor: backgroundColor || undefined,
						textColor: textColor || undefined,
						style: {
							...tab?.style,
							color: {
								...tab?.style?.color,
								background:
									style?.color?.background || undefined,
								text: style?.color?.text || undefined,
							},
						},
					} );
				}

				return tab;
			}
		);

		updateBlockAttributes( parentId, {
			tabs: JSON.stringify( newTabs ),
		} );
	}, [
		backgroundColor,
		textColor,
		style?.color?.background,
		style?.color?.text,
		anchor,
		clientId,
	] );

	const hasInnerBlocks = useSelect(
		( select ) =>
			!! select( 'core/block-editor' ).getBlock( clientId )?.innerBlocks
				?.length,
		[ clientId ]
	);

	const classes = classnames( 'smb-tab-panel', className );

	const blockProps = useBlockProps( {
		className: classes,
	} );

	const innerBlocksProps = useInnerBlocksProps(
		{
			className: 'smb-tab-panel__body',
		},
		{
			templateLock,
			renderAppender: hasInnerBlocks
				? InnerBlocks.DefaultBlockAppender
				: InnerBlocks.ButtonBlockAppender,
		}
	);

	return (
		<>
			<div { ...blockProps } role="tabpanel" id={ anchor }>
				<div { ...innerBlocksProps } />
			</div>
		</>
	);
}

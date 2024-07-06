import classnames from 'classnames';

import {
	InnerBlocks,
	useBlockProps,
	useInnerBlocksProps,
} from '@wordpress/block-editor';

import { useDispatch, useSelect } from '@wordpress/data';
import { useEffect } from '@wordpress/element';

import { cleanEmptyObject } from '@smb/helper';

export default function ( { attributes, className, clientId } ) {
	const { tabPanelId, backgroundColor, textColor, style, templateLock } =
		attributes;

	const { updateBlockAttributes } = useDispatch( 'core/block-editor' );

	const parentId = useSelect(
		( select ) =>
			select( 'core/block-editor' ).getBlockParents( clientId, true )[ 0 ]
	);
	const parentAttributes = useSelect( ( select ) =>
		select( 'core/block-editor' ).getBlockAttributes( parentId )
	);

	useEffect( () => {
		const _tabs = parentAttributes?.tabs;
		if ( ! _tabs ) {
			return;
		}

		const newTabs = JSON.parse( _tabs ).map( ( tab ) => {
			if ( tab.tabPanelId === tabPanelId ) {
				return cleanEmptyObject( {
					...tab,
					backgroundColor: backgroundColor || undefined,
					textColor: textColor || undefined,
					style: {
						...tab?.style,
						color: {
							...tab?.style?.color,
							background: style?.color?.background || undefined,
							text: style?.color?.text || undefined,
						},
					},
				} );
			}
			return tab;
		} );

		updateBlockAttributes( parentId, {
			tabs: JSON.stringify( newTabs ),
		} );
	}, [
		backgroundColor,
		textColor,
		style?.color?.background,
		style?.color?.text,
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
			<div { ...blockProps } id={ tabPanelId } role="tabpanel">
				<div { ...innerBlocksProps } />
			</div>
		</>
	);
}

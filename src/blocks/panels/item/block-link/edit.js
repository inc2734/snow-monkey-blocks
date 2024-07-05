import classnames from 'classnames';

import {
	BlockControls,
	InnerBlocks,
	useBlockProps,
	useInnerBlocksProps,
	__experimentalLinkControl as LinkControl,
	__experimentalUseColorProps as useColorProps,
} from '@wordpress/block-editor';

import { useMergeRefs } from '@wordpress/compose';
import { Popover, ToolbarButton } from '@wordpress/components';
import { useState, useRef } from '@wordpress/element';
import { useSelect } from '@wordpress/data';
import { __ } from '@wordpress/i18n';
import { link as linkIcon } from '@wordpress/icons';

export default function ( {
	attributes,
	setAttributes,
	isSelected,
	clientId,
} ) {
	const { linkURL, linkTarget, templateLock } = attributes;

	const colorProps = useColorProps( {
		style: {
			color: {
				...attributes?.style?.color,
			},
		},
		backgroundColor: attributes?.backgroundColor || undefined,
		textColor: attributes?.textColor || undefined,
		gradient: attributes?.gradient || undefined,
	} );

	const [ isEditingURL, setIsEditingURL ] = useState( false );
	const isURLSet = !! linkURL;
	const opensInNewTab = linkTarget === '_blank';

	// Use internal state instead of a ref to make sure that the component
	// re-renders when the popover's anchor updates.
	const [ popoverAnchor, setPopoverAnchor ] = useState( null );

	const hasInnerBlocks = useSelect(
		( select ) =>
			!! select( 'core/block-editor' ).getBlock( clientId )?.innerBlocks
				?.length,
		[ clientId ]
	);

	const classes = 'c-row__col';

	const itemClasses = classnames(
		'smb-panels__item',
		'smb-panels__item--block-link',
		colorProps?.className
	);

	const itemStyles = colorProps?.style;

	const actionClasses = classnames(
		'smb-panels__item__action',
		'smb-panels__item__action--nolabel'
	);

	const ref = useRef();

	const blockProps = useBlockProps( {
		className: classes,
		ref: useMergeRefs( [ setPopoverAnchor, ref ] ),
	} );

	const innerBlocksProps = useInnerBlocksProps(
		{
			className: 'smb-panels__item__body',
		},
		{
			templateLock,
			renderAppender: hasInnerBlocks
				? InnerBlocks.DefaultBlockAppender
				: InnerBlocks.ButtonBlockAppender,
		}
	);

	const unlink = () => {
		setAttributes( {
			linkURL: undefined,
			linkTarget: undefined,
		} );
		setIsEditingURL( false );
	};

	return (
		<>
			<div { ...blockProps }>
				<div className={ itemClasses } style={ itemStyles }>
					<div { ...innerBlocksProps } />

					{ isURLSet && (
						<div className={ actionClasses }>
							<span className="screen-reader-text">
								{ __( 'Link', 'snow-monkey-blocks' ) }
							</span>
						</div>
					) }
				</div>
			</div>

			<BlockControls group="block">
				<ToolbarButton
					name="link"
					icon={ linkIcon }
					title={ __( 'Link', 'snow-monkey-blocks' ) }
					onClick={ ( event ) => {
						event.preventDefault();
						setIsEditingURL( true );
					} }
					isActive={ isURLSet }
				/>
			</BlockControls>

			{ isSelected && isEditingURL && (
				<Popover
					placement="bottom"
					anchor={ popoverAnchor }
					onClose={ () => {
						setIsEditingURL( false );
					} }
				>
					<LinkControl
						className="wp-block-navigation-link__inline-link-input"
						value={ { url: linkURL, opensInNewTab } }
						onChange={ ( {
							url: newUrl,
							opensInNewTab: newOpensInNewTab,
						} ) =>
							setAttributes( {
								linkURL: newUrl,
								linkTarget: ! newOpensInNewTab
									? '_self'
									: '_blank',
							} )
						}
						onRemove={ () => {
							unlink();
						} }
						forceIsEditingLink={ ! isURLSet }
					/>
				</Popover>
			) }
		</>
	);
}

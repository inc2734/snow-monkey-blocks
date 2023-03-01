import classnames from 'classnames';

import {
	BlockControls,
	InnerBlocks,
	useBlockProps,
	useInnerBlocksProps,
	__experimentalLinkControl as LinkControl,
} from '@wordpress/block-editor';

import { useMergeRefs } from '@wordpress/compose';
import { Popover, ToolbarButton } from '@wordpress/components';
import { useState, useRef } from '@wordpress/element';
import { useSelect } from '@wordpress/data';
import { __ } from '@wordpress/i18n';
import { link as linkIcon, linkOff as linkOffIcon } from '@wordpress/icons';

export default function ( {
	attributes,
	setAttributes,
	isSelected,
	className,
	clientId,
} ) {
	const { linkURL, linkTarget } = attributes;

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

	const classes = classnames( 'c-row__col', className );

	const itemClasses = classnames(
		'smb-panels__item',
		'smb-panels__item--block-link'
	);

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
			renderAppender: hasInnerBlocks
				? InnerBlocks.DefaultBlockAppender
				: InnerBlocks.ButtonBlockAppender,
		}
	);

	const onChangeLinkUrl = ( {
		url: newUrl,
		opensInNewTab: newOpensInNewTab,
	} ) =>
		setAttributes( {
			linkURL: newUrl,
			linkTarget: ! newOpensInNewTab ? '_self' : '_blank',
		} );

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
				<div className={ itemClasses }>
					<div { ...innerBlocksProps } />

					{ !! linkURL && (
						<div className={ actionClasses }>
							<span className="screen-reader-text">
								{ __( 'Link', 'snow-monkey-blocks' ) }
							</span>
						</div>
					) }

					{ isSelected && ( isEditingURL || isURLSet ) && (
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
								onChange={ onChangeLinkUrl }
								onRemove={ () => {
									unlink();
								} }
								forceIsEditingLink={ isEditingURL }
							/>
						</Popover>
					) }
				</div>
			</div>

			<BlockControls group="block">
				{ ! isURLSet && (
					<ToolbarButton
						name="link"
						icon={ linkIcon }
						title={ __( 'Link', 'snow-monkey-blocks' ) }
						onClick={ ( event ) => {
							event.preventDefault();
							setIsEditingURL( true );
						} }
					/>
				) }
				{ isURLSet && (
					<ToolbarButton
						name="link"
						icon={ linkOffIcon }
						title={ __( 'Unlink', 'snow-monkey-blocks' ) }
						onClick={ unlink }
						isActive={ true }
					/>
				) }
			</BlockControls>
		</>
	);
}

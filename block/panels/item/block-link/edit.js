import classnames from 'classnames';

import {
	BlockControls,
	useBlockProps,
	__experimentalUseInnerBlocksProps as useInnerBlocksProps,
} from '@wordpress/block-editor';

import { Popover, ToolbarButton } from '@wordpress/components';
import { useState, useRef } from '@wordpress/element';
import { __ } from '@wordpress/i18n';
import { link as linkIcon, linkOff as linkOffIcon } from '@wordpress/icons';

import LinkControl from '@smb/component/link-control';

export default function ( {
	attributes,
	setAttributes,
	isSelected,
	className,
} ) {
	const { linkURL, linkTarget } = attributes;

	const [ isLinkUIOpen, setIsLinkUIOpen ] = useState( false );
	const urlIsSet = !! linkURL;
	const urlIsSetandSelected = urlIsSet && isSelected;
	const toggleLinkUI = () => setIsLinkUIOpen( ! isLinkUIOpen );
	const closeLinkUI = () => setIsLinkUIOpen( false );

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
	} );

	const innerBlocksProps = useInnerBlocksProps( {
		className: 'smb-panels__item__body',
	} );

	const onChangeLinkUrl = ( { url: newUrl, opensInNewTab } ) =>
		setAttributes( {
			linkURL: newUrl,
			linkTarget: ! opensInNewTab ? '_self' : '_blank',
		} );

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

					{ ( isLinkUIOpen || urlIsSetandSelected ) && (
						<Popover
							position="bottom center"
							anchorRef={ ref.current }
							onClose={ closeLinkUI }
						>
							<LinkControl
								url={ linkURL }
								target={ linkTarget }
								onChange={ onChangeLinkUrl }
							/>
						</Popover>
					) }
				</div>
			</div>

			<BlockControls group="block">
				{ ! urlIsSet && (
					<ToolbarButton
						icon={ linkIcon }
						label={ __( 'Link', 'snow-monkey-blocks' ) }
						aria-expanded={ isLinkUIOpen }
						onClick={ toggleLinkUI }
					/>
				) }
				{ urlIsSetandSelected && (
					<ToolbarButton
						isPressed
						icon={ linkOffIcon }
						label={ __( 'Unlink', 'snow-monkey-blocks' ) }
						onClick={ () => onChangeLinkUrl( '', false ) }
					/>
				) }
			</BlockControls>
		</>
	);
}

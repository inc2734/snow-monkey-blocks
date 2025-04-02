import classnames from 'classnames';

import {
	BlockControls,
	InnerBlocks,
	useBlockProps,
	useInnerBlocksProps,
	LinkControl,
	__experimentalUseColorProps as useColorProps,
} from '@wordpress/block-editor';

import { useMergeRefs } from '@wordpress/compose';
import { Popover, ToolbarButton } from '@wordpress/components';
import { useSelect } from '@wordpress/data';
import { useState, useMemo, useRef } from '@wordpress/element';
import { link, linkOff } from '@wordpress/icons';
import { displayShortcut } from '@wordpress/keycodes';
import { prependHTTP } from '@wordpress/url';
import { __ } from '@wordpress/i18n';

const NEW_TAB_REL = 'noreferrer noopener';
const NEW_TAB_TARGET = '_blank';
const NOFOLLOW_REL = 'nofollow';

const LINK_SETTINGS = [
	...LinkControl.DEFAULT_LINK_SETTINGS,
	{
		id: 'nofollow',
		title: __( 'Mark as nofollow', 'snow-monkey-blocks' ),
	},
];

/**
 * Updates the link attributes.
 *
 * @see https://github.com/WordPress/gutenberg/blob/trunk/packages/block-library/src/button/get-updated-link-attributes.js
 *
 * @param {Object}  attributes               The current block attributes.
 * @param {string}  attributes.rel           The current link rel attribute.
 * @param {string}  attributes.url           The current link url.
 * @param {string}  attributes.title         The current link text.
 * @param {boolean} attributes.opensInNewTab Whether the link should open in a new window.
 * @param {boolean} attributes.nofollow      Whether the link should be marked as nofollow.
 */
export function getUpdatedLinkAttributes( {
	rel = '',
	url = '',
	title,
	opensInNewTab,
	nofollow,
} ) {
	let newLinkTarget;
	// Since `rel` is editable attribute, we need to check for existing values and proceed accordingly.
	let updatedRel = rel;

	if ( opensInNewTab ) {
		newLinkTarget = NEW_TAB_TARGET;
		updatedRel = updatedRel?.includes( NEW_TAB_REL )
			? updatedRel
			: updatedRel + ` ${ NEW_TAB_REL }`;
	} else {
		const relRegex = new RegExp( `\\b${ NEW_TAB_REL }\\s*`, 'g' );
		updatedRel = updatedRel?.replace( relRegex, '' ).trim();
	}

	if ( nofollow ) {
		updatedRel = updatedRel?.includes( NOFOLLOW_REL )
			? updatedRel
			: ( updatedRel + ` ${ NOFOLLOW_REL }` ).trim();
	} else {
		const relRegex = new RegExp( `\\b${ NOFOLLOW_REL }\\s*`, 'g' );
		updatedRel = updatedRel?.replace( relRegex, '' ).trim();
	}

	return {
		linkURL: prependHTTP( url ),
		linkText: title,
		linkTarget: newLinkTarget,
		rel: updatedRel || undefined,
	};
}

export default function ( {
	attributes,
	setAttributes,
	isSelected,
	clientId,
} ) {
	const { rel, linkURL, linkText, linkTarget, templateLock } = attributes;

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

	const ref = useRef();
	const [ popoverAnchor, setPopoverAnchor ] = useState();
	const [ isEditingHref, setIsEditingHref ] = useState( false );
	const isHrefSet = !! linkURL;
	const opensInNewTab = linkTarget === NEW_TAB_TARGET;
	const nofollow = !! rel?.includes( NOFOLLOW_REL );

	// Memoize link value to avoid overriding the LinkControl's internal state.
	// This is a temporary fix. See https://github.com/WordPress/gutenberg/issues/51256.
	const linkValue = useMemo(
		() => ( { url: linkURL, title: linkText, opensInNewTab, nofollow } ),
		[ linkURL, linkText, opensInNewTab, nofollow ]
	);

	function startEditing( event ) {
		event.preventDefault();
		setIsEditingHref( true );
	}

	function unlink() {
		setAttributes( {
			linkURL: undefined,
			linkTarget: undefined,
			rel: undefined,
		} );
		setIsEditingHref( false );
	}

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
				? undefined
				: InnerBlocks.ButtonBlockAppender,
		}
	);

	return (
		<>
			<div { ...blockProps }>
				<div className={ itemClasses } style={ itemStyles }>
					<div { ...innerBlocksProps } />

					{ isHrefSet && (
						<div className={ actionClasses }>
							<span
								href={ linkURL }
								target={ linkTarget }
								rel={ rel }
							>
								<span className="screen-reader-text">
									{ linkText ??
										__(
											'Learn more',
											'snow-monkey-blocks'
										) }
								</span>
							</span>
						</div>
					) }
				</div>
			</div>

			<BlockControls group="block">
				{ ! isHrefSet && (
					<ToolbarButton
						name="link"
						icon={ link }
						title={ __( 'Link' ) }
						shortcut={ displayShortcut.primary( 'k' ) }
						onClick={ startEditing }
					/>
				) }
				{ isHrefSet && (
					<ToolbarButton
						name="link"
						icon={ linkOff }
						title={ __( 'Unlink' ) }
						shortcut={ displayShortcut.primaryShift( 'k' ) }
						onClick={ unlink }
						isActive={ true }
					/>
				) }
			</BlockControls>

			{ isSelected && ( isEditingHref || isHrefSet ) && (
				<Popover
					position="bottom center"
					onClose={ () => {
						setIsEditingHref( false );
					} }
					anchor={ popoverAnchor }
					focusOnMount={ isEditingHref ? 'firstElement' : false }
				>
					<LinkControl
						className="wp-block-navigation-link__inline-link-input"
						value={ linkValue }
						onChange={ ( {
							url: newHref = '',
							title: newLinkText,
							opensInNewTab: newOpensInNewTab,
							nofollow: newNofollow,
						} ) => {
							setAttributes(
								getUpdatedLinkAttributes( {
									rel,
									url: newHref,
									title: newLinkText,
									opensInNewTab: newOpensInNewTab,
									nofollow: newNofollow,
								} )
							);
						} }
						onRemove={ () => {
							unlink();
						} }
						forceIsEditingLink={ isEditingHref }
						hasRichPreviews
						hasTextControl
						settings={ LINK_SETTINGS }
						showInitialSuggestions
						suggestionsQuery={ {
							// always show Pages as initial suggestions
							initialSuggestionsSearchOptions: {
								type: 'post',
								subtype: 'page',
								perPage: 20,
							},
						} }
					/>
				</Popover>
			) }
		</>
	);
}

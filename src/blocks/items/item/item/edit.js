import classnames from 'classnames';
import { times } from 'lodash';

import {
	BaseControl,
	Button,
	PanelBody,
	Popover,
	ToggleControl,
	ToolbarButton,
} from '@wordpress/components';

import {
	BlockControls,
	ContrastChecker,
	InspectorControls,
	PanelColorSettings,
	RichText,
	useBlockProps,
	__experimentalLinkControl as LinkControl,
} from '@wordpress/block-editor';

import { useMergeRefs } from '@wordpress/compose';
import { useState, useRef } from '@wordpress/element';
import { __ } from '@wordpress/i18n';
import { link as linkIcon, linkOff as linkOffIcon } from '@wordpress/icons';

import Figure from '@smb/component/figure';

export default function ( {
	attributes,
	setAttributes,
	isSelected,
	className,
} ) {
	const {
		titleTagName,
		title,
		lede,
		summary,
		btnLabel,
		btnURL,
		btnTarget,
		btnBackgroundColor,
		btnTextColor,
		imageID,
		imageURL,
		imageAlt,
		isBlockLink,
	} = attributes;

	const [ isEditingURL, setIsEditingURL ] = useState( false );
	const isURLSet = !! btnURL;
	const opensInNewTab = btnTarget === '_blank';

	// Use internal state instead of a ref to make sure that the component
	// re-renders when the popover's anchor updates.
	const [ popoverAnchor, setPopoverAnchor ] = useState( null );

	const titleTagNames = [ 'div', 'h2', 'h3', 'none' ];

	const classes = classnames( 'c-row__col', className );

	const itemBtnLabelStyles = {
		color: btnTextColor || undefined,
	};

	const itemBtnStyles = {
		backgroundColor: btnBackgroundColor || undefined,
	};

	const ref = useRef();
	const richTextRef = useRef();

	const blockProps = useBlockProps( {
		className: classes,
		// ref,
	} );

	const onChangeUrl = ( { url: newUrl, opensInNewTab: newOpensInNewTab } ) =>
		setAttributes( {
			btnURL: newUrl,
			btnTarget: ! newOpensInNewTab ? '_self' : '_blank',
		} );

	const unlink = () => {
		setAttributes( {
			btnURL: undefined,
			btnTarget: undefined,
		} );
		setIsEditingURL( false );
	};

	return (
		<>
			<InspectorControls>
				<PanelBody
					title={ __( 'Block settings', 'snow-monkey-blocks' ) }
				>
					<BaseControl
						label={ __( 'Title tag', 'snow-monkey-blocks' ) }
						id="snow-monkey-blocks/items-item/title-tag-name"
					>
						<div className="smb-list-icon-selector">
							{ times( titleTagNames.length, ( index ) => {
								const onClickTitleTagName = () => {
									setAttributes( {
										titleTagName: titleTagNames[ index ],
									} );
								};

								const isPrimary =
									titleTagName === titleTagNames[ index ];
								return (
									<Button
										isPrimary={ isPrimary }
										isSecondary={ ! isPrimary }
										onClick={ onClickTitleTagName }
										key={ index }
									>
										{ titleTagNames[ index ] }
									</Button>
								);
							} ) }
						</div>
					</BaseControl>

					<ToggleControl
						label={ __( 'Block link', 'snow-monkey-blocks' ) }
						description={ __(
							'Link is made not only to the button but to the whole block.',
							'snow-monkey-blocks'
						) }
						checked={ isBlockLink }
						onChange={ ( value ) =>
							setAttributes( { isBlockLink: value } )
						}
					/>
				</PanelBody>

				<PanelColorSettings
					title={ __( 'Color', 'snow-monkey-blocks' ) }
					initialOpen={ false }
					colorSettings={ [
						{
							value: btnBackgroundColor,
							onChange: ( value ) =>
								setAttributes( { btnBackgroundColor: value } ),
							label: __(
								'Background color of button',
								'snow-monkey-blocks'
							),
						},
						{
							value: btnTextColor,
							onChange: ( value ) =>
								setAttributes( { btnTextColor: value } ),
							label: __(
								'Text color of button',
								'snow-monkey-blocks'
							),
						},
					] }
				>
					<ContrastChecker
						backgroundColor={ btnBackgroundColor }
						textColor={ btnTextColor }
					/>
				</PanelColorSettings>
			</InspectorControls>

			<div { ...blockProps }>
				<div className="smb-items__item">
					{ ( !! imageURL || isSelected ) && (
						<div className="smb-items__item__figure">
							<Figure
								src={ imageURL }
								id={ imageID }
								alt={ imageAlt }
								onSelect={ ( media ) => {
									const newImageURL =
										!! media.sizes && !! media.sizes.large
											? media.sizes.large.url
											: media.url;
									setAttributes( {
										imageURL: newImageURL,
										imageID: media.id,
										imageAlt: media.alt,
									} );
								} }
								onSelectURL={ ( newURL ) => {
									if ( newURL !== imageURL ) {
										setAttributes( {
											imageURL: newURL,
											imageID: 0,
										} );
									}
								} }
								onRemove={ () =>
									setAttributes( {
										imageURL: '',
										imageAlt: '',
										imageID: 0,
									} )
								}
								isSelected={ isSelected }
							/>
						</div>
					) }

					{ 'none' !== titleTagName && (
						<RichText
							tagName={ titleTagName }
							className="smb-items__item__title"
							placeholder={ __(
								'Write title…',
								'snow-monkey-blocks'
							) }
							value={ title }
							onChange={ ( value ) =>
								setAttributes( { title: value } )
							}
						/>
					) }

					{ ( ! RichText.isEmpty( lede ) || isSelected ) && (
						<RichText
							className="smb-items__item__lede"
							placeholder={ __(
								'Write lede…',
								'snow-monkey-blocks'
							) }
							value={ lede }
							onChange={ ( value ) =>
								setAttributes( { lede: value } )
							}
						/>
					) }

					{ ( ! RichText.isEmpty( summary ) || isSelected ) && (
						<RichText
							className="smb-items__item__content"
							placeholder={ __(
								'Write content…',
								'snow-monkey-blocks'
							) }
							value={ summary }
							onChange={ ( value ) =>
								setAttributes( { summary: value } )
							}
						/>
					) }

					{ ( ! RichText.isEmpty( btnLabel ) || isSelected ) && (
						<div className="smb-items__item__action">
							<span
								ref={ useMergeRefs( [
									setPopoverAnchor,
									ref,
								] ) }
								className="smb-items__item__btn smb-btn"
								href={ btnURL }
								style={ itemBtnStyles }
								target={
									'_self' === btnTarget
										? undefined
										: btnTarget
								}
								rel={
									'_self' === btnTarget
										? undefined
										: 'noopener noreferrer'
								}
							>
								<RichText
									className="smb-btn__label"
									style={ itemBtnLabelStyles }
									value={ btnLabel }
									placeholder={ __(
										'Button',
										'snow-monkey-blocks'
									) }
									onChange={ ( value ) =>
										setAttributes( { btnLabel: value } )
									}
									withoutInteractiveFormatting={ true }
									ref={ richTextRef }
								/>
							</span>
						</div>
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

			{ isSelected && ( isEditingURL || isURLSet ) && (
				<Popover
					placement="bottom"
					anchor={ popoverAnchor }
					onClose={ () => {
						setIsEditingURL( false );
						richTextRef.current?.focus();
					} }
				>
					<LinkControl
						className="wp-block-navigation-link__inline-link-input"
						value={ { url: btnURL, opensInNewTab } }
						onChange={ onChangeUrl }
						onRemove={ () => {
							unlink();
							richTextRef.current?.focus();
						} }
						forceIsEditingLink={ isEditingURL }
					/>
				</Popover>
			) }
		</>
	);
}

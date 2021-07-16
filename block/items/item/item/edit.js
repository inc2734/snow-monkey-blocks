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
} from '@wordpress/block-editor';

import { useState, useRef } from '@wordpress/element';
import { __ } from '@wordpress/i18n';
import { link as linkIcon, linkOff as linkOffIcon } from '@wordpress/icons';

import Figure from '@smb/component/figure';
import LinkControl from '@smb/component/link-control';

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

	const [ isLinkUIOpen, setIsLinkUIOpen ] = useState( false );
	const urlIsSet = !! btnURL;
	const urlIsSetandSelected = urlIsSet && isSelected;
	const toggleLinkUI = () => setIsLinkUIOpen( ! isLinkUIOpen );
	const closeLinkUI = () => setIsLinkUIOpen( false );

	const titleTagNames = [ 'div', 'h2', 'h3', 'none' ];

	const classes = classnames( 'c-row__col', className );

	const itemBtnLabelStyles = {
		color: btnTextColor || undefined,
	};

	const itemBtnStyles = {
		backgroundColor: btnBackgroundColor || undefined,
	};

	const ref = useRef();

	const blockProps = useBlockProps( {
		className: classes,
		ref,
	} );

	const onChangeUrl = ( { url: newUrl, opensInNewTab } ) =>
		setAttributes( {
			btnURL: newUrl,
			btnTarget: ! opensInNewTab ? '_self' : '_blank',
		} );

	return (
		<>
			<InspectorControls>
				<PanelBody
					title={ __( 'Block Settings', 'snow-monkey-blocks' ) }
				>
					<BaseControl
						label={ __( 'Title Tag', 'snow-monkey-blocks' ) }
						id="snow-monkey-blocks/items--item/title-tag-name"
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
					title={ __( 'Color Settings', 'snow-monkey-blocks' ) }
					initialOpen={ false }
					colorSettings={ [
						{
							value: btnBackgroundColor,
							onChange: ( value ) =>
								setAttributes( { btnBackgroundColor: value } ),
							label: __(
								'Background Color of Button',
								'snow-monkey-blocks'
							),
						},
						{
							value: btnTextColor,
							onChange: ( value ) =>
								setAttributes( { btnTextColor: value } ),
							label: __(
								'Text Color of Button',
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
								/>
							</span>
						</div>
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
						onClick={ onChangeUrl( '', false ) }
					/>
				) }
			</BlockControls>

			{ ( isLinkUIOpen || urlIsSetandSelected ) && (
				<Popover
					position="bottom center"
					anchorRef={ ref.current }
					onClose={ closeLinkUI }
				>
					<LinkControl
						url={ btnURL }
						target={ btnTarget }
						onChange={ onChangeUrl }
					/>
				</Popover>
			) }
		</>
	);
}

import classnames from 'classnames';
import { times } from 'lodash';

import {
	BlockControls,
	InspectorControls,
	RichText,
	useBlockProps,
	__experimentalLinkControl as LinkControl,
	__experimentalImageSizeControl as ImageSizeControl,
} from '@wordpress/block-editor';

import {
	BaseControl,
	Button,
	PanelBody,
	Popover,
	ToolbarButton,
	ToolbarGroup,
} from '@wordpress/components';

import {
	link as linkIcon,
	linkOff as linkOffIcon,
	pullLeft,
	pullRight,
} from '@wordpress/icons';

import { useMergeRefs } from '@wordpress/compose';
import { useState, useRef } from '@wordpress/element';
import { useSelect } from '@wordpress/data';
import { __ } from '@wordpress/i18n';

import Figure from '@smb/component/figure';
import { stringToInnerText } from '@smb/helper';

const ALLOWED_TYPES = [ 'image' ];
const DEFAULT_MEDIA_SIZE_SLUG = 'full';

export default function ( {
	attributes,
	setAttributes,
	isSelected,
	className,
	clientId,
} ) {
	const {
		titleTagName,
		title,
		summary,
		linkLabel,
		linkURL,
		linkTarget,
		imagePosition,
		imageID,
		imageURL,
		imageAlt,
		imageWidth,
		imageHeight,
		imageSizeSlug,
	} = attributes;

	const [ isEditingURL, setIsEditingURL ] = useState( false );
	const isURLSet = !! linkURL;
	const opensInNewTab = linkTarget === '_blank';

	// Use internal state instead of a ref to make sure that the component
	// re-renders when the popover's anchor updates.
	const [ popoverAnchor, setPopoverAnchor ] = useState( null );

	const { imageSizes, image } = useSelect(
		( select ) => {
			const { getSettings } = select( 'core/block-editor' );
			return {
				image:
					imageID && isSelected
						? select( 'core' ).getMedia( imageID, {
								context: 'view',
						  } )
						: null,
				imageSizes: getSettings()?.imageSizes,
			};
		},

		[ isSelected, imageID, clientId ]
	);

	const imageSizeOptions = imageSizes
		.filter(
			( { slug } ) => image?.media_details?.sizes?.[ slug ]?.source_url
		)
		.map( ( { name, slug } ) => ( { value: slug, label: name } ) );

	const titleTagNames = [ 'div', 'h2', 'h3', 'none' ];

	const classes = classnames( 'c-row__col', className );

	const itemClasses = classnames(
		'smb-panels__item',
		'smb-panels__item--horizontal',
		{
			'smb-panels__item--reverse': 'right' === imagePosition,
		}
	);

	const actionClasses = classnames( 'smb-panels__item__action', {
		'smb-panels__item__action--nolabel': ! linkLabel && ! isSelected,
	} );

	const ref = useRef();
	const richTextRef = useRef();

	const blockProps = useBlockProps( {
		className: classes,
		ref: useMergeRefs( [ setPopoverAnchor, ref ] ),
	} );

	const onSelectImage = ( media ) => {
		const newImageSizeSlug = !! media?.sizes[ imageSizeSlug ]
			? imageSizeSlug
			: DEFAULT_MEDIA_SIZE_SLUG;
		const newImageUrl = media?.sizes[ newImageSizeSlug ]?.url;
		const newImageWidth = media?.sizes[ newImageSizeSlug ]?.width;
		const newImageHeight = media?.sizes[ newImageSizeSlug ]?.height;

		setAttributes( {
			imageURL: newImageUrl,
			imageID: media.id,
			imageAlt: media.alt,
			imageWidth: newImageWidth,
			imageHeight: newImageHeight,
			imageSizeSlug: newImageSizeSlug,
		} );
	};

	const onSelectImageURL = ( newURL ) => {
		if ( newURL !== imageURL ) {
			setAttributes( {
				imageURL: newURL,
				imageID: 0,
				mediaSizeSlug: DEFAULT_MEDIA_SIZE_SLUG,
			} );
		}
	};

	const onRemoveImage = () =>
		setAttributes( {
			imageURL: '',
			imageAlt: '',
			imageWidth: '',
			imageHeight: '',
			imageID: 0,
		} );

	const onChangeTitle = ( value ) =>
		setAttributes( {
			title: value,
		} );

	const onChangeSummary = ( value ) =>
		setAttributes( {
			summary: value,
		} );

	const onChangeLinkLabel = ( value ) =>
		setAttributes( {
			linkLabel: stringToInnerText( value ),
		} );

	const onChangeLinkUrl = ( {
		url: newUrl,
		opensInNewTab: newOpensInNewTab,
	} ) =>
		setAttributes( {
			linkURL: newUrl,
			linkTarget: ! newOpensInNewTab ? '_self' : '_blank',
		} );

	const onChangeImageSizeSlug = ( value ) => {
		const newImageUrl = image?.media_details?.sizes?.[ value ]?.source_url;
		const newImageWidth = image?.media_details?.sizes?.[ value ]?.width;
		const newImageHeight = image?.media_details?.sizes?.[ value ]?.height;

		setAttributes( {
			imageURL: newImageUrl,
			imageWidth: newImageWidth,
			imageHeight: newImageHeight,
			imageSizeSlug: value,
		} );
	};

	const unlink = () => {
		setAttributes( {
			linkURL: undefined,
			linkTarget: undefined,
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
						id="snow-monkey-blocks/panels-item-horizontal/title-tag-name"
					>
						<div className="smb-list-icon-selector">
							{ times( titleTagNames.length, ( index ) => {
								const onClickTitleTagName = () =>
									setAttributes( {
										titleTagName: titleTagNames[ index ],
									} );

								return (
									<Button
										variant={
											titleTagName ===
											titleTagNames[ index ]
												? 'primary'
												: 'secondary'
										}
										onClick={ onClickTitleTagName }
										key={ index }
									>
										{ titleTagNames[ index ] }
									</Button>
								);
							} ) }
						</div>
					</BaseControl>

					<ImageSizeControl
						onChangeImage={ onChangeImageSizeSlug }
						slug={ imageSizeSlug }
						imageSizeOptions={ imageSizeOptions }
						isResizable={ false }
						imageSizeHelp={ __(
							'Select which image size to load.'
						) }
					/>
				</PanelBody>
			</InspectorControls>

			<BlockControls gruop="block">
				<ToolbarGroup>
					<ToolbarButton
						icon={ pullLeft }
						title={ __( 'Image position', 'snow-monkey-blocks' ) }
						isActive={ 'left' === imagePosition }
						onClick={ () =>
							setAttributes( { imagePosition: 'left' } )
						}
					/>

					<ToolbarButton
						icon={ pullRight }
						title={ __(
							'Show avatar on right',
							'snow-monkey-blocks'
						) }
						isActive={ 'right' === imagePosition }
						onClick={ () =>
							setAttributes( { imagePosition: 'right' } )
						}
					/>
				</ToolbarGroup>
			</BlockControls>

			<div { ...blockProps }>
				<div className={ itemClasses }>
					{ ( !! imageURL || isSelected ) && (
						<div className="smb-panels__item__figure">
							<Figure
								src={ imageURL }
								id={ imageID }
								alt={ imageAlt }
								width={ imageWidth }
								height={ imageHeight }
								onSelect={ onSelectImage }
								onSelectURL={ onSelectImageURL }
								onRemove={ onRemoveImage }
								allowedTypes={ ALLOWED_TYPES }
							/>
						</div>
					) }

					<div className="smb-panels__item__body">
						{ ( ! RichText.isEmpty( title ) || isSelected ) &&
							'none' !== titleTagName && (
								<RichText
									tagName={ titleTagName }
									className="smb-panels__item__title"
									placeholder={ __(
										'Write title…',
										'snow-monkey-blocks'
									) }
									value={ title }
									onChange={ onChangeTitle }
								/>
							) }

						{ ( ! RichText.isEmpty( summary ) || isSelected ) && (
							<RichText
								className="smb-panels__item__content"
								placeholder={ __(
									'Write content…',
									'snow-monkey-blocks'
								) }
								value={ summary }
								onChange={ onChangeSummary }
							/>
						) }

						{ ( ! RichText.isEmpty( linkLabel ) ||
							!! linkURL ||
							isSelected ) && (
							<div className={ actionClasses }>
								{ ( ! RichText.isEmpty( linkLabel ) ||
									isSelected ) && (
									<RichText
										className="smb-panels__item__link"
										value={ linkLabel }
										placeholder={ __(
											'Link',
											'snow-monkey-blocks'
										) }
										onChange={ onChangeLinkLabel }
										ref={ richTextRef }
									/>
								) }
							</div>
						) }

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

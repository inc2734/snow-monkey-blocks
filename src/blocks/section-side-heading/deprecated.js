import classnames from 'classnames';
import hexToRgba from 'hex-to-rgba';

import {
	RichText,
	InnerBlocks,
	useBlockProps,
	useInnerBlocksProps,
} from '@wordpress/block-editor';

import { getColumnSize, divider, generateSpacingProperties } from '@smb/helper';

import metadata from './block.json';

import { Save as Header } from '../section/components/header';

import {
	SectionBackgroundV3,
	SectionBackgroundV2,
	SectionBackgroundV1,
} from '../section/components/deprecated';

import {
	generateStylesForSectionBackground,
	SectionBackground,
} from '../section/components/background';

const blockAttributes = metadata.attributes;
const blockSupports = metadata.supports;

export default [
	{
		attributes: {
			...blockAttributes,
			padding: {
				type: 'object',
				default: {},
			},
		},

		supports: {
			...blockSupports,
		},

		migrate( attributes ) {
			const newAttributes = {
				...attributes,
				style: {
					...attributes?.style,
					spacing: {
						...attributes?.style?.spacing,
						padding: {
							...attributes?.padding,
						},
					},
				},
			};
			return newAttributes;
		},

		save( { attributes, className } ) {
			const {
				align,

				textColor,
				headingPosition,
				headingColumnSize,
				contentColumnSize,
				contentJustification,
				itemsAlignment,
				gap,

				title,
				subtitle,
				lede,

				wrapperTagName,
				titleTagName,
				height,
				disableCustomHeight,
				containerAlign,
				contentsMaxWidth,
				isSlim,
				padding,

				backgroundHorizontalPosition,
				backgroundVerticalPosition,
				isBackgroundNoOver,
				backgroundColor,
				backgroundGradientColor,
				backgroundTexture,
				backgroundTextureOpacity,
				backgroundTextureUrl,
				fixedBackgroundColor,
				fixedBackgroundGradientColor,
				fixedBackgroundTexture,
				fixedBackgroundTextureOpacity,
				fixedBackgroundTextureUrl,
				topDividerType,
				topDividerLevel,
				topDividerColor,
				topDividerVerticalPosition,
				topDividerOverlay,
				bottomDividerType,
				bottomDividerLevel,
				bottomDividerColor,
				bottomDividerVerticalPosition,
				bottomDividerOverlay,
			} = attributes;

			const { textColumnWidth, imageColumnWidth } = getColumnSize(
				headingColumnSize,
				contentColumnSize
			);

			const isItemsAlignmentable = 'fit' !== height;

			const TagName = wrapperTagName;

			const classes = classnames(
				'smb-section',
				'smb-section-side-heading',
				className,
				{
					[ `smb-section--${ height }` ]:
						!! height && disableCustomHeight,
					[ `is-items-alignment-${ itemsAlignment }` ]:
						!! itemsAlignment && isItemsAlignmentable,
					[ `smb-section--top-divider-no-overlay` ]:
						! topDividerOverlay,
					[ `smb-section--bottom-divider-no-overlay` ]:
						! bottomDividerOverlay,
				}
			);

			const innerClasses = classnames( 'smb-section__inner', {
				[ `is-content-justification-${ contentJustification }` ]:
					!! contentJustification,
			} );

			const containerClasses = classnames( 'c-container', {
				alignfull: 'full' === containerAlign && 'full' === align,
				alignwide: 'wide' === containerAlign && 'full' === align,
			} );

			const contentsWrapperClasses = classnames(
				'smb-section__contents-wrapper',
				{
					'u-slim-width': isSlim && ! contentsMaxWidth,
				}
			);

			const rowClasses = classnames( 'c-row', {
				'c-row--md-margin': 'm' === gap || ! gap,
				[ `c-row--md-margin-${ gap }` ]: 's' === gap || 'l' === gap,
				'c-row--reverse': 'right' === headingPosition,
			} );

			const headingColClasses = classnames(
				'c-row__col',
				'c-row__col--1-1',
				`c-row__col--md-${ imageColumnWidth }`
			);

			const contentColClasses = classnames(
				'c-row__col',
				'c-row__col--1-1',
				`c-row__col--md-${ textColumnWidth }`
			);

			const bodyClasses = classnames(
				'smb-section__body',
				'smb-section-side-heading__body'
			);

			const styles = {
				'--smb-section--color': textColor || undefined,
				'--smb-section--contents-wrapper-width':
					!! contentsMaxWidth && ! isSlim
						? contentsMaxWidth
						: undefined,
				'--smb-section--min-height':
					!! height && ! disableCustomHeight ? height : undefined,
				...generateSpacingProperties( padding ),
				...generateStylesForSectionBackground( {
					backgroundHorizontalPosition,
					backgroundVerticalPosition,
					isBackgroundNoOver,
					backgroundColor,
					backgroundGradientColor,
					backgroundTexture,
					backgroundTextureOpacity,
					backgroundTextureUrl,
					fixedBackgroundColor,
					fixedBackgroundGradientColor,
					fixedBackgroundTexture,
					fixedBackgroundTextureOpacity,
					fixedBackgroundTextureUrl,
					topDividerVerticalPosition,
					topDividerLevel,
					bottomDividerVerticalPosition,
					bottomDividerLevel,
					// backgroundText,
				} ),
			};

			// const sectionStyles = {};
			// if ( textColor ) {
			// 	sectionStyles.color = textColor;
			// }

			// const contentsWrapperStyles = {
			// 	width: !! contentsMaxWidth && ! isSlim ? contentsMaxWidth : undefined,
			// };

			return (
				<TagName
					{ ...useBlockProps.save( {
						className: classes,
						style: styles,
					} ) }
				>
					<SectionBackground
						{ ...{
							backgroundColor,
							backgroundGradientColor,
							backgroundTexture,
							fixedBackgroundColor,
							fixedBackgroundGradientColor,
							fixedBackgroundTexture,
							topDividerType,
							topDividerLevel,
							topDividerColor,
							bottomDividerType,
							bottomDividerLevel,
							bottomDividerColor,
							// backgroundText,
							containerClasses,
						} }
					/>

					<div className={ innerClasses }>
						<div className={ containerClasses }>
							<div className={ contentsWrapperClasses }>
								<div className={ rowClasses }>
									<div className={ headingColClasses }>
										<Header
											{ ...{
												title,
												titleTagName,
												subtitle,
												lede,
											} }
											className="smb-section-side-heading"
										/>
									</div>
									<div className={ contentColClasses }>
										<div
											{ ...useInnerBlocksProps.save( {
												className: bodyClasses,
											} ) }
										/>
									</div>
								</div>
							</div>
						</div>
					</div>
				</TagName>
			);
		},
	},
	{
		attributes: {
			...blockAttributes,
		},

		supports: {
			...blockSupports,
		},

		save( { attributes, className } ) {
			const {
				align,

				textColor,
				headingPosition,
				headingColumnSize,
				contentJustification,
				itemsAlignment,

				title,
				subtitle,
				lede,

				wrapperTagName,
				titleTagName,
				height,
				containerAlign,
				contentsMaxWidth,
				isSlim,

				backgroundHorizontalPosition,
				backgroundVerticalPosition,
				isBackgroundNoOver,
				backgroundColor,
				backgroundGradientColor,
				backgroundTexture,
				backgroundTextureOpacity,
				backgroundTextureUrl,
				fixedBackgroundColor,
				fixedBackgroundGradientColor,
				fixedBackgroundTexture,
				fixedBackgroundTextureOpacity,
				fixedBackgroundTextureUrl,
				topDividerType,
				topDividerLevel,
				topDividerColor,
				topDividerVerticalPosition,
				bottomDividerType,
				bottomDividerLevel,
				bottomDividerColor,
				bottomDividerVerticalPosition,
			} = attributes;

			const { textColumnWidth, imageColumnWidth } =
				getColumnSize( headingColumnSize );

			const isItemsAlignmentable = 'fit' !== height;

			const TagName = wrapperTagName;

			const classes = classnames(
				'smb-section',
				'smb-section-side-heading',
				className,
				{
					[ `smb-section--${ height }` ]: !! height,
					[ `is-items-alignment-${ itemsAlignment }` ]:
						!! itemsAlignment && isItemsAlignmentable,
				}
			);

			const innerClasses = classnames( 'smb-section__inner', {
				[ `is-content-justification-${ contentJustification }` ]:
					!! contentJustification,
			} );

			const containerClasses = classnames( 'c-container', {
				alignfull: 'full' === containerAlign && 'full' === align,
				alignwide: 'wide' === containerAlign && 'full' === align,
			} );

			const contentsWrapperClasses = classnames(
				'smb-section__contents-wrapper',
				{
					'u-slim-width': isSlim && ! contentsMaxWidth,
				}
			);

			const rowClasses = classnames( 'c-row', 'c-row--md-margin', {
				'c-row--reverse': 'right' === headingPosition,
			} );

			const headingColClasses = classnames(
				'c-row__col',
				'c-row__col--1-1',
				`c-row__col--md-${ imageColumnWidth }`
			);

			const contentColClasses = classnames(
				'c-row__col',
				'c-row__col--1-1',
				`c-row__col--md-${ textColumnWidth }`
			);

			const bodyClasses = classnames(
				'smb-section__body',
				'smb-section-side-heading__body'
			);

			const styles = {
				'--smb-section--color': textColor || undefined,
				'--smb-section--contents-wrapper-width':
					!! contentsMaxWidth && ! isSlim
						? contentsMaxWidth
						: undefined,
				...generateStylesForSectionBackground( {
					backgroundHorizontalPosition,
					backgroundVerticalPosition,
					isBackgroundNoOver,
					backgroundColor,
					backgroundGradientColor,
					backgroundTexture,
					backgroundTextureOpacity,
					backgroundTextureUrl,
					fixedBackgroundColor,
					fixedBackgroundGradientColor,
					fixedBackgroundTexture,
					fixedBackgroundTextureOpacity,
					fixedBackgroundTextureUrl,
					topDividerVerticalPosition,
					bottomDividerVerticalPosition,
				} ),
			};

			return (
				<TagName
					{ ...useBlockProps.save( {
						className: classes,
						style: styles,
					} ) }
				>
					<SectionBackgroundV3
						{ ...{
							backgroundColor,
							backgroundGradientColor,
							backgroundTexture,
							fixedBackgroundColor,
							fixedBackgroundGradientColor,
							fixedBackgroundTexture,
							topDividerType,
							topDividerLevel,
							topDividerColor,
							bottomDividerType,
							bottomDividerLevel,
							bottomDividerColor,
							containerClasses,
						} }
					/>

					<div className={ innerClasses }>
						<div className={ containerClasses }>
							<div className={ contentsWrapperClasses }>
								<div className={ rowClasses }>
									<div className={ headingColClasses }>
										<Header
											{ ...{
												title,
												titleTagName,
												subtitle,
												lede,
											} }
											className="smb-section-side-heading"
										/>
									</div>
									<div className={ contentColClasses }>
										<div
											{ ...useInnerBlocksProps.save( {
												className: bodyClasses,
											} ) }
										/>
									</div>
								</div>
							</div>
						</div>
					</div>
				</TagName>
			);
		},
	},
	{
		attributes: {
			...blockAttributes,
		},

		supports: {
			...blockSupports,
		},

		save( { attributes, className } ) {
			const {
				align,

				textColor,
				headingPosition,
				headingColumnSize,
				contentJustification,
				itemsAlignment,

				title,
				subtitle,
				lede,

				wrapperTagName,
				titleTagName,
				height,
				containerAlign,
				contentsMaxWidth,
				isSlim,

				backgroundHorizontalPosition,
				backgroundVerticalPosition,
				isBackgroundNoOver,
				backgroundColor,
				backgroundGradientColor,
				backgroundTexture,
				backgroundTextureOpacity,
				backgroundTextureUrl,
				fixedBackgroundColor,
				fixedBackgroundGradientColor,
				fixedBackgroundTexture,
				fixedBackgroundTextureOpacity,
				fixedBackgroundTextureUrl,
				topDividerType,
				topDividerLevel,
				topDividerColor,
				topDividerVerticalPosition,
				bottomDividerType,
				bottomDividerLevel,
				bottomDividerColor,
				bottomDividerVerticalPosition,
			} = attributes;

			const { textColumnWidth, imageColumnWidth } =
				getColumnSize( headingColumnSize );

			const isItemsAlignmentable = 'fit' !== height;

			const TagName = wrapperTagName;

			const classes = classnames(
				'smb-section',
				'smb-section-side-heading',
				className,
				{
					[ `smb-section--${ height }` ]: !! height,
					[ `is-items-alignment-${ itemsAlignment }` ]:
						!! itemsAlignment && isItemsAlignmentable,
				}
			);

			const innerClasses = classnames( 'smb-section__inner', {
				[ `is-content-justification-${ contentJustification }` ]:
					!! contentJustification,
			} );

			const containerClasses = classnames( 'c-container', {
				alignfull: 'full' === containerAlign && 'full' === align,
				alignwide: 'wide' === containerAlign && 'full' === align,
			} );

			const contentsWrapperClasses = classnames(
				'smb-section__contents-wrapper',
				{
					'u-slim-width': isSlim && ! contentsMaxWidth,
				}
			);

			const rowClasses = classnames( 'c-row', 'c-row--md-margin', {
				'c-row--reverse': 'right' === headingPosition,
			} );

			const headingColClasses = classnames(
				'c-row__col',
				'c-row__col--1-1',
				`c-row__col--md-${ imageColumnWidth }`
			);

			const contentColClasses = classnames(
				'c-row__col',
				'c-row__col--1-1',
				`c-row__col--md-${ textColumnWidth }`
			);

			const bodyClasses = classnames(
				'smb-section__body',
				'smb-section-side-heading__body'
			);

			const sectionStyles = {};
			if ( textColor ) {
				sectionStyles.color = textColor;
			}

			const contentsWrapperStyles = {
				width:
					!! contentsMaxWidth && ! isSlim
						? contentsMaxWidth
						: undefined,
			};

			return (
				<TagName
					{ ...useBlockProps.save( {
						className: classes,
						style: sectionStyles,
					} ) }
				>
					<SectionBackgroundV2
						{ ...{
							backgroundHorizontalPosition,
							backgroundVerticalPosition,
							isBackgroundNoOver,
							backgroundColor,
							backgroundGradientColor,
							backgroundTexture,
							backgroundTextureOpacity,
							backgroundTextureUrl,
							fixedBackgroundColor,
							fixedBackgroundGradientColor,
							fixedBackgroundTexture,
							fixedBackgroundTextureOpacity,
							fixedBackgroundTextureUrl,
							topDividerType,
							topDividerLevel,
							topDividerColor,
							topDividerVerticalPosition,
							bottomDividerType,
							bottomDividerLevel,
							bottomDividerColor,
							bottomDividerVerticalPosition,
						} }
					/>

					<div className={ innerClasses }>
						<div className={ containerClasses }>
							<div
								className={ contentsWrapperClasses }
								style={ contentsWrapperStyles }
							>
								<div className={ rowClasses }>
									<div className={ headingColClasses }>
										<Header
											{ ...{
												title,
												titleTagName,
												subtitle,
												lede,
											} }
											className="smb-section-side-heading"
										/>
									</div>
									<div className={ contentColClasses }>
										<div
											{ ...useInnerBlocksProps.save( {
												className: bodyClasses,
											} ) }
										/>
									</div>
								</div>
							</div>
						</div>
					</div>
				</TagName>
			);
		},
	},
	{
		attributes: {
			...blockAttributes,
		},

		supports: {
			...blockSupports,
		},

		save( { attributes, className } ) {
			const {
				align,

				textColor,
				headingPosition,
				headingColumnSize,
				contentJustification,
				itemsAlignment,

				title,
				subtitle,
				lede,

				wrapperTagName,
				titleTagName,
				height,
				containerAlign,
				contentsMaxWidth,
				isSlim,

				backgroundHorizontalPosition,
				backgroundVerticalPosition,
				isBackgroundNoOver,
				backgroundColor,
				backgroundGradientColor,
				backgroundTexture,
				backgroundTextureOpacity,
				backgroundTextureUrl,
				fixedBackgroundColor,
				fixedBackgroundGradientColor,
				fixedBackgroundTexture,
				fixedBackgroundTextureOpacity,
				fixedBackgroundTextureUrl,
				topDividerType,
				topDividerLevel,
				topDividerColor,
				topDividerVerticalPosition,
				bottomDividerType,
				bottomDividerLevel,
				bottomDividerColor,
				bottomDividerVerticalPosition,
			} = attributes;

			const { textColumnWidth, imageColumnWidth } =
				getColumnSize( headingColumnSize );

			const isItemsAlignmentable = 'fit' !== height;

			const TagName = wrapperTagName;

			const classes = classnames(
				'smb-section',
				'smb-section-side-heading',
				className,
				{
					[ `smb-section--${ height }` ]: !! height,
					[ `is-items-alignment-${ itemsAlignment }` ]:
						!! itemsAlignment && isItemsAlignmentable,
				}
			);

			const innerClasses = classnames( 'smb-section__inner', {
				[ `is-content-justification-${ contentJustification }` ]:
					!! contentJustification,
			} );

			const containerClasses = classnames( 'c-container', {
				alignfull: 'full' === containerAlign && 'full' === align,
				alignwide: 'wide' === containerAlign && 'full' === align,
			} );

			const contentsWrapperClasses = classnames(
				'smb-section__contents-wrapper',
				{
					'u-slim-width': isSlim && ! contentsMaxWidth,
				}
			);

			const rowClasses = classnames( 'c-row', 'c-row--md-margin', {
				'c-row--reverse': 'right' === headingPosition,
			} );

			const headingColClasses = classnames(
				'c-row__col',
				'c-row__col--1-1',
				`c-row__col--md-${ imageColumnWidth }`
			);

			const contentColClasses = classnames(
				'c-row__col',
				'c-row__col--1-1',
				`c-row__col--md-${ textColumnWidth }`
			);

			const bodyClasses = classnames(
				'smb-section__body',
				'smb-section-side-heading__body'
			);

			const sectionStyles = {};
			if ( textColor ) {
				sectionStyles.color = textColor;
			}

			const contentsWrapperStyles = {
				width:
					!! contentsMaxWidth && ! isSlim
						? contentsMaxWidth
						: undefined,
			};

			return (
				<TagName
					{ ...useBlockProps.save( {
						className: classes,
						style: sectionStyles,
					} ) }
				>
					<SectionBackgroundV1
						{ ...{
							backgroundHorizontalPosition,
							backgroundVerticalPosition,
							isBackgroundNoOver,
							backgroundColor,
							backgroundGradientColor,
							backgroundTexture,
							backgroundTextureOpacity,
							backgroundTextureUrl,
							fixedBackgroundColor,
							fixedBackgroundGradientColor,
							fixedBackgroundTexture,
							fixedBackgroundTextureOpacity,
							fixedBackgroundTextureUrl,
							topDividerType,
							topDividerLevel,
							topDividerColor,
							topDividerVerticalPosition,
							bottomDividerType,
							bottomDividerLevel,
							bottomDividerColor,
							bottomDividerVerticalPosition,
						} }
					/>

					<div className={ innerClasses }>
						<div className={ containerClasses }>
							<div
								className={ contentsWrapperClasses }
								style={ contentsWrapperStyles }
							>
								<div className={ rowClasses }>
									<div className={ headingColClasses }>
										<Header
											{ ...{
												title,
												titleTagName,
												subtitle,
												lede,
											} }
											className="smb-section-side-heading"
										/>
									</div>
									<div className={ contentColClasses }>
										<div
											{ ...useInnerBlocksProps.save( {
												className: bodyClasses,
											} ) }
										/>
									</div>
								</div>
							</div>
						</div>
					</div>
				</TagName>
			);
		},
	},
	{
		attributes: {
			...blockAttributes,
		},

		supports: {
			align: [ 'wide', 'full' ],
			anchor: true,
		},

		save( { attributes, className } ) {
			const {
				textColor,
				headingPosition,
				headingColumnSize,
				contentJustification,
				itemsAlignment,

				title,
				subtitle,
				lede,

				wrapperTagName,
				titleTagName,
				height,
				containerAlign,
				contentsMaxWidth,
				isSlim,

				backgroundHorizontalPosition,
				backgroundVerticalPosition,
				isBackgroundNoOver,
				backgroundColor,
				backgroundGradientColor,
				backgroundTexture,
				backgroundTextureOpacity,
				fixedBackgroundColor,
				fixedBackgroundGradientColor,
				fixedBackgroundTexture,
				fixedBackgroundTextureOpacity,
				topDividerType,
				topDividerLevel,
				topDividerColor,
				topDividerVerticalPosition,
				bottomDividerType,
				bottomDividerLevel,
				bottomDividerColor,
				bottomDividerVerticalPosition,
			} = attributes;

			const { textColumnWidth, imageColumnWidth } =
				getColumnSize( headingColumnSize );

			const isItemsAlignmentable = 'fit' !== height;

			const TagName = wrapperTagName;

			const classes = classnames(
				'smb-section',
				'smb-section-side-heading',
				className,
				{
					[ `smb-section--${ height }` ]: !! height,
					[ `is-items-alignment-${ itemsAlignment }` ]:
						!! itemsAlignment && isItemsAlignmentable,
				}
			);

			const innerClasses = classnames( 'smb-section__inner', {
				[ `is-content-justification-${ contentJustification }` ]:
					!! contentJustification,
			} );

			const containerClasses = classnames( 'c-container', {
				alignfull: 'full' === containerAlign,
				alignwide: 'wide' === containerAlign,
			} );

			const contentsWrapperClasses = classnames(
				'smb-section__contents-wrapper',
				{
					'u-slim-width': isSlim && ! contentsMaxWidth,
				}
			);

			const rowClasses = classnames( 'c-row', 'c-row--md-margin', {
				'c-row--reverse': 'right' === headingPosition,
			} );

			const headingColClasses = classnames(
				'c-row__col',
				'c-row__col--1-1',
				`c-row__col--md-${ imageColumnWidth }`
			);

			const contentColClasses = classnames(
				'c-row__col',
				'c-row__col--1-1',
				`c-row__col--md-${ textColumnWidth }`
			);

			const sectionStyles = {};
			if ( textColor ) {
				sectionStyles.color = textColor;
			}

			const contentsWrapperStyles = {
				maxWidth:
					!! contentsMaxWidth && ! isSlim
						? contentsMaxWidth
						: undefined,
			};

			return (
				<TagName
					{ ...useBlockProps.save( {
						className: classes,
						style: sectionStyles,
					} ) }
				>
					<SectionBackgroundV1
						{ ...{
							backgroundHorizontalPosition,
							backgroundVerticalPosition,
							isBackgroundNoOver,
							backgroundColor,
							backgroundGradientColor,
							backgroundTexture,
							backgroundTextureOpacity,
							fixedBackgroundColor,
							fixedBackgroundGradientColor,
							fixedBackgroundTexture,
							fixedBackgroundTextureOpacity,
							topDividerType,
							topDividerLevel,
							topDividerColor,
							topDividerVerticalPosition,
							bottomDividerType,
							bottomDividerLevel,
							bottomDividerColor,
							bottomDividerVerticalPosition,
						} }
					/>

					<div className={ innerClasses }>
						<div className={ containerClasses }>
							<div
								className={ contentsWrapperClasses }
								style={ contentsWrapperStyles }
							>
								<div className={ rowClasses }>
									<div className={ headingColClasses }>
										<Header
											{ ...{
												title,
												titleTagName,
												subtitle,
												lede,
											} }
											className="smb-section-side-heading"
										/>
									</div>
									<div className={ contentColClasses }>
										<div className="smb-section__body smb-section-side-heading__body">
											<InnerBlocks.Content />
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</TagName>
			);
		},
	},
	{
		attributes: {
			...blockAttributes,
		},

		supports: {
			align: [ 'wide', 'full' ],
			anchor: true,
		},

		save( { attributes, className } ) {
			const {
				wrapperTagName,
				titleTagName,
				title,
				subtitle,
				lede,
				backgroundHorizontalPosition,
				backgroundVerticalPosition,
				isBackgroundNoOver,
				backgroundColor,
				backgroundGradientColor,
				backgroundTexture,
				backgroundTextureOpacity,
				fixedBackgroundColor,
				fixedBackgroundGradientColor,
				fixedBackgroundTexture,
				fixedBackgroundTextureOpacity,
				textColor,
				headingPosition,
				headingColumnSize,
				isSlim,
				topDividerType,
				topDividerLevel,
				topDividerColor,
				topDividerVerticalPosition,
				bottomDividerType,
				bottomDividerLevel,
				bottomDividerColor,
				bottomDividerVerticalPosition,
			} = attributes;

			const { textColumnWidth, imageColumnWidth } =
				getColumnSize( headingColumnSize );

			const TagName = wrapperTagName;

			const classes = classnames(
				'smb-section',
				'smb-section-side-heading',
				className
			);

			const topDividerClasses = classnames(
				'smb-section__divider',
				'smb-section__divider--top',
				`smb-section__divider--${ topDividerType }`
			);

			const bottomDividerClasses = classnames(
				'smb-section__divider',
				'smb-section__divider--bottom',
				`smb-section__divider--${ bottomDividerType }`
			);

			const containerClasses = classnames( 'c-container', {
				'u-slim-width': !! isSlim,
			} );

			const rowClasses = classnames( 'c-row', 'c-row--md-margin', {
				'c-row--reverse': 'right' === headingPosition,
			} );

			const headingColClasses = classnames(
				'c-row__col',
				'c-row__col--1-1',
				`c-row__col--md-${ imageColumnWidth }`
			);

			const contentColClasses = classnames(
				'c-row__col',
				'c-row__col--1-1',
				`c-row__col--md-${ textColumnWidth }`
			);

			const hasBackgroundColor =
				backgroundColor || backgroundGradientColor;
			const hasFixedBackgroundColor =
				fixedBackgroundColor || fixedBackgroundGradientColor;
			const hasBackgroundTexture = backgroundTexture;
			const hasFixedBackgroundTexture = fixedBackgroundTexture;
			const hasTopDivider = !! topDividerLevel;
			const hasBottomDivider = !! bottomDividerLevel;
			const hasTitle =
				! RichText.isEmpty( title ) && 'none' !== titleTagName;
			const hasSubTitle = ! RichText.isEmpty( subtitle );
			const hasLede = ! RichText.isEmpty( lede );

			const sectionStyles = {};
			if ( textColor ) {
				sectionStyles.color = textColor;
			}

			const fixedBackgroundStyles = {
				paddingTop: Math.abs( topDividerLevel ),
				paddingBottom: Math.abs( bottomDividerLevel ),
				backgroundColor: fixedBackgroundColor,
				backgroundImage: fixedBackgroundGradientColor,
			};

			const fixedBackgroundTextureStyles = {
				backgroundImage: hasFixedBackgroundTexture
					? `url(${ smb.pluginUrl }/dist/block/section/img/${ fixedBackgroundTexture }.png)`
					: undefined,
				opacity: !! fixedBackgroundTextureOpacity
					? fixedBackgroundTextureOpacity
					: undefined,
			};

			const dividersStyles = {};
			if ( topDividerVerticalPosition ) {
				dividersStyles.top = `${ topDividerVerticalPosition }%`;
			}
			if ( bottomDividerVerticalPosition ) {
				dividersStyles.bottom = `${ bottomDividerVerticalPosition }%`;
			}

			const backgroundStyles = {};
			if ( hasBackgroundColor ) {
				backgroundStyles.backgroundColor = backgroundColor;
				backgroundStyles.backgroundImage = backgroundGradientColor;

				if ( ! isBackgroundNoOver ) {
					if (
						backgroundHorizontalPosition ||
						backgroundVerticalPosition
					) {
						backgroundStyles.transform = `translate(${
							backgroundHorizontalPosition || 0
						}%, ${ backgroundVerticalPosition || 0 }%)`;
					}
				} else {
					if ( 0 < backgroundHorizontalPosition ) {
						backgroundStyles.left = `${ Math.abs(
							backgroundHorizontalPosition
						) }%`;
					} else if ( 0 > backgroundHorizontalPosition ) {
						backgroundStyles.right = `${ Math.abs(
							backgroundHorizontalPosition
						) }%`;
					}

					if ( 0 < backgroundVerticalPosition ) {
						backgroundStyles.top = `${ Math.abs(
							backgroundVerticalPosition
						) }%`;
					} else if ( 0 > backgroundVerticalPosition ) {
						backgroundStyles.bottom = `${ Math.abs(
							backgroundVerticalPosition
						) }%`;
					}
				}
			}

			const backgroundTextureStyles = {
				backgroundImage: hasBackgroundTexture
					? `url(${ smb.pluginUrl }/dist/block/section/img/${ backgroundTexture }.png)`
					: undefined,
				opacity: !! backgroundTextureOpacity
					? backgroundTextureOpacity
					: undefined,
			};

			const innerStyles = {};

			return (
				<TagName
					{ ...useBlockProps.save( {
						className: classes,
						style: sectionStyles,
					} ) }
				>
					{ ( hasFixedBackgroundColor ||
						hasFixedBackgroundTexture ||
						hasBackgroundColor ||
						hasBackgroundTexture ||
						hasTopDivider ||
						hasBottomDivider ) && (
						<div
							className="smb-section__fixed-background"
							style={ fixedBackgroundStyles }
						>
							{ hasFixedBackgroundTexture && (
								<div
									className="smb-section__fixed-background__texture"
									style={ fixedBackgroundTextureStyles }
								/>
							) }

							{ ( hasBackgroundColor ||
								hasBackgroundTexture ) && (
								<div
									className="smb-section__background"
									style={ backgroundStyles }
								>
									{ hasBackgroundTexture && (
										<div
											className="smb-section__background__texture"
											style={ backgroundTextureStyles }
										/>
									) }
								</div>
							) }

							{ ( hasTopDivider || hasBottomDivider ) && (
								<div
									className="smb-section__dividers"
									style={ dividersStyles }
								>
									{ hasTopDivider && (
										<div className={ topDividerClasses }>
											{ divider(
												topDividerType,
												topDividerLevel,
												topDividerColor
											) }
										</div>
									) }

									{ hasBottomDivider && (
										<div className={ bottomDividerClasses }>
											{ divider(
												bottomDividerType,
												bottomDividerLevel,
												bottomDividerColor
											) }
										</div>
									) }
								</div>
							) }
						</div>
					) }

					<div className="smb-section__inner" style={ innerStyles }>
						<div className={ containerClasses }>
							<div className={ rowClasses }>
								<div className={ headingColClasses }>
									{ hasTitle && hasSubTitle && (
										<RichText.Content
											tagName="div"
											className="smb-section__subtitle smb-section-side-heading__subtitle"
											value={ subtitle }
										/>
									) }

									{ hasTitle && (
										<RichText.Content
											tagName={ titleTagName }
											className="smb-section__title smb-section-side-heading__title"
											value={ title }
										/>
									) }

									{ hasTitle && hasLede && (
										<RichText.Content
											tagName="div"
											className="smb-section__lede smb-section-side-heading__lede"
											value={ lede }
										/>
									) }
								</div>
								<div className={ contentColClasses }>
									<div className="smb-section__body smb-section-side-heading__body">
										<InnerBlocks.Content />
									</div>
								</div>
							</div>
						</div>
					</div>
				</TagName>
			);
		},
	},
	{
		attributes: {
			...blockAttributes,
		},

		supports: {
			align: [ 'wide', 'full' ],
			anchor: true,
		},

		save( { attributes, className } ) {
			const {
				wrapperTagName,
				titleTagName,
				title,
				subtitle,
				lede,
				backgroundColor,
				backgroundGradientColor,
				textColor,
				headingPosition,
				headingColumnSize,
				isSlim,
				topDividerType,
				topDividerLevel,
				topDividerColor,
				bottomDividerType,
				bottomDividerLevel,
				bottomDividerColor,
			} = attributes;

			const { textColumnWidth, imageColumnWidth } =
				getColumnSize( headingColumnSize );

			const TagName = wrapperTagName;

			const classes = classnames(
				'smb-section',
				'smb-section-side-heading',
				className
			);

			const topDividerClasses = classnames(
				'smb-section__divider',
				'smb-section__divider--top',
				`smb-section__divider--${ topDividerType }`
			);

			const bottomDividerClasses = classnames(
				'smb-section__divider',
				'smb-section__divider--bottom',
				`smb-section__divider--${ bottomDividerType }`
			);

			const containerClasses = classnames( 'c-container', {
				'u-slim-width': !! isSlim,
			} );

			const rowClasses = classnames( 'c-row', 'c-row--md-margin', {
				'c-row--reverse': 'right' === headingPosition,
			} );

			const headingColClasses = classnames(
				'c-row__col',
				'c-row__col--1-1',
				`c-row__col--md-${ imageColumnWidth }`
			);

			const contentColClasses = classnames(
				'c-row__col',
				'c-row__col--1-1',
				`c-row__col--md-${ textColumnWidth }`
			);

			const sectionStyles = {};
			if ( textColor ) {
				sectionStyles.color = textColor;
			}
			if ( backgroundColor || backgroundGradientColor ) {
				sectionStyles.backgroundColor = backgroundColor;
				sectionStyles.backgroundImage = backgroundGradientColor;
			}

			const innerStyles = {
				paddingTop: Math.abs( topDividerLevel ),
				paddingBottom: Math.abs( bottomDividerLevel ),
			};

			return (
				<TagName
					{ ...useBlockProps.save( {
						className: classes,
						style: sectionStyles,
					} ) }
				>
					{ !! topDividerLevel && (
						<div className={ topDividerClasses }>
							{ divider(
								topDividerType,
								topDividerLevel,
								topDividerColor
							) }
						</div>
					) }

					{ !! bottomDividerLevel && (
						<div className={ bottomDividerClasses }>
							{ divider(
								bottomDividerType,
								bottomDividerLevel,
								bottomDividerColor
							) }
						</div>
					) }

					<div className="smb-section__inner" style={ innerStyles }>
						<div className={ containerClasses }>
							<div className={ rowClasses }>
								<div className={ headingColClasses }>
									{ ! RichText.isEmpty( title ) &&
										! RichText.isEmpty( subtitle ) && (
											<RichText.Content
												tagName="div"
												className="smb-section__subtitle smb-section-side-heading__subtitle"
												value={ subtitle }
											/>
										) }

									{ ! RichText.isEmpty( title ) && (
										<RichText.Content
											tagName={ titleTagName }
											className="smb-section__title smb-section-side-heading__title"
											value={ title }
										/>
									) }

									{ ! RichText.isEmpty( title ) &&
										! RichText.isEmpty( lede ) && (
											<RichText.Content
												tagName="div"
												className="smb-section__lede smb-section-side-heading__lede"
												value={ lede }
											/>
										) }
								</div>
								<div className={ contentColClasses }>
									<div className="smb-section__body smb-section-side-heading__body">
										<InnerBlocks.Content />
									</div>
								</div>
							</div>
						</div>
					</div>
				</TagName>
			);
		},
	},
	{
		attributes: {
			...blockAttributes,
			backgroundColor2: {
				type: 'string',
			},
			backgroundColorAngle: {
				type: 'number',
				default: 0,
			},
		},

		migrate( attributes ) {
			let backgroundGradientColor;
			if ( attributes.backgroundColor2 ) {
				backgroundGradientColor = `linear-gradient(${
					attributes.backgroundColorAngle
				}deg, ${ hexToRgba(
					attributes.backgroundColor
				) } 0%, ${ hexToRgba( attributes.backgroundColor2 ) } 100%)`;
				attributes.backgroundColor = undefined;
			}

			return {
				...attributes,
				backgroundGradientColor,
			};
		},

		supports: {
			align: [ 'wide', 'full' ],
			anchor: true,
		},

		save( { attributes, className } ) {
			const {
				wrapperTagName,
				titleTagName,
				title,
				subtitle,
				lede,
				backgroundColor,
				backgroundColor2,
				backgroundColorAngle,
				textColor,
				headingPosition,
				headingColumnSize,
				isSlim,
				topDividerType,
				topDividerLevel,
				topDividerColor,
				bottomDividerType,
				bottomDividerLevel,
				bottomDividerColor,
			} = attributes;

			const { textColumnWidth, imageColumnWidth } =
				getColumnSize( headingColumnSize );

			const TagName = wrapperTagName;

			const classes = classnames(
				'smb-section',
				'smb-section-side-heading',
				className
			);

			const topDividerClasses = classnames(
				'smb-section__divider',
				'smb-section__divider--top',
				`smb-section__divider--${ topDividerType }`
			);

			const bottomDividerClasses = classnames(
				'smb-section__divider',
				'smb-section__divider--bottom',
				`smb-section__divider--${ bottomDividerType }`
			);

			const containerClasses = classnames( 'c-container', {
				'u-slim-width': !! isSlim,
			} );

			const rowClasses = classnames( 'c-row', 'c-row--md-margin', {
				'c-row--reverse': 'right' === headingPosition,
			} );

			const headingColClasses = classnames(
				'c-row__col',
				'c-row__col--1-1',
				`c-row__col--md-${ imageColumnWidth }`
			);

			const contentColClasses = classnames(
				'c-row__col',
				'c-row__col--1-1',
				`c-row__col--md-${ textColumnWidth }`
			);

			const sectionStyles = {};
			if ( textColor ) {
				sectionStyles.color = textColor;
			}
			if ( backgroundColor ) {
				sectionStyles.backgroundColor = backgroundColor;
				if ( backgroundColor2 ) {
					sectionStyles.backgroundImage = `linear-gradient(${ backgroundColorAngle }deg, ${ backgroundColor } 0%, ${ backgroundColor2 } 100%)`;
				}
			}

			const innerStyles = {
				paddingTop: Math.abs( topDividerLevel ),
				paddingBottom: Math.abs( bottomDividerLevel ),
			};

			return (
				<TagName
					{ ...useBlockProps.save( {
						className: classes,
						style: sectionStyles,
					} ) }
				>
					{ !! topDividerLevel && (
						<div className={ topDividerClasses }>
							{ divider(
								topDividerType,
								topDividerLevel,
								topDividerColor
							) }
						</div>
					) }

					{ !! bottomDividerLevel && (
						<div className={ bottomDividerClasses }>
							{ divider(
								bottomDividerType,
								bottomDividerLevel,
								bottomDividerColor
							) }
						</div>
					) }

					<div className="smb-section__inner" style={ innerStyles }>
						<div className={ containerClasses }>
							<div className={ rowClasses }>
								<div className={ headingColClasses }>
									{ ! RichText.isEmpty( title ) &&
										! RichText.isEmpty( subtitle ) && (
											<RichText.Content
												tagName="div"
												className="smb-section__subtitle smb-section-side-heading__subtitle"
												value={ subtitle }
											/>
										) }

									{ ! RichText.isEmpty( title ) && (
										<RichText.Content
											tagName={ titleTagName }
											className="smb-section__title smb-section-side-heading__title"
											value={ title }
										/>
									) }

									{ ! RichText.isEmpty( title ) &&
										! RichText.isEmpty( lede ) && (
											<RichText.Content
												tagName="div"
												className="smb-section__lede smb-section-side-heading__lede"
												value={ lede }
											/>
										) }
								</div>
								<div className={ contentColClasses }>
									<div className="smb-section__body smb-section-side-heading__body">
										<InnerBlocks.Content />
									</div>
								</div>
							</div>
						</div>
					</div>
				</TagName>
			);
		},
	},
	{
		attributes: {
			...blockAttributes,
			backgroundColor2: {
				type: 'string',
			},
			backgroundColorAngle: {
				type: 'number',
				default: 0,
			},
		},

		supports: {
			align: [ 'wide', 'full' ],
			anchor: true,
		},

		save( { attributes, className } ) {
			const {
				wrapperTagName,
				titleTagName,
				title,
				backgroundColor,
				backgroundColor2,
				backgroundColorAngle,
				textColor,
				headingPosition,
				headingColumnSize,
				isSlim,
				topDividerType,
				topDividerLevel,
				topDividerColor,
				bottomDividerType,
				bottomDividerLevel,
				bottomDividerColor,
			} = attributes;

			const { textColumnWidth, imageColumnWidth } =
				getColumnSize( headingColumnSize );

			const Wrapper = wrapperTagName;

			const classes = classnames(
				'smb-section',
				'smb-section-side-heading',
				className
			);

			const topDividerClasses = classnames(
				'smb-section__divider',
				'smb-section__divider--top',
				`smb-section__divider--${ topDividerType }`
			);

			const bottomDividerClasses = classnames(
				'smb-section__divider',
				'smb-section__divider--bottom',
				`smb-section__divider--${ bottomDividerType }`
			);

			const containerClasses = classnames( 'c-container', {
				'u-slim-width': !! isSlim,
			} );

			const rowClasses = classnames( 'c-row', 'c-row--md-margin', {
				'c-row--reverse': 'right' === headingPosition,
			} );

			const headingColClasses = classnames(
				'c-row__col',
				'c-row__col--1-1',
				`c-row__col--md-${ imageColumnWidth }`
			);

			const contentColClasses = classnames(
				'c-row__col',
				'c-row__col--1-1',
				`c-row__col--md-${ textColumnWidth }`
			);

			const sectionStyles = {};
			if ( textColor ) {
				sectionStyles.color = textColor;
			}
			if ( backgroundColor ) {
				sectionStyles.backgroundColor = backgroundColor;
				if ( backgroundColor2 ) {
					sectionStyles.backgroundImage = `linear-gradient(${ backgroundColorAngle }deg, ${ backgroundColor } 0%, ${ backgroundColor2 } 100%)`;
				}
			}

			const innerStyles = {
				paddingTop: Math.abs( topDividerLevel ),
				paddingBottom: Math.abs( bottomDividerLevel ),
			};

			return (
				<Wrapper className={ classes } style={ sectionStyles }>
					{ !! topDividerLevel && (
						<div className={ topDividerClasses }>
							{ divider(
								topDividerType,
								topDividerLevel,
								topDividerColor
							) }
						</div>
					) }

					{ !! bottomDividerLevel && (
						<div className={ bottomDividerClasses }>
							{ divider(
								bottomDividerType,
								bottomDividerLevel,
								bottomDividerColor
							) }
						</div>
					) }

					<div className="smb-section__inner" style={ innerStyles }>
						<div className={ containerClasses }>
							<div className={ rowClasses }>
								<div className={ headingColClasses }>
									{ ! RichText.isEmpty( title ) && (
										<RichText.Content
											tagName={ titleTagName }
											className="smb-section__title"
											value={ title }
										/>
									) }
								</div>
								<div className={ contentColClasses }>
									<div className="smb-section__body">
										<InnerBlocks.Content />
									</div>
								</div>
							</div>
						</div>
					</div>
				</Wrapper>
			);
		},
	},
];

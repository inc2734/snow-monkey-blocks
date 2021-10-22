import classnames from 'classnames';
import hexToRgba from 'hex-to-rgba';
import { omit, without } from 'lodash';

import { RichText, InnerBlocks, useBlockProps } from '@wordpress/block-editor';

import metadata from './block.json';
const blockAttributes = metadata.attributes;

export default [
	{
		attributes: {
			...blockAttributes,
			imageSize: {
				type: 'string',
				default: 'l',
			},
			contentSize: {
				type: 'string',
				default: 's',
			},
			contentHorizontalPosition: {
				type: 'string',
				default: 's',
			},
		},

		supports: {
			align: [ 'wide', 'full' ],
			anchor: true,
		},

		migrate( attributes ) {
			let newAttributes = { ...attributes };

			if ( !! newAttributes.imageSize ) {
				switch ( newAttributes.imageSize ) {
					case 'm':
						newAttributes.imageSize = '';
						break;
					case 'l':
						newAttributes.imageSize = '40';
						break;
					case 'xl':
						newAttributes.imageSize = '80';
						break;
					default:
						newAttributes.imageSize = '';
				}
			}

			if ( !! newAttributes.contentSize ) {
				switch ( newAttributes.contentSize ) {
					case 'xs':
						newAttributes.contentSize = '-40';
						break;
					case 's':
						newAttributes.contentSize = '-20';
						break;
					case 'm':
						newAttributes.contentSize = '';
						break;
					case 'l':
						newAttributes.contentSize = '20';
						break;
					case 'xl':
						newAttributes.contentSize = '40';
						break;
					default:
						newAttributes.contentSize = '';
				}
			}

			if ( !! newAttributes.contentHorizontalPosition ) {
				switch ( newAttributes.contentHorizontalPosition ) {
					case 'xs':
						newAttributes.contentHorizontalPosition = '5';
						break;
					case 's':
						newAttributes.contentHorizontalPosition = '10';
						break;
					case 'm':
						newAttributes.contentHorizontalPosition = '15';
						break;
					case 'l':
						newAttributes.contentHorizontalPosition = '20';
						break;
					case 'xl':
						newAttributes.contentHorizontalPosition = '25';
						break;
					default:
						newAttributes.contentHorizontalPosition = '';
				}
			}

			if ( !! newAttributes.contentVerticalPosition ) {
				switch ( newAttributes.contentVerticalPosition ) {
					case 'txl':
						newAttributes.contentVerticalPosition = 't100';
						break;
					case 'tl':
						newAttributes.contentVerticalPosition = 't80';
						break;
					case 'tm':
						newAttributes.contentVerticalPosition = 't60';
						break;
					case 'ts':
						newAttributes.contentVerticalPosition = 't40';
						break;
					case 'bs':
						newAttributes.contentVerticalPosition = 'b40';
						break;
					case 'bm':
						newAttributes.contentVerticalPosition = 'b60';
						break;
					case 'bl':
						newAttributes.contentVerticalPosition = 'b80';
						break;
					case 'bxl':
						newAttributes.contentVerticalPosition = 'b100';
						break;
					default:
						newAttributes.contentVerticalPosition = '';
				}
			}

			if ( !! newAttributes.className ) {
				newAttributes.className = without(
					newAttributes.className.split( ' ' ),
					'smb-section--left',
					'smb-section--center',
					'smb-section--right'
				).join( ' ' );
			}

			if ( ! newAttributes.className ) {
				newAttributes = omit( newAttributes, 'className' );
			}

			return {
				...newAttributes,
			};
		},

		save( { attributes, className } ) {
			const {
				wrapperTagName,
				titleTagName,
				title,
				subtitle,
				lede,
				imageID,
				imageURL,
				imageAlt,
				imageWidth,
				imageHeight,
				imageMediaType,
				textColor,
				imagePosition,
				imageSize,
				verticalAlignment,
				contentSize,
				contentHorizontalPosition,
				contentVerticalPosition,
				contentBackgroundColor,
				contentBackgroundOpacity,
				contentPadding,
				removeContentOutsidePadding,
				shadowColor,
				shadowHorizontalPosition,
				shadowVerticalPosition,
				maskColor,
				maskOpacity,
				mobileOrder,
				contentsAlignment,
			} = attributes;

			const TagName = wrapperTagName;

			const classes = classnames(
				'smb-section',
				'smb-section-break-the-grid',
				`smb-section-break-the-grid--${ imagePosition }`,
				{
					[ `smb-section-break-the-grid--vertical-${ contentVerticalPosition }` ]:
						contentVerticalPosition &&
						verticalAlignment &&
						'middle' !== verticalAlignment,
					[ `smb-section-break-the-grid--mobile-${ mobileOrder }` ]: !! mobileOrder,
					[ `smb-section--${ contentsAlignment }` ]: !! contentsAlignment,
					[ className ]: !! className,
				}
			);

			const rowClasses = classnames( 'c-row', 'c-row--margin', {
				'c-row--lg-top': 'top' === verticalAlignment,
				'c-row--lg-middle': 'center' === verticalAlignment,
				'c-row--lg-bottom': 'bottom' === verticalAlignment,
			} );

			const textColumnClasses = classnames(
				'c-row__col',
				'c-row__col--1-1',
				'c-row__col--lg-1-2'
			);
			const imageColumnClasses = classnames(
				'c-row__col',
				'c-row__col--1-1',
				'c-row__col--lg-1-2'
			);

			const figureClasses = classnames(
				'smb-section-break-the-grid__figure',
				{
					[ `smb-section-break-the-grid__figure--w-${ imageSize }` ]: !! imageSize,
				}
			);

			const contentClasses = classnames(
				'smb-section-break-the-grid__content',
				{
					[ `smb-section-break-the-grid__content--w-${ contentSize }` ]: !! contentSize,
					[ `smb-section-break-the-grid__content--p-${ contentPadding }` ]: !! contentPadding,
					[ `smb-section-break-the-grid__content--horizontal-${ contentHorizontalPosition }` ]: !! contentHorizontalPosition,
					'smb-section-break-the-grid__content--remove-outside-p':
						contentPadding && removeContentOutsidePadding,
				}
			);

			const shadowClasses = classnames(
				'smb-section-break-the-grid__shadow'
			);

			const maskClasses = classnames(
				'smb-section-break-the-grid__mask'
			);

			const hasTitle =
				! RichText.isEmpty( title ) && 'none' !== titleTagName;
			const hasSubTitle = ! RichText.isEmpty( subtitle );
			const hasLede = ! RichText.isEmpty( lede );

			const sectionStyles = {
				color: textColor || undefined,
			};

			const shadowStyles = {};
			if ( shadowColor ) {
				shadowStyles.backgroundColor = shadowColor;
			}
			if ( shadowHorizontalPosition || shadowVerticalPosition ) {
				shadowStyles.transform = `translate(${
					shadowHorizontalPosition || 0
				}%, ${ shadowVerticalPosition || 0 }%)`;
			}

			const contentStyles = {
				backgroundColor:
					contentBackgroundColor &&
					hexToRgba(
						contentBackgroundColor,
						contentBackgroundOpacity
					),
			};

			const maskStyles = {};
			if ( maskColor ) {
				maskStyles.backgroundColor = maskColor;
			}

			const figureStyles = {
				opacity: !! maskColor ? maskOpacity : undefined,
			};

			const image = (
				<img
					src={ imageURL }
					alt={ imageAlt }
					width={ !! imageWidth && imageWidth }
					height={ !! imageHeight && imageHeight }
					className={ `wp-image-${ imageID }` }
					style={ figureStyles }
				/>
			);

			const video = (
				<video
					controls
					src={ imageURL }
					width={ !! imageWidth && imageWidth }
					height={ !! imageHeight && imageHeight }
					style={ figureStyles }
				/>
			);

			let figure;
			if ( !! imageURL ) {
				if (
					'image' === imageMediaType ||
					undefined === imageMediaType
				) {
					figure = image;
				} else if ( 'video' === imageMediaType ) {
					figure = video;
				}
			}

			return (
				<TagName
					{ ...useBlockProps.save( {
						className: classes,
						style: sectionStyles,
					} ) }
				>
					<div className="smb-section__inner">
						<div className="c-container">
							<div className={ rowClasses }>
								<div className={ textColumnClasses }>
									<div
										className={ contentClasses }
										style={ contentStyles }
									>
										{ hasTitle && hasSubTitle && (
											<RichText.Content
												tagName="div"
												className="smb-section__subtitle smb-section-break-the-grid__subtitle"
												value={ subtitle }
											/>
										) }

										{ hasTitle && (
											<RichText.Content
												tagName={ titleTagName }
												className="smb-section__title smb-section-break-the-grid__title"
												value={ title }
											/>
										) }

										{ hasTitle && hasLede && (
											<div className="smb-section__lede-wrapper smb-section-break-the-grid__lede-wrapper">
												<RichText.Content
													tagName="div"
													className="smb-section__lede smb-section-break-the-grid__lede"
													value={ lede }
												/>
											</div>
										) }

										<div className="smb-section__body smb-section-break-the-grid__body">
											<InnerBlocks.Content />
										</div>
									</div>
								</div>
								<div className={ imageColumnClasses }>
									<div className={ figureClasses }>
										{ shadowColor && (
											<div
												className={ shadowClasses }
												style={ shadowStyles }
											/>
										) }

										{ 0 <
											Number(
												( 1 - maskOpacity ).toFixed( 1 )
											) && (
											<div
												className={ maskClasses }
												style={ maskStyles }
											/>
										) }

										{ figure }
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
				imageID,
				imageURL,
				imageAlt,
				imageWidth,
				imageHeight,
				imageMediaType,
				textColor,
				imagePosition,
				imageSize,
				verticalAlignment,
				contentSize,
				contentHorizontalPosition,
				contentVerticalPosition,
				contentBackgroundColor,
				contentBackgroundOpacity,
				contentPadding,
				removeContentOutsidePadding,
				shadowColor,
				shadowHorizontalPosition,
				shadowVerticalPosition,
				maskColor,
				maskOpacity,
				mobileOrder,
			} = attributes;

			const TagName = wrapperTagName;

			const classes = classnames(
				'smb-section',
				'smb-section-break-the-grid',
				`smb-section-break-the-grid--${ imagePosition }`,
				{
					[ `smb-section-break-the-grid--vertical-${ contentVerticalPosition }` ]:
						contentVerticalPosition &&
						verticalAlignment &&
						'middle' !== verticalAlignment,
					[ `smb-section-break-the-grid--mobile-${ mobileOrder }` ]: !! mobileOrder,
					[ className ]: !! className,
				}
			);

			const rowClasses = classnames( 'c-row', 'c-row--margin', {
				'c-row--lg-top': 'top' === verticalAlignment,
				'c-row--lg-middle': 'center' === verticalAlignment,
				'c-row--lg-bottom': 'bottom' === verticalAlignment,
			} );

			const textColumnClasses = classnames(
				'c-row__col',
				'c-row__col--1-1',
				'c-row__col--lg-1-2'
			);
			const imageColumnClasses = classnames(
				'c-row__col',
				'c-row__col--1-1',
				'c-row__col--lg-1-2'
			);

			const figureClasses = classnames(
				'smb-section-break-the-grid__figure',
				{
					[ `smb-section-break-the-grid__figure--w-${ imageSize }` ]: !! imageSize,
				}
			);

			const contentClasses = classnames(
				'smb-section-break-the-grid__content',
				{
					[ `smb-section-break-the-grid__content--w-${ contentSize }` ]: !! contentSize,
					[ `smb-section-break-the-grid__content--p-${ contentPadding }` ]: !! contentPadding,
					[ `smb-section-break-the-grid__content--horizontal-${ contentHorizontalPosition }` ]: !! contentHorizontalPosition,
					'smb-section-break-the-grid__content--remove-outside-p':
						contentPadding && removeContentOutsidePadding,
				}
			);

			const shadowClasses = classnames(
				'smb-section-break-the-grid__shadow'
			);

			const maskClasses = classnames(
				'smb-section-break-the-grid__mask'
			);

			const sectionStyles = {
				color: textColor || undefined,
			};

			const shadowStyles = {};
			if ( shadowColor ) {
				shadowStyles.backgroundColor = shadowColor;
			}
			if ( shadowHorizontalPosition || shadowVerticalPosition ) {
				shadowStyles.transform = `translate(${
					shadowHorizontalPosition || 0
				}%, ${ shadowVerticalPosition || 0 }%)`;
			}

			const contentStyles = {
				backgroundColor:
					contentBackgroundColor &&
					hexToRgba(
						contentBackgroundColor,
						contentBackgroundOpacity
					),
			};

			const maskStyles = {};
			if ( maskColor ) {
				maskStyles.backgroundColor = maskColor;
			}

			const figureStyles = {
				opacity: !! maskColor ? maskOpacity : undefined,
			};

			const image = (
				<img
					src={ imageURL }
					alt={ imageAlt }
					width={ !! imageWidth && imageWidth }
					height={ !! imageHeight && imageHeight }
					className={ `wp-image-${ imageID }` }
					style={ figureStyles }
				/>
			);

			const video = (
				<video
					controls
					src={ imageURL }
					width={ !! imageWidth && imageWidth }
					height={ !! imageHeight && imageHeight }
					style={ figureStyles }
				/>
			);

			let figure;
			if ( !! imageURL ) {
				if (
					'image' === imageMediaType ||
					undefined === imageMediaType
				) {
					figure = image;
				} else if ( 'video' === imageMediaType ) {
					figure = video;
				}
			}

			return (
				<TagName
					{ ...useBlockProps.save( {
						className: classes,
						style: sectionStyles,
					} ) }
				>
					<div className="c-container">
						<div className={ rowClasses }>
							<div className={ textColumnClasses }>
								<div
									className={ contentClasses }
									style={ contentStyles }
								>
									{ ! RichText.isEmpty( title ) &&
										! RichText.isEmpty( subtitle ) &&
										'none' !== titleTagName && (
											<RichText.Content
												tagName="div"
												className="smb-section__subtitle smb-section-break-the-grid__subtitle"
												value={ subtitle }
											/>
										) }

									{ ! RichText.isEmpty( title ) &&
										'none' !== titleTagName && (
											<RichText.Content
												tagName={ titleTagName }
												className="smb-section__title smb-section-break-the-grid__title"
												value={ title }
											/>
										) }

									{ ! RichText.isEmpty( title ) &&
										! RichText.isEmpty( lede ) &&
										'none' !== titleTagName && (
											<RichText.Content
												tagName="div"
												className="smb-section__lede smb-section-break-the-grid__lede"
												value={ lede }
											/>
										) }

									<div className="smb-section__body smb-section-break-the-grid__body">
										<InnerBlocks.Content />
									</div>
								</div>
							</div>
							<div className={ imageColumnClasses }>
								<div className={ figureClasses }>
									{ shadowColor && (
										<div
											className={ shadowClasses }
											style={ shadowStyles }
										/>
									) }

									{ 0 <
										Number(
											( 1 - maskOpacity ).toFixed( 1 )
										) && (
										<div
											className={ maskClasses }
											style={ maskStyles }
										/>
									) }

									{ figure }
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
			verticalAlignment: {
				type: 'string',
				default: 'middle',
			},
		},

		migrate( attributes ) {
			return {
				...attributes,
				verticalAlignment:
					'middle' === attributes.verticalAlignment
						? 'center'
						: attributes.verticalAlignment,
			};
		},

		save( { attributes, className } ) {
			const {
				wrapperTagName,
				titleTagName,
				title,
				subtitle,
				lede,
				imageID,
				imageURL,
				imageAlt,
				imageWidth,
				imageHeight,
				imageMediaType,
				textColor,
				imagePosition,
				imageSize,
				verticalAlignment,
				contentSize,
				contentHorizontalPosition,
				contentVerticalPosition,
				contentBackgroundColor,
				contentBackgroundOpacity,
				contentPadding,
				removeContentOutsidePadding,
				shadowColor,
				shadowHorizontalPosition,
				shadowVerticalPosition,
				maskColor,
				maskOpacity,
				mobileOrder,
			} = attributes;

			const Wrapper = wrapperTagName;

			const classes = classnames(
				'smb-section',
				'smb-section-break-the-grid',
				`smb-section-break-the-grid--${ imagePosition }`,
				{
					[ `smb-section-break-the-grid--vertical-${ contentVerticalPosition }` ]:
						contentVerticalPosition &&
						verticalAlignment &&
						'middle' !== verticalAlignment,
					[ `smb-section-break-the-grid--mobile-${ mobileOrder }` ]: !! mobileOrder,
					[ className ]: !! className,
				}
			);

			const rowClasses = classnames( 'c-row', 'c-row--margin', {
				[ `c-row--lg-${ verticalAlignment }` ]: true,
			} );

			const textColumnClasses = classnames(
				'c-row__col',
				'c-row__col--1-1',
				'c-row__col--lg-1-2'
			);
			const imageColumnClasses = classnames(
				'c-row__col',
				'c-row__col--1-1',
				'c-row__col--lg-1-2'
			);

			const figureClasses = classnames(
				'smb-section-break-the-grid__figure',
				{
					[ `smb-section-break-the-grid__figure--w-${ imageSize }` ]: !! imageSize,
				}
			);

			const contentClasses = classnames(
				'smb-section-break-the-grid__content',
				{
					[ `smb-section-break-the-grid__content--w-${ contentSize }` ]: !! contentSize,
					[ `smb-section-break-the-grid__content--p-${ contentPadding }` ]: !! contentPadding,
					[ `smb-section-break-the-grid__content--horizontal-${ contentHorizontalPosition }` ]: !! contentHorizontalPosition,
					'smb-section-break-the-grid__content--remove-outside-p':
						contentPadding && removeContentOutsidePadding,
				}
			);

			const shadowClasses = classnames(
				'smb-section-break-the-grid__shadow'
			);

			const maskClasses = classnames(
				'smb-section-break-the-grid__mask'
			);

			const sectionStyles = {
				color: textColor || undefined,
			};

			const shadowStyles = {};
			if ( shadowColor ) {
				shadowStyles.backgroundColor = shadowColor;
			}
			if ( shadowHorizontalPosition || shadowVerticalPosition ) {
				shadowStyles.transform = `translate(${
					shadowHorizontalPosition || 0
				}%, ${ shadowVerticalPosition || 0 }%)`;
			}

			const contentStyles = {
				backgroundColor:
					contentBackgroundColor &&
					hexToRgba(
						contentBackgroundColor,
						contentBackgroundOpacity
					),
			};

			const maskStyles = {};
			if ( maskColor ) {
				maskStyles.backgroundColor = maskColor;
			}

			const figureStyles = {
				opacity: maskOpacity,
			};

			const image = (
				<img
					src={ imageURL }
					alt={ imageAlt }
					width={ !! imageWidth && imageWidth }
					height={ !! imageHeight && imageHeight }
					className={ `wp-image-${ imageID }` }
					style={ figureStyles }
				/>
			);

			const video = (
				<video
					controls
					src={ imageURL }
					width={ !! imageWidth && imageWidth }
					height={ !! imageHeight && imageHeight }
					style={ figureStyles }
				/>
			);

			let figure;
			if ( !! imageURL ) {
				if (
					'image' === imageMediaType ||
					undefined === imageMediaType
				) {
					figure = image;
				} else if ( 'video' === imageMediaType ) {
					figure = video;
				}
			}

			return (
				<Wrapper className={ classes } style={ sectionStyles }>
					<div className="c-container">
						<div className={ rowClasses }>
							<div className={ textColumnClasses }>
								<div
									className={ contentClasses }
									style={ contentStyles }
								>
									{ ! RichText.isEmpty( title ) &&
										! RichText.isEmpty( subtitle ) &&
										'none' !== titleTagName && (
											<RichText.Content
												tagName="div"
												className="smb-section__subtitle smb-section-break-the-grid__subtitle"
												value={ subtitle }
											/>
										) }

									{ ! RichText.isEmpty( title ) &&
										'none' !== titleTagName && (
											<RichText.Content
												tagName={ titleTagName }
												className="smb-section__title smb-section-break-the-grid__title"
												value={ title }
											/>
										) }

									{ ! RichText.isEmpty( title ) &&
										! RichText.isEmpty( lede ) &&
										'none' !== titleTagName && (
											<RichText.Content
												tagName="div"
												className="smb-section__lede smb-section-break-the-grid__lede"
												value={ lede }
											/>
										) }

									<div className="smb-section__body smb-section-break-the-grid__body">
										<InnerBlocks.Content />
									</div>
								</div>
							</div>
							<div className={ imageColumnClasses }>
								<div className={ figureClasses }>
									{ shadowColor && (
										<div
											className={ shadowClasses }
											style={ shadowStyles }
										/>
									) }

									{ 0 <
										Number(
											( 1 - maskOpacity ).toFixed( 1 )
										) && (
										<div
											className={ maskClasses }
											style={ maskStyles }
										/>
									) }

									{ figure }
								</div>
							</div>
						</div>
					</div>
				</Wrapper>
			);
		},
	},
];

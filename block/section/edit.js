import classnames from 'classnames';
import { times } from 'lodash';

import {
	ColorPalette,
	InnerBlocks,
	InspectorControls,
	RichText,
	useBlockProps,
	__experimentalUseInnerBlocksProps as useInnerBlocksProps,
	__experimentalPanelColorGradientSettings as PanelColorGradientSettings,
} from '@wordpress/block-editor';

import {
	BaseControl,
	Button,
	PanelBody,
	RangeControl,
	SelectControl,
	ToggleControl,
} from '@wordpress/components';

import { useSelect } from '@wordpress/data';

import { __ } from '@wordpress/i18n';

import { toNumber, divider } from '@smb/helper';

export default function ( {
	attributes,
	setAttributes,
	isSelected,
	className,
	clientId,
} ) {
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
		textColor,
		isSlim,
		topDividerType,
		topDividerLevel,
		topDividerColor,
		bottomDividerType,
		bottomDividerLevel,
		bottomDividerColor,
	} = attributes;

	const hasInnerBlocks = useSelect(
		( select ) => {
			const { getBlock } = select( 'core/block-editor' );
			const block = getBlock( clientId );
			return !! ( block && block.innerBlocks.length );
		},
		[ clientId ]
	);

	const wrapperTagNames = [ 'div', 'section', 'aside' ];
	const titleTagNames = [ 'h1', 'h2', 'h3', 'none' ];

	const TagName = wrapperTagName;
	const classes = classnames( 'smb-section', className );

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

	const sectionStyles = {};
	if ( textColor ) {
		sectionStyles.color = textColor;
	}
	if ( 0 < backgroundVerticalPosition ) {
		if ( !! topDividerLevel ) {
			sectionStyles.backgroundColor = topDividerColor;
		}
	} else if ( 0 > backgroundVerticalPosition ) {
		if ( !! bottomDividerLevel ) {
			sectionStyles.backgroundColor = bottomDividerColor;
		}
	}

	const backgroundStyles = {};
	if ( backgroundColor || backgroundGradientColor ) {
		backgroundStyles.backgroundColor = backgroundColor;
		backgroundStyles.backgroundImage = backgroundGradientColor;

		if ( ! isBackgroundNoOver ) {
			if ( backgroundHorizontalPosition || backgroundVerticalPosition ) {
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

	const innerStyles = {
		paddingTop: Math.abs( topDividerLevel ),
		paddingBottom: Math.abs( bottomDividerLevel ),
	};

	const blockProps = useBlockProps( {
		className: classes,
		style: sectionStyles,
	} );

	const innerBlocksProps = useInnerBlocksProps(
		{
			className: 'smb-section__body',
		},
		{
			renderAppender: hasInnerBlocks
				? undefined
				: InnerBlocks.ButtonBlockAppender,
		}
	);

	const onChangeIsSlim = ( value ) =>
		setAttributes( {
			isSlim: value,
		} );

	const onChangeBackgroundHorizontalPosition = ( value ) =>
		setAttributes( {
			backgroundHorizontalPosition: toNumber( value, -90, 90 ),
		} );

	const onChangeBackgroundVerticalPosition = ( value ) =>
		setAttributes( {
			backgroundVerticalPosition: toNumber( value, -90, 90 ),
		} );

	const onChangeIsBackgroundNoOver = ( value ) =>
		setAttributes( {
			isBackgroundNoOver: value,
		} );

	const onChangeBackgroundColor = ( value ) =>
		setAttributes( {
			backgroundColor: value,
		} );

	const onChangeBackgroundGradientColor = ( value ) =>
		setAttributes( {
			backgroundGradientColor: value,
		} );

	const onChangeTextColor = ( value ) =>
		setAttributes( {
			textColor: value,
		} );

	const onChangeTopDividerType = ( value ) =>
		setAttributes( {
			topDividerType: value,
		} );

	const onChangeTopDividerLevel = ( value ) =>
		setAttributes( {
			topDividerLevel: toNumber( value, -100, 100 ),
		} );

	const onChangeTopDividerColor = ( value ) =>
		setAttributes( {
			topDividerColor: value,
		} );

	const onChangeBottomDividerType = ( value ) =>
		setAttributes( {
			bottomDividerType: value,
		} );

	const onChangeBottomDividerLevel = ( value ) =>
		setAttributes( {
			bottomDividerLevel: toNumber( value, -100, 100 ),
		} );

	const onChangeBottomDividerColor = ( value ) =>
		setAttributes( {
			bottomDividerColor: value,
		} );

	const onChangeSubtitle = ( value ) =>
		setAttributes( {
			subtitle: value,
		} );

	const onChangeTitle = ( value ) =>
		setAttributes( {
			title: value,
		} );

	const onChangeLede = ( value ) =>
		setAttributes( {
			lede: value,
		} );

	return (
		<>
			<InspectorControls>
				<PanelBody
					title={ __( 'Block Settings', 'snow-monkey-blocks' ) }
				>
					<BaseControl
						label={ __( 'Wrapper Tag', 'snow-monkey-blocks' ) }
						id="snow-monkey-blocks/section/wrapper-tag-name"
					>
						<div className="smb-list-icon-selector">
							{ times( wrapperTagNames.length, ( index ) => {
								const onClickWrapperTagName = () =>
									setAttributes( {
										wrapperTagName:
											wrapperTagNames[ index ],
									} );

								const isPrimary =
									wrapperTagName === wrapperTagNames[ index ];
								return (
									<Button
										isPrimary={ isPrimary }
										isSecondary={ ! isPrimary }
										onClick={ onClickWrapperTagName }
										key={ index }
									>
										{ wrapperTagNames[ index ] }
									</Button>
								);
							} ) }
						</div>
					</BaseControl>

					<BaseControl
						label={ __( 'Title Tag', 'snow-monkey-blocks' ) }
						id="snow-monkey-blocks/section/title-tag-name"
					>
						<div className="smb-list-icon-selector">
							{ times( titleTagNames.length, ( index ) => {
								const onClickTitleTagName = () =>
									setAttributes( {
										titleTagName: titleTagNames[ index ],
									} );

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
						label={ __(
							'Make the content width slim',
							'snow-monkey-blocks'
						) }
						checked={ isSlim }
						onChange={ onChangeIsSlim }
					/>

					{ ( backgroundColor || backgroundGradientColor ) && (
						<>
							<RangeControl
								label={ __(
									'Background Position (Left / Right)',
									'snow-monkey-blocks'
								) }
								value={ backgroundHorizontalPosition }
								onChange={
									onChangeBackgroundHorizontalPosition
								}
								min="-90"
								max="90"
							/>

							<RangeControl
								label={ __(
									'Background Position (Top / Bottom)',
									'snow-monkey-blocks'
								) }
								value={ backgroundVerticalPosition }
								onChange={ onChangeBackgroundVerticalPosition }
								min="-90"
								max="90"
							/>

							{ ( 0 !== backgroundHorizontalPosition ||
								0 !== backgroundVerticalPosition ) && (
								<ToggleControl
									label={ __(
										"Make sure the background doesn't overflow to the outside",
										'snow-monkey-blocks'
									) }
									checked={ isBackgroundNoOver }
									onChange={ onChangeIsBackgroundNoOver }
								/>
							) }
						</>
					) }
				</PanelBody>

				<PanelColorGradientSettings
					title={ __( 'Color Settings', 'snow-monkey-blocks' ) }
					initialOpen={ false }
					settings={ [
						{
							colorValue: backgroundColor,
							gradientValue: backgroundGradientColor,
							onColorChange: onChangeBackgroundColor,
							onGradientChange: onChangeBackgroundGradientColor,
							label: __(
								'Background Color',
								'snow-monkey-blocks'
							),
						},
						{
							colorValue: textColor,
							onColorChange: onChangeTextColor,
							label: __( 'Text Color', 'snow-monkey-blocks' ),
						},
					] }
				></PanelColorGradientSettings>

				<PanelBody
					title={ __( 'Top divider Settings', 'snow-monkey-blocks' ) }
					initialOpen={ false }
				>
					<SelectControl
						label={ __( 'Type', 'snow-monkey-blocks' ) }
						value={ topDividerType }
						onChange={ onChangeTopDividerType }
						options={ [
							{
								value: 'tilt',
								label: __( 'Tilt', 'snow-monkey-blocks' ),
							},
							{
								value: 'curve',
								label: __( 'Curve', 'snow-monkey-blocks' ),
							},
							{
								value: 'wave',
								label: __( 'Wave', 'snow-monkey-blocks' ),
							},
							{
								value: 'triangle',
								label: __( 'Triangle', 'snow-monkey-blocks' ),
							},
						] }
					/>

					<RangeControl
						label={ __( 'Level', 'snow-monkey-blocks' ) }
						value={ topDividerLevel }
						onChange={ onChangeTopDividerLevel }
						min="-100"
						max="100"
					/>

					<BaseControl
						className="editor-color-palette-control"
						label={ __( 'Color', 'snow-monkey-blocks' ) }
						id="snow-monkey-blocks/section/top-divider-color"
					>
						<ColorPalette
							className="editor-color-palette-control__color-palette"
							value={ topDividerColor }
							onChange={ onChangeTopDividerColor }
						/>
					</BaseControl>
				</PanelBody>

				<PanelBody
					title={ __(
						'Bottom divider Settings',
						'snow-monkey-blocks'
					) }
					initialOpen={ false }
				>
					<SelectControl
						label={ __( 'Type', 'snow-monkey-blocks' ) }
						value={ bottomDividerType }
						onChange={ onChangeBottomDividerType }
						options={ [
							{
								value: 'tilt',
								label: __( 'Tilt', 'snow-monkey-blocks' ),
							},
							{
								value: 'curve',
								label: __( 'Curve', 'snow-monkey-blocks' ),
							},
							{
								value: 'wave',
								label: __( 'Wave', 'snow-monkey-blocks' ),
							},
							{
								value: 'triangle',
								label: __( 'Triangle', 'snow-monkey-blocks' ),
							},
						] }
					/>

					<RangeControl
						label={ __( 'Level', 'snow-monkey-blocks' ) }
						value={ bottomDividerLevel }
						onChange={ onChangeBottomDividerLevel }
						min="-100"
						max="100"
					/>

					<BaseControl
						className="editor-color-palette-control"
						label={ __( 'Color', 'snow-monkey-blocks' ) }
						id="snow-monkey-blocks/section/bottom-divider-color"
					>
						<ColorPalette
							className="editor-color-palette-control__color-palette"
							value={ bottomDividerColor }
							onChange={ onChangeBottomDividerColor }
						/>
					</BaseControl>
				</PanelBody>
			</InspectorControls>

			<TagName { ...blockProps }>
				{ ( 0 < Object.keys( backgroundStyles ).length ||
					!! topDividerLevel ||
					!! bottomDividerLevel ) && (
					<div
						className="smb-section__background"
						style={ backgroundStyles }
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
					</div>
				) }

				<div className="smb-section__inner" style={ innerStyles }>
					<div className={ containerClasses }>
						{ ! RichText.isEmpty( title ) &&
							( ! RichText.isEmpty( subtitle ) || isSelected ) &&
							'none' !== titleTagName && (
								<RichText
									className="smb-section__subtitle"
									value={ subtitle }
									onChange={ onChangeSubtitle }
									placeholder={ __(
										'Write subtitle…',
										'snow-monkey-blocks'
									) }
								/>
							) }

						{ ( ! RichText.isEmpty( title ) || isSelected ) &&
							'none' !== titleTagName && (
								<RichText
									className="smb-section__title"
									tagName={ titleTagName }
									value={ title }
									onChange={ onChangeTitle }
									placeholder={ __(
										'Write title…',
										'snow-monkey-blocks'
									) }
								/>
							) }

						{ ! RichText.isEmpty( title ) &&
							( ! RichText.isEmpty( lede ) || isSelected ) &&
							'none' !== titleTagName && (
								<RichText
									className="smb-section__lede"
									value={ lede }
									onChange={ onChangeLede }
									placeholder={ __(
										'Write lede…',
										'snow-monkey-blocks'
									) }
								/>
							) }

						<div { ...innerBlocksProps } />
					</div>
				</div>
			</TagName>
		</>
	);
}

import classnames from 'classnames';
import { times } from 'lodash';

import { __ } from '@wordpress/i18n';

import {
	PanelBody,
	BaseControl,
	SelectControl,
	RangeControl,
	Button,
	ToggleControl,
} from '@wordpress/components';

import {
	RichText,
	InnerBlocks,
	InspectorControls,
	PanelColorSettings,
	ColorPalette,
	__experimentalBlock as Block,
} from '@wordpress/block-editor';

import { toNumber, divider } from '@smb/helper';

export default function( {
	attributes,
	setAttributes,
	isSelected,
	className,
} ) {
	const {
		wrapperTagName,
		titleTagName,
		title,
		subtitle,
		lede,
		backgroundHorizontalPosition,
		backgroundVerticalPosition,
		backgroundColor,
		backgroundColor2,
		backgroundColorAngle,
		textColor,
		isSlim,
		topDividerType,
		topDividerLevel,
		topDividerColor,
		bottomDividerType,
		bottomDividerLevel,
		bottomDividerColor,
	} = attributes;

	const wrapperTagNames = [ 'div', 'section', 'aside' ];
	const titleTagNames = [ 'h1', 'h2', 'h3', 'none' ];

	const BlockWrapper = Block[ wrapperTagName ];
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
	if ( backgroundColor ) {
		backgroundStyles.backgroundColor = backgroundColor;
		if ( backgroundColor2 ) {
			backgroundStyles.backgroundImage = `linear-gradient(${ backgroundColorAngle }deg, ${ backgroundColor } 0%, ${ backgroundColor2 } 100%)`;
		}

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

	const innerStyles = {
		paddingTop: Math.abs( topDividerLevel ),
		paddingBottom: Math.abs( bottomDividerLevel ),
	};

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

	const onChangeBackgroundColor = ( value ) =>
		setAttributes( {
			backgroundColor: value,
		} );

	const onChangeTextColor = ( value ) =>
		setAttributes( {
			textColor: value,
		} );

	const onChangeBackgroundColor2 = ( value ) =>
		setAttributes( {
			backgroundColor2: value,
		} );

	const onChangeBackgroundColorAngle = ( value ) =>
		setAttributes( {
			backgroundColorAngle: toNumber( value, 0, 360 ),
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

					{ backgroundColor && (
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
						</>
					) }
				</PanelBody>

				<PanelColorSettings
					title={ __( 'Color Settings', 'snow-monkey-blocks' ) }
					initialOpen={ false }
					colorSettings={ [
						{
							value: backgroundColor,
							onChange: onChangeBackgroundColor,
							label: __(
								'Background Color',
								'snow-monkey-blocks'
							),
						},
						{
							value: textColor,
							onChange: onChangeTextColor,
							label: __( 'Text Color', 'snow-monkey-blocks' ),
						},
					] }
				></PanelColorSettings>

				{ backgroundColor && (
					<PanelBody
						title={ __(
							'Background Gradation Settings',
							'snow-monkey-blocks'
						) }
					>
						<BaseControl
							className="editor-color-palette-control"
							label={ __(
								'Background Color 2',
								'snow-monkey-blocks'
							) }
							id="snow-monkey-blocks/section/background-color2"
						>
							<ColorPalette
								className="editor-color-palette-control__color-palette"
								value={ backgroundColor2 }
								onChange={ onChangeBackgroundColor2 }
							/>
						</BaseControl>

						{ backgroundColor2 && (
							<RangeControl
								label={ __(
									'Background Gradation Angle',
									'snow-monkey-blocks'
								) }
								value={ backgroundColorAngle }
								onChange={ onChangeBackgroundColorAngle }
								min="0"
								max="360"
							/>
						) }
					</PanelBody>
				) }

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

			<BlockWrapper className={ classes } style={ sectionStyles }>
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

						<div className="smb-section__body">
							<InnerBlocks />
						</div>
					</div>
				</div>
			</BlockWrapper>
		</>
	);
}

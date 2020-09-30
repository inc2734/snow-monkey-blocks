import classnames from 'classnames';
import { times } from 'lodash';

import { __ } from '@wordpress/i18n';

import {
	RichText,
	InnerBlocks,
	InspectorControls,
	PanelColorSettings,
	ColorPalette,
	__experimentalBlock as Block,
} from '@wordpress/block-editor';

import {
	PanelBody,
	BaseControl,
	SelectControl,
	RangeControl,
	Button,
	ToggleControl,
} from '@wordpress/components';

import { toNumber, getColumnSize, divider } from '@smb/helper';

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

	const { textColumnWidth, imageColumnWidth } = getColumnSize(
		headingColumnSize
	);

	const wrapperTagNames = [ 'div', 'section', 'aside' ];
	const titleTagNames = [ 'h1', 'h2', 'h3' ];

	const BlockWrapper = Block[ wrapperTagName ];
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

	const onChangeHeadingPosition = ( value ) =>
		setAttributes( {
			headingPosition: value,
		} );

	const onChangeHeadingColumnSize = ( value ) =>
		setAttributes( {
			headingColumnSize: value,
		} );

	const onChangeIsSlim = ( value ) =>
		setAttributes( {
			isSlim: value,
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
						id="snow-monkey-blocks/section-side-heading/wrapper-tag-name"
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
						id="snow-monkey-blocks/section-side-heading/title-tag"
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

					<SelectControl
						label={ __( 'Heading Position', 'snow-monkey-blocks' ) }
						value={ headingPosition }
						options={ [
							{
								value: 'right',
								label: __( 'Right side', 'snow-monkey-blocks' ),
							},
							{
								value: 'left',
								label: __( 'Left side', 'snow-monkey-blocks' ),
							},
						] }
						onChange={ onChangeHeadingPosition }
					/>

					<SelectControl
						label={ __(
							'Heading column size',
							'snow-monkey-blocks'
						) }
						value={ headingColumnSize }
						onChange={ onChangeHeadingColumnSize }
						options={ [
							{
								value: 50,
								label: __( '50%', 'snow-monkey-blocks' ),
							},
							{
								value: 33,
								label: __( '33%', 'snow-monkey-blocks' ),
							},
							{
								value: 25,
								label: __( '25%', 'snow-monkey-blocks' ),
							},
						] }
					/>

					<ToggleControl
						label={ __(
							'Make the content width slim',
							'snow-monkey-blocks'
						) }
						checked={ isSlim }
						onChange={ onChangeIsSlim }
					/>
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
							id="snow-monkey-blocks/section-side-heading/background-color2"
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
						id="snow-monkey-blocks/section-side-heading/top-divider-color"
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
						id="snow-monkey-blocks/section-side-heading/bottom-divider-color"
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
									( ! RichText.isEmpty( subtitle ) ||
										isSelected ) && (
										<RichText
											className="smb-section__subtitle smb-section-side-heading__subtitle"
											value={ subtitle }
											onChange={ onChangeSubtitle }
											placeholder={ __(
												'Write subtitle…',
												'snow-monkey-blocks'
											) }
										/>
									) }

								{ ( ! RichText.isEmpty( title ) ||
									isSelected ) && (
									<RichText
										className="smb-section__title smb-section-side-heading__title"
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
									( ! RichText.isEmpty( lede ) ||
										isSelected ) && (
										<RichText
											className="smb-section__lede smb-section-side-heading__lede"
											value={ lede }
											onChange={ onChangeLede }
											placeholder={ __(
												'Write lede…',
												'snow-monkey-blocks'
											) }
										/>
									) }
							</div>
							<div className={ contentColClasses }>
								<div className="smb-section__body smb-section-side-heading__body">
									<InnerBlocks />
								</div>
							</div>
						</div>
					</div>
				</div>
			</BlockWrapper>
		</>
	);
}

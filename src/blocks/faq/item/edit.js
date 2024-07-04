import classnames from 'classnames';

import {
	FontSizePicker,
	InnerBlocks,
	InspectorControls,
	RichText,
	useBlockProps,
	useInnerBlocksProps,
	getFontSizeClass,
	getFontSizeObjectByValue,
	useSettings,
	__experimentalColorGradientSettingsDropdown as ColorGradientSettingsDropdown,
	__experimentalUseMultipleOriginColorsAndGradients as useMultipleOriginColorsAndGradients,
} from '@wordpress/block-editor';

import {
	BaseControl,
	TextControl,
	__experimentalToolsPanel as ToolsPanel,
	__experimentalToolsPanelItem as ToolsPanelItem,
} from '@wordpress/components';

import { useSelect } from '@wordpress/data';
import { __, sprintf } from '@wordpress/i18n';

import metadata from './block.json';

export default function ( { attributes, setAttributes, className, clientId } ) {
	const {
		question,
		questionFontSizeSlug,
		questionFontSize,
		questionLabelFontSizeSlug,
		questionLabelFontSize,
		answerLabelFontSizeSlug,
		answerLabelFontSize,
		questionColor,
		answerColor,
		questionLabel,
		answerLabel,
		templateLock,
	} = attributes;

	const [ fontSizes ] = useSettings( 'typography.fontSizes' );

	const hasInnerBlocks = useSelect(
		( select ) =>
			!! select( 'core/block-editor' ).getBlock( clientId )?.innerBlocks
				?.length,
		[ clientId ]
	);

	const classes = classnames( 'smb-faq__item', className );

	const styles = {
		'--smb-faq--item-question-label-color': questionColor || undefined,
		'--smb-faq--item-answer-label-color': answerColor || undefined,
	};

	const blockProps = useBlockProps( {
		className: classes,
		style: styles,
	} );

	const innerBlocksProps = useInnerBlocksProps(
		{
			className: 'smb-faq__item__answer__body',
		},
		{
			templateLock,
			renderAppender: hasInnerBlocks
				? InnerBlocks.DefaultBlockAppender
				: InnerBlocks.ButtonBlockAppender,
		}
	);

	const selectedQuestionFontSize =
		fontSizes.find(
			( fontSize ) =>
				!! questionFontSizeSlug &&
				fontSize.slug === questionFontSizeSlug
		)?.size || questionFontSize;

	const selectedQuestionLabelFontSize =
		fontSizes.find(
			( fontSize ) =>
				!! questionLabelFontSizeSlug &&
				fontSize.slug === questionLabelFontSizeSlug
		)?.size || questionLabelFontSize;

	const selectedAnswerLabelFontSize =
		fontSizes.find(
			( fontSize ) =>
				!! answerLabelFontSizeSlug &&
				fontSize.slug === answerLabelFontSizeSlug
		)?.size || answerLabelFontSize;

	const questionFontSizeClass = !! questionFontSizeSlug
		? getFontSizeClass( questionFontSizeSlug )
		: undefined;

	const questionLabelFontSizeClass = !! questionLabelFontSizeSlug
		? getFontSizeClass( questionLabelFontSizeSlug )
		: undefined;

	const answerLabelFontSizeClass = !! answerLabelFontSizeSlug
		? getFontSizeClass( answerLabelFontSizeSlug )
		: undefined;

	return (
		<>
			<InspectorControls group="typography">
				<ToolsPanelItem
					panelId={ clientId }
					hasValue={ () =>
						questionFontSizeSlug !==
							metadata.questionFontSizeSlug ||
						questionFontSize !== metadata.questionFontSize
					}
					isShownByDefault
					label={ __( 'Question font size', 'snow-monkey-blocks' ) }
					resetAllFilter={ () => ( {
						questionFontSizeSlug: metadata.questionFontSizeSlug,
						questionFontSize: metadata.questionFontSize,
					} ) }
					onDeselect={ () => {
						setAttributes( {
							questionFontSizeSlug: metadata.questionFontSizeSlug,
							questionFontSize: metadata.questionFontSize,
						} );
					} }
				>
					<BaseControl
						label={ __( 'Question', 'snow-monkey-blocks' ) }
						id="snow-monkey-blocks/faq-item/question-font-size"
					>
						<FontSizePicker
							value={ selectedQuestionFontSize }
							onChange={ ( value ) => {
								const fontSizeSlug = getFontSizeObjectByValue(
									fontSizes,
									value
								).slug;

								setAttributes( {
									questionFontSizeSlug:
										fontSizeSlug || undefined,
									questionFontSize: ! fontSizeSlug
										? value
										: undefined,
								} );
							} }
							withReset={ false }
							withSlider
						/>
					</BaseControl>
				</ToolsPanelItem>

				<ToolsPanelItem
					panelId={ clientId }
					hasValue={ () =>
						questionLabelFontSizeSlug !==
							metadata.questionLabelFontSizeSlug ||
						questionLabelFontSize !== metadata.questionLabelFontSize
					}
					isShownByDefault
					label={ __(
						'Question label font size',
						'snow-monkey-blocks'
					) }
					resetAllFilter={ () => ( {
						questionLabelFontSizeSlug:
							metadata.questionLabelFontSizeSlug,
						questionLabelFontSize: metadata.questionLabelFontSize,
					} ) }
					onDeselect={ () => {
						setAttributes( {
							questionLabelFontSizeSlug:
								metadata.questionLabelFontSizeSlug,
							questionLabelFontSize:
								metadata.questionLabelFontSize,
						} );
					} }
				>
					<BaseControl
						label={ __( 'Question label', 'snow-monkey-blocks' ) }
						id="snow-monkey-blocks/faq-item/question-label-font-size"
					>
						<FontSizePicker
							value={ selectedQuestionLabelFontSize }
							onChange={ ( value ) => {
								const fontSizeSlug = getFontSizeObjectByValue(
									fontSizes,
									value
								).slug;

								setAttributes( {
									questionLabelFontSizeSlug:
										fontSizeSlug || undefined,
									questionLabelFontSize: ! fontSizeSlug
										? value
										: undefined,
								} );
							} }
							withReset={ false }
							withSlider
						/>
					</BaseControl>
				</ToolsPanelItem>

				<ToolsPanelItem
					panelId={ clientId }
					hasValue={ () =>
						answerLabelFontSizeSlug !==
							metadata.answerLabelFontSizeSlug ||
						answerLabelFontSize !== metadata.answerLabelFontSize
					}
					isShownByDefault
					label={ __(
						'Answer label font size',
						'snow-monkey-blocks'
					) }
					resetAllFilter={ () => ( {
						answerLabelFontSizeSlug:
							metadata.answerLabelFontSizeSlug,
						answerLabelFontSize: metadata.answerLabelFontSize,
					} ) }
					onDeselect={ () => {
						setAttributes( {
							answerLabelFontSizeSlug:
								metadata.answerLabelFontSizeSlug,
							answerLabelFontSize: metadata.answerLabelFontSize,
						} );
					} }
				>
					<BaseControl
						label={ __( 'Answer label', 'snow-monkey-blocks' ) }
						id="snow-monkey-blocks/faq-item/answer-label-font-size"
					>
						<FontSizePicker
							value={ selectedAnswerLabelFontSize }
							onChange={ ( value ) => {
								const fontSizeSlug = getFontSizeObjectByValue(
									fontSizes,
									value
								).slug;

								setAttributes( {
									answerLabelFontSizeSlug:
										fontSizeSlug || undefined,
									answerLabelFontSize: ! fontSizeSlug
										? value
										: undefined,
								} );
							} }
							withReset={ false }
							withSlider
						/>
					</BaseControl>
				</ToolsPanelItem>
			</InspectorControls>

			<InspectorControls group="color">
				<ColorGradientSettingsDropdown
					panelId={ clientId }
					__experimentalIsRenderedInSidebar
					{ ...useMultipleOriginColorsAndGradients() }
					settings={ [
						{
							colorValue: questionColor,
							onColorChange: ( value ) =>
								setAttributes( {
									questionColor: value,
								} ),
							resetAllFilter: () => ( {
								questionColor: metadata.questionColor,
							} ),
							label: __( 'Question color', 'snow-monkey-blocks' ),
						},
						{
							colorValue: answerColor,
							onColorChange: ( value ) =>
								setAttributes( {
									answerColor: value,
								} ),
							resetAllFilter: () => ( {
								answerColor: metadata.answerColor,
							} ),
							label: __( 'Answer color', 'snow-monkey-blocks' ),
						},
					] }
				/>
			</InspectorControls>

			<InspectorControls>
				<ToolsPanel
					label={ __( 'Block settings', 'snow-monkey-blocks' ) }
				>
					<ToolsPanelItem
						hasValue={ () =>
							questionLabel !==
							metadata.attributes.questionLabel.default
						}
						isShownByDefault
						label={ __( 'Question label', 'snow-monkey-blocks' ) }
						onDeselect={ () =>
							setAttributes( {
								questionLabel:
									metadata.attributes.questionLabel.default,
							} )
						}
					>
						<TextControl
							label={ __(
								'Question label',
								'snow-monkey-blocks'
							) }
							value={ questionLabel }
							placeholder={ __( 'Q', 'snow-monkey-blocks' ) }
							onChange={ ( value ) =>
								setAttributes( {
									questionLabel: value,
								} )
							}
							help={ sprintf(
								// translators: %d: Length
								__(
									'Recommend length up to %d',
									'snow-monkey-blocks'
								),
								Number( 2 )
							) }
						/>
					</ToolsPanelItem>

					<ToolsPanelItem
						hasValue={ () =>
							answerLabel !==
							metadata.attributes.answerLabel.default
						}
						isShownByDefault
						label={ __( 'Answer label', 'snow-monkey-blocks' ) }
						onDeselect={ () =>
							setAttributes( {
								answerLabel:
									metadata.attributes.answerLabel.default,
							} )
						}
					>
						<TextControl
							label={ __( 'Answer label', 'snow-monkey-blocks' ) }
							value={ answerLabel }
							placeholder={ __( 'A', 'snow-monkey-blocks' ) }
							onChange={ ( value ) =>
								setAttributes( {
									answerLabel: value,
								} )
							}
							help={ sprintf(
								// translators: %d: Length
								__(
									'Recommend length up to %d',
									'snow-monkey-blocks'
								),
								Number( 2 )
							) }
						/>
					</ToolsPanelItem>
				</ToolsPanel>
			</InspectorControls>

			<div { ...blockProps }>
				<div className="smb-faq__item__question">
					<div
						className={ classnames(
							'smb-faq__item__question__label',
							questionLabelFontSizeClass
						) }
						style={ {
							fontSize: questionLabelFontSize || undefined,
						} }
					>
						{ questionLabel }
					</div>
					<RichText
						className={ classnames(
							'smb-faq__item__question__body',
							questionFontSizeClass
						) }
						style={ {
							fontSize: questionFontSize || undefined,
						} }
						placeholder={ __(
							'Write question…',
							'snow-monkey-blocks'
						) }
						value={ question }
						multiline={ false }
						onChange={ ( value ) =>
							setAttributes( {
								question: value,
							} )
						}
					/>
				</div>

				<div className="smb-faq__item__answer">
					<div
						className={ classnames(
							'smb-faq__item__answer__label',
							answerLabelFontSizeClass
						) }
						style={ {
							fontSize: answerLabelFontSize || undefined,
						} }
					>
						{ answerLabel }
					</div>

					<div { ...innerBlocksProps } />
				</div>
			</div>
		</>
	);
}

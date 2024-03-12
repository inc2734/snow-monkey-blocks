import classnames from 'classnames';

import {
	InnerBlocks,
	InspectorControls,
	RichText,
	__experimentalPanelColorGradientSettings as PanelColorGradientSettings,
	useBlockProps,
	useInnerBlocksProps,
} from '@wordpress/block-editor';

import {
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
		questionColor,
		answerColor,
		questionLabel,
		answerLabel,
		templateLock,
	} = attributes;

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

	return (
		<>
			<InspectorControls group="styles">
				<PanelColorGradientSettings
					title={ __( 'Color', 'snow-monkey-blocks' ) }
					initialOpen={ false }
					settings={ [
						{
							colorValue: questionColor,
							onColorChange: ( value ) =>
								setAttributes( {
									questionColor: value,
								} ),
							label: __( 'Question color', 'snow-monkey-blocks' ),
						},
						{
							colorValue: answerColor,
							onColorChange: ( value ) =>
								setAttributes( {
									answerColor: value,
								} ),
							label: __( 'Answer color', 'snow-monkey-blocks' ),
						},
					] }
					__experimentalIsRenderedInSidebar
				></PanelColorGradientSettings>
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
					<div className="smb-faq__item__question__label">
						{ questionLabel }
					</div>
					<RichText
						className="smb-faq__item__question__body"
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
					<div className="smb-faq__item__answer__label">
						{ answerLabel }
					</div>

					<div { ...innerBlocksProps } />
				</div>
			</div>
		</>
	);
}

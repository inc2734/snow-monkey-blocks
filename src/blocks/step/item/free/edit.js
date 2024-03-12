import classnames from 'classnames';

import {
	InnerBlocks,
	InspectorControls,
	RichText,
	__experimentalPanelColorGradientSettings as PanelColorGradientSettings,
	useBlockProps,
	useInnerBlocksProps,
} from '@wordpress/block-editor';

import { useSelect } from '@wordpress/data';
import { __ } from '@wordpress/i18n';

export default function ( { attributes, setAttributes, className, clientId } ) {
	const { title, numberColor, templateLock } = attributes;

	const hasInnerBlocks = useSelect(
		( select ) =>
			!! select( 'core/block-editor' ).getBlock( clientId )?.innerBlocks
				?.length,
		[ clientId ]
	);

	const classes = classnames( 'smb-step__item', className );

	const styles = {
		'--smb-step--number-background-color': numberColor || undefined,
	};

	const blockProps = useBlockProps( {
		className: classes,
		style: styles,
	} );

	const innerBlocksProps = useInnerBlocksProps(
		{
			className: 'smb-step__item__summary',
		},
		{
			templateLock,
			renderAppender: hasInnerBlocks
				? InnerBlocks.DefaultBlockAppender
				: InnerBlocks.ButtonBlockAppender,
		}
	);

	const onChangeNumberColor = ( value ) =>
		setAttributes( {
			numberColor: value,
		} );

	const onChangeTitle = ( value ) =>
		setAttributes( {
			title: value,
		} );

	return (
		<>
			<InspectorControls group="styles">
				<PanelColorGradientSettings
					title={ __( 'Color', 'snow-monkey-blocks' ) }
					initialOpen={ false }
					settings={ [
						{
							colorValue: numberColor,
							onColorChange: onChangeNumberColor,
							label: __( 'Number color', 'snow-monkey-blocks' ),
						},
					] }
					__experimentalIsRenderedInSidebar
				></PanelColorGradientSettings>
			</InspectorControls>

			<div { ...blockProps }>
				<div className="smb-step__item__title">
					<div className="smb-step__item__number" />

					<RichText
						tagName="span"
						placeholder={ __(
							'Write title…',
							'snow-monkey-blocks'
						) }
						value={ title }
						multiline={ false }
						onChange={ onChangeTitle }
					/>
				</div>

				<div className="smb-step__item__body">
					<div { ...innerBlocksProps } />
				</div>
			</div>
		</>
	);
}

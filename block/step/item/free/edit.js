import classnames from 'classnames';

import { __ } from '@wordpress/i18n';

import {
	InnerBlocks,
	InspectorControls,
	RichText,
	__experimentalPanelColorGradientSettings as PanelColorGradientSettings,
	useBlockProps,
	useInnerBlocksProps,
} from '@wordpress/block-editor';

import { useSelect } from '@wordpress/data';

export default function ( { attributes, setAttributes, className, clientId } ) {
	const { title, numberColor } = attributes;

	const hasInnerBlocks = useSelect(
		( select ) =>
			!! select( 'core/block-editor' ).getBlock( clientId )?.innerBlocks
				?.length,
		[ clientId ]
	);

	const classes = classnames( 'smb-step__item', className );

	const itemNumberStyles = {
		backgroundColor: numberColor || undefined,
	};

	const blockProps = useBlockProps( {
		className: classes,
	} );

	const innerBlocksProps = useInnerBlocksProps(
		{
			className: 'smb-step__item__summary',
		},
		{
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
			<InspectorControls>
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
					__experimentalHasMultipleOrigins={ true }
					__experimentalIsRenderedInSidebar={ true }
				></PanelColorGradientSettings>
			</InspectorControls>

			<div { ...blockProps }>
				<div className="smb-step__item__title">
					<div
						className="smb-step__item__number"
						style={ itemNumberStyles }
					/>

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

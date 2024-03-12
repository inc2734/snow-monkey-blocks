import classnames from 'classnames';

import {
	ContrastChecker,
	InnerBlocks,
	InspectorControls,
	useBlockProps,
	useInnerBlocksProps,
	__experimentalPanelColorGradientSettings as PanelColorGradientSettings,
} from '@wordpress/block-editor';

import { useSelect } from '@wordpress/data';
import { __ } from '@wordpress/i18n';

export default function ( { attributes, setAttributes, className, clientId } ) {
	const {
		backgroundColor,
		backgroundGradientColor,
		textColor,
		templateLock,
	} = attributes;

	const hasInnerBlocks = useSelect(
		( select ) =>
			!! select( 'core/block-editor' ).getBlock( clientId )?.innerBlocks
				?.length,
		[ clientId ]
	);

	const classes = classnames( 'c-row__col', className );

	const itemClasses = classnames(
		'smb-panels__item',
		'smb-panels__item--free'
	);

	const itemStyles = {
		'--smb-panel--background-color': backgroundColor,
		'--smb-panel--background-image': backgroundGradientColor,
		'--smb-panel--color': textColor,
	};

	const blockProps = useBlockProps( {
		className: classes,
	} );

	const innerBlocksProps = useInnerBlocksProps(
		{
			className: 'smb-panels__item__body',
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
			<InspectorControls>
				<PanelColorGradientSettings
					title={ __( 'Color', 'snow-monkey-blocks' ) }
					initialOpen={ false }
					settings={ [
						{
							label: __(
								'Background color',
								'snow-monkey-blocks'
							),
							colorValue: backgroundColor,
							onColorChange: ( value ) =>
								setAttributes( {
									backgroundColor: value,
								} ),
							gradientValue: backgroundGradientColor,
							onGradientChange: ( value ) =>
								setAttributes( {
									backgroundGradientColor: value,
								} ),
						},
						{
							label: __( 'Text color', 'snow-monkey-blocks' ),
							colorValue: textColor,
							onColorChange: ( value ) =>
								setAttributes( {
									textColor: value,
								} ),
						},
					] }
					__experimentalIsRenderedInSidebar
				>
					<ContrastChecker
						backgroundColor={
							backgroundColor || backgroundGradientColor
						}
						textColor={ textColor }
					/>
				</PanelColorGradientSettings>
			</InspectorControls>

			<div { ...blockProps }>
				<div className={ itemClasses } style={ itemStyles }>
					<div { ...innerBlocksProps } />
				</div>
			</div>
		</>
	);
}

import classnames from 'classnames';

import { PanelBody, CheckboxControl } from '@wordpress/components';
import { __ } from '@wordpress/i18n';

import {
	InspectorControls,
	RichText,
	useBlockProps,
	__experimentalUseInnerBlocksProps as useInnerBlocksProps,
} from '@wordpress/block-editor';

export default function ( { attributes, setAttributes, className } ) {
	const { title, initialState } = attributes;

	const classes = classnames( 'smb-accordion__item', className );

	const blockProps = useBlockProps( {
		className: classes,
	} );

	const innerBlocksProps = useInnerBlocksProps( {
		className: 'smb-accordion__item__body',
	} );

	const onChangeInitialState = ( value ) =>
		setAttributes( {
			initialState: value,
		} );

	const onChangeTitle = ( value ) =>
		setAttributes( {
			title: value,
		} );

	return (
		<>
			<InspectorControls>
				<PanelBody
					title={ __( 'Block Settings', 'snow-monkey-blocks' ) }
				>
					<CheckboxControl
						label={ __(
							'Display in open state',
							'snow-monkey-blocks'
						) }
						checked={ initialState }
						onChange={ onChangeInitialState }
					/>
				</PanelBody>
			</InspectorControls>

			<div { ...blockProps }>
				<div className="smb-accordion__item__title">
					<RichText
						className="smb-accordion__item__title__label"
						value={ title }
						onChange={ onChangeTitle }
						placeholder={ __(
							'Enter title here',
							'snow-monkey-blocks'
						) }
					/>
					<div className="smb-accordion__item__title__icon">
						<i className="fas fa-angle-down"></i>
					</div>
				</div>

				<div { ...innerBlocksProps } />
			</div>
		</>
	);
}

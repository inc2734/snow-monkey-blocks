import classnames from 'classnames';
import { times } from 'lodash';

import {
	InspectorControls,
	RichText,
	useBlockProps,
} from '@wordpress/block-editor';
import { __ } from '@wordpress/i18n';

import {
	PanelBody,
	SelectControl,
	BaseControl,
	Button,
} from '@wordpress/components';

import FontAwesome from '@smb/component/font-awesome';

export default function ( {
	attributes,
	setAttributes,
	isSelected,
	className,
} ) {
	const { title, content, modifier, icon } = attributes;

	const iconList = [
		{
			value: 'exclamation-circle',
			label: __( 'exclamation-circle', 'snow-monkey-blocks' ),
		},
		{
			value: 'check',
			label: __( 'check', 'snow-monkey-blocks' ),
		},
		{
			value: 'check-circle',
			label: __( 'check-circle', 'snow-monkey-blocks' ),
		},
		{
			value: 'check-square',
			label: __( 'check-square', 'snow-monkey-blocks' ),
		},
		{
			value: 'hand-point-right',
			label: __( 'hand-point-right', 'snow-monkey-blocks' ),
		},
		{
			value: 'edit',
			label: __( 'edit', 'snow-monkey-blocks' ),
		},
		{
			value: 'lightbulb',
			label: __( 'lightbulb', 'snow-monkey-blocks' ),
		},
	];

	const classes = classnames( 'smb-alert', {
		[ className ]: !! className,
		[ `smb-alert--${ modifier }` ]: !! modifier,
	} );

	const blockProps = useBlockProps( {
		className: classes,
	} );

	const onChangeModifier = ( value ) =>
		setAttributes( {
			modifier: value,
		} );

	const onChangeTitle = ( value ) =>
		setAttributes( {
			title: value,
		} );

	const onChangeContent = ( value ) =>
		setAttributes( {
			content: value,
		} );

	return (
		<>
			<InspectorControls>
				<PanelBody
					title={ __( 'Block Settings', 'snow-monkey-blocks' ) }
				>
					<SelectControl
						label={ __( 'Type', 'snow-monkey-blocks' ) }
						value={ modifier }
						onChange={ onChangeModifier }
						options={ [
							{
								value: '',
								label: __(
									'Normal alert',
									'snow-monkey-blocks'
								),
							},
							{
								value: 'warning',
								label: __(
									'Warning alert',
									'snow-monkey-blocks'
								),
							},
							{
								value: 'success',
								label: __(
									'Success alert',
									'snow-monkey-blocks'
								),
							},
							{
								value: 'remark',
								label: __(
									'Remark alert',
									'snow-monkey-blocks'
								),
							},
						] }
					/>

					<BaseControl
						label={ __( 'Icon', 'snow-monkey-blocks' ) }
						id="snow-monkey-blocks/alert/icon"
					>
						<div className="smb-list-icon-selector">
							{ times( iconList.length, ( index ) => {
								const onClickIcon = () =>
									setAttributes( {
										icon: iconList[ index ].value,
									} );

								const isPrimary =
									icon === iconList[ index ].value;
								return (
									<Button
										isPrimary={ isPrimary }
										onClick={ onClickIcon }
										key={ index }
									>
										<i
											className={ `fas fa-${ iconList[ index ].value }` }
											title={ iconList[ index ].label }
										/>
									</Button>
								);
							} ) }
						</div>
					</BaseControl>
				</PanelBody>
			</InspectorControls>

			<div { ...blockProps }>
				{ ( ! RichText.isEmpty( title ) || isSelected ) && (
					<div className="smb-alert__title">
						<FontAwesome icon={ icon } />

						<RichText
							tagName="strong"
							multiline={ false }
							value={ title }
							placeholder={ __(
								'Write title…',
								'snow-monkey-blocks'
							) }
							onChange={ onChangeTitle }
						/>
					</div>
				) }

				<RichText
					className="smb-alert__body"
					multiline="p"
					value={ content }
					onChange={ onChangeContent }
				/>
			</div>
		</>
	);
}

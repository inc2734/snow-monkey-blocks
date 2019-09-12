'use strict';

const { Fragment } = wp.element;
const { __ } = wp.i18n;
const { registerFormatType, toggleFormat } = wp.richText;
const { RichTextToolbarButton } = wp.editor;

const type = 'snow-monkey-blocks/highlighter';

registerFormatType( type, {
	title: __( 'Highlighter', 'snow-monkey-blocks' ),
	tagName: 'span',
	className: 'smb-highlighter',
	edit( props ) {
		const { value, isActive, onChange } = props;
		const onToggle = () => onChange( toggleFormat( value, { type } ) );

		return (
			<Fragment>
				<RichTextToolbarButton
					icon="admin-customizer"
					title={ __( 'Highlighter', 'snow-monkey-blocks' ) }
					onClick={ onToggle }
					isActive={ isActive }
				/>
			</Fragment>
		);
	},
} );

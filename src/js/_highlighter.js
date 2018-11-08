'use strict';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const { Fragment } = wp.element;
const { __ } = wp.i18n;
const { registerFormatType, toggleFormat } = wp.richText;
const { RichTextToolbarButton } = wp.editor;

const name = 'snow-monkey-blocks/highlighter';

registerFormatType( name, {
	title: __( 'Highlighter', 'snow-monkey-blocks' ),
	tagName: 'span',
	className: 'smb-highlighter',
	edit( props ) {
		const { value, isActive, onChange } = props;
		const onToggle = () => onChange( toggleFormat( value, { type: name } ) );

		return (
			<Fragment>
				<RichTextToolbarButton
					icon={ <FontAwesomeIcon icon="highlighter" /> }
					title={ __( 'Highlighter', 'snow-monkey-blocks' ) }
					onClick={ onToggle }
					isActive={ isActive }
				/>
			</Fragment>
		);
	},
} );

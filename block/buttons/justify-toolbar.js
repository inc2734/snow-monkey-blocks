/**
 * @see https://github.com/WordPress/gutenberg/blob/da8555d258edbe676fa079fb51252f918ae032e1/packages/block-editor/src/components/justify-toolbar/index.js
 */

/**
 * WordPress dependencies
 */
import { ToolbarGroup } from '@wordpress/components';
import {
	justifyLeft,
	justifyCenter,
	justifyRight,
	justifySpaceBetween,
} from '@wordpress/icons';
import { __ } from '@wordpress/i18n';

const icons = {
	left: justifyLeft,
	center: justifyCenter,
	right: justifyRight,
	'space-between': justifySpaceBetween,
};

const ALLOWED_CONTROLS = [ 'left', 'center', 'right', 'space-between' ];

export function JustifyToolbar( {
	allowedControls = ALLOWED_CONTROLS,
	isCollapsed = true,
	onChange,
	value,
	popoverProps,
} ) {
	// If the control is already selected we want a click
	// again on the control to deselect the item, so we
	// call onChange( undefined )
	const handleClick = ( next ) => {
		if ( next === value ) {
			onChange( undefined );
		} else {
			onChange( next );
		}
	};

	const icon = value ? icons[ value ] : icons.left;
	const allControls = [
		{
			name: 'left',
			icon: justifyLeft,
			title: __( 'Justify items left', 'snow-monkey-blocks' ),
			isActive: 'left' === value,
			onClick: () => handleClick( 'left' ),
		},
		{
			name: 'center',
			icon: justifyCenter,
			title: __( 'Justify items center', 'snow-monkey-blocks' ),
			isActive: 'center' === value,
			onClick: () => handleClick( 'center' ),
		},
		{
			name: 'right',
			icon: justifyRight,
			title: __( 'Justify items right', 'snow-monkey-blocks' ),
			isActive: 'right' === value,
			onClick: () => handleClick( 'right' ),
		},
		{
			name: 'space-between',
			icon: justifySpaceBetween,
			title: __( 'Space between items', 'snow-monkey-blocks' ),
			isActive: 'space-between' === value,
			onClick: () => handleClick( 'space-between' ),
		},
	];

	return (
		<ToolbarGroup
			icon={ icon }
			popoverProps={ popoverProps }
			label={ __( 'Change items justification' ) }
			isCollapsed={ isCollapsed }
			controls={ allControls.filter( ( elem ) =>
				allowedControls.includes( elem.name )
			) }
		/>
	);
}

export default JustifyToolbar;

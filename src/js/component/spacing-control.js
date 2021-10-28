import {
	__experimentalUseCustomUnits as useCustomUnits,
	__experimentalBoxControl as BoxControl,
} from '@wordpress/components';

import { useSetting } from '@wordpress/block-editor';

/**
 * @param {Object} props
 * @return {WPElement} Padding edit element.
 * @see https://github.com/WordPress/gutenberg/blob/99ef4c346fb804772328af9ae8d3cc3e86ee5305/packages/block-editor/src/hooks/padding.js
 */
export default function ( props ) {
	const { label, sides, values, onChange } = props;

	const units = useCustomUnits( {
		availableUnits: useSetting( 'spacing.units' ) || [
			'%',
			'px',
			'em',
			'rem',
			'vw',
		],
	} );

	return (
		<BoxControl
			values={ values }
			onChange={ onChange }
			label={ label }
			sides={ sides }
			units={ units }
			allowReset={ true }
		/>
	);
}

import {
	__experimentalUseCustomUnits as useCustomUnits,
	__experimentalBoxControl as BoxControl,
} from '@wordpress/components';

import {
	useSettings,
	useSetting, // @deprecated
} from '@wordpress/block-editor';

/**
 * @param {Object} props
 * @return {WPElement} Padding edit element.
 *
 * @see https://github.com/WordPress/gutenberg/blob/99ef4c346fb804772328af9ae8d3cc3e86ee5305/packages/block-editor/src/hooks/padding.js
 */
export default function ( props ) {
	const { label, sides, values, onChange, allowReset } = props;

	const [ spacingUnits ] =
		null != useSettings
			? useSettings( 'spacing.units' )
			: [ useSetting( 'spacing.units' ) ].filter( Boolean );

	const units = useCustomUnits( {
		availableUnits: spacingUnits || [ '%', 'px', 'em', 'rem', 'vw' ],
	} );

	return (
		<BoxControl
			values={ values }
			onChange={ onChange }
			label={ label }
			sides={ sides }
			units={ units }
			allowReset={ allowReset }
		/>
	);
}

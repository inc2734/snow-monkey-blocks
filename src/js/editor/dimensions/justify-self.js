import {
	__experimentalToggleGroupControl as ToggleGroupControl,
	__experimentalToggleGroupControlOptionIcon as ToggleGroupControlOptionIcon,
} from '@wordpress/components';

import {
	justifyLeft,
	justifyCenter,
	justifyRight,
	justifyStretch,
} from '@wordpress/icons';

import { hasBlockSupport } from '@wordpress/blocks';
import { __ } from '@wordpress/i18n';

export function hasJustifySelfValue( props ) {
	return props.attributes?.smb?.justifySelf !== undefined;
}

export function resetJustifySelf( { attributes = {}, setAttributes } ) {
	delete attributes?.smb?.justifySelf;
	const newSMB = { ...attributes?.smb };

	setAttributes( {
		smb: !! Object.keys( newSMB ).length ? newSMB : undefined,
	} );
}

export function useIsJustifySelfDisabled( {
	name: blockName,
	attributes: { __unstableSMBSupports },
} = {} ) {
	return (
		! hasBlockSupport( blockName, 'smb.justifySelf' ) &&
		! __unstableSMBSupports?.justifySelf
	);
}

export function JustifySelfEdit( props ) {
	const {
		attributes: { smb },
		setAttributes,
	} = props;

	const justificationOptions = [
		{
			value: 'start',
			icon: justifyLeft,
			label: __( 'Justify items left' ),
		},
		{
			value: 'center',
			icon: justifyCenter,
			label: __( 'Justify items center' ),
		},
		{
			value: 'end',
			icon: justifyRight,
			label: __( 'Justify items right' ),
		},
		{
			value: 'stretch',
			icon: justifyStretch,
			label: __( 'Stretch items' ),
		},
	];

	return (
		<ToggleGroupControl
			label="justify-self"
			value={ smb?.justifySelf || 'stretch' }
			onChange={ ( newValue ) => {
				const newSMB = {
					...smb,
					justifySelf: newValue || undefined,
				};
				if ( null == newSMB.justifySelf ) {
					delete newSMB.justifySelf;
				}

				setAttributes( {
					smb: !! Object.keys( newSMB ).length ? newSMB : undefined,
				} );
			} }
			className="block-editor-hooks__flex-layout-justification-controls"
		>
			{ justificationOptions.map( ( { value, icon, label } ) => {
				return (
					<ToggleGroupControlOptionIcon
						key={ value }
						value={ value }
						icon={ icon }
						label={ label }
					/>
				);
			} ) }
		</ToggleGroupControl>
	);
}

export function saveJustifySelfProp( extraProps, blockType, attributes ) {
	if (
		! hasBlockSupport( blockType, 'smb.justifySelf' ) &&
		! attributes?.__unstableSMBSupports?.justifySelf
	) {
		delete attributes?.smb?.justifySelf;
		if ( !! attributes?.smb && ! Object.keys( attributes?.smb ).length ) {
			delete attributes?.smb;
		}
		return extraProps;
	}

	if ( undefined === attributes?.smb?.justifySelf ) {
		return extraProps;
	}

	extraProps.style = {
		...extraProps.style,
		'--smb--justify-self': attributes?.smb?.justifySelf,
	};

	return extraProps;
}

export function editJustifySelfProp( settings ) {
	const existingGetEditWrapperProps = settings.getEditWrapperProps;
	settings.getEditWrapperProps = ( attributes ) => {
		let props = {};
		if ( existingGetEditWrapperProps ) {
			props = existingGetEditWrapperProps( attributes );
		}
		return saveJustifySelfProp( props, settings, attributes );
	};

	return settings;
}

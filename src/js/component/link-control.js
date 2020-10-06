import { __experimentalLinkControl as LinkControl } from '@wordpress/block-editor';

const linkControlTarget = ( target ) => {
	if ( '_self' === target ) {
		return false;
	}

	if ( '_blank' === target ) {
		return true;
	}
};

export default function ( props ) {
	const { url, target, onChange } = props;

	return (
		<LinkControl
			className="wp-block-navigation-link__inline-link-input"
			value={ {
				url,
				opensInNewTab: linkControlTarget( target ),
			} }
			onChange={ onChange }
		/>
	);
}

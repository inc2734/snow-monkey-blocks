'use strict';

import { TabPanel, Dashicon } from '@wordpress/components';

export default function ( props ) {
	const { desktop, tablet, mobile } = props;

	const icons = [];
	if ( !! desktop ) {
		icons.push( {
			name: 'desktop',
			title: <Dashicon icon="desktop" />,
		} );
	}
	if ( !! tablet ) {
		icons.push( {
			name: 'tablet',
			title: <Dashicon icon="tablet" />,
		} );
	}
	if ( !! mobile ) {
		icons.push( {
			name: 'mobile',
			title: <Dashicon icon="smartphone" />,
		} );
	}

	return (
		<TabPanel className="smb-inspector-tabs" tabs={ icons }>
			{ ( tab ) => {
				if ( tab.name ) {
					if ( 'desktop' === tab.name ) {
						return desktop();
					}

					if ( 'tablet' === tab.name ) {
						return tablet();
					}

					if ( 'mobile' === tab.name ) {
						return mobile();
					}
				}
			} }
		</TabPanel>
	);
}

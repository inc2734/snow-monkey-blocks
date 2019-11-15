'use strict';

import Img from 'react-image';

export default function( { src, className, loader } ) {
	return (
		<Img
			className={ className }
			src={ src || `${ smb.pluginUrl }/dist/img/screenshot/none.png` }
			loader={ loader }
		/>
	);
}

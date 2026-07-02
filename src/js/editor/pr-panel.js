import { registerPlugin } from '@wordpress/plugins';
import { PluginDocumentSettingPanel } from '@wordpress/editor';
import { __ } from '@wordpress/i18n';

const SnowMonkeyLink = ( { children } ) => (
	<a
		href="https://snow-monkey.2inc.org/"
		target="_blank"
		rel="noopener noreferrer"
	>
		{ children }
	</a>
);

const createLinkedText = ( text ) => {
	if ( ! text.includes( '%1$s' ) || ! text.includes( '%2$s' ) ) {
		return text;
	}

	const [ beforeLink, afterStartTag ] = text.split( '%1$s' );
	const [ linkText, afterLink ] = afterStartTag.split( '%2$s' );

	return (
		<>
			{ beforeLink }
			<SnowMonkeyLink>{ linkText }</SnowMonkeyLink>
			{ afterLink }
		</>
	);
};

if ( ! window.smb?.isPro ) {
	const SnowMonkeyPrPanel = () => (
		<PluginDocumentSettingPanel
			name="snow-monkey-pr"
			title={ __(
				'[ PR ] Premium WordPress Theme Snow Monkey',
				'snow-monkey-blocks'
			) }
		>
			<p>
				{ createLinkedText(
					// translators: %1$s: Start a tag, %2$s: End a tag.
					__(
						'Snow Monkey Blocks is optimized for the %1$sSnow Monkey%2$s theme, but it can also be used with other themes.',
						'snow-monkey-blocks'
					)
				) }
			</p>
			<p>
				{ createLinkedText(
					// translators: %1$s: Start a tag, %2$s: End a tag.
					__(
						'When used together with the %1$sSnow Monkey%2$s theme, it can be displayed with the most beautiful balance, and it is displayed on the edit screen with the same design as the front screen.',
						'snow-monkey-blocks'
					)
				) }
			</p>
		</PluginDocumentSettingPanel>
	);

	registerPlugin( 'snow-monkey-pr', { render: SnowMonkeyPrPanel } );
}

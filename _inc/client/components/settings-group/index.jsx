/**
 * External dependencies
 */
import React from 'react';
import { connect } from 'react-redux';
import { translate as __ } from 'i18n-calypso';
import Card from 'components/card';
import classNames from 'classnames';
import InfoPopover from 'components/info-popover';
import ExternalLink from 'components/external-link';

/**
 * Internal dependencies
 */
import { isDevMode, isUnavailableInDevMode } from 'state/connection';
import { userCanManageModules, isSitePublic } from 'state/initial-state';
import { getSitePlan } from 'state/site';

export const SettingsGroup = props => {
	const module = props.module,
		disableInDevMode = props.disableInDevMode && props.isUnavailableInDevMode( module.module ),
		support = ! props.support && module && '' !== module.learn_more_button
			? module.learn_more_button
			: props.support;

	return (
		<div className="jp-form-settings-group">
			<Card className={ classNames( {
				'jp-form-has-child': props.hasChild,
				'jp-form-settings-disable': disableInDevMode
			} ) }>
				{
					disableInDevMode && <div className="jp-form-block-fade"></div>
				}
				{
					support && (
						<div className="jp-module-settings__learn-more">
							<InfoPopover screenReaderText={ __( 'Learn more' ) }>
								<ExternalLink
									icon={ false }
									href={ support }
									target="_blank">
									{ __( 'Learn more' ) }
								</ExternalLink>
							</InfoPopover>
						</div>
					)
				}
				{
					props.children
				}
			</Card>
		</div>
	);
};

SettingsGroup.propTypes = {
	support: React.PropTypes.string
};

SettingsGroup.defaultProps = {
	support: ''
};

export default connect(
	state => {
		return {
			isDevMode: isDevMode( state ),
			sitePlan: getSitePlan( state ),
			isSitePublic: isSitePublic( state ),
			userCanManageModules: userCanManageModules( state ),
			isUnavailableInDevMode: module_name => isUnavailableInDevMode( state, module_name )
		};
	}
)( SettingsGroup );
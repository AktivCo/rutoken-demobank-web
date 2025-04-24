import React from 'react';
import { FormattedMessage } from 'react-intl';

import { getPluginDownloadLink } from './pluginDownloadLinks';

const NoSupportPluginVersion = (os) => (
    <div className="main">
        <div className="main__wrapper main__settings d-flex flex-column justify-content-start align-items-start p-2">
            <div className="aboutservice w-100 d-flex flex-column justify-content-center align-items-center">
                <span className="aboutservice__title mb-1">
                    <FormattedMessage id="plugin.platform-not-supported-title" />
                </span>
                <span className="description mb-1 ml-1">
                    <FormattedMessage id="plugin.update-required-desc" />
                </span>
            </div>
            <a className="requirement w-100 d-flex flex-column justify-content-start align-items-start mb-2" href={getPluginDownloadLink(os)}>
                <div className="requirement w-100 d-flex flex-column justify-content-start align-items-start mb-2">
                    <div className="requirement__wrapper w-100 d-flex flex-column justify-content-start align-items-start p-2">
                        <div className="requirement__row w-100 d-flex flex-row">
                            <div className="requirement__description d-flex flex-column justify-content-start align-items-center">
                                <span className="description__title">
                                    <FormattedMessage id="plugin.no-plugin-title" />
                                </span>
                                <span className="description__name">
                                    <FormattedMessage id="plugin.no-plugin-description" />
                                </span>
                            </div>
                        </div>
                        <div className="requirement__row w-100 d-flex flex-row">
                            <div className="requirement__description d-flex flex-column justify-content-start align-items-start">
                                <span className="description__info justify-content-start w-100">
                                    <span className="link">
                                        <FormattedMessage id="plugin.update-required-info-1" />
                                    </span>
                                    &nbsp;
                                    <FormattedMessage id="plugin.update-required-info-2" />
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </a>
            <div className="settings__divider" />

            <div className="settings__info">
                <span>
                    <FormattedMessage id="plugin.update-required-info-3" />
                    <br />
                    <FormattedMessage id="plugin.update-required-info-4" />
                </span>
            </div>
        </div>
    </div>
);


export default NoSupportPluginVersion;

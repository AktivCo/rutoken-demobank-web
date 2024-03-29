import React from 'react';
import { FormattedMessage } from 'react-intl';

const NoSupportPlatform = () => (
    <div className="main">
        <div className="main__wrapper main__settings d-flex flex-column justify-content-start align-items-start p-2">
            <div className="aboutservice w-100 d-flex flex-column justify-content-center align-items-center">
                <span className="aboutservice__title mb-1">
                    <FormattedMessage id="plugin.platform-not-supported-title" />
                </span>
            </div>
            <div className="requirement inactive w-100 d-flex flex-column justify-content-start align-items-start mb-2">
                <div className="requirement__wrapper w-100 d-flex flex-column justify-content-start align-items-start p-2">
                    <div className="requirement__row w-100 d-flex flex-row">
                        <div className="requirement__description d-flex flex-column justify-content-start align-items-start">
                            <span className="description__name">
                                <FormattedMessage id="plugin.platform-not-supported-info" />
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
);

export default NoSupportPlatform;

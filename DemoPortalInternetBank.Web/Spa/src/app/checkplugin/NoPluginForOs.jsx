import React from 'react';
import { FormattedMessage } from 'react-intl';

const NoPlugin = (href, isEdge) => (
    <a
        className="requirement w-100 d-flex flex-column justify-content-start align-items-start mb-2"
        href={href}
    >
        <div className="requirement__wrapper w-100 d-flex flex-column justify-content-start align-items-start p-2">
            <div className="requirement__row w-100 d-flex flex-row">
                <div className="requirement__description w-100 d-flex flex-column justify-content-start">
                    <span className="description__title">
                        <FormattedMessage id="plugin.no-plugin-title" />
                    </span>
                    <span className="description__name">
                        <FormattedMessage id="plugin.no-plugin-description" />
                    </span>
                </div>
            </div>

            <div className="requirement__row w-100 d-flex flex-row">
                <div className="requirement__description w-100 d-flex flex-column justify-content-start">
                    <span className="description__info d-flex flex-column justify-content-center align-items-center">
                        <span className="link d-block mb-1">
                            <FormattedMessage id="plugin.no-plugin-install" />
                            {
                                isEdge
                                && <FormattedMessage id="plugin.no-plugin-for-edge" />
                            }
                        </span>
                        {
                            isEdge
                            && (
                                <span className="d-block text-center mb-1">
                                    <FormattedMessage id="plugin.no-plugin-edge-desc" />
                                </span>
                            )
                        }
                        <span className="d-block">
                            <FormattedMessage id="plugin.no-plugin-update-page" />
                        </span>
                    </span>
                </div>
            </div>
        </div>
    </a>
);

export default NoPlugin;

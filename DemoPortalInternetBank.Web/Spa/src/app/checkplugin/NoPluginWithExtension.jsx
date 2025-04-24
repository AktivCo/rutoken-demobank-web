import React from 'react';
import { FormattedMessage } from 'react-intl';

import { getPluginDirectAppLink, getExtensionDownloadLink } from './pluginDownloadLinks';

// eslint-disable-next-line react/prop-types
const ExtensionCheck = ({ children }) => (
    <div className="requirement__wrapper w-100 d-flex flex-column justify-content-start align-items-start p-2">
        <div className="requirement__row w-100 d-flex flex-row">
            <span className="requirement__number">2</span>
            <div className="requirement__description d-flex flex-column justify-content-start align-items-start">
                <span className="description__title">
                    <FormattedMessage id="plugin.no-extension-title" />
                </span>
                <span className="description__name">
                    <FormattedMessage id="plugin.no-extension-header" />
                </span>
            </div>
        </div>

        <div className="requirement__row w-100 d-flex flex-row">
            <span className="requirement__number" />
            {children}
        </div>
    </div>
);

// eslint-disable-next-line react/prop-types
const PluginCheck = ({ children }) => (
    <div className="requirement__wrapper w-100 d-flex flex-column justify-content-start align-items-start p-2">
        <div className="requirement__row w-100 d-flex flex-row">
            <span className="requirement__number">1</span>
            <div className="requirement__description d-flex flex-column justify-content-start align-items-start">
                <span className="description__title">
                    <FormattedMessage id="plugin.no-plugin-title" />
                </span>
                <span className="description__name">
                    <FormattedMessage id="plugin.no-plugin-description" />
                </span>
            </div>
        </div>

        <div className="requirement__row w-100 d-flex flex-row">
            <span className="requirement__number" />
            <div className="requirement__description d-flex flex-column justify-content-start align-items-start">
                {children}
            </div>
        </div>
    </div>
);

const getPluginChilds = (os) => {
    const pluginLink = getPluginDirectAppLink(os);

    if (os === 'Linux') {
        return (
            <span className="description__info">
                <FormattedMessage id="plugin.no-plugin-linux-desc-1" />
                &nbsp;
                <a className="link" href={pluginLink}>
                    <FormattedMessage id="plugin.no-plugin-linux-desc-2" />
                </a>
                &nbsp;
                <FormattedMessage id="plugin.no-plugin-linux-desc-3" />
            </span>
        );
    }

    return (
        <span className="description__info">
            <a className="link" href={pluginLink}>
                <FormattedMessage id="plugin.no-plugin-install-desc-1" />
            </a>
            &nbsp;
            <FormattedMessage id="plugin.no-plugin-install-desc-2" />
            &nbsp;
            <FormattedMessage id="plugin.no-plugin-install-desc-3" />
        </span>
    );
};

const getExtensionChilds = (browserName) => {
    if (browserName === 'Firefox') {
        return (
            <div className="requirement__description d-flex flex-column justify-content-start align-items-start">
                <span className="description__info">
                    <span className="d-block mb-1">
                        <span className="link">
                            <FormattedMessage id="plugin.no-extension-firefox-1" />
                        </span>
                        .&nbsp;
                        <FormattedMessage id="plugin.no-extension-firefox-2" />
                    </span>
                    <span>
                        <FormattedMessage id="plugin.no-plugin-update-page" />
                    </span>
                </span>
            </div>
        );
    }

    if (browserName === 'Chrome') {
        return (
            <div className="requirement__description d-flex flex-column justify-content-start align-items-start">
                <span className="description__info">
                    <span className="d-block mb-1">
                        <FormattedMessage id="plugin.no-extension-chrome-1" />
                        &nbsp;
                        <span className="link">
                            <FormattedMessage id="plugin.no-extension-chrome-2" />
                        </span>
                        ,&nbsp;
                        <FormattedMessage id="plugin.no-extension-chrome-3" />
                    </span>
                    <span>
                        <FormattedMessage id="plugin.no-plugin-update-page" />
                    </span>
                </span>
            </div>
        );
    }

    return (
        <div className="requirement__description d-flex flex-column justify-content-start align-items-start">
            <span className="description__info">
                <span className="d-block mb-1">
                    <FormattedMessage id="plugin.no-extension-default-1" />
                </span>
                <span>
                    <span className="link">
                        <FormattedMessage id="plugin.no-extension-default-2" />
                    </span>
                    &nbsp;
                    <FormattedMessage id="plugin.no-extension-default-3" />
                </span>
            </span>
        </div>
    );
};

const handleLoadExtension = (e, link) => {
    e.preventDefault();

    const windowHeight = 770;
    const windowWidth = 900;

    const left = ((window.screen.width - windowWidth) / 2) + window.screenX;
    const top = (window.screen.height - windowHeight) / 2;

    const extWindow = window.open(link, '_blank', `width=${windowWidth}, height=${windowHeight}, top=${top}, left=${left}`);
    document.body.classList.add('white-transparent');

    const timer = setInterval(() => {
        if (extWindow.closed) {
            clearInterval(timer);
            window.location.reload();
        }
    }, 300);
};


const NoPluginWithExtension = ({ browserName, os }) => {
    const ext = getExtensionDownloadLink(browserName);
    const pluginChilds = getPluginChilds(os);
    const extChilds = getExtensionChilds(browserName);

    return (
        [
            <div key="plugin-wrapper" className="requirement w-100 d-flex flex-column justify-content-start align-items-start mb-2">
                <PluginCheck>
                    {pluginChilds}
                </PluginCheck>
            </div>,
            <a
                key="extension-wrapper"
                className="requirement w-100 d-flex flex-column justify-content-start align-items-start mb-2"
                onClick={(e) => handleLoadExtension(e, ext)}
                href={ext}
            >
                <ExtensionCheck>
                    {extChilds}
                </ExtensionCheck>
            </a>,
        ]
    );
};

export default NoPluginWithExtension;

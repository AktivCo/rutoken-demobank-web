import React from 'react';

import { getPluginDownloadLink, getExtensionDownloadLink } from './pluginDownloadLinks';

// eslint-disable-next-line react/prop-types
const ExtensionCheck = ({ children }) => (
    <div className="requirement__wrapper w-100 d-flex flex-column justify-content-start align-items-start p-2">
        <div className="requirement__row w-100 d-flex flex-row">
            <span className="requirement__number">1</span>
            <div className="requirement__description d-flex flex-column justify-content-start align-items-start">
                <span className="description__title">Расширение для браузера</span>
                <span className="description__name">Адаптер Рутокен Плагин</span>
            </div>
        </div>

        <div className="requirement__row w-100 d-flex flex-row">
            <span className="requirement__number" />
            <div className="requirement__description d-flex flex-column justify-content-start align-items-start">
                <span className="description__info">
                    {children}
                </span>
            </div>
        </div>
    </div>
);

// eslint-disable-next-line react/prop-types
const PluginCheck = ({ children }) => (
    <div className="requirement__wrapper w-100 d-flex flex-column justify-content-start align-items-start p-2">
        <div className="requirement__row w-100 d-flex flex-row">
            <span className="requirement__number">2</span>
            <div className="requirement__description d-flex flex-column justify-content-start align-items-start">
                <span className="description__title">Программа</span>
                <span className="description__name">Рутокен Плагин</span>
            </div>
        </div>

        <div className="requirement__row w-100 d-flex flex-row">
            <span className="requirement__number" />
            <div className="requirement__description d-flex flex-column justify-content-start align-items-start">
                <span className="description__info">
                    {children}
                </span>
            </div>
        </div>
    </div>
);


const NoPluginWithExtension = ({ needExtension, browserName, os }) => {
    if (needExtension) {
        const ext = getExtensionDownloadLink(browserName);
        return (
            [
                <a
                    className="requirement w-100 d-flex flex-column justify-content-start align-items-start mb-2"
                    href={ext}
                >
                    <ExtensionCheck>
                        <span className="link">Установите</span>
                        &nbsp;или убедитесь, что оно активно
                    </ExtensionCheck>
                </a>,
                <div className="requirement inactive w-100 d-flex flex-column justify-content-start align-items-start mb-2">
                    <PluginCheck>
                        <span className="description__info">Сначала установите расширение для браузера</span>
                    </PluginCheck>
                </div>,
            ]
        );
    }

    const ext = getPluginDownloadLink(os);

    return (
        [
            <div className="requirement inactive w-100 d-flex flex-column justify-content-start align-items-start mb-2">
                <ExtensionCheck>
                    <span>Расширение активировано</span>
                </ExtensionCheck>
            </div>,
            <a
                className="requirement w-100 d-flex flex-column justify-content-start align-items-start mb-2"
                href={ext}
            >
                <PluginCheck>
                    <span className="link">Установите</span>
                    &nbsp;программу Рутокен плагин
                </PluginCheck>
            </a>,
        ]
    );
};

export default NoPluginWithExtension;

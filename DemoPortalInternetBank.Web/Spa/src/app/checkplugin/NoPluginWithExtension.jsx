import React from 'react';

import { getPluginDirectAppLink, getExtensionDownloadLink } from './pluginDownloadLinks';

// eslint-disable-next-line react/prop-types
const ExtensionCheck = ({ children }) => (
    <div className="requirement__wrapper w-100 d-flex flex-column justify-content-start align-items-start p-2">
        <div className="requirement__row w-100 d-flex flex-row">
            <span className="requirement__number">2</span>
            <div className="requirement__description d-flex flex-column justify-content-start align-items-start">
                <span className="description__title">Расширение для браузера</span>
                <span className="description__name">Адаптер Рутокен Плагин</span>
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
                <span className="description__title">Программа</span>
                <span className="description__name">Рутокен Плагин</span>
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
                Загрузите&nbsp;
                <a className="link" href={pluginLink}>установочный файл</a>
                &nbsp;на компьютер и откройте его. Установите программу
            </span>
        );
    }

    return (
        <span className="description__info">
            <a className="link" href={pluginLink}>Установочный файл программы</a>
                &nbsp;уже загружается. Его значок отобразится в загрузках браузера.
                &nbsp;Щелкните по значку файла и установите программу
        </span>
    );
};

const getExtensionChilds = (browserName) => {
    if (browserName === 'Firefox') {
        return (
            <div className="requirement__description d-flex flex-column justify-content-start align-items-start">
                <span className="description__info">
                    <span className="d-block mb-1">
                        <span className="link">Уставите расширение &quot;Адаптер Рутокен Плагин&quot;</span>
                            .&nbsp; В открывшемся окне нажмите
                            &quot;+ Добавить в Firefox&quot;.
                    </span>
                    <span>Обновите страницу. Если вы снова увидите этот экран — перезапустите браузер</span>
                </span>
            </div>
        );
    }

    if (browserName === 'Chrome') {
        return (
            <div className="requirement__description d-flex flex-column justify-content-start align-items-start">
                <span className="description__info">
                    <span className="d-block mb-1">
                        Включите&nbsp;
                        <span className="link">расширение</span>
                            ,&nbsp;для этого в меню браузера выберите пункт
                            &quot;Добавлено новое расширение (Адаптер Рутокен Плагин)&quot;.
                            В открывшемся окне нажмите &quot;Включить расширение&quot;.
                    </span>
                    <span>Обновите страницу. Если вы снова увидите этот экран — перезапустите браузер</span>
                </span>
            </div>
        );
    }

    return (
        <div className="requirement__description d-flex flex-column justify-content-start align-items-start">
            <span className="description__info">
                <span className="d-block mb-1">Перезапустите браузер.</span>
                <span>
                    <span className="link">Установите расширение</span>
                        &nbsp;и убедитесь, что оно активно
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
                className="requirement inactive w-100 d-flex flex-column justify-content-start align-items-start mb-2"
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

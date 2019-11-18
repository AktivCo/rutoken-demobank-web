import React from 'react';
import { getPluginDownloadLink } from './pluginDownloadLinks';

const NoSupportPluginVersion = (os) => (
    <div className="main">
        <div className="main__wrapper main__settings d-flex flex-column justify-content-start align-items-start p-2">
            <div className="aboutservice w-100 d-flex flex-column justify-content-center align-items-center">
                <span className="aboutservice__title mb-1">Обновите Рутокен Плагин до последней версии</span>
                <span className="description mb-1 ml-1">
                    Прогресс не стоит на месте: расширяются возможности работы электронной подписи в браузере и исправляются ошибки
                </span>
            </div>
            <a className="requirement w-100 d-flex flex-column justify-content-start align-items-start mb-2" href={getPluginDownloadLink(os)}>
                <div className="requirement w-100 d-flex flex-column justify-content-start align-items-start mb-2">
                    <div className="requirement__wrapper w-100 d-flex flex-column justify-content-start align-items-start p-2">
                        <div className="requirement__row w-100 d-flex flex-row">
                            <div className="requirement__description d-flex flex-column justify-content-start align-items-center">
                                <span className="description__title">Программа</span>
                                <span className="description__name">Рутокен Плагин</span>
                            </div>
                        </div>
                        <div className="requirement__row w-100 d-flex flex-row">
                            <div className="requirement__description d-flex flex-column justify-content-start align-items-start">
                                <span className="description__info justify-content-start w-100">
                                    <span className="link">Установите</span>
                                    заново Рутокен Плагин. Перезапустите браузер.
                                    Если плагин уже установлен, убедитесь, что расширение
                                    &quot;Адаптер Рутокен Плагин&quot; включено.
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </a>
            <div className="settings__divider" />

            <div className="settings__info">
                <span>
                    Модули необходимы для получения доступа к хранилищу Рутокен
                    <br />
                    и работы с сертификатами и ключами
                </span>
            </div>
        </div>
    </div>
);


export default NoSupportPluginVersion;

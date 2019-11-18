import React from 'react';

const NoPlugin = (href) => (
    <a
        className="requirement w-100 d-flex flex-column justify-content-start align-items-start mb-2"
        href={href}
    >
        <div className="requirement__wrapper w-100 d-flex flex-column justify-content-start align-items-start p-2">
            <div className="requirement__row w-100 d-flex flex-row">
                <div className="requirement__description d-flex flex-column justify-content-start">
                    <span className="description__title">Программа</span>
                    <span className="description__name">Рутокен Плагин</span>
                </div>
            </div>

            <div className="requirement__row w-100 d-flex flex-row">
                <div className="requirement__description d-flex flex-column justify-content-start">
                    <span className="description__info justify-content-start">
                        <span className="link">Установите</span>
                        &nbsp;Рутокен Плагин. Если Плагин уже установлен, убедитесь, что расширение
                        &quot;Адаптер Рутокен Плагин&quot; включено и откройте браузер заново.
                    </span>
                </div>
            </div>
        </div>
    </a>
);

export default NoPlugin;

import React from 'react';

const NoPlugin = (href, isEdge) => (
    <a
        className="requirement w-100 d-flex flex-column justify-content-start align-items-start mb-2"
        href={href}
    >
        <div className="requirement__wrapper w-100 d-flex flex-column justify-content-start align-items-start p-2">
            <div className="requirement__row w-100 d-flex flex-row">
                <div className="requirement__description w-100 d-flex flex-column justify-content-start">
                    <span className="description__title">Программа</span>
                    <span className="description__name">Рутокен Плагин</span>
                </div>
            </div>

            <div className="requirement__row w-100 d-flex flex-row">
                <div className="requirement__description w-100 d-flex flex-column justify-content-start">
                    <span className="description__info d-flex flex-column justify-content-center align-items-center">
                        <span className="link d-block mb-1">
                            Установите Рутокен Плагин
                            {isEdge ? ' для Edge' : ''}
                        </span>
                        {
                            isEdge
                            && (
                                <span className="d-block text-center mb-1">
                                    Если вы уже установили Рутокен Плагин для Edge, убедитесь что расширение браузера
                                    &quot;Рутокен Плагин для Edge&quot; активно
                                </span>
                            )
                        }
                        <span className="d-block">Обновите страницу. Если вы снова увидите этот экран — перезапустите браузер</span>
                    </span>
                </div>
            </div>
        </div>
    </a>
);

export default NoPlugin;

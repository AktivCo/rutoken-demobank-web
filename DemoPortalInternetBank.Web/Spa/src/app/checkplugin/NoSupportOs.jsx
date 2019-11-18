import React from 'react';

const NoSupportOs = (os) => (
    <div className="main">
        <div className="main__wrapper main__settings d-flex flex-column justify-content-start align-items-start p-2">
            <div className="aboutservice w-100 d-flex flex-column justify-content-center align-items-center">
                <span className="aboutservice__title mb-1">Ваша операционная система не подходит для установки Рутокен плагина</span>
            </div>
            <div className="requirement inactive w-100 d-flex flex-column justify-content-start align-items-start mb-2">
                <div className="requirement__wrapper w-100 d-flex flex-column justify-content-start align-items-start p-2">
                    <div className="requirement__row w-100 d-flex flex-row">
                        <div className="requirement__description d-flex flex-column justify-content-start align-items-start">
                            <span className="description__name">
                                Но мы работаем в
                                {
                                    os.map((o, index) => {
                                        if (os.length - 1 === index) {
                                            return [' и ', o];
                                        }
                                        if (os.length - 2 === index) {
                                            return [' ', o];
                                        }
                                        return [' ', o, ','];
                                    })
                                }
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
);

export default NoSupportOs;

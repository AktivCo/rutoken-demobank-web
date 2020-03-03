import React from 'react';
import RenderSupportedBrowsers from './RenderSupportedBrowsers';

const NoSupportBrowser = (browserName, suppBrowsers) => (
    <div className="main">
        <div className="main__wrapper main__settings d-flex flex-column justify-content-start align-items-start p-2">
            <div className="aboutservice w-100 d-flex flex-column justify-content-center align-items-center">
                <span className="aboutservice__title mb-1">
                    Браузер&nbsp;
                    {browserName}
                    &nbsp;не поддерживается Рутокен плагином
                </span>
            </div>
            <div className="requirement inactive w-100 d-flex flex-column justify-content-start align-items-start mb-2">
                <div className="requirement__wrapper w-100 d-flex flex-column justify-content-start align-items-start p-2">
                    <div className="requirement__row w-100 d-flex flex-row">
                        <div className="requirement__description d-flex flex-column justify-content-start align-items-start">
                            <RenderSupportedBrowsers suppBrowsers={suppBrowsers} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
);

export default NoSupportBrowser;

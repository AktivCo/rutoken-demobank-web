import React from 'react';
import SupportedBrowserLink from './SupportedBrowserLink';
import { getSupportedBrowserHref } from './pluginDownloadLinks';


const RenderSupportedBrowsers = (suppBrowsers) => (
    <span className="description__name">
        Но мы работаем в
        {
            suppBrowsers.suppBrowsers.map((br, index) => {
                if (suppBrowsers.suppBrowsers.length === 1) {
                    return (
                        [' ', <SupportedBrowserLink link={getSupportedBrowserHref(br)} name={br} />]
                    );
                }
                if (suppBrowsers.suppBrowsers.length - 1 === index) {
                    return [' и ', <SupportedBrowserLink link={getSupportedBrowserHref(br)} name={br} />];
                }
                if (suppBrowsers.suppBrowsers.length - 2 === index) {
                    return [' ', <SupportedBrowserLink link={getSupportedBrowserHref(br)} name={br} />];
                }
                return [' ', <SupportedBrowserLink link={getSupportedBrowserHref(br)} name={br} />, ','];
            })
        }
    </span>
);

export default RenderSupportedBrowsers;

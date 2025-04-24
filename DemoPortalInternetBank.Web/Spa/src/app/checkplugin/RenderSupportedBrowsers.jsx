import React from 'react';
import { FormattedMessage } from 'react-intl';
import SupportedBrowserLink from './SupportedBrowserLink';
import { getSupportedBrowserHref } from './pluginDownloadLinks';


const RenderSupportedBrowsers = (suppBrowsers) => (
    <span className="description__name">
        <FormattedMessage id="plugin.but-we-support-1" defaultMessage=" " />
        {
            suppBrowsers.suppBrowsers.map((br, index) => {
                if (suppBrowsers.suppBrowsers.length === 1) {
                    return (
                        [' ', <SupportedBrowserLink key={br} link={getSupportedBrowserHref(br)} name={br} />]
                    );
                }
                if (suppBrowsers.suppBrowsers.length - 1 === index) {
                    return (
                        <span key={br}>
                            &nbsp;
                            <FormattedMessage id="plugin.and-preposition" />
                            &nbsp;
                            <SupportedBrowserLink link={getSupportedBrowserHref(br)} name={br} />
                        </span>
                    );
                }
                if (suppBrowsers.suppBrowsers.length - 2 === index) {
                    return [' ', <SupportedBrowserLink key={br} link={getSupportedBrowserHref(br)} name={br} />];
                }
                return [' ', <SupportedBrowserLink key={br} link={getSupportedBrowserHref(br)} name={br} />, ','];
            })
        }
        &nbsp;
        <FormattedMessage id="plugin.but-we-support-2" defaultMessage=" " />
    </span>
);

export default RenderSupportedBrowsers;

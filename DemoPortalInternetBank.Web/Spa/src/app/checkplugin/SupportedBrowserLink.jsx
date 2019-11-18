import React from 'react';

const SupportedBrowserLink = (browser) => (
    <a href={browser.link}>{browser.name}</a>
);

export default SupportedBrowserLink;

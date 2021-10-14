const getPluginDownloadLink = (os) => {
    switch (os) {
    case 'Windows':
        return 'https://www.rutoken.ru/support/download/get/rtPlugin-win.html';
    case 'macOS':
        return 'https://www.rutoken.ru/support/download/get/rtPlugin-mac.html';
    case 'Linux':
    default:
        return 'https://www.rutoken.ru/support/download/rutoken-plugin/';
    }
};

const getExtensionDownloadLink = (browserName) => {
    switch (browserName) {
    case 'Chrome':
    case 'Vivaldi':
    case 'SputnikBrowser':
    case 'Yandex Browser':
        return 'https://chrome.google.com/webstore/detail/%D0%B0%D0%B4%D0%B0%D0%BF%D1%82%D0%B5%D1%80-%D1%80%D1%83%D1%82%D0%BE%D0%BA%D0%B5%D0%BD-%D0%BF%D0%BB%D0%B0%D0%B3%D0%B8%D0%BD/ohedcglhbbfdgaogjhcclacoccbagkjg';
    case 'Firefox':
        return 'https://addons.mozilla.org/ru/firefox/addon/adapter-rutoken-plugin/';
    case 'Opera':
        return 'https://addons.opera.com/ru/extensions/details/adapter-rutoken-plagin/';
    case 'Microsoft Edge':
        return 'https://microsoftedge.microsoft.com/addons/detail/rutoken-plugin-for-edge/bbkhpnmiijkcilgdnlaojbkokdhiijfc?hl=ru';
    default:
        return 'http://www.rutoken.ru/support/download/rutoken-plugin/';
    }
};

const getSupportedBrowserHref = (browser) => {
    switch (browser) {
    case 'Chrome':
        return 'https://www.google.com/chrome/';
    case 'Internet Explorer':
        return 'https://www.microsoft.com/ru-ru/download/internet-explorer-11-for-windows-7-details.aspx';
    case 'Firefox':
        return 'https://www.mozilla.org/en-US/firefox/organizations/all/#legacy';
    case 'Opera':
        return 'https://www.opera.com/ru/download';
    case 'Microsoft Edge':
        return 'https://support.microsoft.com/ru-ru/help/4027741/windows-get-microsoft-edge';
    case 'Yandex Browser':
        return 'https://browser.yandex.ru/';
    case 'Safari':
        return 'https://support.apple.com/ru_RU/downloads/safari';
    case 'SputnikBrowser':
        return 'https://browser.sputnik.ru/';
    default:
        return '';
    }
};


const getPluginDirectAppLink = (os) => {
    switch (os) {
    case 'Windows':
        return 'https://download.rutoken.ru/Rutoken_Plugin/Current/Windows/RutokenPlugin.msi';
    case 'macOS':
        return 'https://download.rutoken.ru/Rutoken_Plugin/Current/macOS/RutokenPlugin.pkg';
    case 'Linux':
    default:
        return 'https://www.rutoken.ru/support/download/rutoken-plugin/#linux';
    }
};

export { getExtensionDownloadLink, getPluginDownloadLink, getSupportedBrowserHref, getPluginDirectAppLink };

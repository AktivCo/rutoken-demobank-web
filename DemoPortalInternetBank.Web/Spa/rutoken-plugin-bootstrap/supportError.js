class NoSupportPlatformError {
}

class NoSupportOsError {
    constructor(supportedOs) {
        this.supportedOs = supportedOs;
    }
}

class NoSupportBrowserError {
    constructor(browser, supportedBrowsers) {
        this.browser = browser;
        this.supportedBrowsers = supportedBrowsers;
    }
}

class NoInstalledPluginError {
    constructor(browser, os, needExtension = true) {
        this.browser = browser;
        this.os = os;
        this.needExtension = needExtension;
    }
}

class NoSupportBrowserVersionError {
    constructor(browser, supportedBrowsers) {
        this.browser = browser;
        this.supportedBrowsers = supportedBrowsers;
    }
}

class NoSupportPluginVersionError {
    constructor(os) {
        this.os = os;
    }
}

export { 
    NoInstalledPluginError, 
    NoSupportPlatformError, 
    NoSupportOsError, 
    NoSupportBrowserError, 
    NoSupportBrowserVersionError,
    NoSupportPluginVersionError
};
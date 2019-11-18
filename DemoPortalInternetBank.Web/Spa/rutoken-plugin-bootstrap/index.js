import rutoken from 'rutoken';
import BrowserCompatibility from './browserCompatibility';
import getErrorCodes from './errorCodes';
import PluginError from './pluginError';

import { NoInstalledPluginError } from './supportError';

class Plugin {

    init() {

        const browserCompatibility = new BrowserCompatibility();

        return rutoken.ready
            .then(() => {
                return browserCompatibility.isCurrentBrowserSupported();
            })
            .then(() => {
                return browserCompatibility.needToCheckInstalledExtension();
            })
            .then((result) => {
                return result ? rutoken.isExtensionInstalled() : true;
            })
            .then((result) => {
                if (result) {
                    return rutoken.isPluginInstalled();
                }
                throw new NoInstalledPluginError(browserCompatibility.browser, browserCompatibility.os);

            })
            .then((result) => {
                if (result) {
                    return rutoken.loadPlugin();
                }

                throw new NoInstalledPluginError(browserCompatibility.browser, browserCompatibility.os, false);
            })
            .then((pluginObject) => {
                browserCompatibility.getSupportedBrowsersByPluginVersion(pluginObject.version);


                bindMethods.bind(this)(pluginObject);

                return Promise.resolve(this);
            })
            .catch((err) => {
                console.warn(err);
                throw err;
            });
    }
}


function bindMethods(plugin) {

    const errorCodes = getErrorCodes(plugin.errorCodes);

    Object.keys(plugin).forEach((key) => {
        if (plugin[key].prototype != undefined) {
            this[key] = function () {
                return Promise.resolve().then(() => {
                    return plugin[key].apply(this, arguments);
                })
                    .catch((err) => {
                        throw new PluginError(err, key, errorCodes);
                    });
            }
        }
        else {
            this[key] = plugin[key];
        }
    });
}



export default new Plugin();
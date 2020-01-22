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
                bindAlgorithms.bind(this)(pluginObject);

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

function bindAlgorithms(plugin) {
    const hashAlgorithms = {};

    hashAlgorithms[plugin.HASH_TYPE_GOST3411_94] = {
        name: 'HASH_TYPE_GOST3411_94',
        text: 'ГОСТ Р 34.11-94',
        value: plugin.HASH_TYPE_GOST3411_94,
    };

    hashAlgorithms[plugin.HASH_TYPE_GOST3411_12_256] = {
        name: 'HASH_TYPE_GOST3411_12_256',
        text: 'ГОСТ Р 34.11-12 256',
        value: plugin.HASH_TYPE_GOST3411_12_256,
    };

    hashAlgorithms[plugin.HASH_TYPE_GOST3411_12_512] = {
        name: 'HASH_TYPE_GOST3411_12_512',
        text: 'ГОСТ Р 34.11-12 512',
        value: plugin.HASH_TYPE_GOST3411_12_512,
    };

    hashAlgorithms[plugin.HASH_TYPE_MD5] = {
        name: 'HASH_TYPE_MD5',
        text: 'MD5',
        value: plugin.HASH_TYPE_MD5,
    };

    hashAlgorithms[plugin.HASH_TYPE_SHA1] = {
        name: 'HASH_TYPE_SHA1',
        text: 'SHA1',
        value: plugin.HASH_TYPE_SHA1,
    };

    hashAlgorithms[plugin.HASH_TYPE_SHA256] = {
        name: 'HASH_TYPE_SHA256',
        text: 'SHA256',
        value: plugin.HASH_TYPE_SHA256,
    };

    hashAlgorithms[plugin.HASH_TYPE_SHA512] = {
        name: 'HASH_TYPE_SHA512',
        text: 'SHA512',
        value: plugin.HASH_TYPE_SHA512,
    };


    const keyAlgorithms = {};

    keyAlgorithms[plugin.PUBLIC_KEY_ALGORITHM_GOST3410_2012_256] = {
        name: 'PUBLIC_KEY_ALGORITHM_GOST3410_2012_256',
        text: 'ГОСТ Р 34.10-2012 256-бит',
        value: plugin.PUBLIC_KEY_ALGORITHM_GOST3410_2012_256,
        additional: 'используется в ЕГАИС',
        paramset: 'A',
        signatureSize: 512,
        hash: [
            hashAlgorithms[plugin.HASH_TYPE_GOST3411_12_256],
        ],
    };

    keyAlgorithms[plugin.PUBLIC_KEY_ALGORITHM_GOST3410_2012_512] = {
        name: 'PUBLIC_KEY_ALGORITHM_GOST3410_2012_512',
        text: 'ГОСТ Р 34.10-2012 512-бит',
        value: plugin.PUBLIC_KEY_ALGORITHM_GOST3410_2012_512,
        paramset: 'A',
        signatureSize: 1024,
        hash: [
            hashAlgorithms[plugin.HASH_TYPE_GOST3411_12_512],
        ],
    };

    keyAlgorithms[plugin.PUBLIC_KEY_ALGORITHM_RSA] = {
        name: 'PUBLIC_KEY_ALGORITHM_RSA',
        text: 'RSA',
        value: plugin.PUBLIC_KEY_ALGORITHM_RSA,
        signatureSize: 2048,
        hash: [
            hashAlgorithms[plugin.HASH_TYPE_MD5],
            hashAlgorithms[plugin.HASH_TYPE_SHA1],
            hashAlgorithms[plugin.HASH_TYPE_SHA256],
            hashAlgorithms[plugin.HASH_TYPE_SHA512],
        ],
    };

    keyAlgorithms[plugin.PUBLIC_KEY_ALGORITHM_GOST3410_2001] = {
        name: 'PUBLIC_KEY_ALGORITHM_GOST3410_2001',
        text: 'ГОСТ Р 34.10-2001',
        value: plugin.PUBLIC_KEY_ALGORITHM_GOST3410_2001,
        additional: 'выводится из эксплуатации',
        paramset: 'A',
        signatureSize: 512,
        hash: [
            hashAlgorithms[plugin.HASH_TYPE_GOST3411_94],
        ],
    };

    this.keyAlgorithms = keyAlgorithms;
};


export default new Plugin();
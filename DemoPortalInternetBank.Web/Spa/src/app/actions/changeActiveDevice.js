import Plugin from 'rutoken-plugin-bootstrap';

import {
    pluginSetCurrentDeviceId,
    pluginSetCertificates,
} from './changeStateActions';

import { markCurrentCert } from '../certificatesStorage';

const changeCurrentDeviceId = (deviceId) => (dispatch, getState) => {
    let sequense = Promise.resolve();

    sequense = sequense.then(() => {
        dispatch(pluginSetCurrentDeviceId(deviceId));
    });

    if (getState().CERTIFICATES[deviceId]) {
        return sequense;
    }

    sequense = sequense.then(() => {
        const pluginCertCategories = [
            Plugin.CERT_CATEGORY_CA,
            Plugin.CERT_CATEGORY_OTHER,
            Plugin.CERT_CATEGORY_UNSPEC,
            Plugin.CERT_CATEGORY_USER,
        ];

        return Promise.all(pluginCertCategories.map((category) => Plugin.enumerateCertificates(deviceId, category)));
    });

    sequense = sequense.then((certs) => {
        const certificates = [].concat([], ...certs).map((certId) => ({ certId: certId }));
        return certificates;
    });

    sequense = sequense.then((certs) => markCurrentCert(certs));

    sequense = sequense.then((certs) => {
        const certificates = certs.map((cert) =>
            Plugin
                .parseCertificate(deviceId, cert.certId).then((certificate) => (
                    {
                        ...cert,
                        ...certificate,
                        certId: cert.certId,
                        issuer: Object.assign({}, ...certificate.issuer.map((is) => ({ [is.rdn]: is.value }))),
                        subject: Object.assign({}, ...certificate.subject.map((is) => ({ [is.rdn]: is.value }))),
                    }
                )));

        return Promise.all(certificates);
    });

    sequense = sequense.then((certificates) => {
        const crts = certificates.filter((fl) => fl.extensions && fl.extensions.extKeyUsage && fl.extensions.extKeyUsage.includes('1.1.1.1.1.1.2'));
        dispatch(pluginSetCertificates(deviceId, crts));
    });

    return sequense;
};

export default changeCurrentDeviceId;

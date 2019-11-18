import Plugin from 'rutoken-plugin-bootstrap';

import {
    pluginSetCurrentDeviceId,
    pluginSetCertificates,
} from './changeStateActions';


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
        const certificateIds = [].concat([], ...certs);
        const certificates = certificateIds.map((certId) =>
            Plugin
                .parseCertificate(deviceId, certId).then((certificate) => (
                    {
                        ...certificate,
                        certId: certId,
                        issuer: Object.assign({}, ...certificate.issuer.map((is) => ({ [is.rdn]: is.value }))),
                        subject: Object.assign({}, ...certificate.subject.map((is) => ({ [is.rdn]: is.value }))),
                    }
                )));

        return Promise.all(certificates);
    });

    sequense = sequense.then((certificates) => {
        dispatch(pluginSetCertificates(deviceId, certificates));
    });

    return sequense;
};

export default changeCurrentDeviceId;

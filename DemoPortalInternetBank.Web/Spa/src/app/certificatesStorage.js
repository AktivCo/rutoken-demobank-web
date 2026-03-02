const saveCurrentCert = (certId) => {
    localStorage.setItem('currentCert', certId);
};

const markCurrentCert = (certs) => {
    const currentCert = localStorage.getItem('currentCert');

    /* eslint-disable no-confusing-arrow */
    return certs
        .map((cert) => ({ ...cert, isCurrent: cert.certId === currentCert }))
        .sort((f) => f.isCurrent ? -1 : 1);
};

export { saveCurrentCert, markCurrentCert };

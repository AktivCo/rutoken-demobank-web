import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import LoadingCertificates from './LoadingCertificates';
import NoCertificates from './NoCertificates';
import CertificatesList from './CertificateList';

const CertificatesIndex = ({ CERTIFICATES, CURRENT_DEVICE_ID }) => {
    if (!CERTIFICATES[CURRENT_DEVICE_ID]) {
        return (
            <LoadingCertificates />
        );
    }

    if (CERTIFICATES[CURRENT_DEVICE_ID].length === 0) {
        return (
            <NoCertificates />
        );
    }

    return (
        <CertificatesList key="certs" certificates={CERTIFICATES[CURRENT_DEVICE_ID]} />
    );
};

const mapStateToProps = (state) => ({
    CERTIFICATES: state.CERTIFICATES,
    CURRENT_DEVICE_ID: state.CURRENT_DEVICE_ID,
});

CertificatesIndex.propTypes = {
    CURRENT_DEVICE_ID: PropTypes.number.isRequired,
    CERTIFICATES: PropTypes.shape().isRequired,
};

export default connect(mapStateToProps)(CertificatesIndex);

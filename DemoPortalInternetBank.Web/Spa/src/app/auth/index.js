import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import LoadingCertificates from './LoadingCertificates';
import Register from './Register';
import CertificatesList from './CertificateList';

const CertificatesIndex = ({ CERTIFICATES, CURRENT_DEVICE_ID, VIEW_REGISTER }) => {
    if (!CERTIFICATES[CURRENT_DEVICE_ID]) {
        return (
            <LoadingCertificates />
        );
    }

    if (VIEW_REGISTER || CERTIFICATES[CURRENT_DEVICE_ID].length === 0) {
        return (
            <Register />
        );
    }

    return (
        <CertificatesList key="certs" certificates={CERTIFICATES[CURRENT_DEVICE_ID]} />
    );
};

const mapStateToProps = (state) => ({
    CERTIFICATES: state.CERTIFICATES,
    CURRENT_DEVICE_ID: state.CURRENT_DEVICE_ID,
    VIEW_REGISTER: state.VIEW_REGISTER,
});

CertificatesIndex.propTypes = {
    CURRENT_DEVICE_ID: PropTypes.number.isRequired,
    CERTIFICATES: PropTypes.shape().isRequired,
    VIEW_REGISTER: PropTypes.bool.isRequired,
};

export default connect(mapStateToProps)(CertificatesIndex);

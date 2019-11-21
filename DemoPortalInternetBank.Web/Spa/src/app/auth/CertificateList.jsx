import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import CertificateCard from './CertificatesCard';

import { showViewRegister as showViewRegisterAction } from '../actions/uiActions';
import withOperation from '../withOperation';


import RegisterError from './RegisterError';
import Loading from './LoadingCertificates';

const CertificateList = ({ certificates, showViewRegister }) => (
    <div className="info_container main_certificatecard">
        <div className="certificatecard_certificatelist">
            <p>Выберите личный сертификат</p>
            {
                certificates.map((cert) => <CertificateCard key={cert.certId} certificate={cert} />)
            }
            <div className="mt-2">
                <button
                    type="button"
                    className="pl-2 pr-2"
                    onClick={() => showViewRegister()}
                >
                    Зарегистрироваться
                </button>
            </div>
        </div>
    </div>
);


const mapActionsToProps = (dispatch) =>
    (
        { showViewRegister: () => dispatch(showViewRegisterAction()) }
    );


CertificateList.propTypes = {
    certificates: PropTypes.arrayOf(PropTypes.shape()),
    showViewRegister: PropTypes.func.isRequired,
};

CertificateList.defaultProps = { certificates: [] };


export default withOperation('signin', connect(null, mapActionsToProps)(CertificateList), null, RegisterError, Loading);

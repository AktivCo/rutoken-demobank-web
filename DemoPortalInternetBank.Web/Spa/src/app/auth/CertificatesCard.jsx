import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { FormattedDate, FormattedMessage } from 'react-intl';
import CertificateInfo from './CertificatesInfo';


import { signin as signinAction } from '../actions/signinActions';
import PinModal from './PinModal';
import ChangePinModal from './ChangePinModal';

const CertificateCard = ({ CURRENT_DEVICE_ID, certificate, signin }) => (
    <div
        className="certificatelist_certificate"
        role="button"
        tabIndex={0}
        onClick={() => signin(CURRENT_DEVICE_ID, certificate)}
    >
        <div className="certificate_body">
            <div className="certificate_icon" />
            <div className="certificate_info">
                <CertificateInfo subject={certificate.subject} />
                <div className="info_owner">
                    <span>{certificate.subject.commonName}</span>
                </div>
                <div className="info_center">
                    <span>
                        <FormattedMessage id="auth.cert-issued" />
                        &nbsp;
                        {certificate.issuer.commonName}
                    </span>
                </div>
                <div className="info_date">
                    <span>
                        <FormattedMessage id="auth.cert-valid-thru" />
                        &nbsp;
                        <FormattedDate
                            value={certificate.validNotAfter}
                            day="numeric"
                            month="long"
                            year="numeric"
                        />
                    </span>
                </div>
            </div>
        </div>
    </div>
);

CertificateCard.propTypes = { certificate: PropTypes.shape().isRequired };

const mapStateToProps = (state) => (
    { CURRENT_DEVICE_ID: state.CURRENT_DEVICE_ID }
);


const mapActionsToProps = (dispatch) =>
    (
        {
            signin: (deviceId, certificate) => dispatch(signinAction(deviceId, certificate, {
                PinModal: PinModal,
                ChangePinModal: ChangePinModal,
            })),
        }
    );

CertificateCard.propTypes = {
    CURRENT_DEVICE_ID: PropTypes.number.isRequired,
    signin: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapActionsToProps)(CertificateCard);

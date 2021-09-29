import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';

import CertificateCard from './CertificatesCard';
import withOperation from '../withOperation';
import { showViewRegister as showViewRegisterAction } from '../actions/uiActions';

import RegisterError from './RegisterError';
import Loading from './LoadingCertificates';

class CertificateList extends React.Component {
    renderCerts() {
        const { certificates } = this.props;

        const result = [];

        const mt = <p key="choose-cert"><FormattedMessage id="auth.select-sert" /></p>;
        const mf = <p key="last-cert"><FormattedMessage id="auth.last-signin-as" /></p>;
        const mp = (certs) => certs.map((cert) => <CertificateCard key={cert.certId} certificate={cert} />);


        if (certificates.length === 1) {
            result.push(mt);
            result.push(mp(certificates));
            return result;
        }

        const { isCurrent } = certificates[0];

        if (isCurrent) {
            result.push(mf);
            result.push(mp(certificates.slice(0, 1)));

            result.push(mt);
            result.push(mp(certificates.slice(1)));
            return result;
        }

        result.push(mt);
        result.push(mp(certificates));
        return result;
    }

    render() {
        const { showViewRegister } = this.props;

        return (
            <div className="info_container main_certificatecard">
                <div className="certificatecard_certificatelist">
                    {
                        this.renderCerts()
                    }
                    <div className="mt-2">

                        <button
                            type="button"
                            className="pl-2 pr-2"
                            onClick={() => showViewRegister()}
                        >
                            <FormattedMessage id="auth.sign-in-btn" />
                        </button>
                    </div>
                </div>
            </div>
        );
    }
}


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

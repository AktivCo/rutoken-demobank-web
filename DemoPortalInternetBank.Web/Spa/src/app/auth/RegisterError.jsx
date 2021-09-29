import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { FormattedMessage } from 'react-intl';

import { operationFinished } from '../actions/operations';

const RegisterError = ({ error, restartOperation }) => (
    <div className="info_container description">
        <div className="certificatecard_certificatelist">
            <p>
                <FormattedMessage id="auth.register-error-title" />
            </p>
            <span className="error_img" />
            <span>
                {error.description}
            </span>
            <div>
                <button type="button" onClick={() => restartOperation()}>
                    <FormattedMessage id="auth.register-error-try-again" />
                </button>
            </div>
            <a href="#">
                <FormattedMessage id="auth.register-error-report" />
            </a>
        </div>
    </div>
);


const mapStateToProps = (state) =>
    ({ error: state.OPERATION_HANDLE.error });

const mapActionsToProps = (dispatch) =>
    ({ restartOperation: () => dispatch(operationFinished()) });

RegisterError.propTypes = {
    error: PropTypes.shape().isRequired,
    restartOperation: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapActionsToProps)(RegisterError);

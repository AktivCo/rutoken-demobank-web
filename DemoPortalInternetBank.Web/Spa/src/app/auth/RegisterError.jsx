import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { operationFinished } from '../actions/operations';

const RegisterError = ({ error, restartOperation }) => (
    <div className="info_container description">
        <div className="certificatecard_certificatelist">
            <p>
                Что-то пошло не так
            </p>
            <span className="error_img" />
            <span>{error.description}</span>
            <div>
                <button type="button" onClick={() => restartOperation()}>
                    Попробовать снова
                </button>
            </div>
            <a href="#">Сообщить разработчикам</a>
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

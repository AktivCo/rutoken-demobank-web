import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import OPERATION_STATUS from '../operationStatus';

const Button = ({ type, className, children, loading, onClick }) => (
    /* eslint-disable react/button-has-type */
    <button type={type} className={className} onClick={onClick} disabled={loading}>
        {children}
    </button>
);

const mapStateToProps = (state) => (
    { loading: !!state.OPERATION_HANDLE && state.OPERATION_HANDLE.status === OPERATION_STATUS.IN_PROGRESS }
);

Button.propTypes = {
    onClick: PropTypes.func.isRequired,
    children: PropTypes.node.isRequired,
    type: PropTypes.string.isRequired,
    className: PropTypes.string.isRequired,
    loading: PropTypes.bool.isRequired,
};

export default connect(mapStateToProps)(Button);

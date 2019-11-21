import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { setUserCertificate as setUserCertificateActions } from '../actions/userInfoActions';

class Personal extends React.Component {
    componentDidMount() {
        const { setUserCertificate } = this.props;
        setUserCertificate();
    }

    render() {
        return <div>персональная история</div>;
    }
}


const mapActionsToProps = (dispatch) =>
    ({ setUserCertificate: () => dispatch(setUserCertificateActions()) });

Personal.propTypes = { setUserCertificate: PropTypes.func.isRequired };

export default connect(null, mapActionsToProps)(Personal);

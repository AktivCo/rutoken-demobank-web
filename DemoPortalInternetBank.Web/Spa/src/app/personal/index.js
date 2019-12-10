import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { setUserCertificate as setUserCertificateActions } from '../actions/userInfoActions';

import PersonalNavigation from './PersonalNavigation';
import PersonalBlocksContainer from './PersonalBlocksContainer';


class Personal extends React.Component {
    componentDidMount() {
        const { setUserCertificate } = this.props;
        setUserCertificate();
    }

    render() {
        return (
            <div className="d-flex flex-row personal">
                <PersonalNavigation />
                <PersonalBlocksContainer />
            </div>

        );
    }
}


const mapActionsToProps = (dispatch) =>
    ({ setUserCertificate: () => dispatch(setUserCertificateActions()) });

Personal.propTypes = { setUserCertificate: PropTypes.func.isRequired };

export default connect(null, mapActionsToProps)(Personal);

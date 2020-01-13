import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';


const withLoader = (mapState, mapActions) => (WrappedComponent) => {
    const Component = class extends React.Component {
        static propTypes = {
            action: PropTypes.func,
            data: PropTypes.shape(),
        }

        static defaultProps = {
            action: null,
            data: null,
        }

        componentDidMount() {
            const { action, data } = this.props;
            if (action !== null && !data) action();
        }

        componentDidUpdate() {
            const { action, data } = this.props;
            if (action !== null && !data) action();
        }

        render() {
            const { action, data } = this.props;

            if (!action && !data) return <WrappedComponent />;

            if (!data) {
                return (
                    <div className="row row-no-gutters" />
                );
            }

            return <WrappedComponent />;
        }
    };

    return connect(mapState, mapActions)(Component);
};


export default withLoader;

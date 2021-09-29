import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Plugin from '@aktivco-it/rutoken-plugin-bootstrap/src/index';
import { FormattedMessage, injectIntl } from 'react-intl';

import OPERATION_STATUS from './operationStatus';

import { operationFinished as setPreviousOperationFinishedAction } from './actions/operations';

const withOperation = (operationTitle, WrappedComponent, SuccessComponent, ErrorComponent, ProcessComponent) => {
    const Component = class extends React.Component {
        static propTypes = {
            OPERATION_HANDLE: PropTypes.shape(),
            SELECTED_LANGUAGE: PropTypes.string.isRequired,
            setPreviousOperationFinished: PropTypes.func.isRequired,
            intl: PropTypes.shape().isRequired,
        };

        static defaultProps = { OPERATION_HANDLE: null };

        constructor(props) {
            super(props);
            this.state = { errorDescriptionTranslated: null };
        }

        componentDidMount() {
            const { setPreviousOperationFinished } = this.props;
            setPreviousOperationFinished();
        }

        componentWillReceiveProps(nextProps) {
            const { OPERATION_HANDLE, SELECTED_LANGUAGE } = this.props;

            if (!OPERATION_HANDLE
                    || SELECTED_LANGUAGE === nextProps.SELECTED_LANGUAGE
                    || !OPERATION_HANDLE.error
                    || !OPERATION_HANDLE.error.code) return;

            if (OPERATION_HANDLE.error.internalCodeError && !OPERATION_HANDLE.error.values) return;

            const errorDescriptionTranslated = Plugin.translateErrorByCode(OPERATION_HANDLE.error.code);

            this.setState({ errorDescriptionTranslated });
        }

        render() {
            const { OPERATION_HANDLE, intl } = this.props;

            if (!OPERATION_HANDLE) {
                return (
                    <WrappedComponent {...this.props} />
                );
            }

            if (operationTitle !== OPERATION_HANDLE.title) {
                return (
                    <WrappedComponent {...this.props} />
                );
            }

            if (OPERATION_HANDLE.status === OPERATION_STATUS.IN_PROGRESS) {
                if (ProcessComponent) {
                    return (
                        <ProcessComponent />
                    );
                }
            }

            if (OPERATION_HANDLE.status === OPERATION_STATUS.ERROR) {
                if (!OPERATION_HANDLE.error) return null;

                const { error } = OPERATION_HANDLE;
                const { errorDescriptionTranslated } = this.state;

                if (ErrorComponent) {
                    return (
                        <ErrorComponent error={OPERATION_HANDLE.error} />
                    );
                }

                let { description } = error;

                if (error.values && errorDescriptionTranslated) {
                    error.values.description = errorDescriptionTranslated;
                }

                if (OPERATION_HANDLE.error.code === Plugin.errorCodes.PIN_LOCKED) {
                    description = <FormattedMessage id="PIN_LOCKED" />;
                } else if (error.internalCodeError) {
                    description = intl.formatMessage({ id: error.internalCodeError }, error.values);
                }

                return (
                    <div>
                        <WrappedComponent {...this.props} />
                        <div className="text-danger text-center mt-1">
                            {description}
                        </div>
                    </div>
                );
            }

            if (OPERATION_HANDLE.status === OPERATION_STATUS.SUCCESS) {
                if (SuccessComponent) return <SuccessComponent data={OPERATION_HANDLE.data} />;
            }

            return <WrappedComponent {...this.props} />;
        }
    };

    return injectIntl(Component);
};


const mapStateToProps = (state) => ({
    OPERATION_HANDLE: state.OPERATION_HANDLE,
    SELECTED_LANGUAGE: state.SELECTED_LANGUAGE,
});

const mapActionsToProps = (dispatch) =>
    ({ setPreviousOperationFinished: () => dispatch(setPreviousOperationFinishedAction()) });

const wrapper = (operationTitle, wrapComponent, successComponent, errorComponent, processComponent) =>
    connect(mapStateToProps, mapActionsToProps)(withOperation(operationTitle,
        wrapComponent, successComponent, errorComponent, processComponent));

export default wrapper;

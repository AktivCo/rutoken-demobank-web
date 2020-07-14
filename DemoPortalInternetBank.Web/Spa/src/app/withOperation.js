import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Plugin from '@aktivco-it/rutoken-plugin-bootstrap/src/index';

import OPERATION_STATUS from './operationStatus';

import { operationFinished as setPreviousOperationFinishedAction } from './actions/operations';

const withOperation = (operationTitle, WrappedComponent, SuccessComponent, ErrorComponent, ProcessComponent) => {
    const Component = class extends React.Component {
        static propTypes = {
            OPERATION_HANDLE: PropTypes.shape(),
            setPreviousOperationFinished: PropTypes.func.isRequired,
        };

        static defaultProps = { OPERATION_HANDLE: null };

        componentDidMount() {
            const { setPreviousOperationFinished } = this.props;
            setPreviousOperationFinished();
        }

        render() {
            const { OPERATION_HANDLE } = this.props;

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

                if (ErrorComponent) {
                    return (
                        <ErrorComponent error={OPERATION_HANDLE.error} />
                    );
                }

                const description = OPERATION_HANDLE.error.code === Plugin.errorCodes.PIN_LOCKED
                    ? 'PIN-код Пользователя был заблокирован после неправильного ввода нескольких раз подряд. Обратитесь в службу технической поддержки.'
                    : OPERATION_HANDLE.error.description;

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

    return Component;
};


const mapStateToProps = (state) => ({ OPERATION_HANDLE: state.OPERATION_HANDLE });

const mapActionsToProps = (dispatch) =>
    ({ setPreviousOperationFinished: () => dispatch(setPreviousOperationFinishedAction()) });

const wrapper = (operationTitle, wrapComponent, successComponent, errorComponent, processComponent) =>
    connect(mapStateToProps, mapActionsToProps)(withOperation(operationTitle,
        wrapComponent, successComponent, errorComponent, processComponent));

export default wrapper;

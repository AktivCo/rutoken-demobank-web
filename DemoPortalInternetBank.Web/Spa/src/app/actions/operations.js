const operationStart = (title) => ({
    type: 'OPERATION_START',
    payload: { title },
});

const operationSuccess = (title, data) => ({
    type: 'OPERATION_SUCCESS',
    payload: {
        title,
        data,
    },
});

const operationError = (title, error) => ({
    type: 'OPERATION_ERROR',
    payload: {
        title,
        error,
    },
});

const operationFinished = () => ({ type: 'OPERATION_FINISH' });


export {
    operationStart,
    operationSuccess,
    operationError,
    operationFinished,
};

import axios from 'axios';

const getObjectsList = (objectType) => (dispatch) => {
    const getObjects = () => {
        let sequense = Promise.resolve();

        sequense = sequense.then(() => axios.get(`/api/user/payments/${objectType}`));

        return sequense;
    };

    let sequense = getObjects(objectType);

    sequense = sequense.then((response) => {
        const objList = { [objectType]: response.data };
        dispatch({ type: 'SET_OBJECTS_LIST', payload: objList });
    });

    return sequense;
};

export default getObjectsList;

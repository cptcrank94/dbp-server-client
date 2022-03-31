import {
    CREATE_CAT,
    RETRIEVE_CATS,
    UPDATE_CAT,
    DELETE_CAT,
    DELETE_ALL_CATS
} from '../actions/type';
const initialState = [];
function catReducer(cats = initialState, action) {
    const { type, payload } = action;
    switch(type) {
        case CREATE_CAT:
            return [...cats, payload];
        case RETRIEVE_CATS:
            return payload;
        case UPDATE_CAT:
            return cats.map((cat) => {
                if (cats.id === payload.id) {
                    return {
                        ...cats,
                        ...payload
                    };
                } else {
                    return cat;
                }
            });
        case DELETE_CAT:
            return cats.filter(({id}) => id !== payload.id);
        case DELETE_ALL_CATS:
            return [];
        default:
            return cats;
    }
};
export default catReducer;
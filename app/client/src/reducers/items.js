import {
    CREATE_ITEM,
    RETRIEVE_ITEMS,
    RETRIEVE_ALL_ITEMS,
    RETRIEVE_FEATURED_ITEMS,
    UPDATE_ITEM,
    DELETE_ITEM,
    DELETE_ALL_ITEMS,
    RETRIEVE_ITEM_DETAIL,
} from '../actions/type';
const initialState = [];
function itemReducer(items = initialState, action) {
    const { type, payload } = action;
    switch(type) {
        case CREATE_ITEM:
            return [...items, payload];
        case RETRIEVE_ITEMS:
            return payload;
        case RETRIEVE_ALL_ITEMS:
            return payload;
        case RETRIEVE_FEATURED_ITEMS:
            return payload;
        case RETRIEVE_ITEM_DETAIL:
            return payload;
        case UPDATE_ITEM:
            return items.map((item) => {
                if (item.id === payload.id) {
                    return {
                        ...item,
                        ...payload
                    };
                } else {
                    return item;
                }
            });
        case DELETE_ITEM:
            return items.filter(({id}) => id !== payload.id);
        case DELETE_ALL_ITEMS:
            return [];
        default:
            return items;
    }
};
export default itemReducer;
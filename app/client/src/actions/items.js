import {
    CREATE_ITEM,
    RETRIEVE_ITEMS,
    UPDATE_ITEM,
    DELETE_ITEM,
    DELETE_ALL_ITEMS,
} from './type.js';
import ItemDataService from '../services/item.service';
export const createItem = (title, description, featured, price, category, extras, allergies ) => async (dispatch) => {
    try {
        const res = await ItemDataService.create({
            title: title,
            description: description,
            featured: featured,
            price: price,
            category: category,
            extras: extras,
            allergies: allergies
        });
        dispatch({
            type: CREATE_ITEM,
            payload: res.data,
        });
        return Promise.resolve(res.data);
    } catch(err) {
        return Promise.reject(err);
    }
};

export const retrieveItems = (catName) => async(dispatch) => {
    try {
        const res = await ItemDataService.getAll(catName);
        dispatch({
            type: RETRIEVE_ITEMS,
            payload: res.data,
        });
    } catch(err) {
        console.log(err);
    }
}

export const updateItem = (id, data) => async(dispatch) => {
    try {
        const res = await ItemDataService.update(id, data);
        dispatch({
            type: UPDATE_ITEM,
            payload: data
        });
        return Promise.resolve(res.data);
    } catch(err) {
        return Promise.reject(err);
    }
}

export const deleteItem = (id) => async(dispatch) => {
    try {
        await ItemDataService.delete(id);
        dispatch({
            type: DELETE_ITEM,
            payload: { id },
        });
    } catch(err) {
        console.log(err);
    }
}

export const deleteAllItems = () => async(dispatch) => {
    try {
        const res = await ItemDataService.deleteAll();
        dispatch({
            type: DELETE_ALL_ITEMS,
            payload: res.data,
        });
        return Promise.resolve(res.data);
    } catch(err) {
        return Promise.reject(err);
    }
}
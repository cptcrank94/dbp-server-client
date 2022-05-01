import {
    CREATE_CAT,
    RETRIEVE_CATS,
    UPDATE_CAT,
    DELETE_CAT,
    DELETE_ALL_CATS,
} from './type.js';
import CategoryDataService from '../services/category.service';
export const createCat = (title) => async (dispatch) => {
    try {
        const res = await CategoryDataService.create({
            title: title
        });
        dispatch({
            type: CREATE_CAT,
            payload: res.data,
        });
        return Promise.resolve(res.data);
    } catch(err) {
        return Promise.reject(err);
    }
};

export const retrieveCats = () => async (dispatch) => {
    return CategoryDataService.getAll().then(
        (data) => {
            dispatch({
                type: RETRIEVE_CATS,
                payload: data.data,
            });
        }, (error) => {
            console.log(error);
        }
    )
    
    
    /*try {
        const res = await CategoryDataService.getAll();
        dispatch({
            type: RETRIEVE_CATS,
            payload: res.data,
        });
    } catch(err) {
        console.log(err);
    }*/
}

export const updateCat = (id, data) => async(dispatch) => {
    try {
        const res = await CategoryDataService.update(id, data);
        dispatch({
            type: UPDATE_CAT,
            payload: data
        });
        return Promise.resolve(res.data);
    } catch(err) {
        return Promise.reject(err);
    }
}

export const deleteCat = (id) => async(dispatch) => {
    try {
        await CategoryDataService.delete(id);
        dispatch({
            type: DELETE_CAT,
            payload: { id },
        });
    } catch(err) {
        console.log(err);
    }
}

export const deleteAllCats = () => async(dispatch) => {
    try {
        const res = await CategoryDataService.deleteAll();
        dispatch({
            type: DELETE_ALL_CATS,
            payload: res.data,
        });
        return Promise.resolve(res.data);
    } catch(err) {
        return Promise.reject(err);
    }
}
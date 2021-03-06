export const ITEM_ADDED = "ITEM_ADDED";
export const ITEM_REMOVED = "ITEM_REMOVED";
export const ITEMS_REQUEST = "ITEMS_REQUEST";
export const ITEMS_SUCCESS = "ITEMS_SUCCESS";
export const ITEMS_FAILURE = "ITEMS_FAILURE";
export const USER_UPDATE = "USER_UPDATE";
export const TOKEN_UPDATE = "TOKEN_UPDATE";
import * as services from "../../services.js";
import {getToken, getUser} from "../store/selectors.js";

//action
export const addItem = (item) => (dispatch, getState) => {
    const store = getState();
    const itemId = item._id;
    const token = getToken(store);
    const userId = getUser(store)._id;
    services.addItemToCart({itemId, token, userId})
    .then( () => {
      dispatch({
        type: ITEM_ADDED,
        payload: itemId,
      });
    })
    .catch( err => {
      console.log("err: ", err);
    });
};

export const removeItem = (id) => (dispatch, getState) => {
    const store = getState();
    const itemId = id;
    const token = getToken(store);
    const userId = getUser(store)._id;
    services.removeItemFromCart({itemId, token, userId})
    .then( () => {
      dispatch({
        type: ITEM_REMOVED,
        payload: itemId,
      });
    })
    .catch( err => {
      console.log("err: ", err);
    });
};

export const itemsRequest = () => ({
    type : ITEMS_REQUEST
});

export const itemSuccess = (items) => ({
    type : ITEMS_SUCCESS,
    payload : items
});

export const itemsFailure = (error) => ({
    type : ITEMS_FAILURE,
    payload : error
});

export const getItems = () => { 
        return dispatch =>  {
        dispatch(itemsRequest());
        return services.getItems()
        .then(items => {
            dispatch(itemSuccess(items));
        })
        .catch(err => {
            dispatch(itemsFailure(err));
        }) ;
    };
};

export const userUpdate = (user) => ({
    type : USER_UPDATE,
    payload : user
});

export const tokenUpdate = (token) => ({
    type : TOKEN_UPDATE,
    payload : token
});
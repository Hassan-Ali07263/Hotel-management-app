import { ADD_TO_WISHLIST, REMOVE_FROM_WISHLIST, SET_TO_WISHLIST } from "../constants";

const initialState = [];

export const reducer = (state = initialState, Action) => {
    switch (Action.type) {
        case ADD_TO_WISHLIST:
            return [
                ...state,
                Action.data
            ]
        case SET_TO_WISHLIST:
            return Action.data
        case REMOVE_FROM_WISHLIST:
            let result = state.filter(item => {
                return item != Action.data
            })
            return [...result]
        default:
            return state
    }
}
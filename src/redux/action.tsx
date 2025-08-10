import { ADD_TO_WISHLIST, REMOVE_FROM_WISHLIST, SET_TO_WISHLIST } from "../constants";

export function addToWishlist(item) {
    return {
        type: ADD_TO_WISHLIST,
        data: item
    }
}

export function setToWishlist(item){
    return {
        type:SET_TO_WISHLIST,
        data:item
    }
}

export function removeWishlist(item){
    return{
        type:REMOVE_FROM_WISHLIST,
        data:item
    }
}
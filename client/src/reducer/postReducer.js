import { POSTS_LOADED_FAIL, POSTS_LOADED_SUCCESS, POST_CREATED } from "../context/constant";

export const postReducer = (state, action) => {
    const { type, payload } = action;

    switch (type) {
        case POSTS_LOADED_SUCCESS:
            return {
                ...state,
                posts: payload,
                postLoading: false
            };
        case POSTS_LOADED_FAIL:
            return {
                ...state,
                posts: payload,
                postLoading: false
            };

        case POST_CREATED:
            return {
                ...state,
                posts: [...state.posts, payload]
               
            }
        default:
            return state;
    }


}
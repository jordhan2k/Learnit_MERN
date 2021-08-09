import { FIND_POST, POSTS_LOADED_FAIL, POSTS_LOADED_SUCCESS, POST_CREATED, POST_DELETED, POST_UPDATED } from "../context/constant";

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

        case POST_DELETED:
            return {
                ...state,
                posts: state.posts.filter(post => post._id !== payload._id)
            }

        case POST_UPDATED:
            return {
                ...state,
                posts: state.posts.map(post => post._id === payload._id ? payload : post)
            }

        case FIND_POST:
            return {
                ...state,
                post: payload
            }
        default:
            return state;
    }


}
export const postReducer = (state, action) => {
    const { type, payload } = action;

    switch (type) {
        case 'POSTS_LOADED_SUCCESSFULLY':
            return {
                ...state,
                posts: payload,
                postLoading: false
            };
    
        default:
            return state;
    }


}
import axios from 'axios';
import React, { createContext, useReducer } from 'react';
import { postReducer } from '../reducer/postReducer';
import { apiUrl } from './constant';

export const PostContext = createContext();
const PostContextProvider = ({ children }) => {

    const [postState, dispatch] = useReducer(postReducer, {
        posts: [],
        postLoading: true
    });


    const getPosts = async () => {
        try {
            const response = await axios.get(`${apiUrl}/posts`);
            if (response.data.success) {
                dispatch({
                    type: 'POSTS_LOADED_SUCCESSFULLY',
                    payload: response.data.posts
                }
                );
            }
        } catch (error) {
            return (error.response.data) ? error.response.data : { success: false, message: error.message };
        }

    }


    const postContextData = {getPosts, postState}
    return (
        <PostContext.Provider value={postContextData}>
            {children}
        </PostContext.Provider>
    );




}


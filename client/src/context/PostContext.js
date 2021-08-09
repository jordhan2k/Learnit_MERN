import axios from 'axios';
import React, { createContext, useReducer, useState } from 'react';
import { postReducer } from '../reducer/postReducer';
import { apiUrl, POSTS_LOADED_FAIL, POSTS_LOADED_SUCCESS, POST_CREATED, POST_NOT_CREATED } from './constant';

export const PostContext = createContext();
const PostContextProvider = ({ children }) => {

    const [postState, dispatch] = useReducer(postReducer, {
        posts: [],
        postLoading: true
    });
    const [showCreatePostModal, setShowCreatePostModal] = useState(false);
    const [showToast, setShowToast] = useState({
        show: false,
        message: '',
        type: null
    })

    // get all post
    const getPosts = async () => {
        try {
            const response = await axios.get(`${apiUrl}/posts`);
            if (response.data.success) {
                console.log(response.data.posts);
                dispatch({
                    type: POSTS_LOADED_SUCCESS,
                    payload: response.data.posts
                }
                );
            }
        } catch (error) {
            dispatch({
                type: POSTS_LOADED_FAIL
            })
        }

    }

    // add a post 
    const addPost = async postForm => {
        console.log(postForm)
        try {
            const response = await axios.post(`${apiUrl}/posts`, postForm);
            if (response.data.success) {
                dispatch({
                    type: POST_CREATED,
                    payload: response.data.post
                });
                return response.data;
            }

         
        } catch (error) {
            return error.response.data
                ? error.response.data
                : { success: false, message: 'Server error' };
        }
    }

    //delete a post 
    const deletedPost = async id => {
        try {
            
        } catch (error) {
            
        }
    }


    const postContextData = {
        getPosts,
        postState,
        showCreatePostModal,
        setShowCreatePostModal,
        addPost,
        showToast,
        setShowToast
    }
    return (
        <PostContext.Provider value={postContextData}>
            {children}
        </PostContext.Provider>
    );




}

export default PostContextProvider;
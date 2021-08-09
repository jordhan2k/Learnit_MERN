import axios from 'axios';
import React, { createContext, useReducer, useState } from 'react';
import { postReducer } from '../reducer/postReducer';
import { apiUrl, FIND_POST, POSTS_LOADED_FAIL, POSTS_LOADED_SUCCESS, POST_CREATED, POST_DELETED, POST_NOT_CREATED, POST_UPDATED } from './constant';

export const PostContext = createContext();
const PostContextProvider = ({ children }) => {

    const [postState, dispatch] = useReducer(postReducer, {
        post: null,
        posts: [],
        postLoading: true
    });
    const [showCreatePostModal, setShowCreatePostModal] = useState(false);
    const [showEditPostModal, setShowEditPostModal] = useState(false);
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
    const addPost = async newPost => {
        console.log(newPost)
        try {
            const response = await axios.post(`${apiUrl}/posts`, newPost);
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
    const deletePost = async id => {
        try {
            const response = await axios.delete(`${apiUrl}/posts/${id}`);
            if (response.data.success) {
                dispatch({
                    type: POST_DELETED,
                    payload: response.data.post
                })

                return response.data;
            }
        } catch (error) {
            return error.response.data
                ? error.response.data
                : { success: false, message: 'Server error' };
        }
    }

    // Find a post when user click edit button 
    const findPost = id => {
        const post = postState.posts.find(post => post._id === id);

        dispatch({
            type: FIND_POST,
            payload: post
        })
    }

    // Update a post 
    const updatePost = async updatedPost => {
        try {
           
            const response = await axios.put(`${apiUrl}/posts/${updatedPost._id}`, updatedPost);
            if (response.data.success) {
                dispatch({
                    type: POST_UPDATED,
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



    const postContextData = {
        getPosts,
        postState,
        showCreatePostModal,
        setShowCreatePostModal,
        addPost,
        showToast,
        setShowToast,
        deletePost,
        showEditPostModal,
        setShowEditPostModal,
        findPost,
        updatePost
    }
    return (
        <PostContext.Provider value={postContextData}>
            {children}
        </PostContext.Provider>
    );




}

export default PostContextProvider;
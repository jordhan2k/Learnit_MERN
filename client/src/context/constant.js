export const apiUrl = process.env.NODE_ENV !== 'production' ? 'http://localhost:5000/api' : 'smth';

export const LOCAL_STORAGE_TOKEN_NAME = 'learnit-mern';

export const POSTS_LOADED_SUCCESS = 'POSTS_LOADED_SUCCESS';
export const POSTS_LOADED_FAIL = 'POSTS_LOADED_FAIL';
export const POST_CREATED = 'POST_CREATED';
export const POST_NOT_CREATED = 'POST_NOT_CREATED';
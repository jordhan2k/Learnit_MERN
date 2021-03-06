export const apiUrl = 
process.env.NODE_ENV !== 'production' ? 'http://localhost:5000/api' 
 : 'https://polar-beyond-69464.herokuapp.com/api';

export const LOCAL_STORAGE_TOKEN_NAME = 'learnit-mern';

export const POSTS_LOADED_SUCCESS = 'POSTS_LOADED_SUCCESS';
export const POSTS_LOADED_FAIL = 'POSTS_LOADED_FAIL';
export const POST_CREATED = 'POST_CREATED';
export const POST_DELETED = 'POST_DELETED';
export const POST_UPDATED = 'POST_UPDATED';
export const FIND_POST = 'FIND_POST';


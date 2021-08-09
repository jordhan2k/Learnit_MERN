import React, { useContext, useEffect, useState } from 'react'
import { PostContext } from '../../context/PostContext';

const PostEditModal = () => {


    const {
        postState: { post },
        showEditPostModal,
        setShowEditPostModal,
        updatePost,
        setShowToast
    } = useContext(PostContext);



    const [updatedPost, setUpdatedPost] = useState(post);

    useEffect(() => setUpdatedPost(post), [post])

    // destructure updatedPost state
    const { title, url, description, status } = updatedPost;

    // immidiately update input changes
    const onInputChange = event => {
        setUpdatedPost({ ...updatedPost, [event.target.name]: event.target.value });
    }

    const closeModal = () => {
        setUpdatedPost(post);
        setShowEditPostModal(false);
    };

    const onFormSubmit = async event => {
        console.log(updatedPost._id);
        event.preventDefault();

        const { success, message } = await updatePost(updatedPost);

        closeModal();

        setShowToast({
            show: true,
            message: message,
            type: success ? 'success' : 'fail'
        });
    }


    const onStatusOptionClick = event => {
        console.log(event.target.textContent);
        setUpdatedPost({ ...updatedPost, status: event.target.textContent });

    }


    return showEditPostModal && (<div className="post-modal" >
        <form className="modal-form-container" onSubmit={onFormSubmit}>
            <p>Modify a lil' bit :))</p>

            <input
                className="input-field"
                type="text"
                name="title"
                placeholder="Add a title"
                onChange={onInputChange}
                value={title}
                required
            />


            <input
                className="input-field"
                name="url"
                placeholder="Insert a url"
                onChange={onInputChange}
                value={url}
            />

            <textarea
                className="input-field"
                name="description"
                placeholder="Describe your content"
                onChange={onInputChange}
                value={description}
            />

            <div className="input-field status-div">
                <span
                    className={`status-option ${status === 'OPEN' ? 'active open' : ''}`}
                    onClick={onStatusOptionClick}
                >
                    OPEN
                </span>
                <span
                    className={`status-option ${status === 'IN PROGRESS' ? 'active in-progress' : ''}`}
                    onClick={onStatusOptionClick}
                >
                    IN PROGRESS
                </span>
                <span
                    className={`status-option ${status === 'COMPLETED' ? 'active completed' : ''}`}
                    onClick={onStatusOptionClick}
                >
                    COMPLETED
                </span>
            </div>
            <div>
                <span className="button cancel" onClick={closeModal}>Cancel</span>
                <input className="button create" type="submit" value="Update" />
            </div>

        </form>
    </div>);
}

export default PostEditModal

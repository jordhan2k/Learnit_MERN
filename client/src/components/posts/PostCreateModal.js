import { useContext, useState } from 'react';
import { PostContext } from '../../context/PostContext';

const PostCreateModal = () => {
    const {
        showCreatePostModal,
        setShowCreatePostModal,
        addPost,
        setShowToast
    } = useContext(PostContext);
    const [postForm, setPostForm] = useState({
        title: '',
        url: '',
        description: '',
        status: 'OPEN'
    });

    // destructure postForm state
    const { title, url, description } = postForm;

    // immidiately update input changes
    const onInputChange = event => {
        setPostForm({ ...postForm, [event.target.name]: event.target.value });
    }

    const closeModal = () => {
        setPostForm({
            title: '',
            url: '',
            description: '',
        });
        setShowCreatePostModal(!showCreatePostModal)
    };

    const onFormSubmit = async event => {
        console.log("create button clicked");
        event.preventDefault();

        const { success, message, post } = await addPost(postForm);

        closeModal();

        setShowToast({
            show: true,
            message: message,
            type: success ? 'success' : 'fail'
        });
    }

    return showCreatePostModal && (<div className="post-modal" >
        <form className="modal-form-container" onSubmit={onFormSubmit}>
            <p>Eager to learn something new? Let's create!</p>

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

            <div>
                <span className="button cancel" onClick={closeModal}>Cancel</span>
                <input className="button create" type="submit" value="Create" />
            </div>

        </form>
    </div>);
}

export default PostCreateModal;

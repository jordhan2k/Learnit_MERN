import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import YouTubeIcon from '@material-ui/icons/YouTube';
import { useContext } from 'react';
import { PostContext } from '../../context/PostContext';

const ActionButtons = ({ url, _id }) => {

    const { deletePost,
        setShowToast,
        showEditPostModal,
        setShowEditPostModal,
        findPost } = useContext(PostContext);


    const deleteSinglePost = async id => {
        if (window.confirm("Delete this task? :((")) {
            const { success, message, post } = await deletePost(id);
            setShowToast({
                show: true,
                message: message,
                type: success ? 'success' : 'fail'
            });
        }
    }


    const openPostEditModal = id => {
        findPost(id);
        setShowEditPostModal(!showEditPostModal);
    }


    return (
        <div className="title-button">
            <a
                title="Watch the video"
                href={url} target="_blank"
                style={{ color: '#ff6392' }}>
                <YouTubeIcon />
            </a>
            <span
                title="Edit your task"
                style={{ color: '#60d394' }}
                onClick={openPostEditModal.bind(this, _id)}>
                <EditIcon />
            </span>
            <span
                title="Remove it :("
                onClick={deleteSinglePost.bind(this, _id)}>
                <DeleteIcon color='error' />
            </span>
        </div>
    )
}

export default ActionButtons

import React, { useContext, useEffect } from 'react'
import { AuthContext } from '../../context/AuthContext';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import { PostContext } from '../../context/PostContext';
import Spinner from '../../utils/Spinner';
import SinglePost from '../posts/SinglePost';
import PostCreateModal from '../posts/PostCreateModal';



const Dashboard = () => {
    const { logoutUser, authState } = useContext(AuthContext);
    const { getPosts,
        postState: {
            posts,
            postLoading },
        showCreatePostModal,
        setShowCreatePostModal,
        showToast: {
            show,
            message,
            type
        },
        setShowToast


    } = useContext(PostContext);


    // START: get all posts
    useEffect(() => getPosts(), []);

    useEffect(() => {
        if (show) {
            setTimeout(()=> setShowToast({
                show: false,
                message: '',
                type: null
            }), 3000);
        }
    }, [show]);


    let body = null;
    if (postLoading) {
        body = (<Spinner />);
    } else {
        if (posts.length === 0) {
            body = (<SinglePost post={{ 'title': 'No post found' }} />);
        } else {
            body = posts.map(item => (

                <SinglePost key={item._id} post={item} />


            ));








        }
    }



    return (
        <>
            <PostCreateModal />
            {show && <div className={`warning post-toast ${type}`}>{message}</div>}
            <div className="app-container">
                {/* <div className="background"></div> */}
                <div className="navbar">
                    <div className="user-area">
                        Hello, {authState.user.username}!
                    </div>
                    <div onClick={() => {
                        if (window.confirm("Do you want to logout?")) {
                            logoutUser();
                        }
                    }}> <ExitToAppIcon /></div>
                </div>


                <div className="task-container">
                    {body}
                </div>

                <div title="Let's create a task" className="add-button" onClick={() => setShowCreatePostModal(!showCreatePostModal)}>
                    <div className="vertical-stroke"></div>
                    <div className="horizontal-stroke"></div>
                </div>
            </div>
        </>
    );
}

export default Dashboard;

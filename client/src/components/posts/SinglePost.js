import React from 'react'
import ActionButtons from './ActionButtons';


const SinglePost = ({ post: { _id, title, description, url, status } }) => {
    return (
        <div className="single-task-div">
            <div className="post-header">
                <div className="post-title">{title}</div>
                <ActionButtons url={url} _id={_id}/>
            </div>
            <div className={`status ${status === 'OPEN' ? 'open': status === 'COMPLETED' ? 'completed': 'in-progress'}`}>{status}</div>
            <div className="post-desc">{description}</div>

        </div>

    )
}

export default SinglePost;

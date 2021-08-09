import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import YouTubeIcon from '@material-ui/icons/YouTube';

const ActionButtons = ({ url , _id}) => {




    return (
        <div className="title-button">
            <a title="Watch the video" href={url} target="_blank" style={{ color: '#ff6392' }}><YouTubeIcon /></a>
            <span title="Edit your task" style={{ color: '#60d394' }} ><EditIcon /></span>
            <span title="Remove it :("><DeleteIcon color='error'/></span>
        </div>
    )
}

export default ActionButtons

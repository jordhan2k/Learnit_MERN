import React, { useContext } from 'react'
import { Link } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';


import ExitToAppIcon from '@material-ui/icons/ExitToApp';


const Dashboard = () => {
    const { logoutUser, authState } = useContext(AuthContext);

    return (
        <div className="app-container">
            <div className="navbar">
                <div className="user-area">
                    Hello, {authState.user.username}
                </div>
                <div onClick={() => {
                    if (window.confirm("Do you want to logout?")) {
                        logoutUser();
                    }
                }}> <ExitToAppIcon /></div>
            </div>


            <div className="task-container">
                <div className="single-task-div">sdfsfds</div>


                </div>










                <div className="add-button">
                    <div className="vertical-stroke"></div>
                    <div className="horizontal-stroke"></div>
                </div>
            </div>
            );
}

            export default Dashboard;

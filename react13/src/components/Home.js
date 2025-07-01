import React from 'react';
import './Home.css';
import { Link } from 'react-router-dom';
// import { useUser } from '../UserContext'; // Ensure this is the correct import

const Home = () => {
    // const { user, logout } = useUser(); // Destructure the logout function

    return (
        <div className="home">
            <div className='home-content'>
                <h1>Muzio Mania</h1>
                <p className='suggest-p'>Suggest for You</p>
                {/* {user ? (
                    <>
                        <p className='suggest'>Welcome, {user}</p>
                        <button onClick={logout} className='logout-button'>Logout</button>
                    </>
                ) : ( */}
                    <Link to={`./songs?year=90's`}>
                        <p className='suggest'>90's Playlists</p>
                    </Link>
                {/* )} */}
            </div>
        </div>
    );
};

export default Home;

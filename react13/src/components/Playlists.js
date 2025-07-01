import React from 'react';
import { Link } from 'react-router-dom';

const Playlists = () => {
    const playlists = [
        { id: 1, name: "90s", image: "ph1.png", year: "90's" },
        { id: 2, name: "80s", image: "ph2.jpg", year: "80's" },
        { id: 3, name: "2k", image: "2k.jpg", year: "2000s" },
        { id: 4, name: "Feel Good", image: "feel.jpeg", year: "FeelGood" },
        { id: 5, name: "MyTop20", image: "my.jpeg", year: "MyTop20" },
        { id: 6, name: "MyTop20", image: "ph3.jpg", year: "MyTop20" }    
    ];
    
    return (
        <div id="Playlists" className='right1' >
            <div id="head">
                <p>Playlists</p>
            </div>
            <div className="p-body">
                {playlists.map((playlist) => (
                    <div key={playlist.id} className="p-ph">
        <Link to={`./songs?year=${playlist.year}`}>
                            <div>
                                <img src={playlist.image} alt={playlist.name} />
                                <h4>{playlist.name}</h4>
                            </div>
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Playlists;

import React, { useRef,useState } from 'react';
import { Link } from 'react-router-dom';
const artists = () => {

    const artists = [
        { id: 1, name: "AR Rahman", image: "ar.png" },
        { id: 2, name: "Santhosh Narayanan", image: "sana.jpg" },
        { id: 3, name: "Yuvan", image: "yuvan.jpg" },
        { id: 4, name: "Aniruth", image: "ani.jpeg" },
        { id: 7, name: "Bruno Mars", image: "brunoMars.jpg" },
    ];

    return (
      <div id="artists">
        <div id="head">
          <h1>Artists</h1>
        </div>
        <h2></h2>
        <div className="p-body">
        {artists.map((artist) => (
          <div key={artist.id} className="p-ph">
            <Link to={`./artistSong?name=${artist.name}`}>
            <div>
            <img src={artist.image} alt={artist.name} />
           <h1>{artist.name}</h1>
            </div>
            </Link>
            
          </div>
          
        ))}
      </div>
      </div>
    );
  }
  export default artists;
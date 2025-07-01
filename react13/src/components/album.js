import React, { useRef,useState } from 'react';
import { Link } from 'react-router-dom';
const album = () => {

    const artists = [
        { id: 1, name: "Vada Chennai", image: "vadaChennai.jpg" },
        { id: 2, name: "Vikram Vedha", image: "vikram vedha.jpg" },
        { id: 3, name: "Vaanam", image: "Vaanam.jpg" },
        { id: 4, name: "Love Today", image: "loveToday.jpg" },
        { id: 5, name: "Mahaan", image: "mahaan.jpg" },
        { id: 6, name: "Naanum Rowdy Than", image: "Naanum-Rowdy-Dhaan.jpg" },
        { id: 7, name: "Master", image: "master.jpg" },

    ];

    return (
      <div id="album">
        <div id="head">
          <h1>Album</h1>
        </div>
        <h2></h2>
        <div className="p-body">
        {artists.map((artist) => (
          <div key={artist.id} className="p-ph">
            <Link to={`./albumSong?name=${artist.name}`}>
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
  export default album;

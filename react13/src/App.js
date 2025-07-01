

import React from 'react';
import Playlists from './components/Playlists';
import Menu from './components/menu'
import Songs from './components/songs'
import Artists from './components/artists'
import Home from './components/Home'
import { BrowserRouter as Router,Routes, Route } from 'react-router-dom';
import './App.css'; 
import Contact from './components/contact';
import Artist from './components/artistSong';
import Album from './components/albumSong'
import AlbumSong from './components/album'

// import Liked from './components/fetchlikedSongs';
// import Sigin from './components/login';
// import { UserProvider } from './UserContext';

// const Menu = ({ handlePlaylistsClick, handleArtistsClick }) => {
//   return (
//     <div className="left">
//       <img src="logo1.png" alt="Logo" id="logo" />
//       <ul className="menu">
//         <li><a href="#Playlists" onClick={handlePlaylistsClick}>Playlists</a></li>
//         <li><a href="#artists" onClick={handleArtistsClick}>Artists</a></li>
//         <li><a href="#">Artists</a></li>
//         <li><a href="#">Library</a></li>
//         <li><a href="#">Login</a></li>
//       </ul>
//     </div>
//   );
// };

// const Artists = () => {
//   return (
//     <div id="artists">
//       <div id="head">
//         <h1>Artists</h1>
//       </div>
//       <div className="p-body">
//         {/* Add artist items here */}
//       </div>
//     </div>
//   );
// };

const App = () => {
  // const [showPlaylists, setShowPlaylists] = useState(false);
  // const [showArtists, setShowArtists] = useState(false);

  // const handlePlaylistsClick = () => {
  //   setShowPlaylists(true);
  //   setShowArtists(false);
  // };

  // const handleArtistsClick = () => {
  //   setShowPlaylists(false);
  //   setShowArtists(true);
  // };
  // Place in index.js or top of App.js
  window.onerror = function (message, source, lineno, colno, error) {
    if (message === "Script error.") {
      return true; // Suppress it
    }
  };

  return (
    <Router>
      <div className="canvas">
        <div>
          <Routes>
            <Route path="/" element={<Menu />} />
          </Routes>
        </div>
        <div className="right">
          <Routes>
            <Route path="/" element={<Home />} />
          </Routes>
          <Routes>
            <Route path="/" element={<Artists />} />
          </Routes>
          <Routes>
            <Route path="/" element={<Playlists />} />
          </Routes>

          <Routes>
            <Route path="/" element={<AlbumSong />} />
          </Routes>
        </div>
      </div>
      {/* <UserProvider> */}

      <Routes>
        <Route path="/contact" element={<Contact />} />
        {/* <Route path="/login" element={<Sigin />} /> */}
        {/* <Route path="/fetchlikedSongs" element={<Liked />} /> */}
        <Route path="/songs" element={<Songs />} />
        <Route path="/albumSong" element={<Album />} />
        <Route path="/artistSong" element={<Artist />} />
      </Routes>
      {/* </UserProvider> */}
    </Router>
  );
};



export default App;
// import React from 'react'
// const App = () => {
//   return (
//     <div>
//      <h1>hello</h1>
//     </div>
//   )
// }

// export default App

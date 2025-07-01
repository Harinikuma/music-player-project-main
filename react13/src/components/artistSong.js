import React, { useState, useRef, useEffect } from 'react';
import { BsFillPlayCircleFill, BsFillPauseCircleFill, BsFillSkipStartCircleFill, BsFillSkipEndCircleFill } from 'react-icons/bs';
import './progress-style.css';
import { songsList } from './songsData.js';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
// import { getLikedSongs, addLikedSong, removeLikedSong } from './likedSongs'; // Import the utility functions
// import { useUser } from '../UserContext.js'; // Import the useUser hook

// import { AiOutlineHeart, AiFillHeart } from 'react-icons/ai'; // Import the outline and filled heart icons

const PlaylistItem = ({ name, onClick, onLike, isLiked }) => {
    return (
        <div onClick={onClick} className="list-none m-3">
            <p style={{ cursor: 'pointer' }}>
                {/* {isLiked ? (
                    <AiFillHeart
                        style={{ color: 'red', marginRight: '5px', cursor: 'pointer' }}
                        onClick={(e) => { e.stopPropagation(); onLike(name); }}
                    />
                ) : (
                    <AiOutlineHeart
                        style={{ color: 'black', marginRight: '5px', cursor: 'pointer' }}
                        onClick={(e) => { e.stopPropagation(); onLike(name); }}
                    />
                )} */}
                {name}
            </p>
            <hr />
        </div>
    );
};

const ArtistSong = () => {
    const [selectedItem, setSelectedItem] = useState(null);
    const [isCard1Visible, setIsCard1Visible] = useState(true);
    const [isPlaying, setIsPlaying] = useState(false);
    const [audioIndex, setAudioIndex] = useState(0);
    const [progress, setProgress] = useState(0);
    const audioRef = useRef(null);
    const [currentTime, setCurrentTime] = useState('00:00');
    const [totalTime, setTotalTime] = useState('00:00');
    const navigate = useNavigate();
    // const { user } = useUser(); // Get the user information using the useUser hook
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const yearParam = queryParams.get('name');
    // const [likedSongs, setLikedSongs] = useState([]);

    const filteredList = songsList.filter(song => song.singer === yearParam || song.artist === yearParam);

    useEffect(() => {
        if (selectedItem && audioRef.current) {
            const audioElement = audioRef.current;
            const onCanPlayThrough = () => {
                if (audioElement && isPlaying) {
                    audioElement.play().catch(error => console.error('Error attempting to play audio:', error));
                }
                const duration = audioElement.duration;
                const totalMinutes = Math.floor(duration / 60);
                const totalSeconds = Math.floor(duration % 60);
                setTotalTime(`${totalMinutes.toString().padStart(2, '0')}:${totalSeconds.toString().padStart(2, '0')}`);
            };
            audioElement.addEventListener('timeupdate', updateProgress);
            audioElement.addEventListener('canplaythrough', onCanPlayThrough);
            audioElement.addEventListener('ended', handleSongEnd);
    
            return () => {
                audioElement.removeEventListener('timeupdate', updateProgress);
                audioElement.removeEventListener('canplaythrough', onCanPlayThrough);
                audioElement.removeEventListener('ended', handleSongEnd);
            };
        }
    }, [selectedItem, isPlaying]);

    // useEffect(() => {
    //     const storedLikedSongs = getLikedSongs();
    //     setLikedSongs(storedLikedSongs);
    // }, []);

    const handleItemClick = (item, index) => {
        if (selectedItem && selectedItem.id === item.id) {
            handlePlayPause();
        } else {
            setSelectedItem(item);
            setIsCard1Visible(false);
            setIsPlaying(true);
            setAudioIndex(index);

            if (audioRef.current) {
                audioRef.current.pause();
                audioRef.current.src = item.src;
                audioRef.current.load();
                setProgress(0);
                setCurrentTime('00:00');
            }
        }
    };

    const handlePlayPause = () => {
        if (audioRef.current) {
            if (isPlaying) {
                audioRef.current.pause();
            } else {
                audioRef.current.play().catch(error => console.error('Error attempting to play audio:', error));
            }
            setIsPlaying(!isPlaying);
        }
    };

    const handleSkipForward = () => {
        let newIndex = (audioIndex + 1) % filteredList.length; // Circular playlist logic
        setAudioIndex(newIndex);
        handleItemClick(filteredList[newIndex], newIndex); // Call handleItemClick with new item and index
    };

    const handleSkipBackward = () => {
        let newIndex = (audioIndex - 1 + filteredList.length) % filteredList.length; // Handle negative index
        setAudioIndex(newIndex);
        handleItemClick(filteredList[newIndex], newIndex); // Simulate item click for consistency
    };
    
    const updateProgress = () => {
        if (audioRef.current) {
            const progress = (audioRef.current.currentTime / audioRef.current.duration) * 100;
            setProgress(progress);
    
            const currentMinutes = Math.floor(audioRef.current.currentTime / 60);
            const currentSeconds = Math.floor(audioRef.current.currentTime % 60);
            setCurrentTime(`${currentMinutes.toString().padStart(2, '0')}:${currentSeconds.toString().padStart(2, '0')}`);
        }
    };

    const handleSongEnd = () => {
        if (audioIndex < filteredList.length - 1) { // Check if there are more songs
            const newIndex = audioIndex + 1;
            setAudioIndex(newIndex);
            setSelectedItem(filteredList[newIndex]); // Update selectedItem state
            handleSkipForward(); // Play the next song
        }
    };

    const handleProgressBarChange = (e) => {
        if (audioRef.current) {
            const newProgress = e.target.value;
            const duration = audioRef.current.duration;
            const newTime = (newProgress / 100) * duration;
            
            audioRef.current.currentTime = newTime;
    
            setProgress(newProgress);
            
            if (!isPlaying) {
                setIsPlaying(true);
                audioRef.current.play().catch(error => console.error('Error attempting to play audio:', error));
            }
        }
    };

    const progressBarStyle = {
        '--progress': `${progress}%`
    };

    const handleGoBack = () => {
        navigate(-1); // Go back one step in history
    };

    // const handleLike = (songName) => {
    //     if (likedSongs.includes(songName)) {
    //         removeLikedSong(songName);
    //         setLikedSongs(likedSongs.filter(song => song !== songName));
    //     } else {
    //         addLikedSong(songName);
    //         setLikedSongs([...likedSongs, songName]);
    //     }
    // };
    

    return (
        <div className="canvas">
            <div className="s-left">
                <div className="s-left-body">
                    <a href="./" onClick={handleGoBack}>
                        <img src="back.png" alt="" style={{ width: '30px', margin: '2%', top:'0', marginTop:'-5%', marginBottom:'6%' }} />
                    </a>
    <div>
        {console.log(selectedItem)} {/* Check the data in the console */}
        <p className="text-5xl sm:text-xl md:text-5xl pb-5">{yearParam}</p>
        <hr />
    </div>


                    <h3>Lists</h3>
                    {filteredList.map((item, index) => (
                        <PlaylistItem
                            key={item.id}
                            name={item.name}
                            onClick={() => handleItemClick(item, index)}
                            // onLike={handleLike} // Pass handleLike function as prop
                            // isLiked={likedSongs.includes(item.name)} // Pass isLiked prop to determine if the song is liked
                        />
                    ))}
                </div>
            </div>
            <div className="s-right">
                {isCard1Visible && (
                    <div id="card1">
                        <img src="logo1.png" alt="" />
                        <p>Enjoy the songs</p>
                    </div>
                )}
                <div id="div3" className="s-right-canvas">
                    <div>
                        {selectedItem && (
                            <div className="card">
                                <p className='title-card'>{selectedItem.Title}</p>
                                <div className="icons">
                                {/* <p style={{ fontSize: '30px' }}>{selectedItem.name}</p> */}
                                
                                <img src={selectedItem.image} alt={selectedItem.name} />
                                
                                <div >
                                    <p>{selectedItem.name}</p>
                                    <span className="artist-details sm:text-lg md:text-xs p-2">
                                        <span className='singer-name'>{selectedItem.artist}</span>&nbsp;&nbsp;&nbsp;
                                        <span className='singer-name'>{selectedItem.singer}</span>
                                    </span>
                                    <div className="flex items-center">
                                        <input
                                            type="range"
                                            min="0"
                                            max="100"
                                            value={progress}
                                            onInput={handleProgressBarChange}
                                            className="progress-bar"
                                            style={progressBarStyle}
                                        />
                                        <br/>
                                                                                
                                    </div>
                                    <div className='time'>
                                    <span id='crr-time'>{currentTime}</span>

                                    <span id='total-time'>{totalTime}</span>
                                </div></div>
                                </div>

                                <div className="flex flex-row m-10" class='inner-icons'>
                                    <BsFillSkipStartCircleFill className="btn_action" style={{ fontSize: '50px', padding: '5px' }} onClick={handleSkipBackward} />
                                    {isPlaying ? (
                                        <BsFillPauseCircleFill className="btn_action" style={{ fontSize: '50px', padding: '5px' }} onClick={handlePlayPause} />
                                    ) : (
                                        <BsFillPlayCircleFill className="btn_action" style={{ fontSize: '50px', padding: '5px' }} onClick={handlePlayPause} />
                                    )}
                                    <BsFillSkipEndCircleFill className="btn_action" style={{ fontSize: '50px', padding: '5px' }} onClick={handleSkipForward} />
                                </div>
                            </div>
                        )}
                    </div>
                </div>
                <audio ref={audioRef} />
            </div>
        </div>
    );
};

export default ArtistSong;


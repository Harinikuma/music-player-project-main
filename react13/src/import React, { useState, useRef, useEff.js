import React, { useState, useRef, useEffect } from 'react';
import { BsFillPlayCircleFill, BsFillPauseCircleFill, BsFillSkipStartCircleFill, BsFillSkipEndCircleFill } from 'react-icons/bs';
import './progress-style.css';
import { songsList } from './songsData.js';
import { useNavigate } from 'react-router-dom';

import { useLocation } from 'react-router-dom';

const PlaylistItem = ({ name, onClick }) => {
    return (
        <div onClick={onClick} className="list-none m-3">
            <p style={{ cursor: 'pointer' }}>{name}</p>
            <hr />
        </div>
    );
};

const Songs = () => {
    const [selectedItem, setSelectedItem] = useState(null);
    const [isCard1Visible, setIsCard1Visible] = useState(true);
    const [isPlaying, setIsPlaying] = useState(false);
    const [audioIndex, setAudioIndex] = useState(0);
    const [progress, setProgress] = useState(0);
    const audioRef = useRef(null);
    const [currentTime, setCurrentTime] = useState('00:00');
    const [totalTime, setTotalTime] = useState('00:00');
    const navigate = useNavigate();

    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const yearParam = queryParams.get('year');

    // const [filteredList, setFilteredList] = useState([]);

    // const { playYear } = useParams();
    
    // useEffect(() => {
    //     if (playYear) {
    //       const filteredSongs = songsList.filter(song => song.year === playYear);
    //       setFilteredList(filteredSongs);
    //     }
    //   }, [playYear]);    
    const filteredList = songsList.filter(song => song.year === yearParam);

    
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

    return (
        <div className="canvas">
            <div className="s-left">
                <div className="s-left-body">
                <a href="./" onClick={handleGoBack}>
      <img src="back.png" alt="" style={{ width: '30px', margin: '2%', top:'0', marginTop:'-5%', marginBottom:'6%' }} />
    </a>                    <p className="text-5xl sm:text-xl md:text-5xl pb-5">90s Playlists</p>
                    <hr />
                    <h3>Lists</h3>
                    {filteredList.map((item, index) => (
                        <PlaylistItem key={item.id} name={item.name} onClick={() => handleItemClick(item, index)} />
                    ))}
                </div>
            </div>
            <div className="s-right">
                {isCard1Visible && (
                    <div id="card1">
                        <img src="logo1.png" alt="" />
                        <p>Enjoy the  songs</p>
                    </div>
                )}
                <div id="div3" className="s-right-canvas">
                    <div>
                    {selectedItem && (
                        <div className="card">
                            <p>90s playlists</p>
                            <p style={{ fontSize: '30px' }}>{selectedItem.name}</p>
                            
                            <img src={selectedItem.image} alt={selectedItem.name} />
                            
                            <div className="icons">
                                <p>{selectedItem.name}</p>
                                <span class='artist-details' className='sm:text-lg md:text-xs p-2'>
                                <span className=''>{selectedItem.artist}</span>
                                <span>{selectedItem.singer}</span>

                            </span>
                                <div className="flex items-center">
                                    <span className="w-12 text-center">{currentTime}</span>
                                    <input
                                        type="range"
                                        min="0"
                                        max="100"
                                        value={progress}
                                        onInput={handleProgressBarChange}
                                        className="progress-bar"
                                        style={progressBarStyle}
                                    />
                                    <span className="w-12 text-center">{totalTime}</span>
                                </div>
                            </div>
                            
                            <div className='flex flex-row m-10'>
                                <BsFillSkipStartCircleFill className='btn_action' style={{ fontSize: '50px', padding: '5px' }} onClick={handleSkipBackward} />
                                {isPlaying ? (
                                    <BsFillPauseCircleFill className='btn_action' style={{ fontSize: '50px', padding: '5px' }} onClick={handlePlayPause} />
                                ) : (
                                    <BsFillPlayCircleFill className='btn_action' style={{ fontSize: '50px', padding: '5px' }} onClick={handlePlayPause} />
                                )}
                                <BsFillSkipEndCircleFill className='btn_action' style={{ fontSize: '50px', padding: '5px' }} onClick={handleSkipForward} />
                            </div>
                            
                        </div>
                        
                    )}
                    
                </div>
            </div>
            <audio ref={audioRef} />
        </div>
        
        </div>
    );
}
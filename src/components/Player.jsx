import React from 'react'
import Body from './Body';
import Footer from './Footer';
import "./Player.css";
import Sidebar from './Sidebar';

function Player({ spotify, handlePlayPause, handleSkipToNext, handleSkipToPrevious, playPlaylist, play }) {
    return (
        <div className="player">
            <div className="player__body">
                <Sidebar />

                <Body spotify={spotify} playPlaylist={playPlaylist} play={play} />
            </div>

            <Footer spotify={spotify} handlePlayPause={handlePlayPause} handleSkipToNext={handleSkipToNext} handleSkipToPrevious={handleSkipToPrevious}/>
        </div>
    )
}

export default Player;

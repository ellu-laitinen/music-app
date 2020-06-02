import React from "react";
import "./Player.css";

const Player = ({ tracks, artist }) => {

  if (!tracks && !artist) {
    return (
      <div> <p>Find some music!</p> </div>
    )
  }

  return (
    <div className="App">
      <div className="main-wrapper">

        <div className="songs">
          <div className="songlist">List of songs: {tracks}</div>
          <div className="artistlist">Artists: {artist}</div>
        </div>

      </div>
    </div>
  );
}

export default Player;
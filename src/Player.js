import React from "react";
import "./Player.css";

const Player = props => {

  return (
    <div className="App">
      <div className="main-wrapper">

        <div className="songs">
          <div className="songlist">List of songs: {props.tracks}</div>
          <div className="artistlist">Artists: {props.artist}</div>
        </div>

      </div>
    </div>
  );
}

export default Player;
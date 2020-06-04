import React from "react";
import "./Player.css";

const Player = ({ tracks, artist, image }) => {

  if (!tracks && !artist) {
    return (
      <div> <p>Find some music!</p> </div>
    )
  }

  return (
    <div className="App">
      <div className="songs">
        <div>
          <div className="songlist">List of songs:{tracks}

          </div>
          {/*  <div>Listen in Spotify</div> */}
        </div>
        {/*  <div className="links">Listen on Spotify {link}</div> */}
        <div className="artistlist">Artists: {artist}</div>
        <div>
          <div>{image}</div>

        </div>
      </div>

    </div >
  );
}

export default Player;
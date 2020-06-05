import React from "react";
import "./Player.css";


const Player = ({ trackList, artist, image, link, songLink }) => {


  return (


    <div className="songs">
      <h2 className="songlist"> {trackList}</h2>
      <h3 className="artistlist"> {artist}</h3>
      <img src={image} alt="album cover" className="imagelist" />
      <p><a target="_blank" rel="noopener noreferrer" href={link}>Listen in Spotify</a> </p>
      <div>
        <p>30 sec sample:</p>
        <iframe src={songLink} title="Spotify play button" width="300" height="80" frameborder="0" allowtransparency="true" allow="encrypted-media"></iframe>
      </div>
    </div>
  );
}

export default Player;
import React from "react";
import "./Player.css";

const Player = ({ trackList, artist, image, link, songLink }) => {

  return (
    <div className="songs">
      <img src={image} alt="album cover" className="imagelist" />
      <h3 className="songlist"> {trackList}</h3>
      <h5 className="artist"> {artist.join(', ')}</h5>
      <br />
      <p><a className="songlink" target="_blank" rel="noopener noreferrer" href={link}>Listen in Spotify</a> </p>
      <div>
        <p>30 sec sample:</p>
        <div className="">
          {songLink === null ? (
            <div> No sample available for this song :( </div>
          ) :
            <iframe id="sample" src={songLink} title="Spotify play button" width="300" height="80"
            ></iframe>
          }
        </div>
      </div>
    </div >
  );
}

export default Player;
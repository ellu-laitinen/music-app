import React from "react";
import "./Player.css";

import { faFrown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Player = ({ trackList, artist, image, link, songLink }) => {

  return (
    <div className="songs">
      <img src={image} alt="album cover" className="imagelist" />
      <h3 className="songlist"> {trackList}</h3>
      <h5 className="artist"> {artist.join(', ')}</h5>

      <p className="songlink"><a className="spotify-link" target="_blank" rel="noopener noreferrer" href={link}>Listen in Spotify</a> </p>
      <div>
        <h6>30 sec sample:</h6>
        <div className="">
          {songLink === null ? (
            <div className="noSample"> No sample available  <FontAwesomeIcon className="icon" icon={faFrown} /></div>
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
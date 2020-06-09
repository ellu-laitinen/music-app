import React from "react";
import "./Player.css";

import { faFrown, faExternalLinkAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Player = ({ trackList, artist, image, link, songLink }) => {

  return (
    <div className="songs">
      <img src={image} alt="album cover" className="imagelist" />
      <p className="songlist"> {trackList}</p>
      <p className="artist"> {artist.join(', ')}</p>

      <p className="songlink"><a className="spotify-link" target="_blank" rel="noopener noreferrer" href={link}>Listen in Spotify<FontAwesomeIcon className="link-icon" icon={faExternalLinkAlt} /></a> </p>
      <div>
        <p className="sample">30 sec sample:</p>
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
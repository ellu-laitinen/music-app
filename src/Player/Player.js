import React from "react";
import "./Player.css";

//import { faFrown, faExternalLinkAlt } from "@fortawesome/free-solid-svg-icons";
//import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Player = ({ trackList, artist, image, link, embeddedSong }) => {

  return (
      <div className="songs">
          <img src={image} alt="album cover" className="imagelist" />
          <p className="songlist"> {trackList}</p>
          <p className="artist"> {artist.join(', ')}</p>
          <p><a className="spotify-link" target="_blank" rel="noopener noreferrer" href={link}>Listen in Spotify</a></p>
        <iframe src={embeddedSong} title="Spotify embedded song" width="300" height="80" frameborder="0" allowtransparency="true" allow="encrypted-media"></iframe>
    </div>
  );
}

export default Player;
import React from "react";
import "./Player.css";

const Player = ({ trackList, artist, image, link, songLink, album}) => {

  return (
    <div className="songs">
       <img src={image} alt="album cover" className="imagelist" />
      <h2 className="songlist"> {trackList}</h2>
      <h3 className="artistlist"> {artist.join(', ')}</h3>
      <h4 className="albumlist">From album: {album}</h4>
      <p><a target="_blank" rel="noopener noreferrer" href={link} className="listenSpotify">Listen in Spotify</a> </p>
      <div className="sample">
        <p>30 sec sample:</p>
            <div id="songlink">
                {songLink === null ? (
                <div> No sample available for this song :( </div>
                ) :
                <iframe src={songLink} title="Spotify play button" width="300" height="80" frameborder="0" allowtransparency="true" allow="encrypted-media"></iframe>
                }
            </div>
      </div>
    </div>
  );
} 

export default Player;
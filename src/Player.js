import React from "react";
import "./Player.css";

const Player = ({ tracks, artist }) => {

  if (!tracks && !artist) {
    return (
      <div> <p>Find some music!</p> </div>
    )
  }

  return (
    <tbody className="App">
      <tr className="songs">
        <td className="songlist" colspan="2">List of songs: {tracks}</td>
        <th className="artistlist">Artists: {artist}</th>

      </tr>

    </tbody>
  );
}

export default Player;
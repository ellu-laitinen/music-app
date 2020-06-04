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
        <div className="songlist">List of songs: {tracks}</div>
        <div className="artistlist">Artists: {artist}</div>
        <div className="imagelist"> List of images: {image}
          

        </div>
      </div>

    </div>
//     <table>
// <tbody className="App">
//       <tr className="songs">
//         <td className="songlist" >List of songs: {tracks}</td>
//         <td className="artistlist" >Artists: {artist}</td>

//       </tr>

//     </tbody>
//     </table>

  );
}

export default Player;
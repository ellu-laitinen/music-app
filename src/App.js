import React, { useState, useEffect } from "react";
import { authEndpoint, clientId, redirectUri, scopes } from "./Config";
import $ from "jquery";
import hash from "./hash";
import Player from "./Player";
import "./App.css";

const App = () => {
  const [_token, setToken] = useState(undefined);
  const [tracks, setTracks] = useState();
  const [artist, setArtist] = useState();
  const [image, setImage] = useState();
  const [textLine, setTextLine] = useState(
    "Please select a year and click the button!"
  );
  const [yearStyle, setYearStyle]= useState();
 

  useEffect(() => {
    let _token = hash.access_token;

    if (_token) {
      setToken(_token);
    }
  }, []);

  const searchYear = () => {
    console.log("This was clicked");
    let searchedYear = document.getElementById("year").value;
    console.log(searchedYear);
    setTextLine(
      "Here is your playlist for the year " + searchedYear + ", enjoy!"
    );
    let decade = searchedYear.substr(0,3) + "0";
    console.log("The decade is"+ decade);
    setYearStyle("year" + decade);
    
    $.ajax({
      url:
        "https://api.spotify.com/v1/search?q=year%3A" +
        searchedYear +
        "&type=track&market=US&limit=10",
      headers: {
        Authorization: "Bearer " + _token,
      },
      success: (data) => {
        const song = data.tracks.items.map((i) => {
          /* console.log(i.name); */
          return i.name;
        });

        setTracks(song);
        /* console.log(song) */

        console.log(data);

        const artist = data.tracks.items.map((i) => {
          return i.artists.map((b) => {
            console.log(b.name);
            return b.name;
          });
        });
        setArtist(artist);
        console.log(artist);

        const trackList = data.tracks.items.map((i, index) => (
          <p key={i.id}>{i.name}</p>
        ));
        setTracks(trackList);

        const artistList = data.tracks.items.map((i) => (
          <p key={i.id}>
            {i.artists.map((b) => {
              console.log(b.name);
              if (i.artists.length > 1) {
                return b.name + ", ";
              }
              return b.name + " ";
            })}{" "}
          </p>
        ));

        artistList.toString();
        setArtist(artistList);

        const image = data.tracks.items.map((i) => {
          console.log(i.album.images[1].url)
          return i.album.images[1].url
      })
      /*   
      setImage(image) */



      const imageList = data.tracks.items.map((i) => (
          <img key={i.id} src={i.album.images[1].url} alt="" />


      ))

      setImage(imageList)
      console.log(image)

      },



    });
  };

  return (
    <div className={`App ${yearStyle}`}>
      <h1 className={`${yearStyle}font`}>Music From My Year</h1>
      {!_token && (
        <a
          className="btn btn--loginApp-link"
          href={`${authEndpoint}?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scopes.join(
            "%20"
          )}&response_type=token&show_dialog=true`}
        >
          Login to Spotify
        </a>
      )}
      {_token && (
        <div>
          <div className="searchContainer">
            <h3>Search bar thingy stuff here</h3>
            <div>
              <input type="number" id="year" defaultValue="1990"></input>
              <button className="searchButton" onClick={searchYear}>
                Get your playlist!
              </button>
            </div>
            <div className="enjoyBanner">
              <p>{textLine}</p>
              
              <Player tracks={tracks} artist={artist} image={image}/>    
              </div>       
          </div>
        </div>
      )}
    </div>
  );
};

export default App;

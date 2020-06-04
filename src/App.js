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
    const [link, setLink] = useState();
    const [textLine, setTextLine] = useState(
        "Please select a year and click the button!"


  );
 

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
        $.ajax({
            url: "https://api.spotify.com/v1/search?q=year%3A" + searchedYear + "&type=track&market=US&limit=10",
            headers: {
                'Authorization': 'Bearer ' + _token
            },
            success: (data) => {
                /*   const song = data.tracks.items.map((i) => {
                      return i.name;
                  });
  
                  setTracks(song); */

                /* const artist = data.tracks.items.map((i) => { */
                console.log(data.tracks.items)
                /*     return i.artists.map((b) => {
                        return b.name;
                    });
                }); */

                /* const link = data.tracks.items.map((i) => {
                    console.log(i.external_urls.spotify)
                    return i.external_urls.spotify

                })
                setLink(link) */


                const trackList = data.tracks.items.map((i) =>
                    <p className="tooltip" key={i.id} ><a target="_blank" rel="noopener noreferrer" href={i.external_urls.spotify}>{i.name}<span className="tooltipText">Listen in Spotify</span></a></p>
                );

                setTracks(trackList);
                /* console.log(song) */

                /*  const linkList = data.tracks.items.map((i) =>
                     <a key={i.id} href={i.external_urls.spotify}>Listen in Spotify</a>
                 ) */
                /* 
                                setLink(linkList) */

                const artistList = data.tracks.items.map((i) => (
                    <p key={i.id}>{i.artists.map((b) => {
                        console.log(b.name)
                        if (i.artists.length > 1) {
                            return b.name + (', ')
                        }
                        return b.name + (' ')
                    })} </p>)

                );

                setArtist(artistList);
                /*     console.log(artist) */



                const image = data.tracks.items.map((i) => {
                    /* console.log(i.album.images[1].url) */
                    return i.album.images[2].url
                })
                /*   
                setImage(image) */




                const imageList = data.tracks.items.map((i) => (
                    <img key={i.id} src={i.album.images[2].url} alt="" />


                ))

                setImage(imageList)
                console.log(image)
            },
        });


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
    <div className="App">
      <h1>Music From My Year</h1>
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
                            <Player tracks={tracks}
                                artist={artist}
                                image={image}
                                link={link}
                            />
                        </div>
                    </div>

                </div>
            )}

        </div>
      )}
    </div>
  );
};

export default App;

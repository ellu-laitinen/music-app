import React, { useState, useEffect } from "react";
import { authEndpoint, clientId, redirectUri, scopes } from "./Config";
import $ from "jquery";
import hash from "./hash";
import Player from "./Player";
import "./App.css";

const App = () => {
    const [_token, setToken] = useState(undefined);
    const [tracks, setTracks] = useState([]);
    const [artist, setArtist] = useState([]);
    const [textLine, setTextLine] = useState(
        "Please select a year and click the button!"
    );

    useEffect(() => {
        /*  const token = undefined */
        let _token = hash.access_token;

        if (_token) {
            setToken(_token);
        }
        $.ajax({
            url:
                "https://api.spotify.com/v1/search?q=year%3A2019&type=track&market=US&limit=10",
            type: "GET",
            beforeSend: (xhr) => {
                xhr.setRequestHeader("Authorization", "Bearer " + _token);
            },
            success: (data) => {
                const song = data.tracks.items.map((i) => {
                    console.log(i.name);
                    return i.name;
                });

                setTracks(song);
                /* console.log(song) */

                const artist = data.tracks.items.map((i) => {
                    console.log(i.artists);
                    return i.artists.map((b) => {
                        console.log(b.name);
                        return b.name;
                    });
                });
                setArtist(artist);

                console.log(artist);
                const trackList = data.tracks.items.map((i, index) => (
                    <span key={index}>{i.name}</span>
                ));

                setTracks(trackList);

                const artistList = data.tracks.items.map((i) =>
                    i.artists.map((b, index) => <span key={index}>{b.name} </span>)
                );
                setArtist(artistList);
                /*  item: data.item,
                         is_playing: data.is_playing,
                         progress_ms: data.progress_ms */
            },
        });
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
                const song = data.tracks.items.map((i) => {
                    console.log(i.name);
                    return i.name;
                });

                setTracks(song);
                /* console.log(song) */

                const artist = data.tracks.items.map((i) => {
                    console.log(i.artists);
                    return i.artists.map((b) => {
                        console.log(b.name);
                        return b.name;
                    });
                });
                setArtist(artist);

                console.log(artist);
                const trackList = data.tracks.items.map((i, index) => (
                    <span key={index}>{i.name}</span>
                ));

                setTracks(trackList);

                const artistList = data.tracks.items.map((i) =>
                    i.artists.map((b, index) => <span key={index}>{b.name} </span>)
                );
                setArtist(artistList);
                /*  item: data.item,
                         is_playing: data.is_playing,
                         progress_ms: data.progress_ms */
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
                        </div>
                    </div>
                    <Player tracks={tracks} artist={artist} />
                </div>
            )}
        </div>
    );
};

export default App;


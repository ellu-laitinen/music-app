import React, { useState, useEffect } from "react";
import { authEndpoint, clientId, redirectUri, scopes } from "./Config";
import $ from "jquery";
import hash from "./hash";
import Player from "./Player";
import './App.css';

const App = () => {

    const [token, setToken] = useState([])
    const [tracks, setTracks] = useState([])
    const [artist, setArtist] = useState([])
    let _token = hash.access_token;

    useEffect(() => {

        if (_token) {
            setToken(_token)
        }
        $.ajax({
            url: "https://api.spotify.com/v1/search?q=year%3A1996&type=track&market=US&limit=10",
            type: "GET",
            beforeSend: xhr => {
                xhr.setRequestHeader("Authorization", "Bearer " + token);
            },
            success: data => {
                const song = data.tracks.items.map((i) => {
                    console.log(i.name)
                    return i.name
                }, []);

                setTracks(song)
                /* console.log(song) */

                const artist = data.tracks.items.map((i) => {
                    /* console.log(i.artists) */
                    return i.artists.map((b) => {
                        console.log(b.name)
                        return b.name

                    })



                })
                setArtist(artist)

                /* console.log(artist) */
                const trackList = data.tracks.items.map((i, index) =>
                    (<span key={index}>{i.name}</span>), [])

                setTracks(trackList)

                const artistList = data.tracks.items.map((i) => {
                    return i.artists.map((b, index) =>
                        (<span key={index}>{b.name} </span>)
                    )
                })
                setArtist(artistList)
                /*  item: data.item,
                 is_playing: data.is_playing,
                 progress_ms: data.progress_ms */

            }
        });
    }, [])

    return (
        <div>

            {!token && (
                <a
                    className="btn btn--loginApp-link"
                    href={`${authEndpoint}?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scopes.join(
                        "%20"
                    )}&response_type=token&show_dialog=true`}
                >
                    Login to Spotify
                </a>
            )}
            {token && (
                <Player
                    tracks={tracks}
                    artist={artist} />
            )}

        </div>
    );
}

export default App;



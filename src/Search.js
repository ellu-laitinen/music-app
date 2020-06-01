import React, { useState, useEffect } from "react";
import { authEndpoint, clientId, redirectUri, scopes } from "./Config";
import $ from "jquery";
import hash from "./hash";
import Player from "./Player";
import './App.css';
import axios from 'axios';

const Search = () => {

    const [token, setToken] = useState(null)
    const [tracks, setTracks] = useState([])
    const [artist, setArtist] = useState([])

    useEffect(() => {
        let _token = hash.access_token;

        if (_token) {
            setToken(_token)
        }
    })

    useEffect(() => {
        $.ajax({
            url: "https://api.spotify.com/v1/search?q=year%3A1996&type=track&market=US&limit=10",
            type: "GET",
            beforeSend: xhr => {
                xhr.setRequestHeader("Authorization", "Bearer " + token);
            },
            success: data => {
                const song = data.tracks.items.map(function (i) {
                    return i.name
                },

                    []);
                setTracks(song)
                /* console.log(song) */

                const artist = data.tracks.items.map(function (i) {
                    /* console.log(i.artists) */
                    return i.artists.map(function (b) {

                        return b.name
                    }, [])


                }, [])
                setArtist(artist)

                /* console.log(artist) */
                const trackList = data.tracks.items.map(function (i) {
                    return i.name

                })
                setTracks(trackList)

                const artistList = data.tracks.items.map(function (i) {
                    return i.artists.map(function (b) {
                        return b.name
                    })
                })
                setArtist(artistList)
                /*  item: data.item,
                 is_playing: data.is_playing,
                 progress_ms: data.progress_ms */

            }
        });
    })

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

export default Search;



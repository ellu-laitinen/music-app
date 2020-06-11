import React, { useState, useEffect } from "react";
import { authEndpoint, clientId, redirectUri, scopes } from "../config";
import $ from "jquery";
import hash from "../hash";
import Player from "../Player/Player";
import Select from '../Select/Select'
import "./SearchMusic.css";

import { faMusic } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const SearchMusic = () => {
    const [_token, setToken] = useState(undefined);
    let [trackList, setTracks] = useState(undefined);

    const [textLine, setTextLine] = useState(
        "Please select a year and click the button!"
    );
    const [yearStyle, setYearStyle] = useState();

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
        let chosenLimit = document.getElementById("limit").value;
        console.log(chosenLimit);
        let chosenGenre = document.getElementById("genre").value;
        console.log(chosenGenre);


        setTextLine(
            "Here are your " + chosenLimit + " songs from the year " + searchedYear + ", enjoy!"
        )
        let decade = searchedYear.substr(0, 3) + "0";
        console.log("The decade is" + decade);
        setYearStyle("year" + decade);
        $.ajax({
            url: "https://api.spotify.com/v1/search?q=year%3A" + searchedYear + chosenGenre + "&type=track&market=US&limit=" + chosenLimit,
            headers: {
                'Authorization': 'Bearer ' + _token
            },
            success: (data) => {
                let trackList = data.tracks.items.map((i) => {
                    console.log(data.tracks.items)
                    console.log(i.artists)
                    return (
                        <Player
                            key={i.id}
                            trackList={i.name}
                            album={i.album.name}
                            image={i.album.images[1].url}
                            artist={i.artists.map((b) => {
                                return b.name
                            })}
                            link={i.external_urls.spotify}
                            songLink={i.preview_url}
                            embeddedSong={`https://open.spotify.com/embed/track/${i.id}`}
                        ></Player>
                    )
                });
                if (data.tracks.items.length === 0) {
                    trackList = <p className="noList">No results available, try another year or genre!</p>
                }
                setTracks(trackList);
            },

        });
    };

    return (
        <div className={`App ${yearStyle}`}>
            <div className="login-page">
                <h1 className={`login ${yearStyle}font`}>
                    <FontAwesomeIcon className="icon" icon={faMusic} />
                   Music From My Year
                    </h1>
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
            </div>
            {_token && (
                <div>
                    <div>
                        <div className="searchArea">
                            <Select></Select>
                            <button className="btn" onClick={searchYear}>
                                Get your playlist!
                        </button>

                            <p className="enjoyBanner">{textLine}</p>
                        </div>
                        <div className="musicList">
                            <div>
                                {trackList}
                            </div>
                        </div>
                    </div>
                </div>

            )}
        </div>
    );
};

export default SearchMusic;




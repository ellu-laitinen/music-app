import React, { useState, useEffect } from "react";
import { authEndpoint, clientId, redirectUri, scopes } from "../Config";
import $ from "jquery";
import hash from "../hash";
import Player from "../Player";
import Select from '../Select/Select'
import "./SearchMusic.css";

const SearchMusic = () => {
    const [_token, setToken] = useState(undefined);
    const [trackList, setTracks] = useState(undefined);
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
            url: "https://api.spotify.com/v1/search?q=year%3A" + searchedYear + "%20genre:" + chosenGenre + "&type=track&market=US&limit=" + chosenLimit,
            headers: {
                'Authorization': 'Bearer ' + _token
            },
            success: (data) => {
                const trackList = data.tracks.items.map((i) => {
                    console.log(data.tracks.items)
                    console.log(i.artists)
                    return (

                        <Player
                            key={i.id}
                            trackList={i.name}
                            image={i.album.images[1].url}
                            artist={i.artists.map((b) => {
                                return b.name
                            })}
                            link={i.external_urls.spotify}
                            songLink={i.preview_url}
                        ></Player>

                    )
                });

                setTracks(trackList);
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

                    <Select></Select>
                    <button className="searchButton" onClick={searchYear}>
                        Get your playlist!
              </button>
                    <div className="enjoyBanner">
                        <p>{textLine}</p>

                        <div className="musicList">
                            {trackList}
                        </div>


                    </div>


                </div>
            )}
        </div>
    );
};

export default SearchMusic;




import React, { useState, useEffect } from "react";
import { authEndpoint, clientId, redirectUri, scopes } from "../Config";
import $ from "jquery";
import hash from "../hash";
import Player from "../Player";
import "./SearchMusic.css";

const SearchMusic = () => {
    const [_token, setToken] = useState(undefined);
    const [trackList, setTracks] = useState(undefined);
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
        let chosenLimit = document.getElementById("limit").value;
        console.log(chosenLimit);
        let chosenGenre = document.getElementById("genre").value;
        console.log(chosenGenre);


        setTextLine(
            "Here are your " + chosenLimit + " songs from the year " + searchedYear + ", enjoy!"
        )
        $.ajax({
            url: "https://api.spotify.com/v1/search?q=year%3A" + searchedYear + chosenGenre + "&type=track&market=US&limit=" + chosenLimit,
            headers: {
                'Authorization': 'Bearer ' + _token
            },
            success: (data) => {
                const trackList = data.tracks.items.map((i) => {
                    console.log(data.tracks.items)
                    console.log(i.artists)
                    return (
                        <div>
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
                        </div>
                    )
                });

                setTracks(trackList);
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
                            <p>Select year <input type="number" id="year" defaultValue="1990" min="1900" max="2030"></input></p>
                            <p>Select genre <select id="genre">
                                <option value="">All genres</option>
                                <option value="%20genre:ambient">Ambient</option>
                                <option value="%20genre:black-metal">Black-metal</option>
                                <option value="%20genre:blues">Blues</option>
                                <option value="%20genre:classical">Classical</option>
                                <option value="%20genre:country">Country</option>
                                <option value="%20genre:death-metal">Death-metal</option>
                                <option value="%20genre:disco">Disco</option>
                                <option value="%20genre:drum-and-bass">Drum-and-bass</option>
                                <option value="%20genre:electronic">Electronic</option>
                                <option value="%20genre:folk">Folk</option>
                                <option value="%20genre:funk">Funk</option>
                                <option value="%20genre:gospel">Gospel</option>
                                <option value="%20genre:grunge">Grunge</option>
                                <option value="%20genre:hard-rock">Hard-rock</option>
                                <option value="%20genre:hip-hop">Hip-hop</option>
                                <option value="%20genre:house">House</option>
                                <option value="%20genre:industrial">Industrial</option>
                                <option value="%20genre:jazz">Jazz</option>
                                <option value="%20genre:latin">Latin</option>
                                <option value="%20genre:metal">Metal</option>
                                <option value="%20genre:new-age">New-age</option>
                                <option value="%20genre:opera">Opera</option>
                                <option value="%20genre:pop">Pop</option>
                                <option value="%20genre:punk">Punk</option>
                                <option value="%20genre:reggae">Reggae</option>
                                <option value="%20genre:rock">Rock</option>
                                <option value="%20genre:salsa">Salsa</option>
                                <option value="%20genre:samba">Samba</option>
                                <option value="%20genre:soul">Soul</option>
                                <option value="%20genre:tango">Tango</option>
                                <option value="%20genre:techno">Techno</option>
                            </select></p>
                            <p>Number of songs <select id="limit">
                                <option value="10">10</option>
                                <option value="20">20</option>
                                <option value="30">30</option>
                                <option value="40">40</option>
                                <option value="50">50</option>
                            </select></p>
                            <button className="searchButton" onClick={searchYear}>
                                Get your playlist!
                            </button>
                        </div>
                        <div className="enjoyBanner">
                            <p>{textLine}</p>
                            <div>
                                <div className="musicList">
                                    {trackList}
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            )}
        </div>
    );
};

export default SearchMusic;




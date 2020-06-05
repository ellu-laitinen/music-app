import React, { useState, useEffect } from "react";
import { authEndpoint, clientId, redirectUri, scopes } from "./Config";
import $ from "jquery";
import hash from "./hash";
import Player from "./Player";
import "./App.css";
import Container from 'react-bootstrap/Container'

const App = () => {
    const [_token, setToken] = useState([]);
    const [trackList, setTracks] = useState([]);
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
        let chosenMarket = document.getElementById("market").value;
        console.log(chosenMarket);

        if (!chosenGenre) {
            setTextLine
                ("Here are your " + chosenLimit + " songs from the year " + searchedYear + ", enjoy!")
        } else {
            setTextLine
                (
                    "Here are your " + chosenLimit + " " + chosenGenre + " songs from the year " + searchedYear + ", enjoy!"
                )
        };
        $.ajax({
            url: "https://api.spotify.com/v1/search?q=year%3A" + searchedYear + "%20genre:" + chosenGenre + "&type=track&market=" + chosenMarket + "&limit=" + chosenLimit,
            headers: {
                'Authorization': 'Bearer ' + _token
            },
            success: (data) => {
                const trackList = data.tracks.items.map((i) => {
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
                                <option selected value> -- select an option -- </option>
                                <option value="ambient">Ambient</option>
                                <option value="black-metal">Black-metal</option>
                                <option value="blues">Blues</option>
                                <option value="classical">Classical</option>
                                <option value="country">Country</option>
                                <option value="death-metal">Death-metal</option>
                                <option value="disco">Disco</option>
                                <option value="drum-and-bass">Drum-and-bass</option>
                                <option value="electronic">Electronic</option>
                                <option value="folk">Folk</option>
                                <option value="funk">Funk</option>
                                <option value="gospel">Gospel</option>
                                <option value="grunge">Grunge</option>
                                <option value="hard-rock">Hard-rock</option>
                                <option value="hip-hop">Hip-hop</option>
                                <option value="house">House</option>
                                <option value="industrial">Industrial</option>
                                <option value="jazz">Jazz</option>
                                <option value="latin">Latin</option>
                                <option value="metal">Metal</option>
                                <option value="new-age">New-age</option>
                                <option value="opera">Opera</option>
                                <option value="pop">Pop</option>
                                <option value="punk">Punk</option>
                                <option value="reggae">Reggae</option>
                                <option value="rock">Rock</option>
                                <option value="salsa">Salsa</option>
                                <option value="samba">Samba</option>
                                <option value="soul">Soul</option>
                                <option value="tango">Tango</option>
                                <option value="techno">Techno</option>
                            </select></p>
                            <p>Select market <select id="market">
                                <option value="US">United States</option>
                                <option value="FI">Finland</option>
                                <option value="SE">Sweden</option>
                                <option value="EE">Estonia</option>
                                <option value="DE">Germany</option>
                                <option value="FR">France</option>
                                <option value="ES">Spain</option>
                                <option value="GB">Great Britain</option>
                            </select></p>
                            <p>Number of songs <input type="number" id="limit" defaultValue="10" min="5" max="50"></input></p>
                            <button className="searchButton" onClick={searchYear}>
                                Get your playlist!
              </button>
                        </div>
                        <div className="enjoyBanner">
                            <p>{textLine}</p>
                            <Container fluid>
                                <div className="musicList">
                                    {trackList}
                                </div>
                            </Container>


                            {/*  <Player tracks={tracks}
                                artist={artist}
                                image={image}
                                link={link}
                            /> */}
                        </div>
                    </div>

                </div>
            )}
        </div>
    );
};

export default App;
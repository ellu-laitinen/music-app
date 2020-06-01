import React, { Component, useState} from "react";

import $ from "jquery";
import { authEndpoint, clientId, redirectUri, scopes } from "./Config";
import hash from "./hash";
import Player from "./Player";
import './App.css';


class App extends Component {
  constructor() {
    super();
    this.state = {
      searchedYear: null,
      token: null,
      item: {
        album: {
          images: [{ url: "" }]
        },
        name: "",
        artists: [{ name: "" }],
        duration_ms: 0
      },
      is_playing: "Paused",
      progress_ms: 0,
      tracks: undefined,
      artist: undefined
    };
    this.getCurrentlyPlaying = this.getCurrentlyPlaying.bind(this);
  }
  componentDidMount() {
    // Set token
    let _token = hash.access_token;

    if (_token) {
      // Set token
      this.setState({
        token: _token
      });
      this.getCurrentlyPlaying(_token);
    }
  }

  // const [textLine, setTextLine] = useState("Please select a year and click the button!");


 searchYear = () => {
 console.log("This was clicked");
 let searchingYear = document.getElementById("year").value;
 console.log(searchingYear);  
 this.setState({
   searchedYear: searchingYear
 });
 
//  setTextLine("Here is your playlist for the year " + searchedYear +", enjoy!")
 
};
  getCurrentlyPlaying(token) {
    // Make a call using the token
    $.ajax({
      url: "https://api.spotify.com/v1/search?q=year%3A1996&type=track&market=US&limit=10",
      type: "GET",
      beforeSend: xhr => {
        xhr.setRequestHeader("Authorization", "Bearer " + token);
      },
      success: data => {
        const song = data.tracks.items.map(function (i) {
          console.log(i.name)
          return i.name

        });
        /* console.log(song) */

        const artist = data.tracks.items.map(function (i) {
          /* console.log(i.artists) */
          return i.artists.map(function (b) {
            console.log(b.name)
            return b.name
          })

        })

        /* console.log(artist) */
        this.setState({
          tracks: data.tracks.items.map(function (i) {
            return i.name
          }),
          artist: data.tracks.items.map(function (i) {
            return i.artists.map(function (b) {
              return b.name
            })
          })
          /*  item: data.item,
           is_playing: data.is_playing,
           progress_ms: data.progress_ms */
        });
      }
    });
  }

  render() {
    return (
      <div className="App">
        <h1>Music From My Year</h1>
          {!this.state.token && (
            <a
              className="btn btn--loginApp-link"
              href={`${authEndpoint}?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scopes.join(
                "%20"
              )}&response_type=token&show_dialog=true`}
            >
              Login to Spotify
            </a>
          )}
          {this.state.token && ( <div>
            <div className="searchContainer">
            <h3>Search bar thingy stuff here</h3>
            <div>
            <input type="number" id="year" defaultValue= "1990"></input>
            <button className="searchButton" onClick={this.searchYear}>Get your playlist!</button>
            </div>
            <div className="enjoyBanner"><p>Wiiiii{this.state.searchedYear}</p></div>
        </div>
            <Player
              item={this.state.item}
              is_playing={this.state.is_playing}
              progress_ms={this.progress_ms}
              tracks={this.state.tracks}
              artist={this.state.artist}
            />
            </div>
          )}
        

      </div>
    );
  }
}

export default App;






























/*
function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}
export default App;
*/
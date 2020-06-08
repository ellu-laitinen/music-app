import React from 'react';

const Select = () => {
    return (
        <div>
            <div>
                <div className="searchContainer">
                    <h3>Search bar thingy stuff here</h3>

                </div>
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
            </div>
            <p>Number of songs <select id="limit">
                <option value="10">10</option>
                <option value="20">20</option>
                <option value="30">30</option>
                <option value="40">40</option>
                <option value="50">50</option>
            </select></p>
        </div>
    );
}

export default Select;

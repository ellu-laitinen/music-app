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

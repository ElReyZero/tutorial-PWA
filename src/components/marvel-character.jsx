const { useEffect, useState } = require("react");

function Character() {

    const [character, setCharacter] = useState({ name: "Loading...", description: "Loading...", thumbnail: { path: "Loading...", extension: "Loading..." }, comics: { available: "Loading..." }, series: { available: "Loading..." }, stories: { available: "Loading..." }, events: { available: "Loading..." } });

    useEffect(() => {
        if (!navigator.onLine) {
            if (localStorage.getItem("character") === null) {
                setCharacter(character)
            } else {
                setCharacter(localStorage.getItem("character"));
            }
        } else {
            const hash = "d16c22041485fdfc18f82321b9812756"
            const URL = "https://gateway.marvel.com/v1/public/characters?ts=1&apikey=4e970c2d2821be10dcf291bea0d4639c&hash=" + hash;
            fetch(URL).then(res => res.json()).then(res => {
                const randInt = Math.floor(Math.random() * res.data.results.length)
                setCharacter(res.data.results[randInt]);
                localStorage.setItem("character", res.data.results[randInt]);
            })
        }
    }, []);

    return (
        <div>
            <h1>Character</h1>
            <p>Name: {character.name}</p>
            <p>Description: {character.description}</p>
            <img src={character.thumbnail.path + "." + character.thumbnail.extension} alt={character.name} />
            <p>Amount of Comics: {character.comics.available}</p>
            <p>Amount of Series: {character.series.available}</p>
            <p>Amount of Stories: {character.stories.available}</p>
        </div>
    )
}


export default Character
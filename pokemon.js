let returnData;

function updatePokemon() {
    const pokemonId = document.getElementById('pokemonId');
    console.log(pokemonId.value);
    getPokemonData(pokemonId.value);
}

function getPokemonData(id) {
    let xhttp = new XMLHttpRequest();
    
    xhttp.open("GET", `https://pokeapi.co/api/v2/pokemon/${id}/`, true);

    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            let data = JSON.parse(this.response);
            returnData = data;
            console.log(data);
            updateHTML(data);
        }
    };
    
    xhttp.send();
}

function updateHTML(data) {
    document.getElementById("img").src = data.sprites.back_default;
    document.getElementById("name").innerText = data.name;
}
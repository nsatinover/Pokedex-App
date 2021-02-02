let test;

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
            test = data;
            updateHTML(data);
        }
    };
    
    xhttp.send();
}

function updateHTML(data) {
    let pokeImg = document.getElementById("img");
    pokeImg.style.visibility = "visible";
    pokeImg.src = data.sprites.other.dream_world.front_default;
    document.getElementById("name").innerText = data.name;
}
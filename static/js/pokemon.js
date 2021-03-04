let test;
let testAll;
let dataArray = [];

let pokeCount = 0;
let pokeArray = [];
let pokeCardArray = [];

GetAllPokemon();

function GetAllPokemon() {
    GetAllPokemonData();
    SetAllPokemon();
}

function GetAllPokemonData() {
    let xhttp = new XMLHttpRequest;

    xhttp.open("GET", `https://pokeapi.co/api/v2/pokemon?limit=151&offset=0`, false);

    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            let data = JSON.parse(this.response);
            testAll = data;
            pokeCount = data.results.length;
            pokeArray = data.results;
        }
    };

    xhttp.send();
}

function SetAllPokemon() {
    pokeArray.sort(compare);
    pokeArray.forEach(CreatePokeCard);
}

function CreatePokeCard(item){
    let name = item.name;
    getPokemonData(name, '#fullIndex')
}

function updatePokemon() {
    const pokemonId = document.getElementById('pokemonId');
    getPokemonData(pokemonId.value.toLowerCase(), '#main');
}

function clearPokemon(){
    document.querySelector('#main').innerHTML = "";
}

function getPokemonData(id, section) {
    let xhttp = new XMLHttpRequest();
    // true allows asynch (fast load) fast keeps order (slow load)
    xhttp.open("GET", `https://pokeapi.co/api/v2/pokemon/${id}/`, false);

    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            let data = JSON.parse(this.response);
            test = data;
            dataArray.push(data);
            updateHTML(data, section);
        }
    };
    
    xhttp.send();
}

function updateHTML(poke, section) {

    const card = document.createElement('div');
    card.classList.add('card', `${poke.types[0].type.name}`, 'font-weight-bold');
    const type = poke.types[0].type.name;
    const pic = poke.sprites.front_default;

    card.innerHTML = 
        `
        <div class="d-flex justify-content-around">
            <label class="card-title text-capitalize" style="padding-top: 5px">${poke.name}</label>
            <label id="pokeId" class="card-text" style="font-weight: bold;">#${poke.id}</label>
        </div>
        <hr>
        <div class="card-body">
            <img src="${pic}" alt="${poke.name}">
            
            <span class="card-text text-capitalize">${type}</span>
        </div>
        `;

    
    const fullIndex = document.querySelector(section);
    fullIndex.appendChild(card);
}

function compare( pokeA, pokeB ) {
    const pokeA_Arr = pokeA.url.split('/');
    const pokeB_Arr = pokeB.url.split('/');
    const pokeA_Id = parseInt(pokeA_Arr[6]);
    const pokeB_Id = parseInt(pokeB_Arr[6]);

    if(pokeA_Id > pokeB_Id){
        return 1;
    }
    else if(pokeA_Id < pokeB_Id){
        return -1;
    }
    else {
        return 0;
    }
}

let $pokeArray;
function savePokemon(){
    $pokeArray = $('#main').children().toArray();
    console.log($pokeArray);

    let pokemonArray = [];

    for(let i = 0; i < $pokeArray.length; i++){
        const pokemon = {
            id: parseInt(($pokeArray[i].children[0].children[1].innerText).replace('#','')),
            name: $pokeArray[i].children[0].children[0].innerText,
            type: $pokeArray[0].children[2].innerText
        }
        pokemonArray.push(pokemon);
        console.log(pokemon);
    }
}

document.querySelector('#pokemonId').addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        updatePokemon();
    }
});

// module.exports = { updateHTML };
const searchInput = document.getElementById('search-input');
const searchBtn = document.getElementById('search-button');
const searchForm = document.getElementById('search-form')
const pokemonName = document.getElementById('pokemon-name');
const pokemonID = document.getElementById('pokemon-id');
const spriteContainer = document.getElementById('sprite-container');
const weight = document.getElementById('weight');
const height = document.getElementById('height');
const types = document.getElementById('types');
const hp = document.getElementById('hp');
const attack = document.getElementById('attack');
const defence = document.getElementById('defense');
const specialAttack = document.getElementById('special-attack');
const specialDefence = document.getElementById('special-defense');
const speed = document.getElementById('speed');

const capitalFirstLetter = (name) => {
    return name.charAt(0).toUpperCase() + name.slice(1);
} 

const getPokemon = async () => {
    
    try {
        const pokemonNameOrID = searchInput.value.toLowerCase();
        const fetchPokemon = await fetch(
            `https://pokeapi-proxy.freecodecamp.rocks/api/pokemon/${pokemonNameOrID}`
        );
        const pokemonData = await fetchPokemon.json();
        console.log(pokemonData);

        console.log( capitalFirstLetter(pokemonData.name) )

        pokemonName.textContent = capitalFirstLetter(pokemonData.name);
        pokemonID.textContent = `#${pokemonData.id}`;
        weight.textContent = `Weight: ${pokemonData.weight}`;
        height.textContent = `Height: ${pokemonData.height}`;
        spriteContainer.innerHTML = `
            <img id="sprite" src="${pokemonData.sprites.front_default}" >
        `;
        // console.log(pokemonData.types[0].type.name);
        console.log(pokemonData.types.map( (item) => item.type.name ));
        types.innerHTML = pokemonData.types
            .map(item => `<span class="type ${item.type.name}">${item.type.name}</span>`)
            .join('')
            


        hp.textContent = pokemonData.stats[0].base_stat;
        attack.textContent = pokemonData.stats[1].base_stat;
        defence.textContent = pokemonData.stats[2].base_stat;
        specialAttack.textContent = pokemonData.stats[3].base_stat;
        specialDefence.textContent = pokemonData.stats[4].base_stat;
        speed.textContent = pokemonData.stats[5].base_stat;
        
    } catch (error) {
        reset();
        alert('Pokémon not found');
        console.log(`Pokémon not found: ${error}`);
    }
}

const reset = () => {
    const image = document.getElementById('sprite');
    if (image) {
        image.remove();
    };

    pokemonName.textContent = "";
    pokemonID.textContent = ``;
    weight.textContent = ``;
    height.textContent = ``;
    types.innerHTML = '';
    hp.textContent = '';
    attack.textContent = '';
    defence.textContent = '';
    specialAttack.textContent = '';
    specialDefence.textContent = '';
    speed.textContent = '';


}


searchForm.addEventListener('submit', e => {
    e.preventDefault();
    getPokemon();
    
})
function generateNum(min, max) {

    // Generate random integer
    return Math.floor(Math.random() * (max - min + 1)) + min;
}


let pokemonName
let pokemonImage
let pokemonType1
let pokemonType2

let isGuessed = false

let correctCounter = 0;
let incorrectCounter = 0;

const typeMap = {
    bug: "assets/BugIC_Box_RS.png",
    dark: "assets/DarkIC_Box_RS.png",
    dragon: "assets/DragonIC_Box_RS.png",
    electric: "assets/ElectricIC_Box_RS.png",
    fighting: "assets/FightingIC_Box_RS.png",
    fire: "assets/FireIC_Box_RS.png",
    flying: "assets/FlyingIC_Box_RS.png",
    ghost: "assets/GhostIC_Box_RS.png",
    grass: "assets/GrassIC_Box_RS.png",
    ground: "assets/GroundIC_Box_RS.png",
    ice: "assets/IceIC_Box_RS.png",
    normal: "assets/NormalIC_Box_RS.png",
    poison: "assets/PoisonIC_Box_RS.png",
    psychic: "assets/PsychicIC_Box_RS.png",
    rock: "assets/RockIC_Box_RS.png",
    steel: "assets/SteelIC_Box_RS.png",
    water: "assets/WaterIC_Box_RS.png",
    fairy: "assets/FairyIC_XY.png",

}

function fetchPokemonData() {

    //comment out the first line and activate the second line to debug with specific pokemon via natl dex #
    let rand = generateNum(1, 1025)
    //let rand = 555
    fetch(`https://pokeapi.co/api/v2/pokemon/${rand}`)
        .then(response => {
            if(!response.ok) {
                throw new Error("Network response was incorrect " + response.statusText)
            }
            return response.json()
        })
        .then(data => {
            //set pre-declared vars as the fetched pokemon data
            pokemonImage = data.sprites.other["official-artwork"].front_default
            pokemonName = data.species.name
            pokemonType1 = data.types[0].type.name
            pokemonType2 = (data.types.length > 1) 
                ? data.types[1].type.name
                : null;            
            
            //set the pokemon images and name to the html
            document.getElementById('silhouette').src = pokemonImage
            document.getElementById('pokemonImage2').src = pokemonImage
            document.getElementById('answer').innerText = pokemonName

            // Target the div
            const silhouetteDiv = document.getElementById("silhouette");

            // Dynamically set the mask-image property
            silhouetteDiv.style.webkitMaskImage = `url(${pokemonImage})`;
            silhouetteDiv.style.maskImage       = `url(${pokemonImage})`;
            silhouetteDiv.style.backgroundColor = "black"

            })
    }

//call it on window load
fetchPokemonData();


const guessText = document.getElementById('guess')
guessText.addEventListener("input", checkIfCorrect)

function fixPokemonName(name) {

    if(name === 'farfetchd') {
        return `farfetch'd`
    }
    else if(name === 'sirfetchd') {
        return `sirfetch'd`
    }
    else if(name === 'flutter-mane') {
        return 'flutter mane'
    }
    else if(name === 'great-tusk') {
        return 'great tusk'
    }
    else if(name === 'scream-tail') {
        return 'scream tail'
    }
    else  if(name === 'brute-bonnet') {
        return 'brute bonnet'
    }
    else if(name === 'flutter-mane') {
        return 'flutter mane'
    }
    else  if(name === 'slither-wing') {
        return 'slither wing'
    }
    else if(name === 'sandy-shocks') {
        return 'sandy shocks'
    }
    else if(name === 'iron-treads') {
        return 'iron treads'
    }
    else if(name === 'iron-bundle') {
        return 'iron bundle'
    }
    else if(name === 'iron-hands') {
        return 'iron hands'
    }
    else if(name === 'iron-jugulis') {
        return 'iron jugulis'
    }
    else if(name === 'iron-moth') {
        return 'iron moth'
    }
    else if(name === 'iron-thorns') {
        return 'iron thorns'
    }
    else if(name === 'iron-leaves') {
        return 'iron leaves'
    }
    else if(name === 'iron-boulder') {
        return 'iron boulder'
    }
    else if(name === 'iron-crown') {
        return 'iron crown'
    }
    else  if(name === 'iron-valiant') {
        return 'iron valiant'
    }
    else if(name === 'roaring-moon') {
        return 'roaring moon'
    }
    else if(name === 'walking-wake') {
        return 'walking wake'
    }
    else if(name === 'gouging-fire') {
        return 'gouging fire'
    }
    else if(name === 'raging-bolt') {
        return 'raging bolt'
    }
    else return name
}

function checkIfCorrect() {

    let name = fixPokemonName(pokemonName)
    

    guess = guessText.value

    if(name == guess.toLowerCase()) {
        isGuessed = !isGuessed
        correctCounter++
        
        revealAnswer()
        flashColor(0, 255, 0, 1, document.getElementById('effect'))

    }
}

function revealAnswer() {
    document.getElementById('silhouette').style.backgroundColor ='rgba(0,0,0,0)'
    document.getElementById('silhouette').height = '0';
    const answer = document.getElementById('answer');

    answer.style.opacity = '100%'

    
    
    const image = document.getElementById('pokemonImage2Container')
    image.style.transform = 'translateY(-50vh)'
    setTimeout(() => {
        refreshGuess()
    }, 2000)
    
}

function revealHint() {
    console.log(pokemonType1)
    console.log(pokemonType2)
    const type1img = typeMap[pokemonType1];
    const type2img = typeMap[pokemonType2];
    const type1 = document.getElementById('type1img');
    const type2 = document.getElementById('type2img');

    type1.style.opacity = '100%';
    type2.style.opacity = '100%';

    type1.src = type1img
    if(pokemonType2 !== null)
        type2.src = type2img
    else
        type2.src = "";

}

function refreshGuess() {
    const image = document.getElementById('pokemonImage2Container') 
    const answer = document.getElementById('answer');
    const type1 = document.getElementById('type1img');
    const type2 = document.getElementById('type2img');

    type1.style.opacity = '0%';
    type2.style.opacity = '0%';
    
    answer.style.opacity = '0%'
    image.style.transform = 'translateY(1000px)'
    if(isGuessed) {
        setTimeout(() => {
            fetchPokemonData()
            document.getElementById('guess').value = ''
        }, 1000);
    }
    else {
        incorrectCounter++
        setTimeout(() => {
            fetchPokemonData()
            document.getElementById('guess').value = ''
        }, 1000);
    }
    if(isGuessed) {
        isGuessed = !isGuessed
    }
    console.log(isGuessed)

}

function updateTracker() {
    let div = document.getElementById('percentageTracker')
    let total = correctCounter + incorrectCounter
    let percent = (correctCounter/total) * 100
    percent = roundTo(percent, 2)
    if(percent >= 0) {
        div.innerText = `
        ${correctCounter}/${total} = ${percent}%
        `
    }
}

setInterval(() => {
    updateTracker()
}, 100)

function roundTo(value, decimals) {
    const factor = 10 ** decimals;  // same as Math.pow(10, decimals)
    return Math.round(value * factor) / factor;
  }


function flashColor(r, g, b, a, div) {

    let step = 0.01;  // Opacity increment
    let interval = 5; // Delay between steps in milliseconds
    let steps = Math.round(a / step); // Number of steps to reach full opacity

    
    for (let i = 0; i <= steps; i++) {
        setTimeout(() => {
            div.style.backgroundColor = `rgba(${r}, ${g}, ${b}, ${(i * step).toFixed(2)})`;
        }, i * interval);
    }

    // Fade Out (starts after fade-in is complete)
    for (let i = a; i >= 0; i--) {
        setTimeout(() => {
            div.style.backgroundColor = `rgba(${r}, ${g}, ${b}, ${(i * step).toFixed(2)})`;
        }, (steps + i) * interval);
    }
    

}


"use strict";
const log = (msg) => console.log(msg);

const oGameData = {
    pokemonNumbers : [],
    nmbrOfCaughtPokemons : 0,
    startTime : 0,
    endTime : 0,
    timerId : null,
    trainerName : '',
    trainerAge : 0,
    trainerGender : '',
    // Metod som nollställer datan i oGameData
    init : () => {
        pokemonNumbers = [];
        nmbrOfCaughtPokemons = 0;
        startTime = 0;
        endTime = 0;
        timerId = null;
        nmbrOfSeconds = 0;
        trainerName = '';
        trainerAge = 0;
        trainerGender = '';
    },
    // Metod som slumpar fram ett tal som förhåller sig mellan 0 och webbläsarens bredd minus bildens bredd
    getLeftPosition : () => {
        let nmbr = Math.round(Math.random() * ( window.innerWidth - 300)) + 1;
        return nmbr;
    },
    // Metod som slumpar fram ett tal som förhåller sig mellan 0 och webbläsarens höjd minus bildens höjd
    getTopPosition : () => {
        let nmbr = Math.round(Math.random() * ( window.innerHeight - 300)) + 1;
        return nmbr;
    },
    // Metod som hämtar antalet millisekunder sedan 1 januari 1970 och placerar värdet i beginning attributet
    startTimeInMilliseconds : function() {
        this.startTime =  Date.now();
    },

    // Metod som hämtar antalet millisekunder sedan 1 januari 1970 och placerar värdet i ending attributet
    endTimeInMilliseconds : function() {
        this.endTime = Date.now();
    },

    // Metod som räknar ut och returnerar antalet millisekunder det tog att fånga alla 10 pokemons
    nmbrOfMilliseconds: () => {
        return this.endTime - this.startTime;
    }
}

// I denna fil skriver ni all er kod
document.querySelector("#submitBtn").addEventListener('click', validateForm);
document.querySelector('form').addEventListener('submit', (event) => {
    event.preventDefault();
    validateForm();
});

function validateForm() {
    log ("Hejsan!");
    const nick = document.getElementById('nick');
    const ageInput = document.getElementById('age');
    let gender = document.getElementsByName('gender');
    let checked = false;
    let errors = [];
    let age = parseInt(ageInput.value, 10);    

        try {
            if (!nick.value) {
                nick.focus();//Fokuserar fältet om input-fältet är tomt
                nick.classList.add('error');
                nick.placeholder = "Användarnamnet får inte vara tomt.";
                throw new Error("Användarnamnet får inte vara tomt.");
            } else if (nick.value.length < 5 || nick.value.length > 10) {
                nick.focus(); //Fokuserar fältet om användaren har angivit för få eller för många tecken i sitt nick
                nick.classList.add('error');
                nick.value = 'Användarnamnet måste vara mellan 5 och 10 tecken.';
                throw new Error("Användarnamnet måste vara mellan 5 och 10 tecken."); //Skapar error meddelande
            } else {
                nick.classList.remove('error');
            }
            
            if (!ageInput.value) {
                ageInput.focus();
                ageInput.placeholder = "Fyll i din ålder";
                ageInput.classList.add('error');
                throw new Error("Fyll i din ålder");
            } else if (age < 10 || age > 15) {
                ageInput.focus();
                ageInput.classList.add('error');
                ageInput.value = "Du måste vara mellan 10 och 15 år";
                throw new Error("Du måste vara mellan 10 och 15 år");
            } else {
                ageInput.classList.remove('error');
            }
            for (let i = 0; i < gender.length; i++) {
                gender[i].addEventListener('change', () => {
                  // Ta bort 'error'-klassen från alla radio-knappar
                for (let j = 0; j < gender.length; j++) {
                    gender[j].classList.remove('error');
                }
            
                if (gender[i].checked) {
                    checked = true;
                    }
                });
            
                if (gender[i].checked) {
                    checked = true;
                }
            }
            
            if (!checked) {
                // Ingen radio-knapp är markerad
                for (let i = 0; i < gender.length; i++) {
                    gender[i].classList.add('error');
                }
                throw new Error('Vänligen markera ett alternativ!');
                
        }
    } catch (error) {
            errors.push(error.message); //Slänger in errormedellande i arrayen errors
            log (errors);
        }
    
        if (errors.length > 0) { //Kollar om errors finns i arrayen 
            return errors; //Returnerar errors från funktionen
        }
        startGame();
    }

function startGame() {
    document.querySelector('#formWrapper').classList.add('d-none');
    document.getElementById('gameField').classList.remove('d-none');
    oGameData.trainerName = document.querySelector('#nick').value;
    oGameData.trainerAge = document.querySelector('#age').value;
    oGameData.trainerGender = document.getElementsByName('gender');
    
    //Musiken starta när spelen starta
    const audioElement = document.getElementById('musicGame');
    audioElement.volume = 0.050;

    audioElement.play();
    audioElement.addEventListener('ended', () => {
        audioElement.play();
    });

    pokemonChar();
}

function pokemonChar() {
    const pokemonsId = Array.from({length: 151},(_,i)=>i+1);
    oGameData.pokemonNumbers = [];

    for(let i = 0; i < 5; i++) {
        let randomPokemon = pokemonsId[Math.floor(Math.random()*pokemonsId.length)];
        const pokemon = pokemonElement(randomPokemon);
        oGameData.pokemonNumbers.push(randomPokemon);
    }

    setInterval(movePokemon, 3000);
}

function pokemonElement(id) {
    const img = document.createElement('img');
    const formattedId = String(id).padStart(3,'0');
    img.src=`./assets/pokemons/${formattedId}.png`;
    img.classList.add('pokemon');
    img.dataset.id = id;
       
    img.onload = () => {
        const left = oGameData.getLeftPosition(img.width);
        const top = oGameData.getTopPosition(img.height);
    };

    document.getElementById('gameField').appendChild(img);
    
    

    function catchPokemon() {

        if (img.src = `./assets/pokemons/${formattedId}.png`) {
            document.addEventListener("mouseover", (event) => {
                event.target.classList.contains("pokemon");
                event.target.src = ("./assets/ball.webp");
                img.classList.add('ball');
            });
        
        } else if (img.src = '.assets/ball.webp') {
            document.addEventListener("mouseover", (event) => {
                event.target.classList.contains("ball");
                event.target.src = (`./assets/pokemons/${formattedId}.png`);
                img.classList.add('pokemon');
            });
        }
    }

    catchPokemon();

    return img;

}

function movePokemon() {
    const pokemonArea = document.getElementById('gameField');
    const pokemons = pokemonArea.querySelectorAll('.pokemon');

    pokemons.forEach(pokemon => {
        const randomX = Math.floor(Math.random() * (1500 - 100));
        const randomY = Math.floor(Math.random() * (900 - 300));
        pokemon.style.left = `${randomX}px`;
        pokemon.style.top = `${randomY}px`;
    });
}


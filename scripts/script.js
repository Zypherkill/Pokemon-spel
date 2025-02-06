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
    init : function() {
        this.pokemonNumbers = [];
        this.nmbrOfCaughtPokemons = 0;
        this.startTime = 0;
        this.endTime = 0;
        this.timerId = null;
        this.trainerName = '';
        this.trainerAge = 0;
        this.trainerGender = '';
        
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
    nmbrOfMilliseconds: function() {
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
    document.getElementById('pokemonArea').classList.remove('d-none');
    oGameData.trainerName = document.querySelector('#nick').value;
    oGameData.trainerAge = document.querySelector('#age').value;
    oGameData.trainerGender = document.getElementsByName('gender');
    oGameData.startTimeInMilliseconds();
    
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

    const pokemonsId = [];

    for (let i = 1; i <= 151; i++) {
    pokemonsId.push(i);
    }
    pokemonArea.textContent = '';

    for (let i = 0; i < 10; i++) {

        const randomIndex = Math.floor(Math.random() * pokemonsId.length);
        const randomPokemon = pokemonsId[randomIndex];
        pokemonElement(randomPokemon);
        oGameData.pokemonNumbers.push(randomPokemon);
        pokemonsId.splice(randomIndex, 1);
    }
    setInterval(movePokemon, 3000); // Flytta Pokémon varje 3 sekunder
}

function pokemonElement(id) {
    const img = document.createElement('img');
    const formattedId = String(id).padStart(3, '0');
    img.src = `./assets/pokemons/${formattedId}.png`;
    img.classList.add('pokemon');
    img.dataset.id = id;

    document.getElementById('pokemonArea').appendChild(img);

    const left = oGameData.getLeftPosition();
    const top = oGameData.getTopPosition();

    img.style.position = 'absolute';
    img.style.left = `${left}px`;
    img.style.top = `${top}px`;

    catchPokemon(img, formattedId);
    return img;
}

function catchPokemon(img, formattedId) {
    let toCatch = false;

    img.addEventListener("mouseover", (event) => {
        if (!toCatch && event.target.classList.contains("pokemon")) {
            event.target.src = "./assets/ball.webp";
            event.target.classList.remove('pokemon');
            event.target.classList.add('ball');
            toCatch = true;
            oGameData.nmbrOfCaughtPokemons++;
        } else if (toCatch && event.target.classList.contains("ball")) {
            event.target.src = `./assets/pokemons/${formattedId}.png`;
            event.target.classList.remove('ball');
            event.target.classList.add('pokemon');
            toCatch = false;
            oGameData.nmbrOfCaughtPokemons--;
        }
        checkCaught();
    });

    // Kontrollera om alla Pokémon har fångats
    function checkCaught() {
        if (oGameData.nmbrOfCaughtPokemons === 10) {
            endGame();
        }
    }
}

function movePokemon() {
    const pokemonArea = document.getElementById('gameField');
    const pokemons = pokemonArea.querySelectorAll('.pokemon');
    const balls = pokemonArea.querySelectorAll('.ball');

    pokemons.forEach(pokemon => {
        const randomX = Math.floor(Math.random() * (window.innerWidth - pokemon.width));
        const randomY = Math.floor(Math.random() * (window.innerHeight - pokemon.height));
        pokemon.style.left = `${randomX}px`;
        pokemon.style.top = `${randomY}px`;
    });

    balls.forEach(ball => {
        const randomX = Math.floor(Math.random() * (window.innerWidth - ball.width));
        const randomY = Math.floor(Math.random() * (window.innerHeight - ball.height));
        ball.style.left = `${randomX}px`;
        ball.style.top = `${randomY}px`;
    });
}

let highScores = [];
for (let i = 0; i < localStorage.length; i++) {
    const name = localStorage.key(i);
    const time = parseInt(localStorage.getItem(name));

    // Lägg till i highScores-arrayen
    highScores.push({ name, time });
}

function endGame() {
    document.querySelector('#highscoreList').textContent = '';
    document.querySelector('#pokemonArea').classList.add('d-none');
    document.getElementById('highScore').classList.remove('d-none');
    
    console.log("Game Over! All Pokémon are caught.");

    // Musiken stoppa och starta om vid nästa spel
    const audioElement = document.getElementById('musicGame');
    audioElement.pause();
    audioElement.currentTime = 0;

    //Tiden sluta räkna
    oGameData.endTimeInMilliseconds();
    scoreBoard();
}

function scoreBoard() {
    const timeTaken = oGameData.nmbrOfMilliseconds();

    //Rubrik som visar vinstmeddelande
    document.querySelector('#winMsg').textContent = `Bra jobbat ${oGameData.trainerName}! Du har fångat alla Pokémon på ${timeTaken} millesekunder!`;

    const newScore = {
        name: oGameData.trainerName,
        time: timeTaken
    };

    const existingScoreIndex = highScores.findIndex(score => score.name === newScore.name);

    if (existingScoreIndex !== -1) {
        // Kolla om den nya tiden är bättre
        if (highScores[existingScoreIndex].time > newScore.time) {
            // Uppdatera med den nya, bättre tiden
            highScores[existingScoreIndex].time = newScore.time;
        }
    } else {
        // Lägg till det nya resultatet om spelaren inte fanns i listan
        highScores.push(newScore);
    }

    //Jamföra tiden
    highScores.sort((a, b) => a.time - b.time);

    highScores = highScores.slice(0, 10);
    
    const betterTime = localStorage.getItem(oGameData.trainerName);

    if(!betterTime || parseInt(betterTime) > timeTaken) {
        localStorage.setItem(oGameData.trainerName, timeTaken);
    }

    localStorage.clear();

    //Skriv ut listan
    highScores.forEach(score => {
        localStorage.setItem(score.name, score.time);
        const createLiElement = document.createElement('li');
        createLiElement.classList.add('yourScore');
        createLiElement.textContent = `Spelare: ${score.name}, Tid: ${score.time}`;
        highscoreList.appendChild(createLiElement);
        log("fungar");
    });    

    //Spela igen knappen
    document.getElementById('playAgainBtn').addEventListener('click', resetGame);
}

function resetGame() {
    console.log("Resetting game...");
    oGameData.init();
    
    //Bockar ur kön i formuläret
    const unCheckRadio = document.getElementsByName('gender');
    unCheckRadio.forEach((radio) => {
        radio.checked =false;
    });

    //Tar bort alla pokemon/bollar på spelplanen
    const pokemonArea = document.getElementById('pokemonArea');
    while (pokemonArea.firstChild) {
        pokemonArea.removeChild(pokemonArea.firstChild);
    }

    nick.value = ''; //Rensar namn ifrån formuläret
    age.value = ''; //Rensar ålder ifrån formuläret
    document.getElementById('highScore').classList.add('d-none');
    document.getElementById('gameField').classList.add('d-none');
    document.getElementById('formWrapper').classList.remove('d-none');
}
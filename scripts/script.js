"use strict";
const log = (msg) => console.log(msg);

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

            for(let i=0; i<gender.length; i++) {
                gender[i].addEventListener('change', handleRadioChange);
        
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

        function handleRadioChange() {
            // Ta bort 'error'-klassen från alla radio-knappar
            for (let j = 0; j < gender.length; j++) {
                gender[j].classList.remove('error');
            }
        }
        
        startGame();
    }

    const oGameData = {
        pokemonNumbers: [],
        nmbrOfCaughtPokemons: 0,
        startTime: 0,
        endTime: 0,
        timerId: null,
        trainerName: "",
        trainerAge: 0,
        trainerGender: "",
    }

function startGame() {
    document.querySelector('#formWrapper').classList.add('d-none');
    document.querySelector('#highScore').classList.remove('d-none');
    oGameData.trainerName = document.querySelector('#nick').value;
    oGameData.trainerAge = document.querySelector('#age').value;
    oGameData.trainerGender = document.getElementsByName('gender');
    
    //Musiken starta när spelen starta
    const audioElement = document.getElementById('musicGame');
    audioElement.play();
    audioElement.volume = 0.050;
}

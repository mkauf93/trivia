// script.js
window.onload = function() {
    document.getElementById("bgMusic").play();
};

function toggleMusic() {
    var music = document.getElementById("bgMusic");
    music.paused ? music.play() : music.pause();
}

function startGame() {
    document.getElementById("instructions").style.display = "none";
    document.getElementById("game").style.display = "block";
    displayQuestion();
}

let playerSelections = [];

let jokers = {
    joker1Used: false,
    joker2Used: false
};

function useJoker() {
    // Check if both jokers have been used
    if (jokers.joker1Used && jokers.joker2Used) {
        alert("Sorry, you've already used both Jokers!");
        return;
    }

    let jokerHtml = "<h3></h3>";
    
    if (!jokers.joker1Used) {
        jokerHtml += "<button onclick='applyJoker1()'>Remove 1</button><br>";
    }
    
    if (!jokers.joker2Used) {
        jokerHtml += "<button onclick='applyJoker2()'>Make Call</button>";
    }
    
    document.getElementById("joker").innerHTML = jokerHtml;
}

function applyJoker1() {
    let q = questions[currentQuestion];
    let wrongOptions = Object.keys(q.options).filter(key => key !== q.correct);
    let eliminatedOption = wrongOptions[Math.floor(Math.random() * wrongOptions.length)];
    
    alert("Joker 1: The answer is not " + q.options[eliminatedOption]);
    jokers.joker1Used = true;
    // Hide Joker button after use
    document.getElementById("joker").style.display = "none";
}

function applyJoker2() {
    alert("Joker 2: You can now make a phone call to ask for help.");
    jokers.joker2Used = true;
    // Hide Joker button after use
    document.getElementById("joker").style.display = "none";
}


let currentQuestion = 0;
const questions = [
    {
        question: "Which animal is known to have the longest migration journey in the animal kingdom?",
        options: { A: "Humpback Whale", B: "Monarch Butterfly", C: "Arctic Tern" },
        correct: "C",
        prizes: { A: "Scenic bike ride", B: "Charming ferry ride", C: "Exciting plane ride" } // Note that we now have a 'prizes' object
    },
    {
        question: "Oahu is home to the only royal palace in the United States. What is the name of this historic palace?",
        options: { A: "'Iolani Palace", B: "Huliheʻe Palace", C: "Queen Emma Summer Palace" },
        correct: "A",
        prizes: { A: "Trip to Kauai", B: "Trip to Maui", C: "Trip to the Big Island" }
    },
    

    {
        checkpoint: true,
        warning: "Before we move on to the next question, a crucial choice awaits you: If you choose to proceed and answer the next question, but get it wrong, you will lose everything you've earned so far. However, if you decide to stop now, you can keep all the prizes you've accumulated up to this point. Do you wish to risk it all for the chance to add more to your adventure, or play it safe and secure your winnings?",
        question: "What was my favorite subject in elementary school?",
        options: { 
            A: "Physical Education (PE)", 
            B: "Mathematics", 
            C: "Geography" 
        },
        correct: "A", 
        prizes: { A: "A kiss", B: "A hug", C: "A mini slap" }
    },

    {
        question: "Luxembourg is home to a unique network of underground tunnels known as the 'Casemates.' Which historical figure is closely associated with the expansion of these fortifications in the 17th century?",
        options: { A: "Vauban", B: "Charlemagne", C: "Napoleon Bonaparte" },
        correct: "A",
        prizes: { A: "Stay in a unique Airbnb", B: "Night in a well-appointed hotel", C: "Night camping under the stars" }
    },
    {
    question: "Which cheese is famous for being the most stolen cheese in the world?",
    options: { 
        A: "Gouda", 
        B: "Cheddar", 
        C: "Parmesan" 
    },
    correct: "A",
    prizes: { 
        A: "15-minute full body massage", 
        B: "Nothing", 
        C: "Nothing" 
    }
    },

    {
        question: "Kona coffee, famous worldwide, is grown on the slopes of which Hawaiian volcano?",
        options: { A: "Mauna Loa", B: "Mauna Kea", C: "Hualālai" },
        correct: "C",
        prizes: { A: "Gourmet meal at a top-rated restaurant", B: "Beachside picnic with local delicacies", C: "Meal at a local restaurant specializing in her favorite dish" }
    },
    
     {
        checkpoint: true,
        warning: "Once again, you're at an important decision point. You can risk everything you've won so far by attempting the next question for a chance to enhance our journey further, or you can choose to secure all your current prizes by stopping now. Remember, if you go on and answer incorrectly, you will lose everything you've accumulated. What's your decision? Will you risk it all for more, or play it safe?",
        question: "As a child, what did I dream of becoming when I grew up?",
        options: { 
            A: "Astronaut", 
            B: "Architect", 
            C: "Veterinarian"
        },
        correct: "B", // Note: You might handle the alternative correct answer 'C' within the selectOption function.
        prizes: { A: "A kiss", B: "A hug", C: "A mini slap" }
    },
    {
        question: "One of the Hawaiian Islands is known for having a unique, dry landscape unlike the lush greenery typically associated with Hawaii. Which island is it?",
        options: { A: "Lanai", B: "Molokai", C: "Niihau" },
        correct: "A",
        prizes: { A: "Hiking/biking adventure in a scenic location", B: "Visiting a cultural site or museum", C: "Relaxing spa or beach day" }
    },
    {
    question: "The Akhal-Teke, a horse breed from Turkmenistan, is known for its distinctive coat that has a metallic sheen. What is this unique feature often referred to as?",
    options: { 
        A: "Golden Glow", 
        B: "Solar Flare", 
        C: "Moonlight Sheen" 
    },
    correct: "A",
    prizes: { 
        A: "Any favor", 
        B: "Nothing", 
        C: "Nothing" 
    }
},
    {
        question: "In Polynesian culture, including Maori traditions in New Zealand, a particular handcrafted item is known for its spiritual significance and is often passed down through generations. What is this item?",
        options: { A: "Pounamu (Greenstone) Necklace", B: "Tapa Cloth", C: "Wooden Tiki Statues" },
        correct: "A",
        prizes: { A: "Unique artifact embodying the spirit of Polynesian culture", B: "Photo book or painting capturing the beauty of the trip", C: "Exclusive experience or item unique to the destination" }
    }
];


function keepPlaying() {
    // Close the modal
    var modal = document.getElementById("gift-machine-message");
    modal.style.display = "none";
}

function stopGame() {
    // Close the modal and end the game
    var modal = document.getElementById("gift-machine-message");
    modal.style.display = "none";
    endGameCelebration();
}

function replenishLove() {
    // Close the modal and continue the game
    var modal = document.getElementById("love-replenish-message");
    modal.style.display = "none";
}

function endGame() {
    // Close the modal and end the game
    var modal = document.getElementById("love-replenish-message");
    modal.style.display = "none";
    endGameCelebration();
}

function nextQuestion() {
    currentQuestion++;
    if (currentQuestion < questions.length) {
        // Reset visibility of special messages
        document.getElementById("gift-machine-message").style.display = "none";
        document.getElementById("love-replenish-message").style.display = "none";
        displayQuestion();
    } else {
        endGameCelebration(); // Call the celebration function when the game is over
    }
}


function displayQuestion() {
    let q = questions[currentQuestion];

    // Reset visibility of special messages
    document.getElementById("gift-machine-message").style.display = "none";
    document.getElementById("love-replenish-message").style.display = "none";

    if (q.checkpoint && !q.questionDisplayed) {
        displayCheckpointWarning();
    } else {
        // Set the innerHTML for the game
        document.getElementById("game").innerHTML = `
            <h1>${q.question}</h1>
            <div id="options">
                <button onclick="selectOption('A')">${q.options.A}</button>
                <button onclick="selectOption('B')">${q.options.B}</button>
                <button onclick="selectOption('C')">${q.options.C}</button>
            </div>
            <div id="result"></div>
            <button id="next" onclick="nextQuestion()" style="display: none;">Next Question</button>
            <!-- Joker button, only display if not a checkpoint -->
            <div id="joker" style="position: absolute; bottom: 10px; right: 10px;">
                <button onclick="useJoker()">Joker!</button>
            </div>
        `;

        // Now add the class to the next button
        if (document.getElementById("next")) {
            document.getElementById("next").classList.add("highlighted-next-button");
        }

        // Show special messages based on the current question index
        if (currentQuestion === 4) {
            document.getElementById("gift-machine-message").style.display = "block";
        } else if (currentQuestion === 7) {
            document.getElementById("love-replenish-message").style.display = "block";
        }
    }
}




function selectOption(option) {
    let q = questions[currentQuestion];
    
    // Store only the prize for the player's selection
    playerSelections[currentQuestion] = q.prizes[option];

    // Check if it's a checkpoint question and ask for confirmation
    if (q.checkpoint && (currentQuestion === 2 || currentQuestion === 5)) {
        let confirmFinalAnswer = confirm("Is this your final answer? Remember, if you get it wrong, you lose everything!");
        if (!confirmFinalAnswer) {
            return; // If the user doesn't confirm, return early and do nothing
        }
    }

    if (currentQuestion == 6 && (option === 'B' || option === 'C')) {
        document.getElementById("result").innerHTML = "<span style='color: green;'>&#10004; Correct! You have secured the prizes up to this point.</span>";
        document.getElementById("next").style.display = "block";
        return;
    }

    let resultHtml = option === q.correct
        ? `<span style="color: green;">&#10004; Correct! Your prize is: ${q.prizes[option]}.</span>`
        : `<span style="color: red;">&#10008; Incorrect. The correct answer is: ${q.options[q.correct]}.</span>`;

    Object.keys(q.options).forEach(key => {
        resultHtml += `<div>${key}: ${q.options[key]}, Prize: ${q.prizes[key]}.</div>`;
    });

    document.getElementById("result").innerHTML = resultHtml;
    document.getElementById("next").style.display = "block";
}


function proceedCheckpoint() {
    // Ask the user for confirmation before proceeding
    let confirmProceed = confirm("Are you sure you want to proceed? If you answer the next question incorrectly, you will lose all your accumulated prizes.");
    
    // Only proceed if the user confirms
    if (confirmProceed) {
        let q = questions[currentQuestion];
        if (q.checkpoint && !q.questionDisplayed) {
            q.questionDisplayed = true;
            displayQuestion();
        }
    } else {
        // User chose not to proceed, you can choose to implement any specific logic here
        // For now, we'll just log that they chose not to proceed
        console.log("User chose not to proceed with the checkpoint.");
    }
}


function stopCheckpoint() {
    let winnings = "<h2>Congratulations on your winnings!</h2>";
    questions.slice(0, currentQuestion).forEach((question, index) => {
        if (!question.checkpoint) {
            winnings += `<p>${index + 1}. ${question.options[question.correct]}: ${question.prizes[question.correct]}</p>`;
        }
    });
    document.getElementById("game").innerHTML = winnings + "<p>Thank you for playing!</p>";
}

function nextQuestion() {
    currentQuestion++;
    if (currentQuestion < questions.length) {
        if (questions[currentQuestion].checkpoint) {
            questions[currentQuestion].questionDisplayed = false;
        }
        displayQuestion();
    } else {
        endGameCelebration(); // Call the celebration function when the game is over
    }
}

function displayCheckpointWarning() {
    let q = questions[currentQuestion];
    document.getElementById("game").innerHTML = `
        <h2>Checkpoint!</h2>
        <p>${q.warning}</p>
        <button onclick="proceedCheckpoint()">Proceed</button>
        <button onclick="stopCheckpoint()">Stop Now</button>
    `;
}

function proceedFromWarning() {
    // Show the actual checkpoint question after the warning
    questions[currentQuestion].questionDisplayed = true;
    displayQuestion();
}


function endGameCelebration() {
    let winningsSummary = "<h2 class='celebration'>Congratulations, you've completed the game! 🎉🎉🎉</h2>";
    let prizeSummary = "";

    playerSelections.forEach((prize, index) => {
        // Check if it's a regular question (not a personal question)
        if (prize && !questions[index].checkpoint) {
            prizeSummary += `<p>${index + 1}: ${prize}</p>`;
        }
    });

    let celebrationMessage = `
        <div class="celebration">
            <p>You've done a fantastic job! Here's the summary of your adventure:</p>
            ${prizeSummary}
            <p>Thank you for playing and I hope you enjoy your adventure with 🥁 ME!</p>
            <!-- Bonus button -->
            <button onclick="activateBonus()">Activate Bonus</button>
        </div>
    `;

    document.getElementById("game").innerHTML = winningsSummary + celebrationMessage;
}

// Call this function when the Bonus button is clicked
function activateBonus() {
    let bonusActive = confirm("The bonus allows you to change one adventure prize as desired if you can remember it. To activate the Bonus, you need to beat me in a game of Scattergories. Ready for the challenge?");
    if (bonusActive) {
        // Logic for activating the bonus goes here
        // For example, you could call another function that starts the game of Scattergories
        startScattergoriesGame();
    }
}

// Example function that could start the game of Scattergories or any other logic you want to implement
function startScattergoriesGame() {
    // Logic for starting a game of Scattergories goes here
    alert("Let's play Scattergories! Press ok to start the timer and reveal the categories");
    startScattergories();
    // Implement your Scattergories game logic or redirect to the game etc.
}

const scattergoriesCategories = [
    "Famous Landmarks",
    "Animals in Movies",
    "Superheroes",
    "Historical Figures",
    "Musical Instruments",
    "Exotic Fruits",
    "Tech Gadgets",
    "World Cuisines",
    "Underwater Creatures",
    "Adventure Activities",
    "Science Fiction Movies",
    "World Capitals",
    "Something Turquoise"
];

let scattergoriesTimer;
let scattergoriesTimeLeft = 120; // 2 minutes

function startScattergories() {
    document.getElementById("game").style.display = "none";
    document.getElementById("scattergories").style.display = "block";

    // Randomize the letter
    let alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    let randomIndex = Math.floor(Math.random() * alphabet.length);
    let randomLetter = alphabet[randomIndex];

    document.getElementById("letter").textContent = randomLetter; // Set the random letter
    displayScattergoriesCategories();
    scattergoriesTimer = setInterval(updateScattergoriesTimer, 1000);
}

// Rest of the Scattergories code...


function displayScattergoriesCategories() {
    const list = document.getElementById("categories-list");
    list.innerHTML = ""; // Clear previous list
    scattergoriesCategories.forEach(category => {
        const listItem = document.createElement("li");
        listItem.textContent = category;
        list.appendChild(listItem);
    });
}

function updateScattergoriesTimer() {
    scattergoriesTimeLeft--;
    document.getElementById("timer").textContent = scattergoriesTimeLeft;

    if (scattergoriesTimeLeft <= 0) {
        endScattergories();
    }
}

function endScattergories() {
    clearInterval(scattergoriesTimer);
    scattergoriesTimeLeft = 120; // Reset the timer
    document.getElementById("scattergories").style.display = "none";
    document.getElementById("game").style.display = "block";
    // Add logic to handle the end of the Scattergories game
}




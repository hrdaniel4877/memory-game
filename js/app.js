// test
console.log('All good!');

// the array to hold all the pictures as objects:
const cards = [
	{
		card: 1,
		picture: "img/Applejack.png"
	},
	{
		card: 2,
		picture: "img/Fluttershy.png"
	},
	{
		card: 3,
		picture: "img/Princess_Celestia.png"
	},
	{
		card: 4,
		picture: "img/Princess_Luna.png"
	},
	{
		card: 5,
		picture: "img/Rainbow_Dash.png"
	},
	{
		card: 6,
		picture: "img/Rarity.png"
	},
	{
		card: 7,
		picture: "img/Spike.png"
	},
	{
		card: 8,
		picture: "img/Twilight_Sparkle.png"
	},		
];


// all the other variables used in the game
const cardsDeck = document.getElementById('cardsDeck');
const moves = document.getElementById('moves');
const time = document.getElementById('timer');
const rating = document.getElementById('rating');
const restart = document.getElementById('restart');
let cardsDeckContent = '';
let movesCounter = 0;
let secondsCounter = 0;
let minutesCounter = 0;
let pairs = [];
let eventPause = 0;


// Create the cards pairs
const cardsWithPairs = [...cards, ...cards];


// Shuffle function from http://stackoverflow.com/a/2450976 
// transformed into an ES6 arrow function
const shuffleCards = (array) => {
    let currentIndex = array.length,
        temporaryValue, randomIndex;
    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    };
    return array;
};


// Cards with pairs shuffled
const cardsWithPairsShuffled = shuffleCards(cardsWithPairs);


// Shuffled cards check
console.log(cardsWithPairsShuffled);


// load cards function
let loadCards = () => {
	for (let card in cardsWithPairsShuffled) {
		let currentCard = `<div class='card'><img src='${cardsWithPairsShuffled[card].picture}' class='hideCard'></div>`;
		cardsDeckContent += currentCard;
	}
	cardsDeck.innerHTML = cardsDeckContent;
};


// initialize the game with new shuffled cards
loadCards();


// start the game when a card is clicked
cardsDeck.addEventListener('click', (event) => {

	// if an actual image was clicked AND has no 'showCard' and 'match' class, do these:
	if (event.target.tagName === 'IMG' &&
		!event.target.classList.contains('showCard') &&
		!event.target.classList.contains('match') &&
		eventPause < 2) {
		
		// variable to prevent showing more than 2 cards at the time
		eventPause +=1;

		// show card
		event.target.classList.replace('hideCard', 'showCard');
		
		// add card's src to the pairs array
		pairs.push(event.target.getAttribute('src'));

		// update the moves counter
		movesCounter += 1;
		moves.textContent = `Moves: ${movesCounter}`;

		// start the timer at the first move and update the rating
		if (movesCounter === 1) {
			timerFunction();
		} else if (movesCounter <=16) {
			rating.textContent = `Rating: ***`;
		} else if (movesCounter <32) {
			rating.textContent = `Rating: **`;
		} else {
			rating.textContent = `Rating: *`;
		};

		// call compare function if we have 2 elements revealed
		if (pairs.length === 2) {
			compareCards();
		};
	};	
});


// Count the time in seconds and minutes, after the first move was made
let timerCounter;
let timerFunction = () => {
	timerCounter = setInterval(() => {
		secondsCounter += 1;
		if (secondsCounter === 60) {
			minutesCounter += 1;
			secondsCounter = 0;
		};	
		time.innerText = `Time: ${minutesCounter}:${secondsCounter}`;
	}
	, 1000);
};


// Compare the revealed pair of cards; keep if they match; flip back otherwise
let compareCards = () => {
	console.log('We have 2 cards to compare! ', pairs);
	if (pairs[0] === pairs[1]) {
		console.log('Match!');
		// keep the cards revealed if they match
		let openCards = document.getElementsByClassName('showCard');
		openCards[1].classList.replace('showCard', 'match');
		openCards[0].classList.replace('showCard', 'match');
		eventPause = 0;
	} else {
		console.log('Unmatch');
		// flip back the cards after 1 second
		setTimeout(()=>{
				let openCards = document.getElementsByClassName('showCard');
				openCards[1].classList.replace('showCard', 'hideCard');
				openCards[0].classList.replace('showCard', 'hideCard');
				eventPause = 0;
			},
			1000
		);
	};
	pairs.pop();
	pairs.pop();
	winningModal();
};


// restart the game when the 'Restart' button is clicked
restart.addEventListener('click', (event) => {
	event.preventDefault();
	window.location.reload(true);
});


// Winning Modal
const winningModal = () => {
	let container = document.getElementsByClassName('container');
	let matchedCards = document.getElementsByClassName('match');
	let modal = document.createElement('div');
	let modalContent = 
			`<h2>Congratulations!</h2>
			<p>Time: ${minutesCounter} : ${secondsCounter}</p>
			<p>Star ${rating.textContent}</p>
			<h4 id="winRestart"><a href="#" id="restart2">Play Again?</a></h4>`;
	modal.setAttribute('class', 'modal');
	modal.innerHTML = modalContent;
	
	// if all 16 cards are discovered, display the modal after 600 miliseconds
	if (matchedCards.length === 4) {
		clearInterval(timerCounter);
		setTimeout(() => {
			container[0].appendChild(modal);
			let restart2 = document.getElementById('restart2');
			
			// add event listener for the restart game link in the modal window
			restart2.addEventListener('click', (event) => {
				event.preventDefault();
				window.location.reload(true);
			});
		}, 
		600);
	};	
};



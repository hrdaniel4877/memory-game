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

const cardsDeck = document.getElementById('cardsDeck');
const moves = document.getElementById('moves');
const rating = document.getElementById('rating');
const restart = document.getElementById('restart');
let cardsDeckContent = '';
let movesCounter = 0;
let pairs = [];


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


// start the game
loadCards();


// event listener for click event on the cards
cardsDeck.addEventListener('click', (event) => {
	
	// if an actual image was clicked AND has no 'match' class, do these:
	if (event.target.tagName === 'IMG' &&
		!event.target.classList.contains('match')) {
		
		// show card
		event.target.classList.replace('hideCard', 'showCard');
		
		// add card's src to the pairs array
		pairs.push(event.target.getAttribute('src'));

		// update the counter
		movesCounter += 1;
		moves.textContent = `Moves: ${movesCounter}`;

		// update the rating
		if (movesCounter <=16) {
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

// compare cards function
let compareCards = () => {
	console.log('We have 2 cards to compare! ', pairs);
	if (pairs[0] === pairs[1]) {
		console.log('Match!');
		// replace 'showCard' class with 'match'; this will keep the cards open and un-clickable the second time
		let openCards = document.getElementsByClassName('showCard');
		openCards[1].classList.replace('showCard', 'match');
		openCards[0].classList.replace('showCard', 'match');
	} else {
		console.log('Unmatch');
		// flip back the cards after 1 second
		setTimeout(
			()=>{
				let openCards = document.getElementsByClassName('showCard');
				openCards[1].classList.replace('showCard', 'hideCard');
				openCards[0].classList.replace('showCard', 'hideCard');
			},
			1000
		);
	};
	pairs.pop();
	pairs.pop();
};

// event listener for "Restart" button to restart the game
restart.addEventListener('click', (event) => {
	event.preventDefault();
	window.location.reload(true);
});



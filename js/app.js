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

loadCards();


// event listener for click event on the pictures
cardsDeck.addEventListener('click', (event) => {
	
	// hide or show a card
	if (event.target.tagName === 'IMG') {
		event.target.classList.toggle('hideCard');
	};
	
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
});


// event listener for "Restart" button to restart the game
restart.addEventListener('click', (event) => {
	event.preventDefault();
	window.location.reload(true);
});



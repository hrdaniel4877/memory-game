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


// Create the cards pairs
const cardsWithPairs = [...cards, ...cards];


// Shuffle function from http://stackoverflow.com/a/2450976 
// transformed into an arrow function
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



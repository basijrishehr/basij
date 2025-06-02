const cards = ['🕌', '🕌', '⚔️', '⚔️', '📖', '📖', '🛡️', '🛡️'];
let flippedCards = [];
let matchedCards = [];

function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

function createBoard() {
    const gameBoard = document.getElementById('game-board');
    const shuffledCards = shuffle([...cards]);
    gameBoard.innerHTML = '';
    shuffledCards.forEach((symbol, index) => {
        const card = document.createElement('div');
        card.classList.add('card');
        card.innerHTML = `
            <div class="card-inner">
                <div class="card-front">?</div>
                <div class="card-back">${symbol}</div>
            </div>
        `;
        card.addEventListener('click', () => flipCard(card, symbol));
        gameBoard.appendChild(card);
    });
}

function flipCard(card, symbol) {
    if (flippedCards.length < 2 && !card.classList.contains('flipped') && !matchedCards.includes(symbol)) {
        card.classList.add('flipped');
        flippedCards.push({ card, symbol });
        if (flippedCards.length === 2) {
            checkMatch();
        }
    }
}

function checkMatch() {
    const [card1, card2] = flippedCards;
    if (card1.symbol === card2.symbol) {
        matchedCards.push(card1.symbol);
        flippedCards = [];
        if (matchedCards.length === cards.length / 2) {
            document.getElementById('game-message').textContent = 'تبریک! شما برنده شدید!';
        }
    } else {
        setTimeout(() => {
            card1.card.classList.remove('flipped');
            card2.card.classList.remove('flipped');
            flippedCards = [];
        }, 1000);
    }
}

createBoard();
document.addEventListener("DOMContentLoaded", startGame);
document.querySelectorAll('.level').forEach(button => button.addEventListener('click', startGame))

/*
Для режима Random, нужно сделать такие правила: та же самая игра, но иконок необязательно может быть две.
Их может быть любое другое число, но точно больше 1 и точно меньше, чем N - 2.

И игра тогда идет так: игрок кликает на квадратик. Он открывается.
Игрок не знает, сколько всего таких квадратиков будет на поле. Но их точно >= 2.
Игрок кликает на другой квадратик. Он тоже открывается. Если не совпали - оба закрываются.
Если совпали оба остаются открытыми.
Но при следующем клике, если предыдущих квадратиков было больше двух - то они снова закрываются.
И нужно все начинать сначала.

Кажется, может быть весело :)

Добавить режим с цифрами вместо картинок

*/
const movesElement = document.querySelector('#moves');
const field = document.querySelector('.field');

let previousElement, currentElement;
let disableDeck = false;
let moves = 0;

function startGame(e) {
    const f = new Field();
    let size;

    switch (e.target) {
        case document.querySelector('#hard'):
            size = 8;
            break;
        case document.querySelector('#easy'):
            size = 4;
            break
        default:
            size = 6;
            break;
    }

    f.create(size);
    f.clear();

}

function flipCard() {
    currentElement = this.querySelector(".icon");

    if (previousElement !== currentElement && !disableDeck) {
        currentElement.classList.add('show');

        if (!previousElement) {
            previousElement = currentElement;
            return;
        }

        disableDeck = true;
        checkMatch(previousElement, currentElement);

    } else {
        currentElement.classList.remove('show');
        previousElement = '';
        movesElement.innerText = `Moves: ${++moves}`;
    }
}

function checkMatch(prev, curr) {
    if (prev.innerText === curr.innerText) {
        prev.parentElement.removeEventListener('click', flipCard);
        curr.parentElement.removeEventListener('click', flipCard);
        disableDeck = false;
    } else {
        setTimeout(() => {
            prev.classList.remove('show');
            curr.classList.remove('show');
            disableDeck = false;
        }, 500)
    }

    movesElement.innerText = `Moves: ${++moves}`;
    previousElement = '';
}

class GridItem {
    constructor() {
        this.htmlElement = document.createElement("div");
        this.htmlElement.classList.add('grid-item');
        this.appendIconContainer();

        this.htmlElement.addEventListener('click', flipCard)
    }


    appendIconContainer() {
        const icon = document.createElement("span");
        icon.classList.add("icon");

        this.htmlElement.appendChild(icon);
    }

    addToField() {
        field.appendChild(this.htmlElement);
    }

}

class Field {
    constructor() {
        this.htmlElement = document.querySelector(".field");
    }

    create(size = 6) {
        this.htmlElement.innerHTML = "";
        moves = 0;
        movesElement.innerText = `Moves: 0`;

        field.style.grid = `repeat(${size}, ${400/size}px) / repeat(${size}, ${400/size}px)`;

        for (let i=0; i < size**2; i++) {
            const item = new GridItem();
            item.addToField();
        }

        this.arrangeIcons(size);
    }

    getIcons() {
        return this.htmlElement.querySelectorAll(".icon");
    }

    arrangeIcons(size) {
        const allSymbols = [
            '💀', '🎃', '☂️', '👁', '⭐️', '🥝', '🚀', '🍪',
            '🌸', '🐚', '🍕', '⚽', '️ 🏀', '🧦', '🧸', '🍉',
            '🍇', '🍓', '🔮', '👑', '🔫', '🍔', '🤖', '👻',
            '🏐', '🏉', '🥏', '🎱', '🍊', '🍋', '🍌', '🍏',
        ];

        // const allSymbols = [
        //     1,2,3,4,5,6,7,8,
        //     9, 10, 11, 12, 13, 14, 15, 16,
        //     17, 18, 19, 20, 21, 22, 23, 24,
        //     25, 26, 27, 28, 29, 30, 31, 32
        // ]

        shuffle(allSymbols); // выбираю рандомные картинки

        let symbols = allSymbols.slice(0, size ** 2 / 2); // обрезаю до нужного количества разных иконок

        symbols = symbols.concat(symbols);
        shuffle(symbols);

        const elements = this.getIcons();

        elements.forEach(function(el, index){
            el.style.opacity = 0;
            el.innerText = symbols[index];
        });

    }

    clear() { // Надо понять, что это и нужно ли это
        this.getIcons().forEach(function(el, index){
            if (el.classList.contains('open')) {
                el.classList.remove('open');
            }
            el.style.opacity = 0;
        });
    }

}

function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}








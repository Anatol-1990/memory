document.addEventListener("DOMContentLoaded", startGame);

/*
Для режима Random, нужно сделать такие правила: та же самая игра, но иконок необязательно может быть две.
Их может быть любое другое число, но точно больше 1 и точно меньше, чем N - 2.
Кажется, может быть весело :)

Добавить режим с цифрами вместо картинок

*/

document.querySelector('#easy').addEventListener('click', startGame)
document.querySelector('#medium').addEventListener('click', startGame)
document.querySelector('#hard').addEventListener('click', startGame)

const field = document.querySelector('.field');

let previousElement, currentElement;

function startGame(e) {

    const f = new Field();
    let size = 6;

    switch (e.target) {
        case document.querySelector('#hard'):
            size = 8;
            break;
        case document.querySelector('#easy'):
            size = 4;
            break
        case document.querySelector('#medium'):
            size = 6;
            break;
    }


    f.create(size);
    f.clear();

}

function flipCard() {
    // https://www.youtube.com/watch?v=DABkhfsBAWw
    const currentElement = this.querySelector(".icon");

    if (previousElement !== currentElement) {
        currentElement.classList.add('show');

        if (!previousElement) {
            previousElement = currentElement;
        } else {
            checkMatch(previousElement, currentElement);
            previousElement = '';
        }

    }
}

function checkMatch(prev, curr) {
    if (prev.innerText === curr.innerText) {
        return true;

    } else {
        console.log('did not match')
        setTimeout(() => {
            prev.classList.remove('show');
            curr.classList.remove('show')
            return false;
        }, 1000)

    }
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
        this.icon = icon;
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
        const symbols = allSymbols.slice(0, size ** 2 / 2);

        const elements = this.getIcons();

        let random = [];

        while (random.length < size ** 2) {
            let index = Math.floor(Math.random() * symbols.length);
            let symbol = symbols[index];

            if (random.filter(function(el){ return el == symbol }).length < 2) {
                random.push(symbol);
            }
        }

        elements.forEach(function(el, index){
            el.style.opacity = 0;
            el.innerText = random[index];
        });

        random = [];

    }

    clear() {
        this.getIcons().forEach(function(el, index){
            if (el.classList.contains('open')) {
                el.classList.remove('open');
            }
            el.style.opacity = 0;
        });
    }

}











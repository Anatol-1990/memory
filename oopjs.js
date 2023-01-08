document.addEventListener("DOMContentLoaded", startGame);

const field = document.querySelector('.field');
const size = 4;

class GridItem {
    constructor() {
        this.htmlElement = document.createElement("div");
        this.htmlElement.classList.add('grid-item');

        const icon = document.createElement("span");
        icon.classList.add("icon");

        this.htmlElement.appendChild(icon);

        this.htmlElement.addEventListener('click', function () {
            console.log('click');
        })

    }

    addToField() {
        field.appendChild(this.htmlElement)
    }

    setIcon(symbol) {
        const icon = document.createElement("span");
        icon.classList.add("icon");

        this.htmlElement.appendChild(icon);
        icon.innerText = symbol;

        return this;
    }

}

class Field {
    constructor() {
        this.htmlElement = document.querySelector(".field");

    }

    create(size) {
        for (let i=0; i< size**2; i++) {
            const item = new GridItem();
            item.addToField();
        }

        switch (size) {
            case 4:
                field.style.grid = 'repeat(4, 100px) / repeat(4, 100px)';
                break;
            case 6:
                field.style.grid = 'repeat(6, 90px) / repeat(6, 90px)';
                break;
            case 8:
                field.style.grid = 'repeat(8, 80px) / repeat(8, 80px)';
        }

        return this;
    }

    fill(size) {
        const symbols = ['💀', '🎃', '☂️', '👁', '⭐️','🥝','🚀','🍪'];
        const elements = document.querySelectorAll(".icon");

        let random = [];

        while (random.length < size ** 2) {
            let index = Math.floor(Math.random() * symbols.length);
            let symbol = symbols[index];

            if (random.filter(function(el){ return el == symbol }).length < 2) {
                random.push(symbol);
            }
        }

        elements.forEach(function(el, index){
            el.style.opacity = 100;
            el.innerText = random[index];
        });

        random = [];

    }


}



function startGame() {
    console.log('game loaded');

    new Field().create(6).fill(4);


}


function fillTheFieldWithIcons() {
    let elements = document.querySelectorAll(".icon");
    const symbols = ['💀', '🎃', '☂️', '👁', '⭐️','🥝','🚀','🍪'];

    let random = [];

    while (random.length < 16) {
        index = Math.floor(Math.random() * 8);
        symbol = symbols[index];

        if (random.filter(function(el){ return el == symbol }).length < 2) {
            random.push(symbol);
        }
    }

    elements.forEach(function(el, index){
        el.style.opacity = 100;
        el.innerText = random[index];
    });

    random = [];
}


/* Формула для нахождения нужного числа различных иконок
Сторона квадрата A
Число иконок N

N = A**2 / 2

Для режима Random, нужно сделать такие правила: та же самая игра, но иконок не обязательно может быть две.
Их может быть любое другое число, но точно больше 1 и точно меньше, чем N - 2.
Кажется, может быть весело :)
 */



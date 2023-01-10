document.addEventListener("DOMContentLoaded", startGame);

function startGame() {
    const f = new Field();
    const size = 6;

    f.create(size);
    f.clear();

    let previousEl = "";
    let counter = 0;

    document.addEventListener('click', function gamePlay(e){

        if (e.target.tagName == 'SPAN' && !e.target.classList.contains('open')) {
            e.target.style.opacity = 100;

            if (previousEl == "") {
                previousEl = e.target;
            } else {
                if (previousEl.innerText == e.target.innerText && previousEl != e.target) {
                    e.target.style.opacity = 100;
                    e.target.classList.add('open');
                    previousEl.classList.add('open');
                    counter += 2;
                    previousEl = '';

                    if (counter == size ** 2) {
                        document.removeEventListener('click', gamePlay);

                        //waitForStart();
                        return;
                    }

                } else {
                    document.removeEventListener('click', gamePlay);

                    setTimeout(function(){
                        previousEl.style.opacity = 0;
                        e.target.style.opacity = 0;
                        previousEl = '';
                        document.addEventListener('click', gamePlay);
                    }, 500);

                }
            }

        }
    });

}

const field = document.querySelector('.field');

class GridItem {
    constructor() {
        this.htmlElement = document.createElement("div");
        this.htmlElement.classList.add('grid-item');

        const icon = document.createElement("span");
        icon.classList.add("icon");

        this.htmlElement.appendChild(icon);

        const self = this;

        icon.addEventListener('click', function () {
            self.hide()
        })

    }

    addToField() {
        field.appendChild(this.htmlElement)
    }

    hide() {
        this.htmlElement.querySelector('.icon').style.opacity = 0;
    }

    show() {
        this.htmlElement.querySelector('.icon').style.opacity = 100;
    }

}

class Field {
    constructor() {
        this.htmlElement = document.querySelector(".field");
    }

    create(size) {
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

        for (let i=0; i< size**2; i++) {
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
            el.style.opacity = 100;
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









/*
Для режима Random, нужно сделать такие правила: та же самая игра, но иконок необязательно может быть две.
Их может быть любое другое число, но точно больше 1 и точно меньше, чем N - 2.
Кажется, может быть весело :)
 */



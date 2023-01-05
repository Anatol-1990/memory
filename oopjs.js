const field = document.querySelector('.field');

class Field {
    constructor() {
        this.htmlElement = document.querySelector('.field');

    }

    fillField(fieldSize) {
        for (let i=0; i<fieldSize**2; i++) {
            new GridItem().addToField();
        }
    }

}

/* Формула для нахождения нужного числа различных иконок
Сторона квадрата A
Число иконок N

N = A**2 / 2

Для режима Random, нужно сделать такие правила: та же самая игра, но иконок не обязательно может быть две.
Их может быть любое другое число, но точно больше 1 и точно меньше, чем N - 2.
Кажется, может быть весело :)
 */

class GridItem {
    constructor() {
        this.htmlElement = document.createElement("div");
        this.htmlElement.classList.add('grid-item');

        const icon = document.createElement("span");
        icon.classList.add("icon");

        this.htmlElement.appendChild(icon);
        icon.innerText = "🍪";

        this.htmlElement.addEventListener('click', function () {
            icon.style.display = 'none';
        })

    }

    addToField() {
        field.appendChild(this.htmlElement)
    }


}


//
// const fieldSize = 4;
//
// for (let i=0; i<fieldSize**2; i++) {
//     new GridItem().addToField();
// }

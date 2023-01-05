
const audio = new Audio('sheb-wooley-do-i-remember.mp3');
audio.loop = true;

document.addEventListener("DOMContentLoaded", waitForStart);

document.addEventListener("DOMContentLoaded", function(){
    document.querySelector(".music").addEventListener('click', function(){
        if (document.querySelector("#music").checked == true) {
            audio.pause();
            document.querySelector("#music").checked = false;    
        } else {
            audio.play();
            document.querySelector("#music").checked = true;    
        } 
    });
});


function waitForStart(){
    let timerId = setInterval(fillTheFieldWithIcons, 500);

    document.querySelector(".field").addEventListener('click', function start() {
        
        if (timerId) {
            clearInterval(timerId);
        } 

        document.querySelector(".field").removeEventListener('click', start);
        play();
    });
    
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

function play() {
    fillTheFieldWithIcons();

    let elements = document.querySelectorAll(".icon");

    elements.forEach(function(el, index){
        if (el.classList.contains('open')) {
            el.classList.remove('open');
        }
        el.style.opacity = 0;        
    });

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

                    if (counter == 16) {
                        document.removeEventListener('click', gamePlay);
                        
                        waitForStart();
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




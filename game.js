const portals = document.querySelectorAll('.portal');
const scoreBoard = document.querySelector('.score');
const ufos = document.querySelectorAll('.ufo');

let lastPortal;
let timeUp = false;
let score = 0;

function randomTime(min, max) {
    return Math.round(Math.random() * (max - min) + min);
}

function randomPortal(portals){
    const index  = Math.floor(Math.random() * portals.length);
    const portal = portals[index];

    if (portal === lastPortal){
        return randomPortal(portals);
    }
    lastPortal = portal;
    return portal;
}

function peep() {
    const time = randomTime(500, 1000);
    const portal = randomPortal(portals); 
    portal.classList.add('up');
    setTimeout(() => {
        portal.classList.remove('up');
        if(!timeUp) {
            peep();
        }
    }, time);
}

function startGame() {
    scoreBoard.textContent = 0;
    timeUp = false;
    score = 0;
    peep();
    setTimeout(() => timeUp = true, 15000) 
}

function game(e){
    if(!e.isTrusted) return; 
    score++;
    this.parentNode.classList.remove('up'); 
    scoreBoard.textContent = score;
}

ufos.forEach(ufo => ufo.addEventListener('click', game))
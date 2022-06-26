const gearItem = document.querySelectorAll('.gear__item');
const gearStick = document.querySelector('.gear__stick');
const gasLvl = document.querySelector('.gas__lvl');
const speed = document.querySelector('.speed');
const carKey = document.querySelector('.key');
const dashTurnL = document.querySelector('.turn_left');
const dashTurnR = document.querySelector('.turn_right');
const instr = document.querySelector('.instruction');

let gears = [0, -17, -34, -51, -68, -85];

let gear = 1;

window.addEventListener('keyup', e => {
    if(e.code == 'KeyE') {
        engineStart();
    }
    if(e.code == 'KeyQ') {
        if(gear < 5 && gear != 1){
            gear++;        
        } else if (gear == 1 && power >= 0) {
            gear++;
        }
    }
    if(e.code == 'KeyZ') {
        if(gear > 0){
            gear--;
        } else if(gear == 1 && power == 0){
            gear--;
        }
    }
    if(e.code == 'Numpad1') {
        carTurnFR.classList.remove('car__light_turn_active');
        carTurnBR.classList.remove('car__light_turn_active');
        dashTurnR.classList.remove('turn_active');
        dashTurnL.classList.toggle('turn_active');
        carTurnFL.classList.toggle('car__light_turn_active');
        carTurnBL.classList.toggle('car__light_turn_active');
    }
    if(e.code == 'Numpad2') {
        dashTurnR.classList.toggle('turn_active');
        carTurnFR.classList.toggle('car__light_turn_active');
        carTurnBR.classList.toggle('car__light_turn_active');
        dashTurnL.classList.toggle('turn_active');
        carTurnFL.classList.toggle('car__light_turn_active');
        carTurnBL.classList.toggle('car__light_turn_active');
    }
    if(e.code == 'Numpad3') {
        carTurnFL.classList.remove('car__light_turn_active');
        carTurnBL.classList.remove('car__light_turn_active');
        dashTurnL.classList.remove('turn_active');
        dashTurnR.classList.toggle('turn_active');
        carTurnFR.classList.toggle('car__light_turn_active');
        carTurnBR.classList.toggle('car__light_turn_active');        
    }
    if(e.code == 'KeyF') {
        instr.classList.toggle('instruction_active');
    }
});

gearItem.forEach((el, i) => {
    el.addEventListener('click', () => {
        gear = (gears.length - 1) - i;
    });
});

carKey.addEventListener('click', engineStart);

function engineStart() {
    if(gas > 0) {
            carKey.classList.toggle('key_active');
            carEngine.classList.toggle('car__engine_active');
            carExhaust.classList.toggle('car__exhaust_active');
        if(engine) {
            engine = false;
        } else {
            engine = true;
        }
    }        
}
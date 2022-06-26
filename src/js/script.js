let windowWidth = window.innerWidth;
let windowHeight = window.innerHeight;

const canvas = document.querySelector('canvas');

const car = document.querySelector('.car');
const carHood = document.querySelector('.car__hood');
const carTrunk = document.querySelector('.car__trunk_top');
const carTank = document.querySelector('.car__tank');
const carDoorFrontLeft = document.querySelector('.car__door_front_left');
const carDoorFrontright = document.querySelector('.car__door_front_right');
const carDoorBackLeft = document.querySelector('.car__door_back_left');
const carDoorBackRight = document.querySelector('.car__door_back_right');
const carTurnFL = document.querySelector('.car__light_turn_front_left');
const carTurnBL = document.querySelector('.car__light_turn_back_left');
const carTurnFR = document.querySelector('.car__light_turn_front_right');
const carTurnBR = document.querySelector('.car__light_turn_back_right');
const carStopL = document.querySelector('.car__light_stop_left');
const carStopR = document.querySelector('.car__light_stop_right');
const carWheelL = document.querySelector('.car__wheel_front_left');
const carWheelR = document.querySelector('.car__wheel_front_right');
const carEngine = document.querySelector('.car__engine');
const carExhaust = document.querySelector('.car__exhaust');



let maxPower = 0.4;  
const maxSpeed = 100;
let engine = false;
const maxBrakingPower = 0.0375;
const powerFactor = 0.001;
const brakingFactor = 0.01;
const tank = 1000;
let gas = 1000;
const gasLvlMin = 50;
const drag = 0.95;
const angularDrag = 0.95; //0.95
const turnSpeed = 0.001;


let direction = 0;


let power = 0;
let brakingPower = 0;


let positionX = windowWidth / 2;
let positionY = windowHeight / 2;

let velocityX = 0;
let velocityY = 0;

let angle = 0;
let angularVelocity = 0;

const keysDown = {};

let needResize;
let resizing;
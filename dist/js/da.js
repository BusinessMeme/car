window.addEventListener('keydown', e => {
  keysDown[e.which] = true;
});

window.addEventListener('keyup', e => {
  keysDown[e.which] = false;
  console.log(e.which);
  //engine
  
  //light
  if(e.which == 104) {
    carHood.classList.toggle('car__hood_opened');
  }
  if(e.which == 101) {
    carTrunk.classList.toggle('car__trunk_opened');
  }
  if(e.which == 103) {
    carDoorFrontLeft.classList.toggle('car__door_front_left_opened');
  }
  if(e.which == 105) {
    carDoorFrontright.classList.toggle('car__door_front_right_opened');
  }
  if(e.which == 100) {
    carDoorBackLeft.classList.toggle('car__door_back_left_opened');
  }
  if(e.which == 102) {
    carDoorBackRight.classList.toggle('car__door_back_right_opened');
  }
});


function update () {

  switch (gear) {
    
    case 0:
      maxPower = -0.1;
      break;
    case 2:
      maxPower = 0.1;    
      break;
    case 3:
      maxPower = 0.2;      
      break;
    case 4:
      maxPower = 0.3;      
      break;
    case 5:
      maxPower = 0.4;      
      break;
  }

  if(engine && gas > 0) {
    if (keysDown[87]) {
      if(gear > 1) {
        power += powerFactor;    
      } else if(gear == 0){
        power -= powerFactor;         
      }
    } else { 
      if (gear != 1) {
        if (power > 0) {
          power -= powerFactor;
        } 
        if (power < 0) {
          power += powerFactor;
        }      
      }
    }
  }

  if (keysDown[83]) {
    if (power > 0) {
      power -= brakingFactor;
    } else if (power < 0) {
      power += brakingFactor;
    }        
    if(!carStopL.classList.contains('car__light_spot_active')) {
      carStopL.classList.add('car__light_stop_active');
      carStopR.classList.add('car__light_stop_active');
      carStopL.classList.remove('car__light_stop_rear');
      carStopR.classList.remove('car__light_stop_rear');
    }
  } else {
    // brakingPower -= brakingFactor;
    carStopL.classList.remove('car__light_stop_active');
    carStopR.classList.remove('car__light_stop_active');
    if(gear == 0) {
      carStopL.classList.add('car__light_stop_rear');
      carStopR.classList.add('car__light_stop_rear');
    } else {
      carStopL.classList.remove('car__light_stop_rear');
      carStopR.classList.remove('car__light_stop_rear');
    }
  }



  if(gear > 1 || gear == 1 && direction == 1) {
    power = Math.max(0, Math.min(maxPower, power));
  } else if(gear == 0 || gear == 1 && direction == -1) {
    power = Math.min(0, Math.max(maxPower, power));
  }  
  
  if(power > 0) {
    direction = 1;
    gas -= power;
  } else if(power < 0){
    direction = -1;
    gas += power;
  } else if(power == 0 && engine) {
    gas -= 0.01;
  }

  if (gas < 0) {
    gas = 0;
    carEngine.classList.remove('car__engine_active');
    carExhaust.classList.remove('car__exhaust_active');
    carKey.classList.remove('key_active');
    engine = false;
  }

  if (power > 0.0025 || power < -0.0025) {  //0.0025
    if (keysDown[65]) {
      angularVelocity -= direction * turnSpeed;
      carWheelL.style.transform = 'rotate(-45deg)';
      carWheelR.style.transform = 'rotate(-45deg)';
    }
    if (keysDown[68]) {
      angularVelocity += direction * turnSpeed;
      carWheelL.style.transform = 'rotate(45deg)';
      carWheelR.style.transform = 'rotate(45deg)';
    }    
  }

  if (keysDown[65]) {
    carWheelL.style.transform = 'rotate(-45deg)';
    carWheelR.style.transform = 'rotate(-45deg)';
  }
  if (keysDown[68]) {
    carWheelL.style.transform = 'rotate(45deg)';
    carWheelR.style.transform = 'rotate(45deg)';
  }
  if (!keysDown[68] && !keysDown[65]) {
    carWheelL.style.transform = 'rotate(0deg)';
    carWheelR.style.transform = 'rotate(0deg)';
  }

  velocityX += Math.sin(angle) * (power); //- brakingPower
  velocityY += Math.cos(angle) * (power);



  positionX += velocityX;
  positionY -= velocityY;
  velocityX *= drag;
  velocityY *= drag;
  angle += angularVelocity;
  angularVelocity *= angularDrag;

  if (positionX > windowWidth) {
    positionX -= windowWidth;  
  } else if (positionX < 0) {
    positionX += windowWidth;
  }

  if (positionY > windowHeight) {
    positionY -= windowHeight;
  } else if (positionY < 0) {
    positionY += windowHeight;
  }
}

let lastTime;
let acc = 0;
const step = 1 / 120;

function render (ms) {
  if (lastTime) {
    acc += (ms - lastTime) / 1000;

    while (acc > step) {
      update();

      acc -= step;
    }
  }

  lastTime = ms;
  requestAnimationFrame(render);

  if (needResize || resizing) {
    needResize = false;
    resizing = true;
  }

  car.style.transform = `translate(${positionX}px, ${positionY}px) rotate(${angle * 180 / Math.PI}deg)`;
  gearStick.style.transform = `translateY(${gears[gear]}px)`;
  gasLvl.style.transform = `translateX(-50%) translateY(${gasLvlMin - (gasLvlMin/100 * (gas / 10))}px)`;
  speed.innerHTML = `${Math.round(0 + (maxSpeed/100 * (power / (0.4/100))))}km/h`;
}

requestAnimationFrame(render);

function resize () {
  windowWidth = window.innerWidth;
  windowHeight = window.innerHeight;

  needResize = true;
}

resize();

window.addEventListener('resize', resize);

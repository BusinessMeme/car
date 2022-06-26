const touching = {
    up: 0,
    down: 0,
    left: 0,
    right: 0
  };
  
  window.addEventListener('touchstart', e => {
    e.preventDefault();
  
    if (touching.active) {
      return;
    }
    touching.active = true;
  
    const prevPos = {
      x: e.touches[0].pageX,
      y: e.touches[0].pageY
    };
  
    const touchmove = e => {
      e.preventDefault();
  
      const pos = {
        x: e.touches[0].pageX,
        y: e.touches[0].pageY
      };
  
      const diff = {
        x: pos.x - prevPos.x,
        y: pos.y - prevPos.y
      };
  
      prevPos.x = pos.x;
      prevPos.y = pos.y;
  
      touching.up -= diff.y / (windowHeight / 3);
      touching.down += diff.y / (windowHeight / 3);
      touching.left -= diff.x / (windowWidth / 3);
      touching.right += diff.x / (windowWidth / 3);
  
      touching.up = Math.max(0, Math.min(1, touching.up));
      touching.down = Math.max(0, Math.min(1, touching.down));
      touching.left = Math.max(0, Math.min(1, touching.left));
      touching.right = Math.max(0, Math.min(1, touching.right));
    };
  
    const touchend = e => {
      touching.active = false;
      touching.up = 0;
      touching.down = 0;
      touching.left = 0;
      touching.right = 0;
  
      window.removeEventListener('touchmove', touchmove);
      window.removeEventListener('touchend', touchend);
    };
  
    window.addEventListener('touchmove', touchmove);
    window.addEventListener('touchend', touchend);
  });
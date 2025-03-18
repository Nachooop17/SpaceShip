const canvas = document.getElementById('fondo');
  const ctx = canvas.getContext('2d');
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  //estrellas
  const cantidad = 200;
  const pixeles = [];
  for (let i = 0; i < cantidad; i++) {
    pixeles.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      velocidad: 5 + Math.random() * 2
    });
  }

  function animarNieve() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = 'white';
    pixeles.forEach(pixel => {
      ctx.fillRect(pixel.x, pixel.y, 2, 2);
      pixel.y += pixel.velocidad;
      if (pixel.y > canvas.height) {
        pixel.y = 0;
        pixel.x = Math.random() * canvas.width;
      }
    });
    requestAnimationFrame(animarNieve);
  }
  animarNieve();

  // Movimiento de la nave
  const imagen = document.getElementById('imagen');
  let posX = 200;
  let posY = 200;
  const velocidad = 8;
  let keys = {
    ArrowUp: false,
    ArrowDown: false,
    ArrowLeft: false,
    ArrowRight: false,
    " ": false // Espacio
  };

  document.addEventListener('keydown', (e) => {
    if (keys.hasOwnProperty(e.key)) keys[e.key] = true;
    if (e.key === " ") disparar();
  });

  document.addEventListener('keyup', (e) => {
    if (keys.hasOwnProperty(e.key)) keys[e.key] = false;
  });

  function moverCarta() {
    if (keys.ArrowUp) posY -= velocidad;
    if (keys.ArrowDown) posY += velocidad;
    if (keys.ArrowLeft) posX -= velocidad;
    if (keys.ArrowRight) posX += velocidad;

    imagen.style.left = `${posX}px`;
    imagen.style.top = `${posY}px`;

    requestAnimationFrame(moverCarta);
  }
  moverCarta();

  // LÁSERES
  let lasers = [];

  function disparar() {
    lasers.push({ x: posX + 48, y: posY, width: 4, height: 20, speed: 15 });
  }

  function moverLasers() {
    lasers.forEach((laser, index) => {
      laser.y -= laser.speed;
      if (laser.y < 0) lasers.splice(index, 1); // Eliminar si sale de pantalla
    });
  }

  function dibujarLasers() {
    lasers.forEach(laser => {
      ctx.fillStyle = 'rgb(7, 155, 7)';
      ctx.fillRect(laser.x, laser.y, laser.width, laser.height);
    });
  }

  // Animación general
  function loop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    // Redibujar nieve
    pixeles.forEach(pixel => {
      ctx.fillStyle = 'white';
      ctx.fillRect(pixel.x, pixel.y, 2, 2);
      pixel.y += pixel.velocidad;
      if (pixel.y > canvas.height) {
        pixel.y = 0;
        pixel.x = Math.random() * canvas.width;
      }
    });

    moverLasers();
    dibujarLasers();

    requestAnimationFrame(loop);
  }

  loop();

  // Redimensiona el canvas si cambia el tamaño de la ventana
  window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  });
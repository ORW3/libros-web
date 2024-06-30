let currentPage = 1;

function toggleClass(element, toggleClassName) {
  if (element.classList.contains(toggleClassName)) {
    element.classList.remove(toggleClassName);
  } else {
    element.classList.add(toggleClassName);
  }
}

function movePage(element, page) {
  if (page == currentPage) {
    currentPage += 2;
    toggleClass(element, "left-side");
    toggleClass(element.nextElementSibling, "left-side");
  } else if (page == currentPage - 1) {
    currentPage -= 2;
    toggleClass(element, "left-side");
    toggleClass(element.previousElementSibling, "left-side");
  }
}

function animar(element) {
  if (element.classList.contains("tecla")) {
    element.classList.remove("tecla");
  } else {
    element.classList.add("tecla");
  }
}

jQuery(document).ready(function () {
  var mouseX = 0,
    mouseY = 0;
  var xp = 0,
    yp = 0;

  $(document).mousemove(function (e) {
    mouseX = e.pageX - 30;
    mouseY = e.pageY - 30;
  });

  setInterval(function () {
    xp += (mouseX - xp) / 6;
    yp += (mouseY - yp) / 6;
    $("#circle").css({ left: xp + "px", top: yp + "px" });
  }, 20);
});

//FLORES

let intervalId;
let mouseX = 0;
let mouseY = 0;

document.body.addEventListener("mousedown", function (event) {
  mouseX = event.clientX;
  mouseY = event.clientY;
  createFlower(mouseX, mouseY);

  intervalId = setInterval(function () {
    createFlower(mouseX, mouseY);
  }, 100);
});

document.body.addEventListener("mouseup", function () {
  clearInterval(intervalId);
});

document.body.addEventListener("mouseleave", function () {
  clearInterval(intervalId);
});

document.body.addEventListener("mousemove", function (event) {
  mouseX = event.clientX;
  mouseY = event.clientY;
});

function createFlower(x, y) {
  const flowerContainer = document.getElementById("flower-container");
  const flowerSound = document.getElementById("flower-sound");

  if (flowerSound) {
    // Seleccionar una imagen de flor aleatoria
    const randomFlowerIndex = Math.floor(Math.random() * 6) + 1;
    const flowerImage = `/assets/images/flower${randomFlowerIndex}.png`;

    // Crear la flor
    const flower = document.createElement("div");
    flower.classList.add("flower");
    flower.style.backgroundImage = `url(${flowerImage})`;
    flower.style.left = `${x - 25}px`;
    flower.style.top = `${y - 25}px`;

    flowerContainer.appendChild(flower);

    // Reproducir el sonido
    flowerSound.currentTime = 0;
    flowerSound.play();

    // Remover la flor después de la animación
    flower.addEventListener("animationend", function (event) {
      if (event.animationName === "fall") {
        flowerContainer.removeChild(flower);
      }
    });
  } else {
    console.error("Elemento de audio no encontrado.");
  }
}

/*Mondrian*/

/*
setInterval(function () {
  function randInt (min, max) {
    return Math.floor(Math.random() * (max - min) + min)
  }
  
  class Point {
    constructor (x, y) {
      this.x = x
      this.y = y
    }
  }
  
  var colors = [
    '#38d3ff',
    '#fff038',
    '#ff3877',
    '#f5f5f5',
  ]
  
  class Rectangle {
    constructor (min, max) {
      this.min = min
      this.max = max
    }
  
    get width () {
      return this.max.x - this.min.x
    }
  
    get height () {
      return this.max.y - this.min.y
    }
  
    draw (ctx) {
      // Draw clockwise
      ctx.moveTo(this.min.x, this.min.y)
      ctx.lineTo(this.max.x, this.min.y)
      ctx.lineTo(this.max.x, this.max.y)
      ctx.lineTo(this.min.x, this.max.y)
      ctx.lineTo(this.min.x, this.min.y)
    }
  
    split (xPad, yPad, depth, limit, ctx) {
      ctx.fillStyle = colors[randInt(0, colors.length)]
      ctx.fillRect(this.min.x, this.min.y, this.max.x, this.max.y)
      this.draw(ctx)
  
      // Check the level of recursion
      if (depth === limit) {
        return
      }
  
      // Check the rectangle is enough large and tall
      if (this.width < 2 * xPad || this.height < 2 * yPad) {
        return
      }
  
      // If the rectangle is wider than it's height do a left/right split
      var r1 = new Rectangle()
      var r2 = new Rectangle()
      if (this.width > this.height) {
        var x = randInt(this.min.x + xPad, this.max.x - xPad)
        r1 = new Rectangle(this.min, new Point(x, this.max.y))
        r2 = new Rectangle(new Point(x, this.min.y), this.max)
      // Else do a top/bottom split
      } else {
        var y = randInt(this.min.y + yPad, this.max.y - yPad)
        r1 = new Rectangle(this.min, new Point(this.max.x, y))
        r2 = new Rectangle(new Point(this.min.x, y), this.max)
      }
  
      // Split the sub-rectangles
      r1.split(xPad, yPad, depth + 1, limit, ctx)
      r2.split(xPad, yPad, depth + 1, limit, ctx)
    }
  }
  
  var canvas = document.getElementById('doodle')
  var ctx = canvas.getContext('2d')
  ctx.beginPath()
  //ctx.lineWidth = 0.1
  
  var xPad = Math.floor(canvas.width * 0.1)
  var yPad = Math.floor(canvas.height * 0.1)
  
  var initialRect = new Rectangle(new Point(0, 0), new Point(canvas.width, canvas.height))
  
  initialRect.split(xPad, yPad, 0, 5, ctx)
  
  //ctx.stroke()
  
}, 100);
  */



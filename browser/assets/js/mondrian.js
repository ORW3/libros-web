function generarMondrian() {
  function randInt(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
  }

  class Point {
    constructor(x, y) {
      this.x = x;
      this.y = y;
    }
  }

  var colors = ["#38d3ff", "#fff038", "#ff3877", "#f5f5f5"];

  class Rectangle {
    constructor(min, max) {
      this.min = min;
      this.max = max;
    }

    get width() {
      return this.max.x - this.min.x;
    }

    get height() {
      return this.max.y - this.min.y;
    }

    draw(ctx) {
      ctx.moveTo(this.min.x, this.min.y);
      ctx.lineTo(this.max.x, this.min.y);
      ctx.lineTo(this.max.x, this.max.y);
      ctx.lineTo(this.min.x, this.max.y);
      ctx.lineTo(this.min.x, this.min.y);
    }

    split(xPad, yPad, depth, limit, ctx) {
      ctx.fillStyle = colors[randInt(0, colors.length)];
      ctx.fillRect(this.min.x, this.min.y, this.max.x, this.max.y);
      this.draw(ctx);

      if (depth === limit) {
        return;
      }

      if (this.width < 2 * xPad || this.height < 2 * yPad) {
        return;
      }

      var r1, r2;
      if (this.width > this.height) {
        var x = randInt(this.min.x + xPad, this.max.x - xPad);
        r1 = new Rectangle(this.min, new Point(x, this.max.y));
        r2 = new Rectangle(new Point(x, this.min.y), this.max);
      } else {
        var y = randInt(this.min.y + yPad, this.max.y - yPad);
        r1 = new Rectangle(this.min, new Point(this.max.x, y));
        r2 = new Rectangle(new Point(this.min.x, y), this.max);
      }

      r1.split(xPad, yPad, depth + 1, limit, ctx);
      r2.split(xPad, yPad, depth + 1, limit, ctx);
    }
  }

  var canvas = document.getElementById("doodle");
  var ctx = canvas.getContext("2d");
  ctx.beginPath();

  var xPad = Math.floor(canvas.width * 0.1);
  var yPad = Math.floor(canvas.height * 0.1);

  var initialRect = new Rectangle(
    new Point(0, 0),
    new Point(canvas.width, canvas.height)
  );

  initialRect.split(xPad, yPad, 0, 5, ctx);
}

generarMondrian();

var canvas = document.querySelector('#canvas');
var c = canvas.getContext('2d');
window.addEventListener('mousemove', interact);
window.addEventListener('mouseout', reset);
canvas.width = innerWidth;
canvas.height = innerHeight;
var w = canvas.width;
var h = canvas.height;
// line
// c.beginPath();
// c.moveTo(w/2, h/2);
// c.lineTo(w/2, h/2+500);   
// c.strokeStyle = "#ff3366";
// c.stroke();
// arc
// for (var i = 1; i <= 300; i+=1) {
//    let x = Math.random() * w;
//    let y = Math.random() * h;
//    var r = Math.random() * 255;
//    var g = Math.random() * 255;
//    var b = Math.random() * 255;
//    var a = Math.random();
//    c.beginPath();
//    c.arc(x, y, Math.random() * 60, 0, Math.PI*2, false);
//    
//    c.fill();
// }
function Circle(x, y, vx, vy, R, r, g, b, a) {
   this.x = x;
   this.y = y;
   this.vx = vx;
   this.vy = vy;
   this.R = R;
   this.r = r;
   this.g = g;
   this.b = b;
   this.a = a;
   this.draw = function () {
      c.beginPath();
      c.arc(this.x, this.y, this.R, 0, Math.PI * 2, false);
      c.fillStyle = `rgba(${this.r}, ${this.g}, ${this.b}, ${this.a})`;
      c.fill();
   };
   this.update = function () {
      if (this.x + this.R > w || this.x - this.R < 0) {
         this.vx = -this.vx;
      }
      if (this.y + this.R > h || this.y - this.R < 0) {
         this.vy = -this.vy;
      }
      this.x += this.vx;
      this.y += this.vy;
      if (mouse.x - this.x < 50 && mouse.x - this.x > -50 && mouse.y - this.y < 50 && mouse.y - this.y > -50) {
            if (this.R <= 50) {
               this.R += 2;
            }         
      } else {
         if (this.R > 5) {
            this.R -= 2;
         }
      }
   }
}
var mouse = {
   x : undefined,
   y : undefined
}
var circles = [];
for (let i = 0; i < 1000; i++) {
   let x = Math.random() * (h - 50);
   let y = Math.random() * (h - 50);
   let vx = (Math.random() - 0.5) * 4;
   let vy = (Math.random() - 0.5) * 4;
   let r = Math.random() * 255;
   let g = Math.random() * 255;
   let b = Math.random() * 255;
   let a = Math.random();
   circles[i] = new Circle(x, y, vx, vy, 5, r, g, b, a);
};

function animate() {
   requestAnimationFrame(animate);
   c.clearRect(0, 0, w, h);
   circles.forEach((circle) => {
      circle.draw();
      circle.update();
   });
}
animate();
//interacting
function interact (e) {
   mouse.x = e.x;
   mouse.y = e.y;
   canvas.style.cursor = 'pointer';
}
function reset (e) {
   mouse.x = undefined;
   mouse.y = undefined;
}
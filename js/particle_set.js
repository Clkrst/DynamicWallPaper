// JavaScript Document
/*
var speed = 1;
var position = 100;
var ani;
var st = false;
var ctx;
function init(){
	var canvas = document.getElementById("tutorial");
	if (!canvas.getContext) return;
	ctx = canvas.getContext('2d');
	draw();
}

function draw(){
	ani = window.requestAnimationFrame(function step(){
		
		if(position<=10){
			cancelAnimationFrame(ani);
		}else{
			ani = window.requestAnimationFrame(step);
			ctx.clearRect(0,0,600,600);
		}
		drawline(); //绘制表盘
		drawballs(); //绘制时分秒针
		console.log("11");
	});
}

function drawline(){
	ctx.save();
	ctx.beginPath();
	ctx.setLineDash([2,2]);
	ctx.lineDashOffset = 0;
	ctx.moveTo(0,50);
	ctx.lineTo(100,50);
	ctx.lineWidth = 1;
	ctx.stroke();
	ctx.closePath();
	ctx.restore();
}

function drawballs(){
	ctx.save();
	ctx.fillStyle = 'rgb(0,255,0)';
	ctx.arc(position,50,5,0,Math.PI*2);
	ctx.fill();
	position-=speed;
	ctx.restore();
	ctx.closePath();
}

$(document).ready(function(e) {
	$("#btn").click(function(){
		cancelAnimationFrame(ani);
		init();
	});
	init();
});
*/
/*
particlesJS.load('Div','assets/particles1.json',function(){
    console.log('callback particles is loaded!');
});
*/
particlesJS('particles-js',

  {
    "particles": {
      "number": {
        "value": 40,
        "density": {
          "enable": true,
          "value_area": 600
        }
      },
      "color": {
        "value": "#ffffff"
      },
      "shape": {
        "type": "image",
        "stroke": {
          "width": 0,
          "color": "#000000"
        },
        "polygon": {
          "nb_sides": 5
        },
        "image": {
          "src": "img/snowflakes.gif",
          "width": 100,
          "height": 100
        }
      },
      "opacity": {
        "value": 0.5,
        "random": false,
        "anim": {
          "enable": false,
          "speed": 1,
          "opacity_min": 0.1,
          "sync": false
        }
      },
      "size": {
        "value": 20,
        "random": true,
        "anim": {
          "enable": false,
          "speed": 40,
          "size_min": 0.1,
          "sync": false
        }
      },
      "line_linked": {
        "enable": true,
        "distance": 150,
        "color": "#ffffff",
        "opacity": 0,
        "width": 1
      },
      "move": {
        "enable": true,
        "speed": 2,
        "direction": "bottom",
        "random": false,
        "straight": false,
        "out_mode": "out",
        "attract": {
          "enable": false,
          "rotateX": 600,
          "rotateY": 1200
        }
      }
    },
    "interactivity": {
      "detect_on": "canvas",
      "events": {
        "onhover": {
          "enable": true,
          "mode": ["grab","bubble"]
        },
        "onclick": {
          "enable": "remove",
          "mode": "push"
        },
        "resize": true
      },
      "modes": {
        "grab": {
          "distance": 100,
          "line_linked": {
            "opacity": 4
          }
        },
        "bubble": {
          "distance": 0,
          "size": 40,
          "duration": 2,
          "opacity": 0,
          "speed": 3
        },
        "repulse": {
          "distance": 200
        },
        "push": {
          "particles_nb": 4
        },
        "remove": {
          "particles_nb": 2
        }
      }
    },
    "retina_detect": true,
    "config_demo": {
      "hide_card": false,
      "background_color": "#b61924",
      "background_image": "",
      "background_position": "50% 50%",
      "background_repeat": "no-repeat",
      "background_size": "cover"
    }
  }

);
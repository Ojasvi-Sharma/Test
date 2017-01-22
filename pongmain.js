var xp=0
var x=1280/2;
var y=720/2;
var dx=5;
var dy=-5;
var bx=0
var by=0
var c
var r
var cc=5
var rr=20
var i=0
var j=0
var score=0
var lv=3;

var canvas = document.getElementById('space');
var ctx = canvas.getContext('2d');

function checkKey(e) {

    e = e || window.event;

    if (event.which == '65') {
       xp-=5;
    }
    else if (event.which == '68') {
       xp+=5;
    }

}

//var flag =[12][3];

var bricks = [];
for(c=0; c<12; c++) {
	bricks[c]=[];
	rr=20;
    for(r=0; r<4; r++) {
        bricks[c][r] = { x: cc, y: rr, fl: 1 };
        //flag[c][r]=1;
        console.log(bricks[c][r])
        rr+=55
    }
    cc+=105
}

document.addEventListener("mousemove", moveMouse, false);

function paddle() {
	ctx.clearRect(0, 0, 1270, 720);
	ctx.font="20px Arial";
	ctx.fillText("Score: "+score, 5, 17);
	ctx.fillText("Lives: "+lv, canvas.width-75, 17);
	drawRect(xp+5,680,150,30);
	drawBricks();
	document.onkeydown = checkArrowKeys;
	drawBall();
	colDetect();
	if(x+dx > canvas.width-20 || x+dx < 20) {
        dx=-dx;
    }
    if(y+dy < 20) {
        dy=-dy;
    }
        else if(y+dy > canvas.height-50) {
        if(x>xp-20 && x < xp+170) {
            dy=-dy;
        }
        else {
            lv--;
            if(lv==0) {
                alert("Game Over!");
                document.location.reload();
            }
            else {
                x = canvas.width/2;
                y = canvas.height-50;
                dx = 5;
                dy = -5;
                xp = (canvas.width-150)/2;
            }
        }
    }
    x+=dx;
    y+=dy;
    requestAnimationFrame(paddle);
}

function colDetect() {
    for(c=0; c<12; c++) {
        for(r=0; r<4; r++) {
            var temp = bricks[c][r];
            if(temp.fl == 1) {
                if(x > temp.x && x < temp.x+100 && y > temp.y && y < temp.y+70) {
                    dy = -dy;
                    temp.fl = 0;
                    ctx.clearRect(temp.x,temp.y,100,50);
                    score++;
                    if(score == 4*12) {
                        alert("Game Won");
                        document.location.reload();
                    }
                }
            }
        }
    }
}

function moveMouse(e) {
    var relX = e.clientX-75;
    if(relX > 5 && relX < canvas.width-155) {
        xp = relX;
    }
}

function drawBall() {
    ctx.beginPath();
    ctx.arc(x, y, 20, 0, Math.PI*2);
    ctx.fillStyle = "#ff0000";
    ctx.fill();
    ctx.closePath();
}

function drawBricks() {
	i=0
	j=0
	for(bx=5; bx<=1280-105; bx+=105)
	{
		j=0;
		for(by=25; by<=240; by+=55)
		{
			if(bricks[i][j].fl == 1)
			{
				drawRect(bx,by,100,50);
			}
			j++;
		}
		i++;
	}
}

//document.onkeydown = paddle();

function checkArrowKeys(e) {
    key= window.event? event.keyCode: e.keyCode;
    if(key && key==65) { xp-=10; console.log('left');}
    if(key && key==83) { xp+=10; console.log('right');}
}

//document.onkeydown = checkArrowKeys;

function drawRect(x, y, w, h, color='#ff0000') {
	ctx.beginPath();
	ctx.rect(x, y, w, h);
	ctx.fillStyle = color;
	ctx.fill();
	ctx.closePath();
}

paddle();

//drawRect(100,200,100,100);

function startSimulation(frameInterval=10) {
	var sim = setInterval(paddle, frameInterval);
}

//startSimulation();
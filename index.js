var canvas = document.getElementById('canvas'),
	gd = canvas.getContext('2d'),
	star = {
		x : 0,
		y : 0,
		r : 6,
		R : 0,
		vx : 0,
		vy : 0,
		rot : 0
	},
	stars = [],
	timer = null;

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

window.onload = function(){
	clearInterval(timer);
	timer = setInterval(function(){
		draw();
		update();
	}, 10);
}

for( let i = 0 ; i < 500 ; i ++ ){
	star.x = getRandom( star.r, canvas.width - star.r );
	star.y = getRandom( star.r, canvas.height - star.r );
	star.R = star.r * 2;
	star.vx = getRandomV( -5, 5 );
	star.vy = getRandomV( -5, 5 );
	star.rot = Math.random() * 360;
	stars.push({...star});
}

function getRandom( min, max ){
	return Math.floor( Math.random() * ( max - min + 1 ) ) + min;
}

function getRandomV( min, max ){
	var num = ( Math.floor( Math.random() * ( max - min + 1 ) ) + min ) * ( Math.random() / 2 - Math.random() );
	if( num == 0 ) return getRandomV();
	return num;
}

function draw(){
	gd.clearRect( 0, 0, canvas.width, canvas.height );
	gd.beginPath();
	gd.font = 'bold 50px Consolas';
	gd.fillStyle = 'rgba( 255, 255, 255, 0.5 )';
	gd.textAlign = 'center';
	gd.textBaseline = 'middle';
	gd.fillText( "Author: Zheng Luxi", canvas.width / 2, canvas.height / 2 );
	for( let item of stars ){
		gd.beginPath();
		for( let i = 0 ; i < 5 ; i ++ ){
			gd.lineTo(
				item.x + item.R * ( Math.cos( ( i * 72 + 18 - item.rot ) * ( Math.PI / 180 ) ) ),
				item.y + item.R * ( -Math.sin( ( i * 72 + 18 - item.rot ) * ( Math.PI / 180 ) ) )
			);
			gd.lineTo(
				item.x + item.r * ( Math.cos( ( i * 72 + 54 - item.rot ) * ( Math.PI / 180 ) ) ),
				item.y + item.r * ( -Math.sin( ( i * 72 + 54 - item.rot ) * ( Math.PI / 180 ) ) )
			);
		}
		gd.closePath();
		gd.strokeStyle = 'rgb( 200, 200, 0 )'
		gd.fillStyle = 'yellow';
		gd.stroke();
		gd.fill();
	}
}

function update(){
	for( let item of stars ){
		item.x += item.vx;
		item.y += item.vy;
		item.rot ++;
		if( item.x <= item.R || item.x >= canvas.width - item.R ){
			item.vx = -item.vx;
		}
		if( item.y <= item.R || item.y >= canvas.height - item.R ){
			item.vy = -item.vy;
		}
	}
}


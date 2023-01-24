var cellCount = 4;
var clickCount = 0;
var lineCount = (cellCount * (cellCount - 1) * 2);
var layoutSize = 600;
var dotSize = 10;
var padding = 50;
var userColor = ['red', 'green', 'blue'];
var currentUserNo = 0;
var lineObj = {};
var cellWidth = 0;
var winCell = [];
var winUser = [0,0,0];
var isWin = false;
$(function(){
	
	$('#container').width(layoutSize);
	$('#container').height(layoutSize);

	cellWidth = Math.round((layoutSize - padding * 2) / (cellCount-1) * 100) / 100;
	for(i=0; i<cellCount; i++){
		var y = padding + cellWidth * i;
		for(j=0; j<cellCount; j++){
			var x = padding + cellWidth * j;
			if(j != 0 && i != cellCount - 1 ){
				//x 
				var key = i + ',' + (j - 1) + ',x';
				var x1 = x - cellWidth;
				var y1 = y;
				var x2 = x1 + cellWidth;
				var y2 = y1;
				var x3 = x1 + cellWidth / 2;
				var y3 = y1 + cellWidth / 2;
				var points = [x1, y1, x2, y2, x3, y3];
				var poly = document.createElementNS('http://www.w3.org/2000/svg','polygon');
				poly.setAttribute('points', points.join(','));
				poly.setAttribute('key', key);
				poly.setAttribute('fill', 'white');
				$('#container').append(poly);
				
				lineObj[key] = {
					userNo : null,
					isClick: false,
				};

				var key = i + ',' + j + ',y';
				var x1 = x;
				var y1 = y;
				var x2 = x;
				var y2 = y1 + cellWidth;
				var x3 = x - cellWidth / 2;
				var y3 = y1 + cellWidth / 2;
				var points = [x1, y1, x2, y2, x3, y3];
				var poly = document.createElementNS('http://www.w3.org/2000/svg','polygon');
				poly.setAttribute('points', points.join(','));
				poly.setAttribute('key', key);
				poly.setAttribute('fill', 'white');
				$('#container').append(poly);
				
				lineObj[key] = {
					userNo : null,
					isClick: false,
				};
			}

			if(i != 0 && j != cellCount - 1 ){
				//x 
				var key = (i-1) + ',' + j + ',y';
				var x1 = x;
				var y1 = y;
				var x2 = x1;
				var y2 = y - cellWidth;
				var x3 = x + cellWidth / 2;
				var y3 = y - cellWidth / 2 ;
				var points = [x1, y1, x2, y2, x3, y3];
				var poly = document.createElementNS('http://www.w3.org/2000/svg','polygon');
				poly.setAttribute('points', points.join(','));
				poly.setAttribute('key', key);
				poly.setAttribute('fill', 'white');
				$('#container').append(poly);
				
				lineObj[key] = {
					userNo : null,
					isClick: false,
				};

				var key = i + ',' + j + ',x';
				var x1 = x;
				var y1 = y;
				var x2 = x + cellWidth / 2;
				var y2 = y - cellWidth / 2 ;
				var x3 = x + cellWidth;
				var y3 = y;
				var points = [x1, y1, x2, y2, x3, y3];
				var poly = document.createElementNS('http://www.w3.org/2000/svg','polygon');
				poly.setAttribute('points', points.join(','));
				poly.setAttribute('key', key);
				poly.setAttribute('fill', 'white');
				$('#container').append(poly);
				
				lineObj[key] = {
					userNo : null,
					isClick: false,
				};
			}
		}
	}

	for(i=0; i<cellCount; i++){
		var y = padding + cellWidth * i;
		for(j=0; j<cellCount; j++){
			var x = padding + cellWidth * j;
			var newElement = document.createElementNS('http://www.w3.org/2000/svg','circle');
			newElement.setAttribute('cx', x);
			newElement.setAttribute('cy', y);
			newElement.setAttribute('r', dotSize);
			$('#container').append(newElement);
		}
	}
	console.log(lineObj);

	$('polygon').mouseover(function(){
		var key = $(this).attr('key');
		if(lineObj[key].isClick) return;

		var lineInfo = key.split(',');
		var x1 = padding + cellWidth * lineInfo[1];
		var y1 = padding + cellWidth * lineInfo[0];

		if(lineInfo[2] == 'x'){
			var x2 = x1*1 + cellWidth;
			var y2 = y1;
		} else {
			var x2 = x1;
			var y2 = y1 + cellWidth;
		}


		var line = document.createElementNS('http://www.w3.org/2000/svg','line');
		line.setAttribute('stroke', 'blue');
		line.setAttribute('stroke-width', 5);
		line.setAttribute('stroke-linecap', 'round');
		line.setAttribute('stroke-dasharray', '1, 10');
		line.setAttribute('x1', x1);
		line.setAttribute('y1', y1);
		line.setAttribute('x2', x2);
		line.setAttribute('y2', y2);
		line.setAttribute('key', key);
		line.setAttribute('id', 'dotline_'+key);
		$('#container').append(line);
	});


	$('polygon').mouseout(function(){
		var key = $(this).attr('key');
		const element = document.getElementById('dotline_'+key);
		if(element)
			element.remove();
	});

	$('polygon').click(function(){
		
		var key = $(this).attr('key');
		if(lineObj[key].isClick) return;

		var lineInfo = key.split(',');
		var x1 = padding + cellWidth * lineInfo[1];
		var y1 = padding + cellWidth * lineInfo[0];

		if(lineInfo[2] == 'x'){
			x1 = x1 + dotSize + 2;
			var x2 = x1*1 + cellWidth -  2 * dotSize - 4;
			var y2 = y1;
		} else {
			y1 = y1 + dotSize + 2;
			var x2 = x1;
			var y2 = y1 + cellWidth  -  2 * dotSize - 4;
		}


		var line = document.createElementNS('http://www.w3.org/2000/svg','line');
		line.setAttribute('stroke', userColor[currentUserNo]);
		line.setAttribute('stroke-width', 5);
		line.setAttribute('stroke-linecap', 'round');
		line.setAttribute('x1', x1);
		line.setAttribute('y1', y1);
		line.setAttribute('x2', x2);
		line.setAttribute('y2', y2);
		line.setAttribute('key', key);
		line.setAttribute('class', 'line');
		line.setAttribute('id', 'line_'+key);
		$('#container').append(line);

		const element = document.getElementById('dotline_'+key);
		if(element)
			element.remove();

		Array.from(document.getElementsByClassName("line")).forEach(pathElement => {
	        pathElement.setAttribute('style', 'stroke-dasharray:'+pathElement.getTotalLength()+';stroke-dashoffset:'+pathElement.getTotalLength())
	    })

		lineObj[key].userNo = currentUserNo;
		lineObj[key].isClick = true;
		clickCount++;
		
		isWin = false;
		var rectPosX1 = lineInfo[0] - 1;
		var rectPosY1 = lineInfo[1] - 1;
		checkWin(rectPosX1, rectPosY1);

		var rectPosX1 = lineInfo[0] - 1;
		var rectPosY1 = lineInfo[1]*1;
		checkWin(rectPosX1, rectPosY1);

		var rectPosX1 = lineInfo[0]*1;
		var rectPosY1 = lineInfo[1]-1;
		checkWin(rectPosX1, rectPosY1);

		var rectPosX1 = lineInfo[0]*1;
		var rectPosY1 = lineInfo[1]*1;
		checkWin(rectPosX1, rectPosY1);

		if(!isWin){
			currentUserNo++;
			if(currentUserNo == 3) currentUserNo = 0;
		}

		if(clickCount == lineCount){
			gameOver();
		}

	});
	
	$('#resetBtn').click(function(){
		resetGame();
	});
});
var checkWin = function(x, y){
	if(winCell.indexOf(x + ',' + y) > -1) return false;
	if(x >= 0 && y >= 0 && x < cellCount-1 && y < cellCount-1){
		var k1 = x + ',' + y + ',x';
		var k2 = x + ',' + y + ',y';
		var k3 = x + ',' + (y+1) + ',y';
		var k4 = (x + 1) + ',' + y + ',x';
		if(lineObj[k1].isClick && lineObj[k2].isClick && lineObj[k3].isClick && lineObj[k4].isClick){

			var tx = padding + cellWidth * y + cellWidth / 2 - 20;
			var ty = padding + cellWidth * x + cellWidth / 2;
			var text = document.createElementNS('http://www.w3.org/2000/svg','text');
			text.innerHTML = 'User' + (currentUserNo + 1);
			text.setAttribute('fill', userColor[currentUserNo]	);
			text.setAttribute('x', tx);
			text.setAttribute('y', ty);
			text.setAttribute('font-size', '14pt');
			text.setAttribute('font-weight', 'bold');
			text.setAttribute('class', 'text');
			$('#container').append(text);

			winCell.push(x + ',' + y);
			winUser[currentUserNo]++;
			isWin = true;
		}
	}
};
var gameOver = function(){
	$('#user1').html(winUser[0]);
	$('#user2').html(winUser[1]);
	$('#user3').html(winUser[2]);
	$("#modal1").modal('show');
}
var resetGame = function(){
	clickCount = 0;
	currentUserNo = 0;
	winCell = [];
	winUser = [0,0,0];
	isWin = false;
	for(i in lineObj){
		lineObj[i] = {
			userNo : null,
			isClick: false,
		};
	}
	$('.line').remove();
	$('.text').remove();
	$('.close-modal').click();
}
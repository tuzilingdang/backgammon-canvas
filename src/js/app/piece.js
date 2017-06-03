define(["jquery"], function() {
	// 棋子构造函数
	function Piece(x, y, r) {
		this.x = x , // 棋子横坐标
		this.y = y, // 棋子纵坐标
		this.r = r || 10 // 棋子半径
	}

	Piece.prototype = {
		constructor: Piece,

		draw: function(color) {
			// var oppositeColor = (color === "white") ? "black" : "white";
			var canvas = $("#checker-board")[0];
			var ctx = canvas.getContext("2d");
			// var grd = ctx.createRadialGradient(10, 30, 0.1, 90, 60, 100);
			// grd.addColorStop(0, color);
			// grd.addColorStop(1, oppositeColor);
			ctx.fillStyle = color;
			ctx.beginPath();
			ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2, true);
			ctx.closePath();
			ctx.fill();
		}
	}

	return Piece;
})
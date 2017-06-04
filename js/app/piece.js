define(["jquery"], function() {
	// 棋子构造函数
	function Piece(boardWidth, boardHeight, spacing, margin) {
		this.boardWidth = boardWidth || 440; //
		this.boardHeight = boardHeight || 440;
		this.spacing = spacing || 30;
		this.margin = margin || 10;
		this.r =  10 // 棋子半径
	}

	Piece.prototype = {
		constructor: Piece,

		init: function() {
			$("#piece-board").height($("#piece-board").width());
			var canvas = $("#piece-board")[0];
			this.ctx = canvas.getContext("2d");
			canvas.width = canvas.width;
			canvas.height = canvas.height;
			// this.fillbackGroundColor();
		},

		setPiecePos: function(pos) {
			this.x = pos.x;
			this.y = pos.y;
		},

		// 填充棋子画布颜色
		fillbackGroundColor: function() {
			this.ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
			this.ctx.fillRect(0, 0, this.boardWidth, this.boardWidth);
		},

		draw: function(color) {
			this.ctx.fillStyle = color;
			this.ctx.beginPath();
			this.ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2, true);
			this.ctx.closePath();
			this.ctx.fill();
		},

		clear: function(pos) {
			this.ctx.clearRect( pos.x-this.r,  pos.y-this.r, this.r*2, this.r*2);
		},
	}

	return Piece;
})
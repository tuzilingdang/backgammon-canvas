define(["jquery"], function() {
	// 棋子构造函数
	function Piece( r, boardId) {
		this.r =  r || 10, // 棋子半径
		this.id = boardId
	}

	Piece.prototype = {
		constructor: Piece,

		init: function() {
			this.makePieceBoard("piece-board")
			$(".piece-board").attr("width", $("#" + this.id).attr("width") );
			$(".piece-board").attr("height", $("#" + this.id).attr("width") );
			this.boardWidth = $("#" + this.id).attr("width");
			this.boardHeight = $("#" + this.id).attr("width");
			var canvas = $(".piece-board")[0];
			this.ctx = canvas.getContext("2d");
			canvas.width = canvas.width;
			canvas.height = canvas.height;
		},

		makePieceBoard: function(name) {
			var div = document.createElement("canvas");
			div.className = name;
			div.style.width = $("#" + this.id).width();
			div.style.height = $("#" + this.id).height();
			$("main").append(div);
		},

		// 填充棋子画布颜色
		fillbackGroundColor: function() {
			this.ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
			this.ctx.fillRect(0, 0, this.boardWidth, this.boardWidth);
		},

		draw: function(pos, color) {
			this.ctx.fillStyle = color;
			this.ctx.beginPath();
			this.ctx.arc(pos.x, pos.y, this.r, 0, Math.PI * 2, true);
			this.ctx.closePath();
			this.ctx.fill();
		},

		clear: function(pos) {
			this.ctx.clearRect( pos.x-this.r,  pos.y-this.r, this.r*2, this.r*2);
		},
	}

	return Piece;
})
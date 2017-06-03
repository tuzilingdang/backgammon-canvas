define(["jquery"], function($) {
	// 棋盘构造函数
	function CheckerBoard(width, height, spacing, margin, gridLineColor, boardBackColor) {
		this.width = width || 440; //
		this.height = height || 440;
		this.spacing = spacing || 30;
		this.margin = margin || 10;
		this.gridLineColor = gridLineColor || "#807d7d";
		this.boardBackColor = boardBackColor || "#EACE9F";
	}

	CheckerBoard.prototype = {
		constructor : CheckerBoard,

		// 初始化棋盘
		init: function() {
			var canvas = $("#checker-board")[0];
			this.ctx = canvas.getContext("2d");
			this.fillbackGroundColor();
			this.drawBorder();
			this.drawGrid();
			this.drawBoardArc();
		},

		// 填充棋盘颜色
		fillbackGroundColor: function() {
			this.ctx.fillStyle = this.boardBackColor;
			this.ctx.fillRect(0, 0, this.width, this.height);
		},

		// 绘制棋盘边框
		drawBorder: function() {
			this.ctx.strokeStyle = "#000000";
			this.ctx.lineWidth = 2;
			this.ctx.strokeRect(10, 10, 420, 420);
		},

		// 绘制棋盘格子
		drawGrid: function() {
			this.ctx.lineWidth = 1;
			this.ctx.strokeStyle = this.gridLineColor;
			for (var i = 1; i < 14; i++) {
				this.ctx.moveTo(this.margin + this.spacing * i, this.margin);
				this.ctx.lineTo(this.margin + this.spacing * i, this.width - this.margin);
				this.ctx.moveTo(this.margin, this.margin + this.spacing * i);
				this.ctx.lineTo(this.height - this.margin, this.margin + this.spacing * i);
				this.ctx.stroke();
			}
		},

		// 绘制棋盘圆点
		drawBoardArc: function() {
			var that = this;
			var leftX = this.margin + this.spacing * 3,
				rightX = this.width - this.margin - this.spacing * 3;
			var topY = this.margin + this.spacing * 3,
				bottomY = this.height - this.margin - this.spacing * 3;
			var centerX = (this.width / 2).toFixed(2),
				centerY = (this.height / 2).toFixed(2);

			function drawArc(x, y, r) {
				that.ctx.fillStyle = "#000000";
				that.ctx.beginPath();
				that.ctx.arc(x, y, r, 0, Math.PI * 2, true);
				that.ctx.closePath();
				that.ctx.fill();
			}

			drawArc(centerX, centerY, 4);
			drawArc(leftX, topY, 4);
			drawArc(leftX, bottomY, 4);
			drawArc(rightX, topY, 4);
			drawArc(rightX, bottomY, 4);
		},

		// 获取鼠标点击位置相对于canvas原点的像素坐标
		getMousePos: function(e) {
			var canvas = $("#checker-board");
			var canvasPos = {
				x : canvas.offset().left + this.margin,
				y : canvas.offset().top + this.margin, 
			};

			var mouseClientPos = {
				x : e.pageX ,
				y : e.pageY
			};

			var x = (mouseClientPos.x - canvasPos.x ) * this.width / canvas.width();
			var y = (mouseClientPos.y - canvasPos.y ) * this.height / canvas.height();

			return {
				x : Math.round(x / this.spacing) * this.spacing + this.margin,
				y : Math.round(y / this.spacing) * this.spacing + this.margin
			};
		},

		getStateCoordinate: function(e) {
			var mousePos = this.getMousePos(e);
			return {
				i: Math.round(mousePos.x / this.spacing) ,
				j: Math.round(mousePos.y / this.spacing)
			};
		}
	}

	return CheckerBoard;
})


	// var checkerBoard = new CheckerBoard(440, 440, 30, 10);
	// checkerBoard.init();

define(["jquery"], function($) {
	// 棋盘构造函数
	function CheckerBoard(board) {
		this.id = board.id;
		this.rows = board.rows || 14;
		this.margin = board.margin || 20;
		this.gridLineColor = board.gridLineColor || "#807d7d";
		this.boardColor = board.boardColor || "#EACE9F";
	}

	CheckerBoard.prototype = {
		constructor : CheckerBoard,

		// 初始化棋盘
		init: function() {
			// $("main").height($("#checker-board").width() + $(".btn-group").height());
			$("#" + this.id).height($("#" + this.id).width());
			$("#" + this.id).attr("width", $("#" + this.id).width() *2);
			$("#" + this.id).attr("height", $("#" + this.id).height() *2);
			this.width = $("#" + this.id).attr("width");
			this.height = $("#" + this.id).attr("height");
			this.cols = this.rows;
			this.spacing = (this.width - this.margin * 2) / this.rows;

			var canvas = $("#" + this.id)[0];
			$("#" + this.id).unbind();
			canvas.width = canvas.width;
			canvas.height = canvas.height;
			this.ctx = canvas.getContext("2d");
			this.fillbackGroundColor();
			this.drawGrid();
			this.drawBorder();
			this.drawBoardArc();
		},

		// 生成棋盘上的黑色小圆点
		makeDot: function(x, y, r) {
			this.ctx.fillStyle = "#000000";
			this.ctx.beginPath();
			this.ctx.arc(x, y, r, 0, Math.PI * 2, true);
			this.ctx.closePath();
			this.ctx.fill();
		},

		// 填充棋盘颜色
		fillbackGroundColor: function() {
			this.ctx.fillStyle = this.boardColor;
			this.ctx.fillRect(0, 0, this.width, this.height);
		},

		// 绘制棋盘边框
		drawBorder: function() {
			this.ctx.strokeStyle = this.gridLineColor;
			this.ctx.lineWidth = 5;
			this.ctx.strokeRect( this.margin, this.margin, this.width - this.margin*2, this.height - this.margin*2);
		},

		// 绘制棋盘格子
		drawGrid: function() {
			this.ctx.lineWidth = 2;
			this.ctx.strokeStyle = this.gridLineColor;
			for (var i = 0; i < this.rows; i++) {
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

			this.makeDot(centerX, centerY, 8);
			this.makeDot(leftX, topY, 8);
			this.makeDot(leftX, bottomY, 8);
			this.makeDot(rightX, topY, 8);
			this.makeDot(rightX, bottomY, 8);
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

		// 落子获取状态矩阵坐标值
		getStateCoordinate: function(e) {
			var mousePos = this.getMousePos(e);
			return {
				x: Math.round(mousePos.x / this.spacing) ,
				y: Math.round(mousePos.y / this.spacing)
			};
		}
	}

	return CheckerBoard;
})


define("backgammon", ["jquery", "checkerboard", "piece"], function($, CheckerBoard, Piece) {
	// 五子棋构造函数
	function Backgammon(checkerboard, piece) {
		this.checkerboard = checkerboard || {},
			this.piece = piece || {}
	}

	Backgammon.prototype = {
		constructor: Backgammon,

		// 初始化棋盘
		init: function() {
			$("#start").removeClass("active");
			$("footer").hide();
			var boardWidth = 440,
				boardHeight = 440; // 棋盘边长
			var spacing = 30; //格子间距
			var margin = 10; //棋盘外边距
			this.matrixWidth = (boardWidth - 2 * margin) / spacing; // 初始化矩阵长
			this.matrixHeight = (boardHeight - 2 * margin) / spacing; // 初始化矩阵宽

			this.checkerBoard = new CheckerBoard(boardWidth, boardHeight, spacing, margin);
			this.checkerBoard.init();
			this.piece = new Piece(boardWidth, boardHeight, spacing, margin);
			this.piece.init();
		},
		// 开局
		start: function() {
			var that = this;
			// $("footer").hide();
			$("#start").addClass("active");
			$("#checker-board").unbind();
			this.initStateMatrix(this.matrixWidth, this.matrixHeight);
			this.initHistoryMatrix(this.matrixWidth, this.matrixHeight);
			this.turnState = "X"; // turnState标记走棋顺序，X 代表黑棋， O 代表白棋
			this.count = 0;
			// this.timeCount();

			$("canvas").click(function(e) {
				that.placePiece(e);
			});

			$("#take-back").click(function() {
				that.takeBackPiece();
			});

			$("#put-back").click(function() {
				that.putBackPiece();
			});
		},

		// 初始化记录棋局状态的矩阵
		initStateMatrix: function(width, height) {
			this.stateMatrix = new Array();
			for (var i = 0; i < width + 1; i++) {
				this.stateMatrix[i] = new Array();
				for (var j = 0; j < height + 1; j++) {
					this.stateMatrix[i][j] = "null";
				}
			}
		},

		// 初始化记录历史状态的矩阵
		initHistoryMatrix: function(width, height) {
			this.historyMatrix = new Array();
			for (var i = 0; i < width + 1; i++) {
				this.historyMatrix[i] = new Array();
				for (var j = 0; j < height + 1; j++) {
					this.historyMatrix[i][j] = "null";
				}
			}
		},

		// 落子改变矩阵状态
		changeStateMatrix: function() {
			this.stateMatrix[this.statePos.x][this.statePos.y] = this.turnState;
			this.historyMatrix = this.stateMatrix;
		},

		// 放置棋子
		placePiece: function(e) {
			var color = (this.turnState === "X") ? "black" : "white";
			if(e) {
				this.mousePos = this.checkerBoard.getMousePos(e);
				this.statePos = this.checkerBoard.getStateCoordinate(e);			
			}

			if (this.stateMatrix[this.statePos.x][this.statePos.y] === "null") {
				this.piece.setPiecePos(this.mousePos);
				this.piece.draw(color);
				this.changeStateMatrix();

				switch (this.caculateWinner(this.statePos)) {
					case "N":
						this.turnState = (this.turnState === "X") ? "O" : "X";
						break;
					case "D":
						this.drawn();
						break;
					case "X":
						this.gameOver("X");
						break;
					case "O":
						this.gameOver("O");
						break;
				}
			}
		},

		// 检察游戏是否获胜并返回获胜方
		caculateWinner: function(pos) {
			var that = this;
			var player = that.stateMatrix[pos.x][pos.y];

			function checkDrawn() {
				for (var i = 0; i < that.matrixWidth; i++) {
					for (var j = 0; j < that.matrixHeight; j++) {
						if (that.stateMatrix[i][j] === "null") {
							return false;
						}
					}
				}
				return true;
			}

			function checkHorizon() {
				var count = 0;
				for (var i = 1; i < 5; i++) {
					if ((pos.x - i) >= 0) {
						if ((that.stateMatrix[pos.x - i][pos.y] === player)) {
							count++;
						}
					}
				}

				for (var i = pos.x + 1; i < 5 - count + pos.x; i++) {
					if (i >= that.matrixWidth + 1) {
						return false;
					} else {
						if (that.stateMatrix[i][pos.y] !== player) {
							return false;
						}
					}
				}
				return true;
			}

			function checkVertical() {
				var count = 0;
				for (var j = 1; j < 5; j++) {
					if ((pos.y - j) >= 0) {
						if ((that.stateMatrix[pos.x][pos.y - j] === player)) {
							count++;
						}
					}
				}

				for (var j = pos.y + 1; j < 5 - count + pos.y; j++) {
					if (j >= that.matrixHeight + 1) {
						return false;
					} else {
						if (that.stateMatrix[pos.x][j] !== player) {
							return false;
						}
					}

				}
				return true;
			}

			function checkDiagonal() {
				var count = 0;
				for (var j = 1; j < 5; j++) {
					if ((pos.y - j) >= 0 && (pos.x - j) >= 0) {
						if ((that.stateMatrix[pos.x - j][pos.y - j] === player)) {
							count++;
						}
					}
				}
				for (var j = 1; j < 5 - count; j++) {
					if ((j + pos.y >= that.matrixHeight + 1) || (j + pos.x >= that.matrixHeight + 1)) {
						return false;
					} else {
						if (that.stateMatrix[pos.x + j][pos.y + j] !== player) {
							return false;
						}
					}
				}
				return true;
			}

			function checkReverseDiagonal() {
				var count = 0;
				for (var j = 1; j < 5; j++) {
					if ((pos.y - j) >= 0 && (j + pos.x) < that.matrixWidth + 1) {
						if ((that.stateMatrix[pos.x + j][pos.y - j] === player)) {
							count++;
						}
					}
				}
				for (var j = 1; j < 5 - count; j++) {
					if ( ((j + pos.y) >= that.matrixHeight + 1) || ((pos.x - j) < 0) ){
						return false;
					} else {
						if (that.stateMatrix[pos.x - j][pos.y + j] !== player) {
							return false;
						}
					}
				}
				return true;
			}

			if (!checkDrawn()) {
				if (checkHorizon() || checkVertical() || checkDiagonal() || checkReverseDiagonal()) {
					return player;
				} else {
					return "N";
				}
			} else {
				return "D";
			}
		},

		drawn: function() {
			alert("和棋");
			this.init();
		},

		gameOver: function(player) {
			var that = this;
			if (player) {
				if (player === "X") {
					player = "黑方"
				}
				if (player === "O") {
					player = "白方"
				}
				$("#timer").html(player + "获胜，游戏结束");
				$("footer").show();
				that.stateMatrix = null;
				that.historyMatrix = null;
				// alert(player + "获胜，游戏结束");
			}
			$("#restart").click(function() {
			    that.init();
			    that.start();
			    $("#start").unbind();
			})
		},

		// 回到上一步
		takeBackPiece: function() {
			this.piece.clear(this.mousePos);
			this.stateMatrix[this.statePos.x][this.statePos.y] = "null";
			this.turnState = (this.turnState === "X") ? "O" : "X";
		},

		// 撤销悔棋
		putBackPiece: function() {
			// this.piece.draw(this.mousePos);
			// this.stateMatrix[this.statePos.x][this.statePos.y] = this.historyMatrix[this.statePos.x][this.statePos.y];
			// this.historyMatrix = this.stateMatrix;
			this.turnState = (this.turnState === "X") ? "X" : "O";
			this.placePiece();
		},

		timeCount: function() {
			var that = this;
			$("#timer").html(this.count + "s");
			this.count = this.count + 1;
			this.t = setTimeout(that.timeCount(), 1000)
		},

		stopCount: function() {
			this.count = 0;
			setTimeout($("'#timer").html("Game Over"), 0);
			clearTimeout(this.t);
		}
	}

	return Backgammon;
});
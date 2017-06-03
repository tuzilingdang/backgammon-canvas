define("backgammon", ["jquery", "checkerboard", "piece"], function($, CheckerBoard, Piece) {
	// 五子棋构造函数
	function Backgammon(checkerboard, piece) {
		this.checkerboard = checkerboard || {},
		this.piece = piece || {}
	}

	Backgammon.prototype = {
		constructor: Backgammon,
		// 开局
		start: function() {
			var that = this;
			var boardWidth = 440, boardHeight = 440; // 棋盘边长
			var spacing = 30; //格子间距
			var margin = 10; //棋盘外边距
			var matrixWidth = Math.floor( (boardWidth - margin)/spacing); // 初始化矩阵长
			var matrixHeight = Math.floor( (boardHeight - margin)/spacing); // 初始化矩阵宽

			this.checkerBoard = new CheckerBoard(boardWidth, boardWidth, spacing, margin);
			this.checkerBoard.init();
			this.initStateMatrix(matrixWidth, matrixHeight);
			this.turnState = "X";  // turnState标记走棋顺序，X 代表黑棋， O 代表白棋

			$("#checker-board").click(function(e) {
				that.placePiece(e);
			})
		},

		// 初始化记录棋局状态的矩阵
		initStateMatrix: function(width, height) {
			this.stateMatrix = new Array();
			for (var i = 0; i < width; i++) {
				this.stateMatrix[i] = new Array();
				for(var j = 0; j < height; j++) {
					this.stateMatrix[i][j] = null;
				}
			}
		},

		// 落子改变矩阵状态
		changeStateMatrix: function(e){
			var statePos = this.checkerBoard.getStateCoordinate(e);
			this.stateMatrix[statePos.i][statePos.j] = this.turnState;
		},

		// 放置棋子
		placePiece: function(e) {		
			var color = (this.turnState === "X") ? "black" : "white";
			var mousePos = this.checkerBoard.getMousePos(e);

			var piece = new Piece(mousePos.x, mousePos.y, 10);
			piece.draw(color);
			this.changeStateMatrix(e);

			if(this.caculateWinner() === "N") {
				this.turnState = (this.turnState === "X") ? "O" : "X";
			} 
		},

		caculateWinner: function() {
			return "N";
		},

		// 回到上一步
		takeBack: function() {

		},

		// 撤销悔棋
		putBack: function() {

		}
	}

	return Backgammon;
});
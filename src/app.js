require.config({
    baseUrl: 'js/libs',
    paths: {
        app: '../app',
        backgammon: "../app/backgammon",
        checkerboard: "../app/checkerboard",
        piece: "../app/piece",
    }
});

// 开始 app 主逻辑.
require(["jquery", "backgammon"], function ($, Backgammon) {
	var backgammon = new Backgammon();
	backgammon.start();

	$("#start").click(function() {
		backgammon.start();
	})
});



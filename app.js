require.config({
    baseUrl: 'js/libs',
    paths: {
        app: '../app',
        game: "../app/game",
        checkerboard: "../app/checkerboard",
        piece: "../app/piece",
    }
});

// 开始 app 主逻辑.
require(["jquery", "game"], function($, Game) {
    var checkerBoard = {
        id: "checker-board",
        rows: 20, // 棋盘列数
        margin: 20, // 棋盘边框间距
        // gridLineColor: "rgb(128, 125, 125)",
        // boardColor: "rgb(150, 220, 188)"
    };
    var piece = {
        r : 24
    };

    var game = new Game( checkerBoard, piece );
    game.init();

    $("#start").click(function() {
        game.init();
        game.start();
        $("#start").unbind();
    });
});
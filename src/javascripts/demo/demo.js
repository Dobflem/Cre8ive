(function($) {
    
    var options = {
        "img-src" : "http://placehold.it/80x80",
        "caption" : "Squared",
        "tooltip" : "Created by Russell Hickey",
        "author"  : "Russell Hickey",
        "description" : "Shows Square on screen"
    };
    
    function drawSquare(plugin, paper) {
        var x = paper.rect(10, 10, 10, 10);
        x.animate({
            transform: "T50,50"
        }, 2000, function() {
            plugin.repeat();
        });
    };
    
    function drawBigSquare(plugin, paper) {
        var x = paper.rect(10, 10, 10, 10);
        x.animate({
            transform: "T50,50",
            width: 50,
            height: 50
        }, 2000, function() {
            plugin.repeat();
        });
    }
    
    $.Plugin(function(plugin) {
        plugin.options(options);
        plugin.draw(drawSquare);
    });
    
    $.Plugin(function(plugin) {
        plugin.options(options);
        plugin.draw(drawBigSquare);
    });
    
})(CRE8);

analytics.initialize({
    'Google Analytics' : 'UA-37434474-1'
});

var stars = function(){
    $(".multiuniverse").stars({
        count:100,
        speed:150000
    },{
        count:25,
        speed:100000
    });
};

$(document).ready(function(){
    stars();
});

$(window).on("debouncedresize", function( event ) {
    $(".multiuniverse").html("");
    stars();
});
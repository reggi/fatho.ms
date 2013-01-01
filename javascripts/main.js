var stars = function(){
    $(".multiuniverse").stars({
        count:100,
        speed:100000
    },{
        count:25,
        speed:150000
    });
};

$(document).ready(function(){
    stars();
});

$(window).on("debouncedresize", function( event ) {
    $(".multiuniverse").html("");
    stars();
});
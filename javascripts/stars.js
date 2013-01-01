(function( $ ){
  $.fn.stars = function(options) {

    var plugin = {};

    plugin.css = function(args){
        var css = "";
        css += ".multiuniverse{width:100%;height:100%;position:absolute;overflow:hidden;}\n";
        css += ".universe{width:100%;height:100%;position:absolute;overflow:hidden;}\n";
        css += ".transport{width:200%;height:100%;position:absolute;overflow:hidden;}\n";
        css += ".galaxy{width:50%;height:100%;position:relative;float:left;overflow:hidden;}\n";
        css += ".star{position:absolute;color:#FFBF00;overflow:hidden;}\n";
        css += ".star.fandango{color:#B53389;}\n";
        css += ".star.blue{color:#0040FF;}\n";
        css += ".star.white{color:#ffffff;}\n";
        css += "#scoreboard{position:absolute;top:10px;left:10px;font-size:10px}\n";
        for(key in args){
            var options = args[key];
            options.id = 'abcdefghijklmnopqrstuvwxyz'.charAt(key);
            if(typeof(options.color) !== "undefined"){
                css += ".universe."+options.id+" .star{color:"+options.color+"}\n";
            }
            if(typeof(options.css) !== "undefined"){
                for(key in options.css){
                    var line = options.css[key];
                    css += line;
                }
            }
        }
        var html = '<style>'+css+'</style>';
        $("head").append(html);
    };

    plugin.random_id = function(){
        var length = 10;
        var chars = 'abcdefghijklmnopqrstuvwxyz';
        var result = '';
        for (var i = length; i > 0; --i) result += chars[Math.round(Math.random() * (chars.length - 1))];
        return result;
    };

    plugin.random_loc = function(number){
        return Math.floor((Math.random()*number)+1);
    };

    plugin.transport = function(universe,callback){
        element = universe.children(".transport");
        if(element.length === 0){
            var id = plugin.random_id();
            var html = '<div class="transport" id="'+id+'"></div>';
            universe.append(html);
            element = universe.children("#"+id);
        }
        return callback(element);
    };

    plugin.galaxy = function(transport,callback){
        var id = plugin.random_id();
        var html = '<div class="galaxy" id="'+id+'"></div>';
        transport.append(html);
        return callback(id);
    };

    plugin.star = function(galaxy,placement){
        var special = "";
        if(typeof(placement) === "undefined"){
            var height = $("#"+galaxy).height();
            var width = $("#"+galaxy).width();
            var rand_height = plugin.random_loc(height);
            var rand_width = plugin.random_loc(width);
        }else{
            var rand_height = placement.height;
            var rand_width = placement.width;
            special += " "+placement.paint;
        }
        var id = plugin.random_id();
        var css = "top:"+rand_height+"px;"+"left:"+rand_width+"px;";
        var html = '<span class="star'+special+'" id="'+id+'" style="'+css+'">.</span>';
        $("#"+galaxy).append(html);
    };

    plugin.stars = function(galaxy){
        for (var i=0; i<options.count; i++){
            plugin.star(galaxy);
        };
    };

    plugin.universe = function(multiverse,callback){
        var id = plugin.random_id();
        var html = '<div class="universe '+options.id+'" id="'+id+'"></div>';
        multiverse.append(html);
        var elm = $("#"+id);
        return callback(elm);
    };

    plugin.animate = function run(element){
        var width = element.width() / 2;
        element.animate({
            left:'-'+width+"px"
        },{duration:options.speed, complete:function(){
            element.css({"left":"0px"});
            element.children('.galaxy:first-child').remove();
            plugin.galaxy(element,function(id){
                plugin.stars(id);
            });
            run(element);
        }});
    };

    plugin.bang = function(universe){
        plugin.transport(universe,function(element){
            plugin.galaxy(element,function(id){
                plugin.stars(id);
            });
            plugin.galaxy(element,function(id){
                plugin.stars(id);
            });
            (function(options){
                $(window).ready(function(options){
                    setTimeout(function(options){
                        plugin.animate(element);    
                    }(options),1000);
                }(options));
            })(options)
        });
    };

    plugin.elm_at = function(x,y){
        var $elements = $("body *").map(function() {
            var $this = $(this);
            var offset = $this.offset();
            var l = offset.left;
            var t = offset.top;
            var h = $this.height();
            var w = $this.width();
            var maxx = l + w;
            var maxy = t + h;
            return (y <= maxy && y >= t) && (x <= maxx && x >= l) ? $this : null;
        });
        return $elements;
    }

    plugin.interact = function(universe){

        var track = {
            count:{
                "white":0,
                "blue":0,
                "yellow":0,
                "fandango":0
            },
            line:{
                "white":"White Dwarfs:",
                "blue":"Blue Giants:",
                "yellow":"Yellow Supergiant:",
                "fandango":"Hypergiant:"
            },
            scoreboard:false,
            paint:"white"
        }

        $(".logo .blue").click(function(){track.paint = "blue";});
        $(".logo .yellow").click(function(){track.paint = "yellow";});
        $(".logo .fandango").click(function(){track.paint = "fandango";});

        var color_handler = function(color){
            if(track.paint == color) track.count[color]++;
            if(track.count[color] === 1){
                var html = '<div class="'+color+' line"><p>'+track.line[color]+' <span>1</span></p></div>'
                $("#scoreboard").append(html);
            }else if(track.count[color] > 1){
                $("#scoreboard ."+color+" span").text(track.count[color]);
            }
        }

        universe.click(function(e){

            if(!track.scoreboard){
                var html = '<div id="scoreboard"></div>';
                universe.append(html);
                track.scoreboard = true;
            }

            color_handler("white");
            color_handler("blue");
            color_handler("yellow");
            color_handler("fandango");

            var x = e.pageX - this.offsetLeft;
            var y = e.pageY - this.offsetLeft;
            var tc = 0;
            var gc = 0;
            var l = 0;
            plugin.elm_at(x,y).each(function() {
                var c = $(this).attr("class");
                var i = $(this).attr("id");
                if(c == "transport" && tc === 0){
                    tc++
                    l = Math.abs(parseFloat($(this).css("left")));
                }
                if(c == "galaxy" && gc === 0){
                    gc++
                    var index = $(this).index();
                    if(index == 0){
                        plugin.star(i,{
                            height:y-15,
                            width:x+l,
                            paint:track.paint
                        });
                    }else{
                        plugin.star(i,{
                            height:y-15,
                            width:x+l - $(window).width(),
                            paint:track.paint
                        });
                    }
                }
            });
        });
    };

    if(typeof(options.css) == "undefined" || options.css){
        plugin.css(arguments);
    }

    if(arguments.length == 1){
        plugin.bang(this);
        plugin.interact(this);
    }else{
        plugin.interact(this);
        for(key in arguments){
            var options = arguments[key];
            options.id = 'abcdefghijklmnopqrstuvwxyz'.charAt(key);
            plugin.universe(this,function(universe){
                plugin.bang(universe);
            });
        }
    }

  };
})( jQuery );

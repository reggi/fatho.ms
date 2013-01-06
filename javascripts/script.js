!function(b){b(function(){var g=b.support,a;a:{a=document.createElement("bootstrap");var d={WebkitTransition:"webkitTransitionEnd",MozTransition:"transitionend",OTransition:"oTransitionEnd otransitionend",transition:"transitionend"},c;for(c in d)if(void 0!==a.style[c]){a=d[c];break a}a=void 0}g.transition=a&&{end:a}})}(window.jQuery);
!function(b){var g=function(a){b(a).on("click",'[data-dismiss="alert"]',this.close)};g.prototype.close=function(a){function d(){f.trigger("closed").remove()}var c=b(this),e=c.attr("data-target"),f;e||(e=(e=c.attr("href"))&&e.replace(/.*(?=#[^\s]*$)/,""));f=b(e);a&&a.preventDefault();f.length||(f=c.hasClass("alert")?c:c.parent());f.trigger(a=b.Event("close"));a.isDefaultPrevented()||(f.removeClass("in"),b.support.transition&&f.hasClass("fade")?f.on(b.support.transition.end,d):d())};b.fn.alert=function(a){return this.each(function(){var d=
b(this),c=d.data("alert");c||d.data("alert",c=new g(this));"string"==typeof a&&c[a].call(d)})};b.fn.alert.Constructor=g;b(document).on("click.alert.data-api",'[data-dismiss="alert"]',g.prototype.close)}(window.jQuery);
!function(b){var g=function(a,d){this.$element=b(a);this.options=b.extend({},b.fn.button.defaults,d)};g.prototype.setState=function(a){var b=this.$element,c=b.data(),e=b.is("input")?"val":"html";a+="Text";c.resetText||b.data("resetText",b[e]());b[e](c[a]||this.options[a]);setTimeout(function(){"loadingText"==a?b.addClass("disabled").attr("disabled","disabled"):b.removeClass("disabled").removeAttr("disabled")},0)};g.prototype.toggle=function(){var a=this.$element.closest('[data-toggle="buttons-radio"]');
a&&a.find(".active").removeClass("active");this.$element.toggleClass("active")};b.fn.button=function(a){return this.each(function(){var d=b(this),c=d.data("button"),e="object"==typeof a&&a;c||d.data("button",c=new g(this,e));"toggle"==a?c.toggle():a&&c.setState(a)})};b.fn.button.defaults={loadingText:"loading..."};b.fn.button.Constructor=g;b(document).on("click.button.data-api","[data-toggle^=button]",function(a){a=b(a.target);a.hasClass("btn")||(a=a.closest(".btn"));a.button("toggle")})}(window.jQuery);
!function(b){var g=function(a,d){this.$element=b(a);this.options=d;this.options.slide&&this.slide(this.options.slide);"hover"==this.options.pause&&this.$element.on("mouseenter",b.proxy(this.pause,this)).on("mouseleave",b.proxy(this.cycle,this))};g.prototype={cycle:function(a){a||(this.paused=!1);this.options.interval&&!this.paused&&(this.interval=setInterval(b.proxy(this.next,this),this.options.interval));return this},to:function(a){var d=this.$element.find(".item.active"),c=d.parent().children(),
d=c.index(d),e=this;if(!(a>c.length-1||0>a))return this.sliding?this.$element.one("slid",function(){e.to(a)}):d==a?this.pause().cycle():this.slide(a>d?"next":"prev",b(c[a]))},pause:function(a){a||(this.paused=!0);this.$element.find(".next, .prev").length&&b.support.transition.end&&(this.$element.trigger(b.support.transition.end),this.cycle());clearInterval(this.interval);this.interval=null;return this},next:function(){if(!this.sliding)return this.slide("next")},prev:function(){if(!this.sliding)return this.slide("prev")},
slide:function(a,d){var c=this.$element.find(".item.active"),e=d||c[a](),f=this.interval,h="next"==a?"left":"right",g="next"==a?"first":"last",j=this;this.sliding=!0;f&&this.pause();e=e.length?e:this.$element.find(".item")[g]();g=b.Event("slide",{relatedTarget:e[0]});if(!e.hasClass("active")){if(b.support.transition&&this.$element.hasClass("slide")){this.$element.trigger(g);if(g.isDefaultPrevented())return;e.addClass(a);e[0].offsetWidth;c.addClass(h);e.addClass(h);this.$element.one(b.support.transition.end,
function(){e.removeClass([a,h].join(" ")).addClass("active");c.removeClass(["active",h].join(" "));j.sliding=!1;setTimeout(function(){j.$element.trigger("slid")},0)})}else{this.$element.trigger(g);if(g.isDefaultPrevented())return;c.removeClass("active");e.addClass("active");this.sliding=!1;this.$element.trigger("slid")}f&&this.cycle();return this}}};b.fn.carousel=function(a){return this.each(function(){var d=b(this),c=d.data("carousel"),e=b.extend({},b.fn.carousel.defaults,"object"==typeof a&&a),
f="string"==typeof a?a:e.slide;c||d.data("carousel",c=new g(this,e));if("number"==typeof a)c.to(a);else if(f)c[f]();else e.interval&&c.cycle()})};b.fn.carousel.defaults={interval:5E3,pause:"hover"};b.fn.carousel.Constructor=g;b(document).on("click.carousel.data-api","[data-slide]",function(a){var d=b(this),c,e=b(d.attr("data-target")||(c=d.attr("href"))&&c.replace(/.*(?=#[^\s]+$)/,"")),d=b.extend({},e.data(),d.data());e.carousel(d);a.preventDefault()})}(window.jQuery);
!function(b){var g=function(a,d){this.$element=b(a);this.options=b.extend({},b.fn.collapse.defaults,d);this.options.parent&&(this.$parent=b(this.options.parent));this.options.toggle&&this.toggle()};g.prototype={constructor:g,dimension:function(){return this.$element.hasClass("width")?"width":"height"},show:function(){var a,d,c,e;if(!this.transitioning){a=this.dimension();d=b.camelCase(["scroll",a].join("-"));if((c=this.$parent&&this.$parent.find("> .accordion-group > .in"))&&c.length){if((e=c.data("collapse"))&&
e.transitioning)return;c.collapse("hide");e||c.data("collapse",null)}this.$element[a](0);this.transition("addClass",b.Event("show"),"shown");b.support.transition&&this.$element[a](this.$element[0][d])}},hide:function(){var a;this.transitioning||(a=this.dimension(),this.reset(this.$element[a]()),this.transition("removeClass",b.Event("hide"),"hidden"),this.$element[a](0))},reset:function(a){var b=this.dimension();this.$element.removeClass("collapse")[b](a||"auto")[0].offsetWidth;this.$element[null!==
a?"addClass":"removeClass"]("collapse");return this},transition:function(a,d,c){var e=this,f=function(){"show"==d.type&&e.reset();e.transitioning=0;e.$element.trigger(c)};this.$element.trigger(d);d.isDefaultPrevented()||(this.transitioning=1,this.$element[a]("in"),b.support.transition&&this.$element.hasClass("collapse")?this.$element.one(b.support.transition.end,f):f())},toggle:function(){this[this.$element.hasClass("in")?"hide":"show"]()}};b.fn.collapse=function(a){return this.each(function(){var d=
b(this),c=d.data("collapse"),e="object"==typeof a&&a;c||d.data("collapse",c=new g(this,e));if("string"==typeof a)c[a]()})};b.fn.collapse.defaults={toggle:!0};b.fn.collapse.Constructor=g;b(document).on("click.collapse.data-api","[data-toggle=collapse]",function(a){var d=b(this),c;a=d.attr("data-target")||a.preventDefault()||(c=d.attr("href"))&&c.replace(/.*(?=#[^\s]+$)/,"");c=b(a).data("collapse")?"toggle":d.data();d[b(a).hasClass("in")?"addClass":"removeClass"]("collapsed");b(a).collapse(c)})}(window.jQuery);
!function(b){function g(){b(d).each(function(){a(b(this)).removeClass("open")})}function a(a){var c=a.attr("data-target");c||(c=(c=a.attr("href"))&&/#/.test(c)&&c.replace(/.*(?=#[^\s]*$)/,""));c=b(c);c.length||(c=a.parent());return c}var d="[data-toggle=dropdown]",c=function(a){var c=b(a).on("click.dropdown.data-api",this.toggle);b("html").on("click.dropdown.data-api",function(){c.parent().removeClass("open")})};c.prototype={constructor:c,toggle:function(){var c=b(this),d,h;if(!c.is(".disabled, :disabled"))return d=
a(c),h=d.hasClass("open"),g(),h||(d.toggleClass("open"),c.focus()),!1},keydown:function(c){var d,h,g;if(/(38|40|27)/.test(c.keyCode)&&(d=b(this),c.preventDefault(),c.stopPropagation(),!d.is(".disabled, :disabled"))){h=a(d);g=h.hasClass("open");if(!g||g&&27==c.keyCode)return d.click();d=b("[role=menu] li:not(.divider) a",h);d.length&&(h=d.index(d.filter(":focus")),38==c.keyCode&&0<h&&h--,40==c.keyCode&&h<d.length-1&&h++,~h||(h=0),d.eq(h).focus())}}};b.fn.dropdown=function(a){return this.each(function(){var d=
b(this),h=d.data("dropdown");h||d.data("dropdown",h=new c(this));"string"==typeof a&&h[a].call(d)})};b.fn.dropdown.Constructor=c;b(document).on("click.dropdown.data-api touchstart.dropdown.data-api",g).on("click.dropdown touchstart.dropdown.data-api",".dropdown form",function(a){a.stopPropagation()}).on("click.dropdown.data-api touchstart.dropdown.data-api",d,c.prototype.toggle).on("keydown.dropdown.data-api touchstart.dropdown.data-api",d+", [role=menu]",c.prototype.keydown)}(window.jQuery);
!function(b){var g=function(a,d){this.options=d;this.$element=b(a).delegate('[data-dismiss="modal"]',"click.dismiss.modal",b.proxy(this.hide,this));this.options.remote&&this.$element.find(".modal-body").load(this.options.remote)};g.prototype={constructor:g,toggle:function(){return this[!this.isShown?"show":"hide"]()},show:function(){var a=this,d=b.Event("show");this.$element.trigger(d);!this.isShown&&!d.isDefaultPrevented()&&(this.isShown=!0,this.escape(),this.backdrop(function(){var c=b.support.transition&&
a.$element.hasClass("fade");a.$element.parent().length||a.$element.appendTo(document.body);a.$element.show();c&&a.$element[0].offsetWidth;a.$element.addClass("in").attr("aria-hidden",!1);a.enforceFocus();c?a.$element.one(b.support.transition.end,function(){a.$element.focus().trigger("shown")}):a.$element.focus().trigger("shown")}))},hide:function(a){a&&a.preventDefault();a=b.Event("hide");this.$element.trigger(a);this.isShown&&!a.isDefaultPrevented()&&(this.isShown=!1,this.escape(),b(document).off("focusin.modal"),
this.$element.removeClass("in").attr("aria-hidden",!0),b.support.transition&&this.$element.hasClass("fade")?this.hideWithTransition():this.hideModal())},enforceFocus:function(){var a=this;b(document).on("focusin.modal",function(b){a.$element[0]!==b.target&&!a.$element.has(b.target).length&&a.$element.focus()})},escape:function(){var a=this;if(this.isShown&&this.options.keyboard)this.$element.on("keyup.dismiss.modal",function(b){27==b.which&&a.hide()});else this.isShown||this.$element.off("keyup.dismiss.modal")},
hideWithTransition:function(){var a=this,d=setTimeout(function(){a.$element.off(b.support.transition.end);a.hideModal()},500);this.$element.one(b.support.transition.end,function(){clearTimeout(d);a.hideModal()})},hideModal:function(){this.$element.hide().trigger("hidden");this.backdrop()},removeBackdrop:function(){this.$backdrop.remove();this.$backdrop=null},backdrop:function(a){var d=this.$element.hasClass("fade")?"fade":"";if(this.isShown&&this.options.backdrop){var c=b.support.transition&&d;this.$backdrop=
b('<div class="modal-backdrop '+d+'" />').appendTo(document.body);this.$backdrop.click("static"==this.options.backdrop?b.proxy(this.$element[0].focus,this.$element[0]):b.proxy(this.hide,this));c&&this.$backdrop[0].offsetWidth;this.$backdrop.addClass("in");c?this.$backdrop.one(b.support.transition.end,a):a()}else!this.isShown&&this.$backdrop?(this.$backdrop.removeClass("in"),b.support.transition&&this.$element.hasClass("fade")?this.$backdrop.one(b.support.transition.end,b.proxy(this.removeBackdrop,
this)):this.removeBackdrop()):a&&a()}};b.fn.modal=function(a){return this.each(function(){var d=b(this),c=d.data("modal"),e=b.extend({},b.fn.modal.defaults,d.data(),"object"==typeof a&&a);c||d.data("modal",c=new g(this,e));if("string"==typeof a)c[a]();else e.show&&c.show()})};b.fn.modal.defaults={backdrop:!0,keyboard:!0,show:!0};b.fn.modal.Constructor=g;b(document).on("click.modal.data-api",'[data-toggle="modal"]',function(a){var d=b(this),c=d.attr("href"),e=b(d.attr("data-target")||c&&c.replace(/.*(?=#[^\s]+$)/,
"")),c=e.data("modal")?"toggle":b.extend({remote:!/#/.test(c)&&c},e.data(),d.data());a.preventDefault();e.modal(c).one("hide",function(){d.focus()})})}(window.jQuery);
!function(b){var g=function(a,b){this.init("tooltip",a,b)};g.prototype={constructor:g,init:function(a,d,c){this.type=a;this.$element=b(d);this.options=this.getOptions(c);this.enabled=!0;if("click"==this.options.trigger)this.$element.on("click."+this.type,this.options.selector,b.proxy(this.toggle,this));else"manual"!=this.options.trigger&&(a="hover"==this.options.trigger?"mouseenter":"focus",d="hover"==this.options.trigger?"mouseleave":"blur",this.$element.on(a+"."+this.type,this.options.selector,
b.proxy(this.enter,this)),this.$element.on(d+"."+this.type,this.options.selector,b.proxy(this.leave,this)));this.options.selector?this._options=b.extend({},this.options,{trigger:"manual",selector:""}):this.fixTitle()},getOptions:function(a){a=b.extend({},b.fn[this.type].defaults,a,this.$element.data());a.delay&&"number"==typeof a.delay&&(a.delay={show:a.delay,hide:a.delay});return a},enter:function(a){var d=b(a.currentTarget)[this.type](this._options).data(this.type);if(!d.options.delay||!d.options.delay.show)return d.show();
clearTimeout(this.timeout);d.hoverState="in";this.timeout=setTimeout(function(){"in"==d.hoverState&&d.show()},d.options.delay.show)},leave:function(a){var d=b(a.currentTarget)[this.type](this._options).data(this.type);this.timeout&&clearTimeout(this.timeout);if(!d.options.delay||!d.options.delay.hide)return d.hide();d.hoverState="out";this.timeout=setTimeout(function(){"out"==d.hoverState&&d.hide()},d.options.delay.hide)},show:function(){var a,b,c,e,f,h,g;if(this.hasContent()&&this.enabled){a=this.tip();
this.setContent();this.options.animation&&a.addClass("fade");h="function"==typeof this.options.placement?this.options.placement.call(this,a[0],this.$element[0]):this.options.placement;b=/in/.test(h);a.detach().css({top:0,left:0,display:"block"}).insertAfter(this.$element);c=this.getPosition(b);e=a[0].offsetWidth;f=a[0].offsetHeight;switch(b?h.split(" ")[1]:h){case "bottom":g={top:c.top+c.height,left:c.left+c.width/2-e/2};break;case "top":g={top:c.top-f,left:c.left+c.width/2-e/2};break;case "left":g=
{top:c.top+c.height/2-f/2,left:c.left-e};break;case "right":g={top:c.top+c.height/2-f/2,left:c.left+c.width}}a.offset(g).addClass(h).addClass("in")}},setContent:function(){var a=this.tip(),b=this.getTitle();a.find(".tooltip-inner")[this.options.html?"html":"text"](b);a.removeClass("fade in top bottom left right")},hide:function(){var a=this.tip();a.removeClass("in");if(b.support.transition&&this.$tip.hasClass("fade")){var d=setTimeout(function(){a.off(b.support.transition.end).detach()},500);a.one(b.support.transition.end,
function(){clearTimeout(d);a.detach()})}else a.detach();return this},fixTitle:function(){var a=this.$element;if(a.attr("title")||"string"!=typeof a.attr("data-original-title"))a.attr("data-original-title",a.attr("title")||"").removeAttr("title")},hasContent:function(){return this.getTitle()},getPosition:function(a){return b.extend({},a?{top:0,left:0}:this.$element.offset(),{width:this.$element[0].offsetWidth,height:this.$element[0].offsetHeight})},getTitle:function(){var a=this.$element,b=this.options;
return a.attr("data-original-title")||("function"==typeof b.title?b.title.call(a[0]):b.title)},tip:function(){return this.$tip=this.$tip||b(this.options.template)},validate:function(){this.$element[0].parentNode||(this.hide(),this.options=this.$element=null)},enable:function(){this.enabled=!0},disable:function(){this.enabled=!1},toggleEnabled:function(){this.enabled=!this.enabled},toggle:function(a){a=b(a.currentTarget)[this.type](this._options).data(this.type);a[a.tip().hasClass("in")?"hide":"show"]()},
destroy:function(){this.hide().$element.off("."+this.type).removeData(this.type)}};b.fn.tooltip=function(a){return this.each(function(){var d=b(this),c=d.data("tooltip"),e="object"==typeof a&&a;c||d.data("tooltip",c=new g(this,e));if("string"==typeof a)c[a]()})};b.fn.tooltip.Constructor=g;b.fn.tooltip.defaults={animation:!0,placement:"top",selector:!1,template:'<div class="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>',trigger:"hover",title:"",delay:0,html:!1}}(window.jQuery);
!function(b){var g=function(a,b){this.init("popover",a,b)};g.prototype=b.extend({},b.fn.tooltip.Constructor.prototype,{constructor:g,setContent:function(){var a=this.tip(),b=this.getTitle(),c=this.getContent();a.find(".popover-title")[this.options.html?"html":"text"](b);a.find(".popover-content > *")[this.options.html?"html":"text"](c);a.removeClass("fade top bottom left right in")},hasContent:function(){return this.getTitle()||this.getContent()},getContent:function(){var a=this.$element,b=this.options;
return a.attr("data-content")||("function"==typeof b.content?b.content.call(a[0]):b.content)},tip:function(){this.$tip||(this.$tip=b(this.options.template));return this.$tip},destroy:function(){this.hide().$element.off("."+this.type).removeData(this.type)}});b.fn.popover=function(a){return this.each(function(){var d=b(this),c=d.data("popover"),e="object"==typeof a&&a;c||d.data("popover",c=new g(this,e));if("string"==typeof a)c[a]()})};b.fn.popover.Constructor=g;b.fn.popover.defaults=b.extend({},b.fn.tooltip.defaults,
{placement:"right",trigger:"click",content:"",template:'<div class="popover"><div class="arrow"></div><div class="popover-inner"><h3 class="popover-title"></h3><div class="popover-content"><p></p></div></div></div>'})}(window.jQuery);
!function(b){function g(a,d){var c=b.proxy(this.process,this),e=b(a).is("body")?b(window):b(a),f;this.options=b.extend({},b.fn.scrollspy.defaults,d);this.$scrollElement=e.on("scroll.scroll-spy.data-api",c);this.selector=(this.options.target||(f=b(a).attr("href"))&&f.replace(/.*(?=#[^\s]+$)/,"")||"")+" .nav li > a";this.$body=b("body");this.refresh();this.process()}g.prototype={constructor:g,refresh:function(){var a=this;this.offsets=b([]);this.targets=b([]);this.$body.find(this.selector).map(function(){var a=
b(this),a=a.data("target")||a.attr("href"),c=/^#\w/.test(a)&&b(a);return c&&c.length&&[[c.position().top,a]]||null}).sort(function(a,c){return a[0]-c[0]}).each(function(){a.offsets.push(this[0]);a.targets.push(this[1])})},process:function(){var a=this.$scrollElement.scrollTop()+this.options.offset,b=(this.$scrollElement[0].scrollHeight||this.$body[0].scrollHeight)-this.$scrollElement.height(),c=this.offsets,e=this.targets,f=this.activeTarget,h;if(a>=b)return f!=(h=e.last()[0])&&this.activate(h);for(h=
c.length;h--;)f!=e[h]&&a>=c[h]&&(!c[h+1]||a<=c[h+1])&&this.activate(e[h])},activate:function(a){this.activeTarget=a;b(this.selector).parent(".active").removeClass("active");a=b(this.selector+'[data-target="'+a+'"],'+this.selector+'[href="'+a+'"]').parent("li").addClass("active");a.parent(".dropdown-menu").length&&(a=a.closest("li.dropdown").addClass("active"));a.trigger("activate")}};b.fn.scrollspy=function(a){return this.each(function(){var d=b(this),c=d.data("scrollspy"),e="object"==typeof a&&a;
c||d.data("scrollspy",c=new g(this,e));if("string"==typeof a)c[a]()})};b.fn.scrollspy.Constructor=g;b.fn.scrollspy.defaults={offset:10};b(window).on("load",function(){b('[data-spy="scroll"]').each(function(){var a=b(this);a.scrollspy(a.data())})})}(window.jQuery);
!function(b){var g=function(a){this.element=b(a)};g.prototype={constructor:g,show:function(){var a=this.element,d=a.closest("ul:not(.dropdown-menu)"),c=a.attr("data-target"),e,f;c||(c=(c=a.attr("href"))&&c.replace(/.*(?=#[^\s]*$)/,""));a.parent("li").hasClass("active")||(e=d.find(".active:last a")[0],f=b.Event("show",{relatedTarget:e}),a.trigger(f),f.isDefaultPrevented()||(c=b(c),this.activate(a.parent("li"),d),this.activate(c,c.parent(),function(){a.trigger({type:"shown",relatedTarget:e})})))},activate:function(a,
d,c){function e(){f.removeClass("active").find("> .dropdown-menu > .active").removeClass("active");a.addClass("active");h?(a[0].offsetWidth,a.addClass("in")):a.removeClass("fade");a.parent(".dropdown-menu")&&a.closest("li.dropdown").addClass("active");c&&c()}var f=d.find("> .active"),h=c&&b.support.transition&&f.hasClass("fade");h?f.one(b.support.transition.end,e):e();f.removeClass("in")}};b.fn.tab=function(a){return this.each(function(){var d=b(this),c=d.data("tab");c||d.data("tab",c=new g(this));
if("string"==typeof a)c[a]()})};b.fn.tab.Constructor=g;b(document).on("click.tab.data-api",'[data-toggle="tab"], [data-toggle="pill"]',function(a){a.preventDefault();b(this).tab("show")})}(window.jQuery);
!function(b){var g=function(a,d){this.$element=b(a);this.options=b.extend({},b.fn.typeahead.defaults,d);this.matcher=this.options.matcher||this.matcher;this.sorter=this.options.sorter||this.sorter;this.highlighter=this.options.highlighter||this.highlighter;this.updater=this.options.updater||this.updater;this.$menu=b(this.options.menu).appendTo("body");this.source=this.options.source;this.shown=!1;this.listen()};g.prototype={constructor:g,select:function(){var a=this.$menu.find(".active").attr("data-value");
this.$element.val(this.updater(a)).change();return this.hide()},updater:function(a){return a},show:function(){var a=b.extend({},this.$element.offset(),{height:this.$element[0].offsetHeight});this.$menu.css({top:a.top+a.height,left:a.left});this.$menu.show();this.shown=!0;return this},hide:function(){this.$menu.hide();this.shown=!1;return this},lookup:function(){var a;this.query=this.$element.val();return!this.query||this.query.length<this.options.minLength?this.shown?this.hide():this:(a=b.isFunction(this.source)?
this.source(this.query,b.proxy(this.process,this)):this.source)?this.process(a):this},process:function(a){var d=this;a=b.grep(a,function(a){return d.matcher(a)});a=this.sorter(a);return!a.length?this.shown?this.hide():this:this.render(a.slice(0,this.options.items)).show()},matcher:function(a){return~a.toLowerCase().indexOf(this.query.toLowerCase())},sorter:function(a){for(var b=[],c=[],e=[],f;f=a.shift();)f.toLowerCase().indexOf(this.query.toLowerCase())?~f.indexOf(this.query)?c.push(f):e.push(f):
b.push(f);return b.concat(c,e)},highlighter:function(a){var b=this.query.replace(/[\-\[\]{}()*+?.,\\\^$|#\s]/g,"\\$&");return a.replace(RegExp("("+b+")","ig"),function(a,b){return"<strong>"+b+"</strong>"})},render:function(a){var d=this;a=b(a).map(function(a,e){a=b(d.options.item).attr("data-value",e);a.find("a").html(d.highlighter(e));return a[0]});a.first().addClass("active");this.$menu.html(a);return this},next:function(){var a=this.$menu.find(".active").removeClass("active").next();a.length||
(a=b(this.$menu.find("li")[0]));a.addClass("active")},prev:function(){var a=this.$menu.find(".active").removeClass("active").prev();a.length||(a=this.$menu.find("li").last());a.addClass("active")},listen:function(){this.$element.on("blur",b.proxy(this.blur,this)).on("keypress",b.proxy(this.keypress,this)).on("keyup",b.proxy(this.keyup,this));if(this.eventSupported("keydown"))this.$element.on("keydown",b.proxy(this.keydown,this));this.$menu.on("click",b.proxy(this.click,this)).on("mouseenter","li",
b.proxy(this.mouseenter,this))},eventSupported:function(a){var b=a in this.$element;b||(this.$element.setAttribute(a,"return;"),b="function"===typeof this.$element[a]);return b},move:function(a){if(this.shown){switch(a.keyCode){case 9:case 13:case 27:a.preventDefault();break;case 38:a.preventDefault();this.prev();break;case 40:a.preventDefault(),this.next()}a.stopPropagation()}},keydown:function(a){this.suppressKeyPressRepeat=!~b.inArray(a.keyCode,[40,38,9,13,27]);this.move(a)},keypress:function(a){this.suppressKeyPressRepeat||
this.move(a)},keyup:function(a){switch(a.keyCode){case 40:case 38:case 16:case 17:case 18:break;case 9:case 13:if(!this.shown)return;this.select();break;case 27:if(!this.shown)return;this.hide();break;default:this.lookup()}a.stopPropagation();a.preventDefault()},blur:function(){var a=this;setTimeout(function(){a.hide()},150)},click:function(a){a.stopPropagation();a.preventDefault();this.select()},mouseenter:function(a){this.$menu.find(".active").removeClass("active");b(a.currentTarget).addClass("active")}};
b.fn.typeahead=function(a){return this.each(function(){var d=b(this),c=d.data("typeahead"),e="object"==typeof a&&a;c||d.data("typeahead",c=new g(this,e));if("string"==typeof a)c[a]()})};b.fn.typeahead.defaults={source:[],items:8,menu:'<ul class="typeahead dropdown-menu"></ul>',item:'<li><a href="#"></a></li>',minLength:1};b.fn.typeahead.Constructor=g;b(document).on("focus.typeahead.data-api",'[data-provide="typeahead"]',function(a){var d=b(this);d.data("typeahead")||(a.preventDefault(),d.typeahead(d.data()))})}(window.jQuery);
!function(b){var g=function(a,d){this.options=b.extend({},b.fn.affix.defaults,d);this.$window=b(window).on("scroll.affix.data-api",b.proxy(this.checkPosition,this)).on("click.affix.data-api",b.proxy(function(){setTimeout(b.proxy(this.checkPosition,this),1)},this));this.$element=b(a);this.checkPosition()};g.prototype.checkPosition=function(){if(this.$element.is(":visible")){var a=b(document).height(),d=this.$window.scrollTop(),c=this.$element.offset(),e=this.options.offset,f=e.bottom,h=e.top;"object"!=
typeof e&&(f=h=e);"function"==typeof h&&(h=e.top());"function"==typeof f&&(f=e.bottom());a=null!=this.unpin&&d+this.unpin<=c.top?!1:null!=f&&c.top+this.$element.height()>=a-f?"bottom":null!=h&&d<=h?"top":!1;this.affixed!==a&&(this.affixed=a,this.unpin="bottom"==a?c.top-d:null,this.$element.removeClass("affix affix-top affix-bottom").addClass("affix"+(a?"-"+a:"")))}};b.fn.affix=function(a){return this.each(function(){var d=b(this),c=d.data("affix"),e="object"==typeof a&&a;c||d.data("affix",c=new g(this,
e));if("string"==typeof a)c[a]()})};b.fn.affix.Constructor=g;b.fn.affix.defaults={offset:0};b(window).on("load",function(){b('[data-spy="affix"]').each(function(){var a=b(this),d=a.data();d.offset=d.offset||{};d.offsetBottom&&(d.offset.bottom=d.offsetBottom);d.offsetTop&&(d.offset.top=d.offsetTop);a.affix(d)})})}(window.jQuery);(function(b){var g=b.event,a,d;a=g.special.debouncedresize={setup:function(){b(this).on("resize",a.handler)},teardown:function(){b(this).off("resize",a.handler)},handler:function(c,b){var f=this,h=arguments,k=function(){c.type="debouncedresize";g.dispatch.apply(f,h)};d&&clearTimeout(d);b?k():d=setTimeout(k,a.threshold)},threshold:150}})(jQuery);(function(){var b={},g=!1,a=function(a){if(a){var b={},d;for(d in a)b[d]=a[d];return b}},d=function(a){if("[object String]"!==Object.prototype.toString.call(a)&&a!==Object(a))throw Error("Encountered unresolvable settings value.");if("[object String]"===Object.prototype.toString.call(a)){var b=a;a={};a.apiKey=b}return a};this.analytics={providers:[],initialize:function(a){var d=[],f;for(f in a){if(!b[f])throw Error("Couldn't find a provider named \""+f+'"');b[f].initialize(a[f]);d.push(b[f])}this.providers=
d;g=!0},identify:function(b,d){if(g)for(var f=0,h;h=this.providers[f];f++)if(h.identify){var k=a(d);h.identify(b,k)}},track:function(b,d){if(g)for(var f=0,h;h=this.providers[f];f++)if(h.track){var k=a(d);h.track(b,k)}}};b["Google Analytics"]={initialize:function(a){this.settings=d(a);var b=b||[];b.push(["_setAccount",a.apiKey]);b.push(["_trackPageview"]);a=document.createElement("script");a.type="text/javascript";a.async=!0;a.src=("https:"==document.location.protocol?"https://ssl":"http://www")+".google-analytics.com/ga.js";
var f=document.getElementsByTagName("script")[0];f.parentNode.insertBefore(a,f);window._gaq=b},track:function(a){window._gaq.push(["_trackEvent","All",a])}};b["Segment.io"]={initialize:function(a){this.settings=d(a);var b=b||[];b.load=function(a){var c=document.createElement("script");c.type="text/javascript";c.async=!0;c.src=a;a=document.getElementsByTagName("script")[0];a.parentNode.insertBefore(c,a);c=function(a){return function(){b.push([a].concat(Array.prototype.slice.call(arguments,0)))}};a=
"init initialize identify track callback logLevel verbose".split(" ");for(i=0;i<a.length;i++)b[a[i]]=c(a[i])};b.load(("https:"===document.location.protocol?"https://":"http://")+"d47xnnr8b1rki.cloudfront.net/api/js/v2/segmentio.js");b.initialize(a.apiKey,a);window.segment=b},identify:function(a,b){window.segment.identify(a,b)},track:function(a,b){window.segment.track(a,b)}};b.KISSmetrics={initialize:function(a){function b(a){setTimeout(function(){var b=document,c=b.getElementsByTagName("script")[0],
b=b.createElement("script");b.type="text/javascript";b.async=!0;b.src=a;c.parentNode.insertBefore(b,c)},1)}this.settings=d(a);var f=f||[];b("//i.kissmetrics.com/i.js");b("//doug1izaerwt3.cloudfront.net/"+a.apiKey+".1.js");window._kmq=f},identify:function(a,b){window._kmq.push(["identify",a]);window._kmq.push(["set",b])},track:function(a,b){window._kmq.push(["record",a,b])}};b.Mixpanel={initialize:function(a){this.settings=d(a);var b=window.mixpanel||[];window.mixpanel=b;var f,h,g,j;f=document.createElement("script");
f.type="text/javascript";f.async=!0;f.src=("https:"===document.location.protocol?"https:":"http:")+"//cdn.mxpnl.com/libs/mixpanel-2.1.min.js";h=document.getElementsByTagName("script")[0];h.parentNode.insertBefore(f,h);b._i=[];b.init=function(a,c,d){function f(a,b){var c=b.split(".");2==c.length&&(a=a[c[0]],b=c[1]);a[b]=function(){a.push([b].concat(Array.prototype.slice.call(arguments,0)))}}var h=b;"undefined"!=typeof d?h=b[d]=[]:d="mixpanel";h.people=h.people||[];g="disable track track_pageview track_links track_forms register register_once unregister identify name_tag set_config people.identify people.set people.increment".split(" ");
for(j=0;j<g.length;j++)f(h,g[j]);b._i.push([a,c,d])};b.__SV=1.1;window.mixpanel.init(a.apiKey,a)},identify:function(a,b){window.mixpanel.identify(a);window.mixpanel.name_tag(a);window.mixpanel.register(b);!0===this.settings.people&&(window.mixpanel.people.identify(a),window.mixpanel.people.set(b))},track:function(a,b){window.mixpanel.track(a,b)}};b.Intercom={initialize:function(a){this.settings=d(a)},identify:function(a){function b(){var a=document.createElement("script");a.type="text/javascript";
a.async=!0;a.src="https://api.intercom.io/api/js/library.js";var c=document.getElementsByTagName("script")[0];c.parentNode.insertBefore(a,c)}window.intercomSettings={app_id:this.settings.apiKey,email:a,created_at:Math.round((new Date).getTime()/1E3)};window.attachEvent?window.attachEvent("onload",b):window.addEventListener("load",b,!1)}};b.Olark={initialize:function(a){this.settings=d(a);if(!window.olark){var b={loader:"static.olark.com/jsclient/loader0.js",name:"olark",methods:["configure","extend",
"declare","identify"]},f=window,h=document,g="https:"==f.location.protocol?"https:":"http:",j=b.name,l="load",n=function(){function a(){c.P(l);f[j](l)}f[j]=function(){(c.s=c.s||[]).push(arguments)};for(var c=f[j]._={},d=b.methods.length;d--;)(function(a){f[j][a]=function(){f[j]("call",a,arguments)}})(b.methods[d]);c.l=b.loader;c.i=n;c.p={"0":+new Date};c.P=function(a){c.p[a]=new Date-c.p[0]};f.addEventListener?f.addEventListener(l,a,!1):f.attachEvent("on"+l,a);var q=function(){function a(b){return b=
"head",["<",b,"></",b,"><",d,' onload="var d=',s,";d.getElementsByTagName('head')[0].",l,"(d.",n,"('script')).",p,"='",g,"//",c.l,"'\"></",d,">"].join("")}var d="body",f=h[d];if(!f)return setTimeout(q,100);c.P(1);var l="appendChild",n="createElement",p="src",t=h[n]("div"),r=t[l](h[n](j)),m=h[n]("iframe"),s="document",u;t.style.display="none";f.insertBefore(t,f.firstChild).id=j;m.frameBorder="0";m.id=j+"-loader";/MSIE[ ]+6/.test(navigator.userAgent)&&(m.src="javascript:false");m.allowTransparency=
"true";r[l](m);try{m.contentWindow[s].open()}catch(x){b.domain=h.domain,u="javascript:var d="+s+".open();d.domain='"+h.domain+"';",m[p]=u+"void(0);"}try{var w=m.contentWindow[s];w.write(a());w.close()}catch(y){m[p]=u+'d.write("'+a().replace(/"/g,String.fromCharCode(92)+'"')+'");d.close();'}c.P(2)};q()};n()}window.olark.identify(a.apiKey)},identify:function(a){window.olark("api.chat.updateVisitorNickname",{snippet:a})},track:function(a){this.settings.track&&window.olark("api.chat.sendNotificationToOperator",
{body:'Visitor triggered "'+a+'".'})}}}).call(this);(function(b){b.fn.stars=function(g){var a={css:function(a){var c;c=".multiuniverse{width:100%;height:100%;position:absolute;overflow:hidden;}\n.universe{width:100%;height:100%;position:absolute;overflow:hidden;}\n";c+=".transport{width:200%;height:100%;position:absolute;overflow:hidden;}\n";c+=".galaxy{width:50%;height:100%;position:relative;float:left;overflow:hidden;}\n";c+=".star{position:absolute;color:#FFBF00;overflow:hidden;}\n";c+=".star.fandango{color:#B53389;}\n";c+=".star.blue{color:#0040FF;}\n";
c+=".star.white{color:#ffffff;}\n";c+="#scoreboard{position:absolute;top:10px;left:10px;font-size:10px}\n";for(key in a){var e=a[key];e.id="abcdefghijklmnopqrstuvwxyz".charAt(key);"undefined"!==typeof e.color&&(c+=".universe."+e.id+" .star{color:"+e.color+"}\n");if("undefined"!==typeof e.css)for(key in e.css)c+=e.css[key]}a="<style>"+c+"</style>";b("head").append(a)},random_id:function(){for(var a="",b=10;0<b;--b)a+="abcdefghijklmnopqrstuvwxyz"[Math.round(25*Math.random())];return a},random_loc:function(a){return Math.floor(Math.random()*
a+1)},transport:function(b,c){element=b.children(".transport");if(0===element.length){var e=a.random_id();b.append('<div class="transport" id="'+e+'"></div>');element=b.children("#"+e)}return c(element)},galaxy:function(b,c){var e=a.random_id();b.append('<div class="galaxy" id="'+e+'"></div>');return c(e)},star:function(d,c){var e="";if("undefined"===typeof c)var f=b("#"+d).height(),g=b("#"+d).width(),f=a.random_loc(f),g=a.random_loc(g);else f=c.height,g=c.width,e+=" "+c.paint;var k=a.random_id();
b("#"+d).append('<span class="star'+e+'" id="'+k+'" style="'+("top:"+f+"px;left:"+g+"px;")+'">.</span>')},stars:function(b){for(var c=0;c<g.count;c++)a.star(b)},universe:function(d,c){var e=a.random_id();d.append('<div class="universe '+g.id+'" id="'+e+'"></div>');e=b("#"+e);return c(e)},animate:function c(b){var f=b.width()/2;b.animate({left:"-"+f+"px"},{duration:g.speed,complete:function(){b.css({left:"0px"});b.children(".galaxy:first-child").remove();a.galaxy(b,function(b){a.stars(b)});c(b)}})},
bang:function(c){a.transport(c,function(c){a.galaxy(c,function(b){a.stars(b)});a.galaxy(c,function(b){a.stars(b)});var f=g;b(window).ready(function(){var b=setTimeout;a.animate(c);b(void 0,1E3)}(f))})},elm_at:function(a,e){return b("body *").map(function(){var f=b(this),g=f.offset(),k=g.left,g=g.top,j=f.height(),l=f.width();return e<=g+j&&e>=g&&a<=k+l&&a>=k?f:null})},interact:function(c){var e={white:0,blue:0,yellow:0,fandango:0},f={white:"White Dwarfs:",blue:"Blue Giants:",yellow:"Yellow Supergiant:",
fandango:"Hypergiant:"},g=!1,k="white";b(".logo .blue").click(function(){k="blue"});b(".logo .yellow").click(function(){k="yellow"});b(".logo .fandango").click(function(){k="fandango"});var j=function(a){k==a&&e[a]++;1===e[a]?(a='<div class="'+a+' line"><p>'+f[a]+" <span>1</span></p></div>",b("#scoreboard").append(a)):1<e[a]&&b("#scoreboard ."+a+" span").text(e[a])};c.click(function(e){g||(c.append('<div id="scoreboard"></div>'),g=!0);j("white");j("blue");j("yellow");j("fandango");var f=e.pageX-this.offsetLeft,
p=e.pageY-this.offsetLeft,v=0,r=0,q=0;a.elm_at(f,p).each(function(){var c=b(this).attr("class"),e=b(this).attr("id");"transport"==c&&0===v&&(v++,q=Math.abs(parseFloat(b(this).css("left"))));"galaxy"==c&&0===r&&(r++,0==b(this).index()?a.star(e,{height:p-15,width:f+q,paint:k}):a.star(e,{height:p-15,width:f+q-b(window).width(),paint:k}))})})}};("undefined"==typeof g.css||g.css)&&a.css(arguments);if(1==arguments.length)a.bang(this),a.interact(this);else for(key in a.interact(this),arguments)g=arguments[key],
g.id="abcdefghijklmnopqrstuvwxyz".charAt(key),a.universe(this,function(b){a.bang(b)})}})(jQuery);analytics.initialize({"Google Analytics":"UA-37434474-1"});var stars=function(){$(".multiuniverse").stars({count:100,speed:15E4},{count:25,speed:1E5})};$(document).ready(function(){stars()});$(window).on("debouncedresize",function(){$(".multiuniverse").html("");stars()});

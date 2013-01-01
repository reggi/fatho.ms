!function(b){b(function(){var e=b.support,a;a:{a=document.createElement("bootstrap");var d={WebkitTransition:"webkitTransitionEnd",MozTransition:"transitionend",OTransition:"oTransitionEnd otransitionend",transition:"transitionend"},c;for(c in d)if(void 0!==a.style[c]){a=d[c];break a}a=void 0}e.transition=a&&{end:a}})}(window.jQuery);
!function(b){var e=function(a){b(a).on("click",'[data-dismiss="alert"]',this.close)};e.prototype.close=function(a){function d(){h.trigger("closed").remove()}var c=b(this),f=c.attr("data-target"),h;f||(f=(f=c.attr("href"))&&f.replace(/.*(?=#[^\s]*$)/,""));h=b(f);a&&a.preventDefault();h.length||(h=c.hasClass("alert")?c:c.parent());h.trigger(a=b.Event("close"));a.isDefaultPrevented()||(h.removeClass("in"),b.support.transition&&h.hasClass("fade")?h.on(b.support.transition.end,d):d())};b.fn.alert=function(a){return this.each(function(){var d=
b(this),c=d.data("alert");c||d.data("alert",c=new e(this));"string"==typeof a&&c[a].call(d)})};b.fn.alert.Constructor=e;b(document).on("click.alert.data-api",'[data-dismiss="alert"]',e.prototype.close)}(window.jQuery);
!function(b){var e=function(a,d){this.$element=b(a);this.options=b.extend({},b.fn.button.defaults,d)};e.prototype.setState=function(a){var b=this.$element,c=b.data(),f=b.is("input")?"val":"html";a+="Text";c.resetText||b.data("resetText",b[f]());b[f](c[a]||this.options[a]);setTimeout(function(){"loadingText"==a?b.addClass("disabled").attr("disabled","disabled"):b.removeClass("disabled").removeAttr("disabled")},0)};e.prototype.toggle=function(){var a=this.$element.closest('[data-toggle="buttons-radio"]');
a&&a.find(".active").removeClass("active");this.$element.toggleClass("active")};b.fn.button=function(a){return this.each(function(){var d=b(this),c=d.data("button"),f="object"==typeof a&&a;c||d.data("button",c=new e(this,f));"toggle"==a?c.toggle():a&&c.setState(a)})};b.fn.button.defaults={loadingText:"loading..."};b.fn.button.Constructor=e;b(document).on("click.button.data-api","[data-toggle^=button]",function(a){a=b(a.target);a.hasClass("btn")||(a=a.closest(".btn"));a.button("toggle")})}(window.jQuery);
!function(b){var e=function(a,d){this.$element=b(a);this.options=d;this.options.slide&&this.slide(this.options.slide);"hover"==this.options.pause&&this.$element.on("mouseenter",b.proxy(this.pause,this)).on("mouseleave",b.proxy(this.cycle,this))};e.prototype={cycle:function(a){a||(this.paused=!1);this.options.interval&&!this.paused&&(this.interval=setInterval(b.proxy(this.next,this),this.options.interval));return this},to:function(a){var d=this.$element.find(".item.active"),c=d.parent().children(),
d=c.index(d),f=this;if(!(a>c.length-1||0>a))return this.sliding?this.$element.one("slid",function(){f.to(a)}):d==a?this.pause().cycle():this.slide(a>d?"next":"prev",b(c[a]))},pause:function(a){a||(this.paused=!0);this.$element.find(".next, .prev").length&&b.support.transition.end&&(this.$element.trigger(b.support.transition.end),this.cycle());clearInterval(this.interval);this.interval=null;return this},next:function(){if(!this.sliding)return this.slide("next")},prev:function(){if(!this.sliding)return this.slide("prev")},
slide:function(a,d){var c=this.$element.find(".item.active"),f=d||c[a](),h=this.interval,g="next"==a?"left":"right",e="next"==a?"first":"last",k=this;this.sliding=!0;h&&this.pause();f=f.length?f:this.$element.find(".item")[e]();e=b.Event("slide",{relatedTarget:f[0]});if(!f.hasClass("active")){if(b.support.transition&&this.$element.hasClass("slide")){this.$element.trigger(e);if(e.isDefaultPrevented())return;f.addClass(a);f[0].offsetWidth;c.addClass(g);f.addClass(g);this.$element.one(b.support.transition.end,
function(){f.removeClass([a,g].join(" ")).addClass("active");c.removeClass(["active",g].join(" "));k.sliding=!1;setTimeout(function(){k.$element.trigger("slid")},0)})}else{this.$element.trigger(e);if(e.isDefaultPrevented())return;c.removeClass("active");f.addClass("active");this.sliding=!1;this.$element.trigger("slid")}h&&this.cycle();return this}}};b.fn.carousel=function(a){return this.each(function(){var d=b(this),c=d.data("carousel"),f=b.extend({},b.fn.carousel.defaults,"object"==typeof a&&a),
h="string"==typeof a?a:f.slide;c||d.data("carousel",c=new e(this,f));if("number"==typeof a)c.to(a);else if(h)c[h]();else f.interval&&c.cycle()})};b.fn.carousel.defaults={interval:5E3,pause:"hover"};b.fn.carousel.Constructor=e;b(document).on("click.carousel.data-api","[data-slide]",function(a){var d=b(this),c,f=b(d.attr("data-target")||(c=d.attr("href"))&&c.replace(/.*(?=#[^\s]+$)/,"")),d=b.extend({},f.data(),d.data());f.carousel(d);a.preventDefault()})}(window.jQuery);
!function(b){var e=function(a,d){this.$element=b(a);this.options=b.extend({},b.fn.collapse.defaults,d);this.options.parent&&(this.$parent=b(this.options.parent));this.options.toggle&&this.toggle()};e.prototype={constructor:e,dimension:function(){return this.$element.hasClass("width")?"width":"height"},show:function(){var a,d,c,f;if(!this.transitioning){a=this.dimension();d=b.camelCase(["scroll",a].join("-"));if((c=this.$parent&&this.$parent.find("> .accordion-group > .in"))&&c.length){if((f=c.data("collapse"))&&
f.transitioning)return;c.collapse("hide");f||c.data("collapse",null)}this.$element[a](0);this.transition("addClass",b.Event("show"),"shown");b.support.transition&&this.$element[a](this.$element[0][d])}},hide:function(){var a;this.transitioning||(a=this.dimension(),this.reset(this.$element[a]()),this.transition("removeClass",b.Event("hide"),"hidden"),this.$element[a](0))},reset:function(a){var b=this.dimension();this.$element.removeClass("collapse")[b](a||"auto")[0].offsetWidth;this.$element[null!==
a?"addClass":"removeClass"]("collapse");return this},transition:function(a,d,c){var f=this,h=function(){"show"==d.type&&f.reset();f.transitioning=0;f.$element.trigger(c)};this.$element.trigger(d);d.isDefaultPrevented()||(this.transitioning=1,this.$element[a]("in"),b.support.transition&&this.$element.hasClass("collapse")?this.$element.one(b.support.transition.end,h):h())},toggle:function(){this[this.$element.hasClass("in")?"hide":"show"]()}};b.fn.collapse=function(a){return this.each(function(){var d=
b(this),c=d.data("collapse"),f="object"==typeof a&&a;c||d.data("collapse",c=new e(this,f));if("string"==typeof a)c[a]()})};b.fn.collapse.defaults={toggle:!0};b.fn.collapse.Constructor=e;b(document).on("click.collapse.data-api","[data-toggle=collapse]",function(a){var d=b(this),c;a=d.attr("data-target")||a.preventDefault()||(c=d.attr("href"))&&c.replace(/.*(?=#[^\s]+$)/,"");c=b(a).data("collapse")?"toggle":d.data();d[b(a).hasClass("in")?"addClass":"removeClass"]("collapsed");b(a).collapse(c)})}(window.jQuery);
!function(b){function e(){b(d).each(function(){a(b(this)).removeClass("open")})}function a(a){var d=a.attr("data-target");d||(d=(d=a.attr("href"))&&/#/.test(d)&&d.replace(/.*(?=#[^\s]*$)/,""));d=b(d);d.length||(d=a.parent());return d}var d="[data-toggle=dropdown]",c=function(a){var d=b(a).on("click.dropdown.data-api",this.toggle);b("html").on("click.dropdown.data-api",function(){d.parent().removeClass("open")})};c.prototype={constructor:c,toggle:function(){var d=b(this),c,g;if(!d.is(".disabled, :disabled"))return c=
a(d),g=c.hasClass("open"),e(),g||(c.toggleClass("open"),d.focus()),!1},keydown:function(d){var c,e,j;if(/(38|40|27)/.test(d.keyCode)&&(c=b(this),d.preventDefault(),d.stopPropagation(),!c.is(".disabled, :disabled"))){e=a(c);j=e.hasClass("open");if(!j||j&&27==d.keyCode)return c.click();c=b("[role=menu] li:not(.divider) a",e);c.length&&(e=c.index(c.filter(":focus")),38==d.keyCode&&0<e&&e--,40==d.keyCode&&e<c.length-1&&e++,~e||(e=0),c.eq(e).focus())}}};b.fn.dropdown=function(a){return this.each(function(){var d=
b(this),e=d.data("dropdown");e||d.data("dropdown",e=new c(this));"string"==typeof a&&e[a].call(d)})};b.fn.dropdown.Constructor=c;b(document).on("click.dropdown.data-api touchstart.dropdown.data-api",e).on("click.dropdown touchstart.dropdown.data-api",".dropdown form",function(a){a.stopPropagation()}).on("click.dropdown.data-api touchstart.dropdown.data-api",d,c.prototype.toggle).on("keydown.dropdown.data-api touchstart.dropdown.data-api",d+", [role=menu]",c.prototype.keydown)}(window.jQuery);
!function(b){var e=function(a,d){this.options=d;this.$element=b(a).delegate('[data-dismiss="modal"]',"click.dismiss.modal",b.proxy(this.hide,this));this.options.remote&&this.$element.find(".modal-body").load(this.options.remote)};e.prototype={constructor:e,toggle:function(){return this[!this.isShown?"show":"hide"]()},show:function(){var a=this,d=b.Event("show");this.$element.trigger(d);!this.isShown&&!d.isDefaultPrevented()&&(this.isShown=!0,this.escape(),this.backdrop(function(){var d=b.support.transition&&
a.$element.hasClass("fade");a.$element.parent().length||a.$element.appendTo(document.body);a.$element.show();d&&a.$element[0].offsetWidth;a.$element.addClass("in").attr("aria-hidden",!1);a.enforceFocus();d?a.$element.one(b.support.transition.end,function(){a.$element.focus().trigger("shown")}):a.$element.focus().trigger("shown")}))},hide:function(a){a&&a.preventDefault();a=b.Event("hide");this.$element.trigger(a);this.isShown&&!a.isDefaultPrevented()&&(this.isShown=!1,this.escape(),b(document).off("focusin.modal"),
this.$element.removeClass("in").attr("aria-hidden",!0),b.support.transition&&this.$element.hasClass("fade")?this.hideWithTransition():this.hideModal())},enforceFocus:function(){var a=this;b(document).on("focusin.modal",function(d){a.$element[0]!==d.target&&!a.$element.has(d.target).length&&a.$element.focus()})},escape:function(){var a=this;if(this.isShown&&this.options.keyboard)this.$element.on("keyup.dismiss.modal",function(d){27==d.which&&a.hide()});else this.isShown||this.$element.off("keyup.dismiss.modal")},
hideWithTransition:function(){var a=this,d=setTimeout(function(){a.$element.off(b.support.transition.end);a.hideModal()},500);this.$element.one(b.support.transition.end,function(){clearTimeout(d);a.hideModal()})},hideModal:function(){this.$element.hide().trigger("hidden");this.backdrop()},removeBackdrop:function(){this.$backdrop.remove();this.$backdrop=null},backdrop:function(a){var d=this.$element.hasClass("fade")?"fade":"";if(this.isShown&&this.options.backdrop){var c=b.support.transition&&d;this.$backdrop=
b('<div class="modal-backdrop '+d+'" />').appendTo(document.body);this.$backdrop.click("static"==this.options.backdrop?b.proxy(this.$element[0].focus,this.$element[0]):b.proxy(this.hide,this));c&&this.$backdrop[0].offsetWidth;this.$backdrop.addClass("in");c?this.$backdrop.one(b.support.transition.end,a):a()}else!this.isShown&&this.$backdrop?(this.$backdrop.removeClass("in"),b.support.transition&&this.$element.hasClass("fade")?this.$backdrop.one(b.support.transition.end,b.proxy(this.removeBackdrop,
this)):this.removeBackdrop()):a&&a()}};b.fn.modal=function(a){return this.each(function(){var d=b(this),c=d.data("modal"),f=b.extend({},b.fn.modal.defaults,d.data(),"object"==typeof a&&a);c||d.data("modal",c=new e(this,f));if("string"==typeof a)c[a]();else f.show&&c.show()})};b.fn.modal.defaults={backdrop:!0,keyboard:!0,show:!0};b.fn.modal.Constructor=e;b(document).on("click.modal.data-api",'[data-toggle="modal"]',function(a){var d=b(this),c=d.attr("href"),f=b(d.attr("data-target")||c&&c.replace(/.*(?=#[^\s]+$)/,
"")),c=f.data("modal")?"toggle":b.extend({remote:!/#/.test(c)&&c},f.data(),d.data());a.preventDefault();f.modal(c).one("hide",function(){d.focus()})})}(window.jQuery);
!function(b){var e=function(a,d){this.init("tooltip",a,d)};e.prototype={constructor:e,init:function(a,d,c){this.type=a;this.$element=b(d);this.options=this.getOptions(c);this.enabled=!0;if("click"==this.options.trigger)this.$element.on("click."+this.type,this.options.selector,b.proxy(this.toggle,this));else"manual"!=this.options.trigger&&(a="hover"==this.options.trigger?"mouseenter":"focus",d="hover"==this.options.trigger?"mouseleave":"blur",this.$element.on(a+"."+this.type,this.options.selector,
b.proxy(this.enter,this)),this.$element.on(d+"."+this.type,this.options.selector,b.proxy(this.leave,this)));this.options.selector?this._options=b.extend({},this.options,{trigger:"manual",selector:""}):this.fixTitle()},getOptions:function(a){a=b.extend({},b.fn[this.type].defaults,a,this.$element.data());a.delay&&"number"==typeof a.delay&&(a.delay={show:a.delay,hide:a.delay});return a},enter:function(a){var d=b(a.currentTarget)[this.type](this._options).data(this.type);if(!d.options.delay||!d.options.delay.show)return d.show();
clearTimeout(this.timeout);d.hoverState="in";this.timeout=setTimeout(function(){"in"==d.hoverState&&d.show()},d.options.delay.show)},leave:function(a){var d=b(a.currentTarget)[this.type](this._options).data(this.type);this.timeout&&clearTimeout(this.timeout);if(!d.options.delay||!d.options.delay.hide)return d.hide();d.hoverState="out";this.timeout=setTimeout(function(){"out"==d.hoverState&&d.hide()},d.options.delay.hide)},show:function(){var a,d,b,f,e,g,j;if(this.hasContent()&&this.enabled){a=this.tip();
this.setContent();this.options.animation&&a.addClass("fade");g="function"==typeof this.options.placement?this.options.placement.call(this,a[0],this.$element[0]):this.options.placement;d=/in/.test(g);a.detach().css({top:0,left:0,display:"block"}).insertAfter(this.$element);b=this.getPosition(d);f=a[0].offsetWidth;e=a[0].offsetHeight;switch(d?g.split(" ")[1]:g){case "bottom":j={top:b.top+b.height,left:b.left+b.width/2-f/2};break;case "top":j={top:b.top-e,left:b.left+b.width/2-f/2};break;case "left":j=
{top:b.top+b.height/2-e/2,left:b.left-f};break;case "right":j={top:b.top+b.height/2-e/2,left:b.left+b.width}}a.offset(j).addClass(g).addClass("in")}},setContent:function(){var a=this.tip(),b=this.getTitle();a.find(".tooltip-inner")[this.options.html?"html":"text"](b);a.removeClass("fade in top bottom left right")},hide:function(){var a=this.tip();a.removeClass("in");if(b.support.transition&&this.$tip.hasClass("fade")){var d=setTimeout(function(){a.off(b.support.transition.end).detach()},500);a.one(b.support.transition.end,
function(){clearTimeout(d);a.detach()})}else a.detach();return this},fixTitle:function(){var a=this.$element;if(a.attr("title")||"string"!=typeof a.attr("data-original-title"))a.attr("data-original-title",a.attr("title")||"").removeAttr("title")},hasContent:function(){return this.getTitle()},getPosition:function(a){return b.extend({},a?{top:0,left:0}:this.$element.offset(),{width:this.$element[0].offsetWidth,height:this.$element[0].offsetHeight})},getTitle:function(){var a=this.$element,b=this.options;
return a.attr("data-original-title")||("function"==typeof b.title?b.title.call(a[0]):b.title)},tip:function(){return this.$tip=this.$tip||b(this.options.template)},validate:function(){this.$element[0].parentNode||(this.hide(),this.options=this.$element=null)},enable:function(){this.enabled=!0},disable:function(){this.enabled=!1},toggleEnabled:function(){this.enabled=!this.enabled},toggle:function(a){a=b(a.currentTarget)[this.type](this._options).data(this.type);a[a.tip().hasClass("in")?"hide":"show"]()},
destroy:function(){this.hide().$element.off("."+this.type).removeData(this.type)}};b.fn.tooltip=function(a){return this.each(function(){var d=b(this),c=d.data("tooltip"),f="object"==typeof a&&a;c||d.data("tooltip",c=new e(this,f));if("string"==typeof a)c[a]()})};b.fn.tooltip.Constructor=e;b.fn.tooltip.defaults={animation:!0,placement:"top",selector:!1,template:'<div class="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>',trigger:"hover",title:"",delay:0,html:!1}}(window.jQuery);
!function(b){var e=function(a,b){this.init("popover",a,b)};e.prototype=b.extend({},b.fn.tooltip.Constructor.prototype,{constructor:e,setContent:function(){var a=this.tip(),b=this.getTitle(),c=this.getContent();a.find(".popover-title")[this.options.html?"html":"text"](b);a.find(".popover-content > *")[this.options.html?"html":"text"](c);a.removeClass("fade top bottom left right in")},hasContent:function(){return this.getTitle()||this.getContent()},getContent:function(){var a=this.$element,b=this.options;
return a.attr("data-content")||("function"==typeof b.content?b.content.call(a[0]):b.content)},tip:function(){this.$tip||(this.$tip=b(this.options.template));return this.$tip},destroy:function(){this.hide().$element.off("."+this.type).removeData(this.type)}});b.fn.popover=function(a){return this.each(function(){var d=b(this),c=d.data("popover"),f="object"==typeof a&&a;c||d.data("popover",c=new e(this,f));if("string"==typeof a)c[a]()})};b.fn.popover.Constructor=e;b.fn.popover.defaults=b.extend({},b.fn.tooltip.defaults,
{placement:"right",trigger:"click",content:"",template:'<div class="popover"><div class="arrow"></div><div class="popover-inner"><h3 class="popover-title"></h3><div class="popover-content"><p></p></div></div></div>'})}(window.jQuery);
!function(b){function e(a,d){var c=b.proxy(this.process,this),f=b(a).is("body")?b(window):b(a),e;this.options=b.extend({},b.fn.scrollspy.defaults,d);this.$scrollElement=f.on("scroll.scroll-spy.data-api",c);this.selector=(this.options.target||(e=b(a).attr("href"))&&e.replace(/.*(?=#[^\s]+$)/,"")||"")+" .nav li > a";this.$body=b("body");this.refresh();this.process()}e.prototype={constructor:e,refresh:function(){var a=this;this.offsets=b([]);this.targets=b([]);this.$body.find(this.selector).map(function(){var a=
b(this),a=a.data("target")||a.attr("href"),c=/^#\w/.test(a)&&b(a);return c&&c.length&&[[c.position().top,a]]||null}).sort(function(a,b){return a[0]-b[0]}).each(function(){a.offsets.push(this[0]);a.targets.push(this[1])})},process:function(){var a=this.$scrollElement.scrollTop()+this.options.offset,b=(this.$scrollElement[0].scrollHeight||this.$body[0].scrollHeight)-this.$scrollElement.height(),c=this.offsets,f=this.targets,e=this.activeTarget,g;if(a>=b)return e!=(g=f.last()[0])&&this.activate(g);for(g=
c.length;g--;)e!=f[g]&&a>=c[g]&&(!c[g+1]||a<=c[g+1])&&this.activate(f[g])},activate:function(a){this.activeTarget=a;b(this.selector).parent(".active").removeClass("active");a=b(this.selector+'[data-target="'+a+'"],'+this.selector+'[href="'+a+'"]').parent("li").addClass("active");a.parent(".dropdown-menu").length&&(a=a.closest("li.dropdown").addClass("active"));a.trigger("activate")}};b.fn.scrollspy=function(a){return this.each(function(){var d=b(this),c=d.data("scrollspy"),f="object"==typeof a&&a;
c||d.data("scrollspy",c=new e(this,f));if("string"==typeof a)c[a]()})};b.fn.scrollspy.Constructor=e;b.fn.scrollspy.defaults={offset:10};b(window).on("load",function(){b('[data-spy="scroll"]').each(function(){var a=b(this);a.scrollspy(a.data())})})}(window.jQuery);
!function(b){var e=function(a){this.element=b(a)};e.prototype={constructor:e,show:function(){var a=this.element,d=a.closest("ul:not(.dropdown-menu)"),c=a.attr("data-target"),f,e;c||(c=(c=a.attr("href"))&&c.replace(/.*(?=#[^\s]*$)/,""));a.parent("li").hasClass("active")||(f=d.find(".active:last a")[0],e=b.Event("show",{relatedTarget:f}),a.trigger(e),e.isDefaultPrevented()||(c=b(c),this.activate(a.parent("li"),d),this.activate(c,c.parent(),function(){a.trigger({type:"shown",relatedTarget:f})})))},activate:function(a,
d,c){function f(){e.removeClass("active").find("> .dropdown-menu > .active").removeClass("active");a.addClass("active");g?(a[0].offsetWidth,a.addClass("in")):a.removeClass("fade");a.parent(".dropdown-menu")&&a.closest("li.dropdown").addClass("active");c&&c()}var e=d.find("> .active"),g=c&&b.support.transition&&e.hasClass("fade");g?e.one(b.support.transition.end,f):f();e.removeClass("in")}};b.fn.tab=function(a){return this.each(function(){var d=b(this),c=d.data("tab");c||d.data("tab",c=new e(this));
if("string"==typeof a)c[a]()})};b.fn.tab.Constructor=e;b(document).on("click.tab.data-api",'[data-toggle="tab"], [data-toggle="pill"]',function(a){a.preventDefault();b(this).tab("show")})}(window.jQuery);
!function(b){var e=function(a,d){this.$element=b(a);this.options=b.extend({},b.fn.typeahead.defaults,d);this.matcher=this.options.matcher||this.matcher;this.sorter=this.options.sorter||this.sorter;this.highlighter=this.options.highlighter||this.highlighter;this.updater=this.options.updater||this.updater;this.$menu=b(this.options.menu).appendTo("body");this.source=this.options.source;this.shown=!1;this.listen()};e.prototype={constructor:e,select:function(){var a=this.$menu.find(".active").attr("data-value");
this.$element.val(this.updater(a)).change();return this.hide()},updater:function(a){return a},show:function(){var a=b.extend({},this.$element.offset(),{height:this.$element[0].offsetHeight});this.$menu.css({top:a.top+a.height,left:a.left});this.$menu.show();this.shown=!0;return this},hide:function(){this.$menu.hide();this.shown=!1;return this},lookup:function(){var a;this.query=this.$element.val();return!this.query||this.query.length<this.options.minLength?this.shown?this.hide():this:(a=b.isFunction(this.source)?
this.source(this.query,b.proxy(this.process,this)):this.source)?this.process(a):this},process:function(a){var d=this;a=b.grep(a,function(a){return d.matcher(a)});a=this.sorter(a);return!a.length?this.shown?this.hide():this:this.render(a.slice(0,this.options.items)).show()},matcher:function(a){return~a.toLowerCase().indexOf(this.query.toLowerCase())},sorter:function(a){for(var b=[],c=[],f=[],e;e=a.shift();)e.toLowerCase().indexOf(this.query.toLowerCase())?~e.indexOf(this.query)?c.push(e):f.push(e):
b.push(e);return b.concat(c,f)},highlighter:function(a){var b=this.query.replace(/[\-\[\]{}()*+?.,\\\^$|#\s]/g,"\\$&");return a.replace(RegExp("("+b+")","ig"),function(a,b){return"<strong>"+b+"</strong>"})},render:function(a){var d=this;a=b(a).map(function(a,f){a=b(d.options.item).attr("data-value",f);a.find("a").html(d.highlighter(f));return a[0]});a.first().addClass("active");this.$menu.html(a);return this},next:function(){var a=this.$menu.find(".active").removeClass("active").next();a.length||
(a=b(this.$menu.find("li")[0]));a.addClass("active")},prev:function(){var a=this.$menu.find(".active").removeClass("active").prev();a.length||(a=this.$menu.find("li").last());a.addClass("active")},listen:function(){this.$element.on("blur",b.proxy(this.blur,this)).on("keypress",b.proxy(this.keypress,this)).on("keyup",b.proxy(this.keyup,this));if(this.eventSupported("keydown"))this.$element.on("keydown",b.proxy(this.keydown,this));this.$menu.on("click",b.proxy(this.click,this)).on("mouseenter","li",
b.proxy(this.mouseenter,this))},eventSupported:function(a){var b=a in this.$element;b||(this.$element.setAttribute(a,"return;"),b="function"===typeof this.$element[a]);return b},move:function(a){if(this.shown){switch(a.keyCode){case 9:case 13:case 27:a.preventDefault();break;case 38:a.preventDefault();this.prev();break;case 40:a.preventDefault(),this.next()}a.stopPropagation()}},keydown:function(a){this.suppressKeyPressRepeat=!~b.inArray(a.keyCode,[40,38,9,13,27]);this.move(a)},keypress:function(a){this.suppressKeyPressRepeat||
this.move(a)},keyup:function(a){switch(a.keyCode){case 40:case 38:case 16:case 17:case 18:break;case 9:case 13:if(!this.shown)return;this.select();break;case 27:if(!this.shown)return;this.hide();break;default:this.lookup()}a.stopPropagation();a.preventDefault()},blur:function(){var a=this;setTimeout(function(){a.hide()},150)},click:function(a){a.stopPropagation();a.preventDefault();this.select()},mouseenter:function(a){this.$menu.find(".active").removeClass("active");b(a.currentTarget).addClass("active")}};
b.fn.typeahead=function(a){return this.each(function(){var d=b(this),c=d.data("typeahead"),f="object"==typeof a&&a;c||d.data("typeahead",c=new e(this,f));if("string"==typeof a)c[a]()})};b.fn.typeahead.defaults={source:[],items:8,menu:'<ul class="typeahead dropdown-menu"></ul>',item:'<li><a href="#"></a></li>',minLength:1};b.fn.typeahead.Constructor=e;b(document).on("focus.typeahead.data-api",'[data-provide="typeahead"]',function(a){var d=b(this);d.data("typeahead")||(a.preventDefault(),d.typeahead(d.data()))})}(window.jQuery);
!function(b){var e=function(a,d){this.options=b.extend({},b.fn.affix.defaults,d);this.$window=b(window).on("scroll.affix.data-api",b.proxy(this.checkPosition,this)).on("click.affix.data-api",b.proxy(function(){setTimeout(b.proxy(this.checkPosition,this),1)},this));this.$element=b(a);this.checkPosition()};e.prototype.checkPosition=function(){if(this.$element.is(":visible")){var a=b(document).height(),d=this.$window.scrollTop(),c=this.$element.offset(),f=this.options.offset,e=f.bottom,g=f.top;"object"!=
typeof f&&(e=g=f);"function"==typeof g&&(g=f.top());"function"==typeof e&&(e=f.bottom());a=null!=this.unpin&&d+this.unpin<=c.top?!1:null!=e&&c.top+this.$element.height()>=a-e?"bottom":null!=g&&d<=g?"top":!1;this.affixed!==a&&(this.affixed=a,this.unpin="bottom"==a?c.top-d:null,this.$element.removeClass("affix affix-top affix-bottom").addClass("affix"+(a?"-"+a:"")))}};b.fn.affix=function(a){return this.each(function(){var d=b(this),c=d.data("affix"),f="object"==typeof a&&a;c||d.data("affix",c=new e(this,
f));if("string"==typeof a)c[a]()})};b.fn.affix.Constructor=e;b.fn.affix.defaults={offset:0};b(window).on("load",function(){b('[data-spy="affix"]').each(function(){var a=b(this),d=a.data();d.offset=d.offset||{};d.offsetBottom&&(d.offset.bottom=d.offsetBottom);d.offsetTop&&(d.offset.top=d.offsetTop);a.affix(d)})})}(window.jQuery);(function(b){var e=b.event,a,d;a=e.special.debouncedresize={setup:function(){b(this).on("resize",a.handler)},teardown:function(){b(this).off("resize",a.handler)},handler:function(b,f){var h=this,g=arguments,j=function(){b.type="debouncedresize";e.dispatch.apply(h,g)};d&&clearTimeout(d);f?j():d=setTimeout(j,a.threshold)},threshold:150}})(jQuery);(function(b){b.fn.stars=function(e){var a={css:function(a){var c;c=".multiuniverse{width:100%;height:100%;position:absolute;overflow:hidden;}\n.universe{width:100%;height:100%;position:absolute;overflow:hidden;}\n";c+=".transport{width:200%;height:100%;position:absolute;overflow:hidden;}\n";c+=".galaxy{width:50%;height:100%;position:relative;float:left;overflow:hidden;}\n";c+=".star{position:absolute;color:#FFBF00;overflow:hidden;}\n";c+=".star.fandango{color:#B53389;}\n";c+=".star.blue{color:#0040FF;}\n";
c+=".star.white{color:#ffffff;}\n";c+="#scoreboard{position:absolute;top:10px;left:10px;font-size:10px}\n";for(key in a){var f=a[key];f.id="abcdefghijklmnopqrstuvwxyz".charAt(key);"undefined"!==typeof f.color&&(c+=".universe."+f.id+" .star{color:"+f.color+"}\n");if("undefined"!==typeof f.css)for(key in f.css)c+=f.css[key]}a="<style>"+c+"</style>";b("head").append(a)},random_id:function(){for(var a="",b=10;0<b;--b)a+="abcdefghijklmnopqrstuvwxyz"[Math.round(25*Math.random())];return a},random_loc:function(a){return Math.floor(Math.random()*
a+1)},transport:function(b,c){element=b.children(".transport");if(0===element.length){var f=a.random_id();b.append('<div class="transport" id="'+f+'"></div>');element=b.children("#"+f)}return c(element)},galaxy:function(b,c){var f=a.random_id();b.append('<div class="galaxy" id="'+f+'"></div>');return c(f)},star:function(d,c){var f="";if("undefined"===typeof c)var e=b("#"+d).height(),g=b("#"+d).width(),e=a.random_loc(e),g=a.random_loc(g);else e=c.height,g=c.width,f+=" "+c.paint;var j=a.random_id();
b("#"+d).append('<span class="star'+f+'" id="'+j+'" style="'+("top:"+e+"px;left:"+g+"px;")+'">.</span>')},stars:function(b){for(var c=0;c<e.count;c++)a.star(b)},universe:function(d,c){var f=a.random_id();d.append('<div class="universe '+e.id+'" id="'+f+'"></div>');f=b("#"+f);return c(f)},animate:function c(b){var h=b.width()/2;b.animate({left:"-"+h+"px"},{duration:e.speed,complete:function(){b.css({left:"0px"});b.children(".galaxy:first-child").remove();a.galaxy(b,function(b){a.stars(b)});c(b)}})},
bang:function(c){a.transport(c,function(c){a.galaxy(c,function(b){a.stars(b)});a.galaxy(c,function(b){a.stars(b)});var h=e;b(window).ready(function(){var b=setTimeout;a.animate(c);b(void 0,1E3)}(h))})},elm_at:function(a,e){return b("body *").map(function(){var h=b(this),g=h.offset(),j=g.left,g=g.top,k=h.height(),p=h.width();return e<=g+k&&e>=g&&a<=j+p&&a>=j?h:null})},interact:function(c){var e={white:0,blue:0,yellow:0,fandango:0},h={white:"White Dwarfs:",blue:"Blue Giants:",yellow:"Yellow Supergiant:",
fandango:"Hypergiant:"},g=!1,j="white";b(".logo .blue").click(function(){j="blue"});b(".logo .yellow").click(function(){j="yellow"});b(".logo .fandango").click(function(){j="fandango"});var k=function(a){j==a&&e[a]++;1===e[a]?(a='<div class="'+a+' line"><p>'+h[a]+" <span>1</span></p></div>",b("#scoreboard").append(a)):1<e[a]&&b("#scoreboard ."+a+" span").text(e[a])};c.click(function(e){g||(c.append('<div id="scoreboard"></div>'),g=!0);k("white");k("blue");k("yellow");k("fandango");var f=e.pageX-this.offsetLeft,
h=e.pageY-this.offsetLeft,m=0,n=0,l=0;a.elm_at(f,h).each(function(){var c=b(this).attr("class"),e=b(this).attr("id");"transport"==c&&0===m&&(m++,l=Math.abs(parseFloat(b(this).css("left"))));"galaxy"==c&&0===n&&(n++,0==b(this).index()?a.star(e,{height:h-15,width:f+l,paint:j}):a.star(e,{height:h-15,width:f+l-b(window).width(),paint:j}))})})}};("undefined"==typeof e.css||e.css)&&a.css(arguments);if(1==arguments.length)a.bang(this),a.interact(this);else for(key in a.interact(this),arguments)e=arguments[key],
e.id="abcdefghijklmnopqrstuvwxyz".charAt(key),a.universe(this,function(b){a.bang(b)})}})(jQuery);var stars=function(){$(".multiuniverse").stars({count:100,speed:15E4},{count:25,speed:1E5})};$(document).ready(function(){stars()});$(window).on("debouncedresize",function(){$(".multiuniverse").html("");stars()});

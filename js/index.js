//定义各类事件
(function(){
    //边栏联系人细节显示
    var showDetail = function () {
            $(".aside").attr("class","col-sm-2 aside");
            $(".main").attr("class","col-sm-10 main");
            $(this).next().show(500);
        },
        hideDetail = function () {
            $(".aside").attr("class","col-sm-1 aside");
            $(".main").attr("class","col-sm-11 main");
            $(".aside-visible").hide();
        };

    $(".aside-ul")
        .delegate(".glyphicon-phone", "mouseenter", showDetail)
        .delegate(".glyphicon-envelope", "mouseenter", showDetail)
        .delegate(".glyphicon-user", "mouseenter", showDetail)
        .bind("mouseleave", hideDetail);

    //主页键
    $(".glyphicon-home").click(function (){
        location.pathname = "/bootstrap-blog/";
    })

    //显示、关闭边栏
    $(".glyphicon-off").click(function(){
        var main = $(".main"),
            aside = $(".aside"),
            explain = $(".explain");
        if((aside.attr("class") == "col-sm-1 aside")){
            main.attr("class","col-sm-12 main");
            aside.hide();
            aside.attr("class","aside");
            explain.text("打开联系栏");
        }else{
            main.attr("class","col-sm-11 main");
            aside.attr("class","col-sm-1 aside");
            aside.show();
            explain.text("关闭联系栏");
        }
    }).mouseenter(function (){
        $(".explain").show();
    }).mouseleave(function (){
        $(".explain").hide();
    });

    //显示关闭下拉主菜单
    $(".menu1").mouseenter(function(){
        $(".body-content").animate({opacity: '0.5'});
        $(this).css("backgroundColor","rgba(0,191,255,0.5)");
        $(this).find(".menu2").slideDown();
    }).mouseleave(function(){
        $(".body-content").animate({opacity: '1'});
        $(this).css("backgroundColor","rgb(0,191,255)");
        $(this).find(".menu2").slideUp();
    });

    //菜单悬停样式
    $(".menu2").mouseenter(function(){
        $(this).css("backgroundColor","rgb(0,191,255)");
    }).mouseleave(function(){
        $(this).css("backgroundColor","rgba(0,191,255,0.3)");
    });

    if(window.location.pathname.indexOf("blog") > 0) {
        //博客文章摘要
        if (window.location.pathname == "/blog/") {
            $(".con-title").hide();
            $(".con-date").hide();
            $(".con-content p, .con-content pre, .con-content img").hide();
        }

        //博文标题悬停变化
        var titles = $(".article-li a");
        titles.mouseenter(function () {
            $(this).css("textShadow", "2px 2px 2px #000000");
        }).mouseleave(function () {
            $(this).css("textShadow", "none");
        });

        //切换缩略图与信息图
        $(".easyPhotos").click(function () {
            $(".border").hide();
        });

        $(".infoPhotos").click(function () {
            $(".border").show();
        });

        //博文搜索功能实现
        var search = {
            key: $("#search-key"),
            button1: $("#search-button"),
            button2: $("#reset-button"),
            articles: $(".article-li"),
            result: false,
            start: function () {
                if (search.key.val().length == 0) {
                    alert("请输入搜索内容！");
                } else {
                    search.articles.hide();
                    for (var i = 0, length = titles.size(); i < length; i++) {
                        if (titles.get(i).text.toLowerCase().indexOf(search.key.val().toLowerCase()) > -1) {
                            search.articles.eq(i).show();
                            if (search.result == false) {
                                search.result = true;
                            }
                        }
                    }
                    if (search.result == false) {
                        alert("没有符合条件的博文！");
                    }
                }
            }
        };

        $("#blog-search").delegate("span:eq(0)", "mouseup", function () {
            search.button1.css("box-shadow", "none");
            search.start();
        }).delegate("span:eq(0)", "mousedown", function () {
            search.button1.css("box-shadow", "0 0 0.2em 0.2em rgb(0,191,255) inset");

        }).delegate("input", "keydown", function () {
            if (event.which == 13) {
                search.start();
            }
        }).delegate("span:eq(1)", "mousedown", function () {
            search.button2.css("box-shadow", "0 0 0.2em 0.2em rgb(0,191,255) inset");
        }).delegate("span:eq(1)", "mouseup", function () {
            search.button2.css("box-shadow", "none");
            search.articles.show();
        });
    }

    if(window.location.pathname == "/"){
        //背景音乐控件
        var bg =  $("#bgm"),
            bgm = {
                audio: $("audio").first(),
                music: bg.find("span").eq(0),
                play_button: bg.find("span").eq(1).get(0),
                width: parseFloat($("#bgm-sum").css("width")),
                played: $("#bgm-played"),
                pos: undefined,
                loading: undefined,
                ani: function (){
                    bgm.music.animate({left: '-0.4em'},250,function (){
                        bgm.music.animate({left: '0em'},250);
                    })},
                ami: function (){
                    var bgm_percent = (bgm.audio.get(0).currentTime / bgm.audio.get(0).duration).toFixed(4) * bgm.width;
                    bgm.played.css("left", bgm_percent);
                },
                play_bgm: function (){
                    bgm.music.css("color","#ffffff");
                    bgm.audio.get(0).play();
                    bgm.play_button.className = "glyphicon glyphicon-pause";
                    bgm.pos = setInterval(bgm.ami,20);
                    bgm.loading = setInterval(bgm.ani, 500);
                },
                pause_bgm: function (){
                    bgm.audio.get(0).pause();
                    clearInterval(bgm.pos);
                    bgm.play_button.className = "glyphicon glyphicon-play";
                    clearInterval(bgm.loading);
                    bgm.music.css("color","#000000");
                }
            };

        bgm.audio.ready(function (){
            //自动播放
            bgm.play_bgm();
            bg.delegate("span:eq(1)", "click", function (){
                if(bgm.audio.get(0).paused == true){
                    bgm.play_bgm();
                }else{
                    bgm.pause_bgm();
                }
            }).delegate("span:eq(2)", "click", function (){
                bgm.pause_bgm();
                bgm.audio.get(0).currentTime = 0;
                bgm.played.css("left", "0");
            });
        });

        //实现图片轮播效果
        var lb = {
                pos: 0,
                index: 0,
                container: $("#lb-container"),
                lb: $("#lb"),
                img: $(".lb-img"),
                li: $("#lb-choose li"),
                timer: function (){
                    lb.index = Math.floor(parseFloat(lb.lb.css("left")) / parseFloat(lb.container.css("width")));
                    if(lb.index == -6){
                        lb.lb.css("left", "-100%");
                        lb.index = -1;
                    }
                    lb.pos = --lb.index * 100 + '%';
                    lb.lb.animate({left: lb.pos},500,function(){
                        lb.index = lb.index == -6 ? -1 : lb.index;
                        lb.li.get(-lb.index - 2 < 0 ? 4 : -lb.index -2 ).style.background = 'rgba(0,0,0,0.3)';
                        lb.li.get(-lb.index - 1).style.background = 'rgb(0,0,0)';
                    });
                }
            },//定义轮播图大对象
            imgFirst = lb.img.get(0).cloneNode(true),
            imgLast = lb.img.get(4).cloneNode(true);//复制第一张图与最后一张图用作过渡

        lb.lb.get(0).appendChild(imgFirst);
        lb.lb.get(0).insertBefore(imgLast, lb.lb.get(0).firstChild);//插入复制的图片节点
        lb.li.get(0).style.background = 'rgb(0,0,0)'; //首亮

        var start = setInterval(lb.timer,4000); //开始轮播

        lb.container.delegate(".glyphicon-chevron-left", "click", function(){
            lb.index = Math.floor(parseFloat(lb.lb.css("left")) / parseFloat(lb.container.css("width")));
            lb.pos = ++lb.index * 100 + "%";
            lb.lb.animate({left: lb.pos},500,function(){
                if(lb.pos == "0%"){
                    lb.lb.css("left","-500%");
                }
                lb.li.get(-lb.index).style.background = 'rgba(0,0,0,0.3)';
                lb.li.get(-lb.index - 1).style.background = 'rgb(0,0,0)';
            });
        }).delegate(".glyphicon-chevron-right", "click", function() {
            lb.index = Math.floor(parseFloat(lb.lb.css("left")) / parseFloat(lb.container.css("width")));
            lb.pos = --lb.index * 100 + "%";
            lb.lb.animate({left: lb.pos}, 500,function(){
                if(lb.pos == "-600%"){
                    lb.lb.css("left","-100%");
                }
                lb.index = lb.index == -6 ? -1 : lb.index;
                lb.li.get(-lb.index - 2 < 0 ? 4 : -lb.index -2 ).style.background = 'rgba(0,0,0,0.3)';
                lb.li.get(-lb.index - 1).style.background = 'rgb(0,0,0)';
            });
        }).bind("mouseleave",function(){
            start = setInterval(lb.timer,4000); //重新开始轮播
        }).bind("mouseenter",function(){
            console.log("hehe");
            clearInterval(start);
        });

        lb.li.mouseenter(function (){
            lb.li.css("background","rgba(0,0,0,0.3)");
            $(this).css("background","rgb(0,0,0)");
            lb.lb.animate({left: -(lb.li.index($(this)) + 1) * 100 + "%"});
        });
    }
    
    //瀑布流中显示大展示图
    $(".falls-col ul li img:even").bind("mouseenter",function (){
        $(this).next().fadeIn();
    }).bind("mouseleave",function (){
        $(this).next().fadeOut();
    });
})();
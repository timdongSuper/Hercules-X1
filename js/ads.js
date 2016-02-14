adJustZoom($('#ads-wrap'));
$(window).on("resize", function() {
    adJustZoom($('#ads-wrap'));
});

(function($) {
    $.extend($.fn, {
        adss: function() {
            var $btnEmpty = $(".ads-btn-empty"); //"Find Out More"
            var $btnFull = $(".ads-btn-full"); //"Start Shopping"
            var $iconStar = $(".ads-icon-star ");
            var $video = $("#ads-video"); //video
            var $nextTip = $(".ads-next-tip"); //next advertisement
            var $banner = $(".ads-banner"); //banner ad

            var $contentL = $("#contentL"); //the left content
            var $contentR = $("#contentR"); // the video
            var $content = $(".ads-content"); //the whole
            var $adText = $(".ads-text"); //introduce 
            var $btns = $(".ads-btn"); //two button
            var $close = $(".ads-close"); //close button
            var $closeIcon = $close.find(".ads-icon-close"); //close button icon

            var $logo = $(".ads-icon-logo"); //logo
            var $title = $adText.find("p").eq(0); //title
            var $introduce = $adText.find("p").eq(1); //introduce 

            // subway detail
            var $thumb = $(".ads-thumb"); //thumbnail
            var $subway = $("#ads-subway");
            var $mesageUl = $("#ads-message");
            var isDBol = false;
            var isBol = false;
            var $startBtn = $(".ads-btn-full"); //"Start your order"button
            var $thumbPic = $(".ads-thumb").find("li");
            var mark = -1;

            //address
            var subwayVideoArr = ["videos/bg-video.mp4", "videos/mini-video.mp4", "videos/bg-video.mp4", "videos/mini-video.mp4"];

            //message
            var json = {
                ad1: {
                    video: "videos/mini-video.mp4",
                    logo: "i/ads/icon-logo-amc.png",
                    title: "The Walking Dead Season 6 Premiere on amc® October 14",
                    introduce: "A horror drama following the survivors of an apocalyptic holocaust who are searching for a safe haven while being tracked and menaced by zombies. Adapted from a comic-book series.",
                    banner: "i/ads/banner-amc.png",
                    nextTip: ""
                },
                ad2: {
                    video: "videos/mini-video.mp4",
                    logo: "i/ads/icon-logo-amc.png",
                    title: "The Walking Dead Season 6 Premiere on amc® October 14",
                    introduce: "A horror drama following the survivors of an apocalyptic holocaust who are searching for a safe haven while being tracked and menaced by zombies. Adapted from a comic-book series.",
                    banner: "i/ads/banner-amc.png",
                    nextTip: ""
                }
            };

            //check time
            checkVideoT();

            function checkVideoT() {
                var timer = setInterval(function() {
                    var videoT = $video[0].duration;
                    var videoCurT = $video[0].currentTime;

                    if (Math.floor(videoT - videoCurT) == 10) {
                        $nextTip.fadeIn(2000);
                    } else if (Math.floor(videoT - videoCurT) == 0) {
                        $nextTip.fadeOut(800);
                        clearInterval(timer);
                    }
                }, 1000);
            }

            var firstBol = true;
            var favoriteBol = false;

            $("body").on("keydown", function(e) {
                e.preventDefault();

                if (!$("#ads-wrap").is(":hidden")) {
                    handlerKeys(e.keyCode);
                }
            });

            function handlerKeys(key) {
                if (firstBol) {
                    if (key === 37 || key === 38 || key === 39 || key === 40) {
                        $btnEmpty.addClass("active");
                        firstBol = !firstBol;
                        return false;
                    }
                }
                switch (key) {

                    case 65: //"A"
                        isDBol = false;

                        pressA();
                        break;

                    case 66: //"B"  
                        isDBol = false;

                        var tip = $("#ads-subway").is(":hidden");
                        if (!tip) {
                            break;
                        }
                        pressB();
                        break;

                    case 67: //"c"
                        favoriteBol = !favoriteBol;
                        favoriteBol ? $iconStar.css("background-image", "url(i/ads/icon-star-full.png)") : $iconStar.css("background-image", "url(i/ads/icon-star.png)");
                        break;

                    case 68: //"D"
                        isDBol = true;
                        if (isBol) {
                            pressB();
                        };
                        pressD();
                        break;

                    case 37: //left
                        if (isDBol)
                            break

                        if ($closeIcon.hasClass("close-red"))
                            break;
                        $btnEmpty.addClass("active");
                        $btnFull.removeClass("active");
                        break;

                    case 39: //right
                        if (isDBol)
                            break

                        if ($closeIcon.hasClass("close-red"))
                            break;
                        $btnEmpty.removeClass("active");
                        $btnFull.addClass("active");
                        break;

                    case 38: //up
                        if (isDBol)
                            break;
                        pressUp();
                        break;

                    case 40: //down
                        if (isDBol)
                            break;

                        if ($btnEmpty.hasClass("active") || $btnFull.hasClass("active")) {
                            break;
                        }
                        pressDown();
                        break;

                    default:
                        break;
                }
            }

            //up
            function pressUp() {
                $btnEmpty.removeClass("active");
                $btnFull.removeClass("active");
                $closeIcon.addClass("close-red");
            }

            function pressDown() {
                $btnEmpty.addClass("active");
                $closeIcon.removeClass("close-red");
            }

            function pressA() {
                initBtn();

                //hidden
                $banner.removeClass("hidden");
                $mesageUl.show();
                $thumb.hide();
                $subway.hide();

                $video.attr("src", json.ad1.video); //change video
                $video[0].play();
                $logo.css({
                    "background": "url(" + json.ad1.logo + ")",
                    "background-size": "100% 100%"
                });
                $title.text(json.ad1.title);
                $introduce.text(json.ad1.introduce);
                $banner.find("img").attr("src", json.ad1.banner);
            }

            function pressB() {
                isBol = !isBol;

                if (!$banner.hasClass("hidden")) {
                    // $banner.toggleClass("ads-banner-change");
                    $banner.toggleClass("ads-banner-change");
                }
                $contentL.toggleClass("floatR ads-contentL-change");
                $contentR.toggleClass("floatR");
                $content.toggleClass("ads-content-change");
                $video.toggleClass("ads-video-change");
                $video.parent().toggleClass("floatR");
                $adText.toggleClass("ads-text-change");
                $btns.toggleClass("ads-btn-change");
                $close.toggleClass("ads-close-change");
                $closeIcon.toggleClass("ads-icon-close-change");
            }

            function pressD() {
                $logo.css({
                    "background": "url(i/ads/icon-logo-subway.png)",
                    "background-size": "100% 100%"
                });

                //hidden
                $banner.addClass("hidden");
                $mesageUl.hide();
                $thumb.show();
                $subway.show();

                //auto play the first video
                $video.attr("src", subwayVideoArr[0]);
                $video[0].play();

                switchDirection();
            }

            //initialize
            function initBtn() {
                firstBol = true;
                $btnEmpty.removeClass("active");
                $btnFull.removeClass("active");
                favoriteBol = false;
                $iconStar.css("background-image", "url(i/ads/icon-star.png)");
                $closeIcon.removeClass("close-red");
                //clear video
                $video.attr("src", "");
                mark = -1;
            }

            // 
            function switchDirection() {
                var fBol = true;

                $("body").on("keydown", function(e) {
                    e.preventDefault();

                    if (fBol) {
                        if (e.keyCode === 37 || e.keyCode === 38 || e.keyCode === 39 || e.keyCode === 40) {
                            $startBtn.addClass("active");
                            fBol = !fBol;
                        }
                        return false;
                    } else if (isDBol) {
                        switch (e.keyCode) {
                            case 37: //left
                                mark--;
                                break;

                            case 38: //up
                                $startBtn.removeClass("active");
                                if (mark <= -1) {
                                    pressUp();
                                    return false;
                                }
                                break;

                            case 39: //right
                                mark++;
                                break;

                            case 40: //down
                                pressDown();
                                break;
                            default:
                                break;
                        }
                        highlightFn(); //ligh light
                        subwayVideoFn();
                    }
                });
            }

            function highlightFn() {
                $startBtn.removeClass("active");
                $thumbPic.removeClass("active");

                if (mark <= -1) {
                    mark = -1;
                    $startBtn.addClass("active");
                    return false;
                }
                if (mark > 3) {
                    mark = 3;
                }
                $thumbPic.eq(mark).addClass("active");
            }

            function subwayVideoFn() {
                $video.attr("src", subwayVideoArr[mark]);
                $video[0].play();
            }
        }
    });
})(jQuery);
$("#ads-wrap").adss();

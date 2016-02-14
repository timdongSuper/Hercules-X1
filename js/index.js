adJustZoom($('#wrap'));
$(window).on("resize", function() {
    adJustZoom($('#wrap'));
});


(function($) {
    $.extend($.fn, {
        gallery: function() {
            var homeBol = true;

            var index = 0;
            var firstclick = true;
            var posL = 0;
            // var posR = 160;
            function selectAd(e) {
                $(window).on("keydown", function(e) {
                    var key = e.which;

                    if (firstclick) {
                        if (key == 37 || key == 38 || key == 39 || key == 40) {
                            $("#homepage-ads li img").eq(0).parent().addClass("ad");
                            $("#homepage-ads li div").eq(0).addClass("text");
                            firstclick = !firstclick;
                            return;
                        }
                    }

                    if (key == 39) {
                        index++;
                        if (index < 0) {
                            index = 0;
                            return
                        }
                        if (index > 6) {
                            index = 6;
                            return
                        }
                        if (index == 4 || index == 6) {
                            posL -= 160;
                            if (posL < -320) {
                                posL = -320;
                            }
                            $("#homepage-ads").css({
                                "left": posL + "px",
                                "transition": ".3s"
                            });
                        }
                        $("#homepage-ads li>img").parent().removeClass("ad");
                        $("#homepage-ads li div").removeClass("text");
                        $("#homepage-ads li>img").eq(index).parent().addClass("ad");
                        $("#homepage-ads li>div").eq(index).addClass("text");
                    }
                    if (key == 37) {
                        index--;
                        if (index < 0) {
                            index = 0;
                            return
                        }
                        if (index > 6) {
                            index = 6;
                            return
                        }
                        if (index == 1 || index == 0) {
                            posL += 160;
                            if (posL > 0) {
                                posL = 0;
                            }
                            $("#homepage-ads").css({
                                "left": posL + "px",
                                "transition": ".3s"
                            });
                        }
                        $("#homepage-ads li>img").parent().removeClass("ad");
                        $("#homepage-ads li div").removeClass("text");
                        $("#homepage-ads li>img").eq(index).parent().addClass("ad");
                        $("#homepage-ads li>div").eq(index).addClass("text");
                    }

                    //enter
                    if (key == 13) {
                        if (homeBol) {
                            $("#wrap").hide();
                            $("#ads-wrap").show();
                            $("video").attr("autoplay", "true");
                            $("video")[0].play();

                            homeBol = !homeBol;
                        } else if ($(".ads-close").find(".ads-icon-close").hasClass("close-red")) {
                            $("#ads-wrap").hide();
                            $("#wrap").show();
                            $("video")[0].pause();
                            homeBol = !homeBol;
                        }
                    }

                })
            }
            selectAd();
        }
    });
})(jQuery);

$('#wrap').gallery();
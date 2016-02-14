/* adjusts zoom level on browser resizing depending on aspect ratio */
// adJustZoom($('#ads-wrap'));
function adJustZoom(ele) {
    var windowWidth = $(window).width();
    var zoom;
    
    if($('.aspect-16-9').length > 0) {
        zoom = (windowWidth)/640;
    } 
    if(zoom >= 1) {
        $(ele).css({
            // '-moz-transform' : 'scale('+zoom+')',
            // '-webkit-transform' : 'scale('+zoom+')',
            'zoom': zoom
        });
    }
}

$(window).on("resize", function () {
    adJustZoom();
});
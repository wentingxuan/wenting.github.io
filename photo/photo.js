(function () {

    var page = 1,offset=20;
    console.log('hexo');
    var render = function (page, data) {
        var begin = (page - 1) * offset;
        var end = page * offset;
        if (begin >= data.length) return;
        var html, li = "";
        for (var i = begin; i < end && i < data.length; i++) {
            li += '<li><div class="img-box">' +
                '<a class="img-bg" rel="noopener" href="http://pz98m6qot.bkt.clouddn.com/' + data[i] + '?raw=true" target="_blank">'+
                '<img src="http://pz98m6qot.bkt.clouddn.com/' + data[i] + '">'+
                '</a>' +
                '</div></li>';
        }
        $(".img-box-ul").append(li);
    };
    var scroll = function (data) {
        var that = this;
        $(window).scroll(function () {
            var windowPageYOffset = window.pageYOffset;
            var windowPageYOffsetAddHeight = windowPageYOffset + window.innerHeight;
            var sensitivity = 0;
            var offsetTop = $(".instagram").offset().top + $(".instagram").height();
            if (offsetTop >= windowPageYOffset && offsetTop < windowPageYOffsetAddHeight + sensitivity) {
                that.render(++that.page, data);
            }
        })
    };
    $.getJSON("output.json", function (data) {
        console.log(data);
        render(page, data);
        scroll(data);
    });
}(window));
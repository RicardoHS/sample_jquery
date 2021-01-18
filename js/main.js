MOUSE_LEFT = 1
MOUSE_RIGHT = 3

$(document).ready(function () {
    var context_menu = $('.custom-context-menu')
    currentUrl = new URL(window.location.href)
    var url_text = currentUrl.searchParams.get('search')
    if (url_text) {
        $('#noticias-header').text(`Noticias - ${url_text}`)
    }

    $(document).on('contextmenu', function () {
        return false
    });

    $(document).on('mousedown', function (e) {
        if (e.which == MOUSE_RIGHT) {
            context_menu.css({
                top: e.pageY,
                left: e.pageX,
                display: 'inline-block'
            });
            if ($(e.target).is('.article-image')) {
                $('[data-selector="openimg"]').show();
                img_url = $(e.target).css('background-image').replace('url("', '').replace('")', '');
                $('[data-selector="openimg"]').find('a').attr('href', img_url);
            }
            if ($(e.target).parents().is('article')) {
                $('[data-selector="copycontent"]').show();
                copyToClipboard($(e.target).closest('article').text())
            }
        }
    });

    $(document).on('mouseup', function (e) {
        if (e.which == MOUSE_LEFT) {
            $('.hidden').hide()
            context_menu.css({
                display: 'none'
            });
        }
    });

    $('[data-trigger="dropdown"]').on('mouseenter', function () {
        console.log($(this))
        $(this).parent().find('.dropdown-menu').fadeIn(300);

        $('.profile-menu').on('mouseleave', function () {
            $(this).parent().find('.dropdown-menu').fadeOut(300);
        });
    });

    news = $(document).find('.news-title')
    news.each(function (k, v) {
        console.log(k)
        $.get('https://baconipsum.com/api/?callback=?',
            { 'type': 'meat-and-filler', 'start-with-lorem': '0', 'sentences': '1' })
            .done(function (response) {
                $(news[k]).text(response)
            })
    });

});

function copyToClipboard(text) {
    var $temp = $("<input>");
    $("body").append($temp);
    $temp.val(text).select();
    document.execCommand("copy");
    $temp.remove();
}
/* ------------------- Loader + img init & prebuild ----------------------- */

$(window).on('load', function() {

    $(".screen_wrap").mCustomScrollbar({
        scrollButtons: {
            enable: true
        },
        mouseWheelPixels: 300,
        theme: "rounded",
        scrollbarPosition: "outside"
    });

    var iswebp = Modernizr.webp;
    var prefix = '';

    if (!iswebp) {
        var data_key, data_val;
        $('picture source, picture img, [data-bgurl]').each(function() {
            data_key = Object.keys($(this).data())[0];
            data_val = $(this).attr('data-' + data_key);
            if ($(this).attr('data-bgurl')) {
                if (!iswebp) {
                    data_val = data_val.replace('.webp', '.jpg');
                }
            }
            $(this).attr('data-' + data_key, data_val);
        });
    }

    $('img').addClass('lazyload');

    $('[data-bgurl]').each(function() {
        $(this).css('background-image', 'url("' + $(this).attr('data-bgurl') + '")');
    });

    window.setTimeout(function() {
        $('body').addClass('load');
    }, 100);

});

/* ------------------- cookies ------------------- */

function getCookie(c_name) {
    var i, x, y, ARRcookies = document.cookie.split(";");
    for (i = 0; i < ARRcookies.length; i++) {
        x = ARRcookies[i].substr(0, ARRcookies[i].indexOf("="));
        y = ARRcookies[i].substr(ARRcookies[i].indexOf("=") + 1);
        x = x.replace(/^\s+|\s+$/g, "");
        if (x == c_name) {
            return unescape(y);
        }
    }
}

function setCookie(c_name, value, exdays) {
    var exdate = new Date();
    exdate.setDate(exdate.getDate() + exdays);
    var c_value = escape(value) + ((exdays == null) ? "" : "; expires=" + exdate.toUTCString());
    document.cookie = c_name + "=" + c_value;
}

$(document).ready(function() {

    window.setTimeout(function() {
        $('.ACeBVhdPRSq').addClass('load');
    }, 50);

    window.setTimeout(function() {
        $('[type=tel]').intlTelInput({
            allowExtensions: false,
            autoFormat: true,
            autoHideDialCode: true,
            autoPlaceholder: true,
            defaultCountry: "auto",
            geoIpLookup: function(callback) {
                $.get('https://ipinfo.io', function() {}, "jsonp").always(function(resp) {
                    var countryCode = (resp && resp.country) ? resp.country : "";
                    callback(countryCode);
                });
            },
            nationalMode: false,
            numberType: 'MOBILE',
            preferredCountries: ['ua', 'ru', 'by', 'us']
        });

        $('#big_video,#video1, #video2,#video3,#video4,#video5,#video6,#video7,#video8,#video9,#video10,#video11,#video12,#video13,#video14,#video15,#video16,#video17,#video18,#video19,#video20,#video21').on('shown.bs.modal', function() {
            var video = $(this).find('.endognath').get(0).play();
        }).on('hide.bs.modal', function() {
            var video = $(this).find('.endognath').get(0).pause();
        });



        $(".js-q-fancybox").fancybox({
            protect: true,
            buttons: [
                'zoom',
                'close'
            ]
        });

        $('.sec2 .btn_review').click(function() {
            $('.hidden_block').toggleClass('active');

        });

        $('.sec2 .btn_review').click(function() {
            if ($(".hidden_block").hasClass("active")) {
                $(this).html('Скрыть ЕЩЕ 13 ОТЗЫВОВ');
            } else {
                $('html, body').animate({
                    scrollTop: $('.sec2').offset().top
                }, 500);
                $(this).html('показать ЕЩЕ 13 ОТЗЫВОВ');
            }
        });

        $('.book_aut_wrap .btn_review').click(function() {
            $('.aut_wrap').toggleClass('active');
        });

        $('.book_aut_wrap .btn_review').click(function() {
            if ($(".aut_wrap").hasClass("active")) {
                $(this).html('скрыть бонусы');
            } else {
                $('html, body').animate({
                    scrollTop: $('.book_aut_wrap').offset().top
                }, 500);
                $(this).html('ПОКАЗАТЬ ЕЩЕ 10 ШТ');
            }
        });

        $('.btn_review2').click(function() {
            $('.rev_block').toggleClass('active');

            $(this).toggleClass('btn_active');
        });

        $('button.btn_review2').click(function() {
            if ($(".rev_block").hasClass("active")) {
                $(this).html('Скрыть все отзывы');
            } else {
                $('html, body').animate({
                    scrollTop: $('.XcNEqAjaVgs').offset().top
                }, 500);
                $(this).html('Показать все отзывы');
            }
        });

        $(function() {

            var timerend = 7 * 60 * 1000;

            if (window.document.URL === 'https://edplatforma.com/viborbileta/') {
                timerend = 24 * 60 * 60 * 1000;
            }

            var coki = getCookie('timerLand');
            //coki = false
            var end;

            if (coki) {
                end = coki;
            } else {
                end = new Date();
                setCookie('timerLand', end.getTime(), 14)
            }

            var _milisec = 10;
            var _second = _milisec * 100;
            var _minute = _second * 60;
            var _hour = _minute * 60;
            var _day = _hour * 24;

            var parentElem = $('.timer_row, .t'),
                day = parentElem.find('.timer_col__days .timer_p__num'),
                hour = parentElem.find('.timer_col__hours .timer_p__num'),
                min = parentElem.find('.timer_col__minutes .timer_p__num'),
                sec = parentElem.find('.timer_col__seconds .timer_p__num'),
                mili = parentElem.find('.timer_col__milliseconds .timer_p__num');

            function showRemaining() {
                var now = new Date();
                var distance = end - now + timerend;

                if (distance < 0) {

                    day.text("00");
                    hour.text("00");
                    min.text("00");
                    sec.text("00");
                    mili.text("00");

                    clearInterval(intervalTimer);
                    return;
                }

                var days = Math.floor(distance / _day);
                var hours = Math.floor((distance % _day) / _hour);
                var minutes = Math.floor((distance % _hour) / _minute);
                var seconds = Math.floor((distance % _minute) / _second);
                var miliseconds = Math.floor((distance % _second) / _milisec);

                if (seconds < 10) seconds = '0' + seconds;
                if (minutes < 10) minutes = '0' + minutes;
                if (hours < 10) hours = '0' + hours;
                if (days < 10) days = '0' + days;

                day.text(days);
                hour.text(hours);
                min.text(minutes);
                sec.text(seconds);
                mili.text(miliseconds);
            };

            var intervalTimer = setInterval(showRemaining, 10);
        });



    }, 1000);

    /* ------------------- carousel ------------------- 

    $(function() {
        console.log('3');
        var carousel = $("#carousel").waterwheelCarousel({
            flankingItems: 2,
            separationMultiplier: 0.1,
            autoPlay: 4000,
            activeClassName: 'current',
            preloadImages: true
        });

        $('.prev').bind('click', function() {
            carousel.prev();
            return false
        });

        $('.next').bind('click', function() {
            carousel.next();
            return false;
        });

    });
*/
    /* 
        var utm_source = localStorage.utm_source ? localStorage.utm_source : '0',
            utm_content = localStorage.utm_content ? localStorage.utm_content : '0',
            utm_term = localStorage.utm_term ? localStorage.utm_term : '0',
            utm_campaign = localStorage.utm_campaign ? localStorage.utm_campaign : '0',
            utm_medium = localStorage.utm_medium ? localStorage.utm_medium : '0',
            response_id = localStorage.response_id ? localStorage.response_id : '0';
        var t_href = '//t.me/EDPLATFORMA_bot?start=i_id-' + response_id + '_cc-' + utm_content + '_ck-' + utm_term + '_cn-' + utm_campaign + '_cm-' + utm_medium + '_cs-' + utm_source + '';
        var m_href = '//m.me/clubplatforma?ref=i_id-' + response_id + '_cc-' + utm_content + '_ck-' + utm_term + '_cn-' + utm_campaign + '_cm-' + utm_medium + '_cs-' + utm_source + '';

        $('body').find('#btn_mes_tg').attr('href', t_href)
        $('body').find('#btn_mes_me').attr('href', m_href)
    */
    /* ------------------- device ------------------- */

    $('body > input[name="device"]').val($('html').attr('class'));




    /* ------------------- intl tel input ------------------- */



    /* ------------------- timer ------------------- */


    /* ------------------- modals ------------------- */
    /* html to overflow:hidden */
    $(function() {
        $('.modal').on('show.bs.modal hide.bs.modal', function(e) {
            $('html').toggleClass('modal-open');
            var btn = $(e.relatedTarget);
            var form_amount = $(e.target).find('[name="amount"]');
            var form_count = $(e.target).find('[name="productCount"]');
            form_amount.val(btn.data('amount'));
            form_count.val(btn.data('count'));
            //var amount = btn.data('amount');
            //var count = btn.data('count');
        });
    });

    /* modal when close site */
    $(function() {
        $(document).mouseleave(function(e) {
            var cookie = getCookie('closeModal');
            if (!cookie) {
                if (e.clientY < 0) {
                    $('.modal').modal('hide');
                    $('#celloid').modal('show');
                    setCookie('closeModal', 'opened', 1);
                }
            }
        });
    });

    /* modal for speakers */
    $(function() {
        var speakersModalId = '#olson';

        function speakerModalChange(img, img_temp, name, descr, tags, whoiswho) {
            var modal = $('.modal' + speakersModalId);
            modal.find('.ZvihvfhJKbA').html('').append(img_temp);
            modal.find('.UvUvNEQcByu').attr('data-src', img);
            modal.find('.lucencies').text(name);
            modal.find('input[name="form"]').val('Форма - Спикер ' + name + ' (pop-up)');
            modal.find('.ravin').text(descr);
            modal.find('.uninstanced .row').html(tags);
            modal.find('.adipous').html('');
            for (var i = 0; i < whoiswho.length; i++) {
                modal.find('.adipous').append('<p class="hitlerism">' + whoiswho[i].value + '</p>');
            }
        }
        $('button[data-target="' + speakersModalId + '"]').on('click', function() {
            var speaker = $(this).parents('.zIboLVArxtm'),
                speaker_img_temp = speaker.find('.ZvihvfhJKbA').html(),
                speaker_img = speaker.find('.UvUvNEQcByu')[0].src,
                speaker_name = speaker.find('.zuAteEXQXKC').text(),
                speaker_descr = speaker.find('.HeskajyjyoC').text(),
                speaker_tags = speaker.find('.mMEWOuHcjIL .row').html(),
                speaker_whoiswho = speaker.find('input[name="whoiswho"]');
            speakerModalChange(speaker_img, speaker_img_temp, speaker_name, speaker_descr, speaker_tags, speaker_whoiswho);
        });
    });

    $(".arrs a").click(function(e) {
        e.preventDefault();
        var $this = $(this),
            rel = $this.attr("rel"),
            el = rel === "content-y" ? ".demo-y" : rel === "content-x" ? ".demo-x" : ".demo-yx",
            data = $this.data("scroll-to"),
            href = $this.attr("href").split(/#(.+)/)[1],
            to = data ? $(el).find(".mCSB_container").find(data) : el === ".demo-yx" ? eval("(" + href + ")") : href,
            output = $("#info > p code"),
            outputTXTdata = el === ".demo-yx" ? data : "'" + data + "'",
            outputTXThref = el === ".demo-yx" ? href : "'" + href + "'",
            outputTXT = data ? "$('" + el + "').find('.mCSB_container').find(" + outputTXTdata + ")" : outputTXThref;
        $(el).mCustomScrollbar("scrollTo", to);
        output.text("$('" + el + "').mCustomScrollbar('scrollTo'," + outputTXT + ");");
    });


    var tickets = {
        energySilver: 1,
        energyGold: 1,
        energyPlatinum: 1
    };


    $(function() {
        progress();
        prices();
        ticketCounter();


        $(".scroll_to").click(function(e) {
            e.preventDefault();
            $("html, body").animate({ scrollTop: $($(this).attr("href")).offset().top },
                500,
                "linear"
            );
        });

        // Custom JS
    });

    function progress() {
        var pers = 0;
        var interval = setInterval(function() {
            let t = pers++ + "%";
            $(".pers").text(t);
            $(".pl_l").css("width", t);
            if (pers == 55) $(".pr span").css("color", "#fff");
            if (pers > 80) clearInterval(interval);
        }, 10);
    }

    function prices() {
        $('.pay_bilet').each(function() {
            $(this).find('.pt .wsnw .old_price').attr('data-price', $(this).find('.pt .wsnw .old_price').text());
            $(this).find('.pm .wsnw .new_price').attr('data-price', $(this).find('.pm .wsnw .new_price').text());
        });
    }

    function ticketCounter() {
        $(".act").click(function() {
            var type = $(this).attr("data-type");
            var action = $(this).attr("data-action");
            var old_price = Number($(this).parents('.pay_bilet').find('.pt .wsnw .old_price').attr('data-price')),
                new_price = Number($(this).parents('.pay_bilet').find('.pm .wsnw .new_price').attr('data-price')),
                econ = $(this).parents('.pay_bilet').find('.econ'),
                discount = $(this).parents('.pay_bilet').find('.econ .discount'),
                price_then, price_now, price_before, price_after;



            switch (action) {
                case "p":
                    {
                        tickets[type] = tickets[type] + 1;
                        price_then = old_price * tickets[type];
                        price_now = new_price * tickets[type];

                        if (tickets[type] === 2) {
                            price_before = price_now - (price_now * .05);
                            econ.addClass('active');
                        } else if (tickets[type] >= 3 && tickets[type] < 5) {
                            price_before = price_now - (price_now * .05);
                        } else if (tickets[type] >= 5) {
                            price_before = price_now - (price_now * .1);
                        } else {
                            price_before = price_now;
                            econ.removeClass('active');
                        }
                        break;
                    }
                case "m":
                    {
                        tickets[type] = tickets[type] > 1 ? tickets[type] - 1 : 1;
                        price_then = old_price * tickets[type];
                        price_now = new_price * tickets[type];
                        if (tickets[type] === 2) {
                            price_before = price_now - (price_now * .05);
                            econ.addClass('active');
                        } else if (tickets[type] >= 3 && tickets[type] < 5) {
                            price_before = price_now - (price_now * .05);
                        } else if (tickets[type] >= 5) {
                            price_before = price_now - (price_now * .1);
                        } else {
                            price_before = price_now;
                            econ.removeClass('active');
                        }
                        break;
                    }
                default:
                    break;
            }
            discount.text(price_now);
            $(this).parents('.pay_bilet').find('.pt .wsnw .old_price').text(price_then);
            $(this).parents('.pay_bilet').find('.pm .wsnw .new_price').text(Math.round(price_before));
            $(this).parents('.pay_bilet').find('[data-toggle="modal"]').attr('data-amount', Math.round(price_before));
            $(this).parents('.pay_bilet').find('[data-toggle="modal"]').attr('data-count', tickets[type]);
            $('.co[data-type="' + type + '"]').text(tickets[type]);

        });
    }

});







/* ------------------- forms api ------------------- */
$(function() {

    function getURLParameter(name) {
        return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(location.search) || [null, ''])[1].replace(/\+/g, '%20')) || '';
    }

    if (localStorage.name) {
        $('input[name="name"]').val(localStorage.name);
    }
    if (localStorage.email) {
        $('input[name="email"]').val(localStorage.email);
    }
    if (localStorage.phone) {
        $('input[name="phone"]').val(localStorage.phone);
    }




    $('form').submit(function(event) {
        event.preventDefault();

        var form = $(this),
            name = form.find('input[name="name"]').val(),
            email = form.find('input[name="email"]') ? form.find('input[name="email"]').val() : '',
            phone = form.find('input[name="phone"]').val(),
            country = form.find('.iti__selected-flag').attr('title'),
            form_name = form.find('input[name="form"]').val(),
            productCount = form.find('input[name="productCount"]').val(),
            amount = form.find('input[name="amount"]').val(),
            productPrice = form.find('input[name="productPrice"]').val();

        var page_url = $('body > input[name="page_url"]').val(),
            ip = $('body > input[name="ip"]').val(),
            utm_campaign = getURLParameter('utm_campaign') ? getURLParameter('utm_campaign') : localStorage.utm_campaign,
            utm_medium = getURLParameter('utm_medium') ? getURLParameter('utm_medium') : localStorage.utm_medium,
            utm_source = getURLParameter('utm_source') ? getURLParameter('utm_source') : localStorage.utm_source,
            utm_content = getURLParameter('utm_content') ? getURLParameter('utm_content') : localStorage.utm_content,
            utm_term = getURLParameter('utm_term') ? getURLParameter('utm_term') : localStorage.utm_term,
            referer = $('body > input[name="referer"]').val(),
            device = $('body > input[name="device"]').val(),
            thx = form.find('input[name="thx"]').val(),
            mailerlite = 'false';

        var response_id = false;



        var gUrl = 'https://docs.google.com/forms/d/e/1FAIpQLSfweoBQjcw_o0XXhXp-PXH5BTk69ujKDY7otT161-CDzdrMnA/formResponse';

        if (form_name === 'Online' ||
            form_name === 'Silver' ||
            form_name === 'Gold' ||
            form_name === 'Platinum') {
            thx = false;
            gUrl = 'https://docs.google.com/forms/d/e/1FAIpQLSfpuuS5b_B_v7nOfeZuB9GbNY_SZdjq2s9ksxfXk9CcMWQZ0w/formResponse';
        }

        $.ajax({
            url: 'app/api.php',
            type: 'POST',
            data: {
                name: name,
                email: email,
                phone: phone,
                country: country,
                form: form_name,
                productCount: productCount,
                amount: amount,
                productPrice: productPrice,
                ip: ip,
                utm_campaign: utm_campaign,
                utm_medium: utm_medium,
                utm_source: utm_source,
                utm_content: utm_content,
                utm_term: utm_term,
                referer: referer,
                device: device,
                page_url: page_url,
                mailerlite: mailerlite
            },
            beforeSend: function() {
                form.find('button[type="submit"]').attr('disabled', 'disabled');
                $('body').addClass('loading');
            },
            success: function(response) {
                var response = JSON.parse(response);
                var resp = JSON.parse(response.data);

                localStorage.setItem("name", name);
                localStorage.setItem("email", email);
                localStorage.setItem("phone", phone);
                localStorage.setItem("country", country);
                localStorage.setItem("referer", referer);
                localStorage.setItem("utm_campaign", utm_campaign);
                localStorage.setItem("utm_medium", utm_medium);
                localStorage.setItem("utm_source", utm_source);
                localStorage.setItem("utm_content", utm_content);
                localStorage.setItem("utm_term", utm_term);
                localStorage.setItem("response_id", resp.id);

                if (form.parents('.thightness').find('.shaster.d-none').length !== 0) {
                    form.parents('.beadrolls').toggleClass('d-none');
                    form.parents('.thightness').find('.shaster').toggleClass('d-none');
                } else {
                    var gDataFIelds = {
                        'entry.1378648537': name,
                        'entry.906441403': phone,
                        'entry.1561585642': email,
                        'entry.2147320007': resp.id,
                        'entry.394938287': form_name,
                        'entry.460216031': utm_source,
                        'entry.212170628': utm_content,
                        'entry.1079784546': utm_campaign,
                        'entry.922426768': utm_term,
                        'entry.946055790': utm_medium,
                        'entry.1304558152': country,
                        'entry.1739428933': resp.message ? resp.message : resp.status,
                    };

                    $.ajax({
                        type: "POST",
                        url: gUrl,
                        dataType: 'xml',
                        data: gDataFIelds,
                        statusCode: {
                            0: function() {
                                form.find('button[type="submit"]').removeAttr('disabled');
                                $('body').removeClass('loading');
                                if (thx) {
                                    window.location.href = thx;
                                } else {
                                    var wayforpay = new Wayforpay();
                                    var pay = function() {
                                        wayforpay.run({
                                                merchantAccount: "pavelgonza_com",
                                                merchantDomainName: "http://pavelgonza.com",
                                                authorizationType: "SimpleSignature",
                                                merchantSignature: response.hash,
                                                orderReference: resp.id + '_' + response.time,
                                                orderDate: response.time,
                                                amount: amount,
                                                currency: "UAH",
                                                productName: form_name,
                                                productPrice: productPrice,
                                                productCount: productCount,
                                                clientFirstName: name,
                                                clientLastName: name,
                                                clientEmail: email,
                                                clientPhone: phone,
                                            },
                                            function(response) {
                                                //console.log(response)
                                            },
                                            function(response) {
                                                // on declined
                                                //console.log(response)
                                            },
                                            function(response) {
                                                // on pending or in processing
                                                //console.log(response)
                                            }
                                        );
                                    }
                                    pay();
                                }
                            }
                        }
                    });
                }
            },
            error: function(response) {
                form.html('<p style="text-align:center;">Ошибка отправки сообщения</p>');
                $('body').removeClass('loading');
            }
        });
    });
});
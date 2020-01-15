$(window).on('load', function() {

    if (localStorage.name) {
        $('input[name="name"]').val(localStorage.name);
    }
    if (localStorage.email) {
        $('input[name="email"]').val(localStorage.email);
    }
    if (localStorage.phone) {
        $('input[name="phone"]').val(localStorage.phone);
    }

    var iswebp = Modernizr.webp;
    var prefix = 'jpg';

    if (iswebp) {
        var data_key, data_val;
        $('picture source, picture img, [data-bgurl]').each(function() {
            data_key = Object.keys($(this).data())[0];
            data_val = $(this).attr('data-' + data_key);

            if ($(this).attr('data-bgurl')) {

                if (!(data_val.split('.')[1] === 'webp' || data_val.split('.')[1] === 'svg')) {
                    var filename = data_val.split('.')[0] + '.webp';
                    $(this).attr('data-' + data_key, filename);
                    console.log(filename);
                    // $.get(filename).done(function(data, status) {
                    //     console.log(status);
                    //     $(this).attr('data-' + data_key, filename);
                    // }).fail(function() {
                    //     filename = data_val.replace('.webp', '.jpg');
                    //     $(this).attr('data-' + data_key, filename);
                    // });
                }
            } else {
                $(this).attr('data-' + data_key, data_val);
            }

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

        $(function() {

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
});
/* ------------------- forms api ------------------- */
$(function() {

    function getURLParameter(name) {
        return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(location.search) || [null, ''])[1].replace(/\+/g, '%20')) || '';
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
                                        });
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
        })
    })
});

/* -- end -- */
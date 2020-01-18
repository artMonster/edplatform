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
                }
            } else {
                $(this).attr('data-' + data_key, data_val);
            }

        });
    }



    $('[data-bgurl]').each(function() {
        $(this).css('background-image', 'url("' + $(this).attr('data-bgurl') + '")');
    });

    window.setTimeout(function() {
        $('img').addClass('lazyload');
        $('body').addClass('load');
    }, 100);

});


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
    'cross-site-cookie=bar; SameSite=None; Secure';
    document.cookie = '' + c_name + '=' + c_value + '; SameSite=None; Secure';
}

(function() {

    var coki = getCookie('timerLand');
    var end;

    if (coki) {
        end = coki;
    } else {
        end = new Date();
        setCookie('timerLand', end.getTime(), 14)
    }

    var _milisec = 10,
        _second = _milisec * 100,
        _minute = _second * 60,
        _hour = _minute * 60,
        _day = _hour * 24;

    var parentElem = $('.timer_row, .t'),
        day = parentElem.find('.timer_col__days .timer_p__num'),
        hour = parentElem.find('.timer_col__hours .timer_p__num'),
        min = parentElem.find('.timer_col__minutes .timer_p__num'),
        sec = parentElem.find('.timer_col__seconds .timer_p__num'),
        mili = parentElem.find('.timer_col__milliseconds .timer_p__num');

    function getURLParameter(name) {
        var res = decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(location.search) || [null, ''])[1].replace(/\+/g, '%20')) || '';
        return res ? res : ''
    }





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
    }

    var intervalTimer = setInterval(showRemaining, 10);

    /* ------------------- cookies ------------------- */

    var utm = {
        campaign: getURLParameter('utm_campaign'),
        medium: getURLParameter('utm_medium'),
        source: getURLParameter('utm_source'),
        content: getURLParameter('utm_content'),
        term: getURLParameter('utm_term')
    }

    if (utm.campaign) localStorage.setItem("utm_campaign", utm.campaign);
    if (utm.medium) localStorage.setItem("utm_medium", utm.medium);
    if (utm.source) localStorage.setItem("utm_source", utm.source);
    if (utm.content) localStorage.setItem("utm_content", utm.content);
    if (utm.term) localStorage.setItem("utm_term", utm.term);

    var input = $('input, textarea');
    var select = $('select');
    var form = $('form');
    var patternHidden = /(\D)+[^0-9]{1,}/i;
    var patternText = /(\D)+[^0-9]{1,}/i;
    var patternEmail = /^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i;
    var patternTel = /([+()0-9 ]){9,18}/i;
    var errorFieldsMessage = {
        text: ' Имя',
        tel: ' Телефон',
        email: ' Электронная почта',
        checkbox: ' Подтверждение согласия',
    };

    $("[data-btn]").click(function() {
        $('form').attr('data-id', $(this).data('btn'));
    });

    function validationsField(field) {

        var fieldValue = field[0].value;
        var fieldType = field[0].type;

        if (fieldType == 'email') {
            var pattern = patternEmail;
        } else if (fieldType == 'text' || fieldType == 'textarea') {
            var pattern = patternText;
        } else if (fieldType == 'tel') {
            var pattern = patternTel;
        } else if (fieldType == 'hidden') {
            return true;
        } else if (fieldType == 'checkbox') {
            return true;
        }
        return pattern.test(fieldValue);
    }

    function validationsForm(form) {

        var fields = form.find('input:not([type=radio])');
        var errorAlert = form.find('.alert');
        var errorTags = form.find('.error-message');
        var numberIsValid = 0;
        var errorMessage = [];

        fields.each(function() {
            var field = $(this);
            var errorFieldType = field[0].type;
            if (validationsField(field)) {
                field.removeClass('is-invalid').addClass('is-valid');
                numberIsValid++;
            } else {
                if (errorFieldType == 'text') {
                    errorMessage.push(errorFieldsMessage.text);
                } else if (errorFieldType == 'tel') {
                    errorMessage.push(errorFieldsMessage.tel);
                } else if (errorFieldType == 'email') {
                    errorMessage.push(errorFieldsMessage.email);
                } else if (errorFieldType == 'checkbox') {
                    errorMessage.push(errorFieldsMessage.checkbox);
                }
                field.addClass('is-invalid');
            }
        });

        if (errorMessage.length > 0) {
            errorTags.html('<div style="margin: 1rem 0;" class="alert alert-danger" role="alert"><span class="alert-heading small">' + '<small>Ошибка: </small></span><small><b> ' + errorMessage + ' </b></small></div>');
        }
        return fields.length == numberIsValid;

    }

    function keyupEventOff(e) {
        if (e.target.value === '') {
            $(this).removeClass('active');
        }
    }

    function keyupEvent(e) {

        var field = $(this);
        field.addClass('active');

        var errorTags = field.closest('form').find('.error-message');
        errorTags.html('');

        field.hasClass('is-invalid') ? field.removeClass('is-invalid') : false;
        validationsField(field) ? field.addClass('is-valid') : field.removeClass('is-valid');
    }

    function form_spiner() {
        return spiner_template = '<div class="ed-spiner"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 590 590"><path d="M295,590a70,70,0,0,1,0-140c85.47,0,155-69.53,155-155S380.47,140,295,140,140,209.53,140,295A70,70,0,0,1,0,295,295.06,295.06,0,0,1,566.79,180.15,294.93,294.93,0,0,1,295,590Z"/><circle class="cls-1" cx="295" cy="295" r="70"/></svg></div>';
    }

    function submitForm(event) {

        var form = $(this),
            formbtn = form.find('button[type="submit"]');

        //var form = $(this).closest('form'), formbtn = $(this);


        if (validationsForm(form)) {

            formbtn.attr('disabled', true);
            form.append(form_spiner()).addClass('send');

            var name = form.find('input[name="name"]').val(),
                email = event.target.elements.email ? form.find('input[name="email"]').val() : null,
                phone = form.find('input[name="phone"]').val(),
                country = form.find('.iti__selected-flag').attr('title') ? form.find('.iti__selected-flag').attr('title') : null,
                form_name = form.find('input[name="form"]').val(),
                productCount = form.find('input[name="productCount"]').val(),
                amount = form.find('input[name="amount"]').val(),
                productPrice = form.find('input[name="productPrice"]').val();

            var page_url = window.location.href,
                utm_campaign = utm.campaign ? utm.campaign : localStorage.utm_campaign,
                utm_medium = utm.medium ? utm.medium : localStorage.utm_medium,
                utm_source = utm.source ? utm.source : localStorage.utm_source,
                utm_content = utm.content ? utm.content : localStorage.utm_content,
                utm_term = utm.term ? utm.term : localStorage.utm_term,
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
                    utm_campaign: utm_campaign,
                    utm_medium: utm_medium,
                    utm_source: utm_source,
                    utm_content: utm_content,
                    utm_term: utm_term,
                    page_url: page_url,
                    mailerlite: mailerlite,
                },
                success: function(response) {
                    var response = JSON.parse(response);
                    var resp = JSON.parse(response.data);

                    localStorage.setItem("name", name);
                    if (email) localStorage.setItem("email", email);
                    localStorage.setItem("phone", phone);
                    localStorage.setItem("country", country);
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
                                    if (thx) {
                                        window.location.href = thx;
                                    } else {
                                        formbtn.attr('disabled', false);
                                        form.find('.ed-spiner').remove();
                                        form.removeClass('send');
                                        $('body').find('.modal.fade.show').modal('hide');

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
                                    return;
                                }
                            }
                        });
                    }
                },
                error: function(response) {
                    form.html('<p style="text-align:center;">Ошибка отправки сообщения</p>');
                    form.removeClass('send');
                }
            }); /* ---- ajax ---- */
        } else {
            event.preventDefault();
            return false;
        }
    }

    input.keyup(keyupEvent).focusout(keyupEventOff).change(keyupEvent);
    form.submit(submitForm);

})();
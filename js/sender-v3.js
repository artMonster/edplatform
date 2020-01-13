$(function() {

    var input = $('input, textarea');
  var select = $('select');
  var form = $('form');
  var patternHidden = /(\D)+[^0-9]{1,}/i;
  var patternText = /(\D)+[^0-9]{1,}/i;
  var patternEmail = /^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i;
  var patternTel = /([+()0-9 ]){9,18}/i;
  var errorFieldsMessage = {
    text : ' Имя',
    tel : ' Телефон',
    email : ' Email',
    checkbox : ' Подтверждение согласия',
  };

  $("[data-btn]").click(function () {
    $('form').attr('data-id', $(this).data('btn'));
  });

  function getURLParameter(name) {
    return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(location.search) || [null, ''])[1].replace(/\+/g, '%20')) || '';
  }

  function validationsField(field) {

    var fieldValue = field[0].value;
    var fieldType = field[0].type;

    field.removeClass('is-invalid').removeClass('animated').removeClass('shake');
    

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
    var errorTags = form.find('.form-group-submit');
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
        } else if (errorFieldType == 'tel'){
          errorMessage.push(errorFieldsMessage.tel);
        } else if (errorFieldType == 'email') {
          errorMessage.push(errorFieldsMessage.email);
        } else if (errorFieldType == 'checkbox') {
          errorMessage.push(errorFieldsMessage.checkbox);
        }
        field.addClass('is-invalid animated shake');
        var t = 2000;
  window.setTimeout(function() {
    field.removeClass('is-invalid animated shake');
  }, t);

        

      }
      
    });

    if (errorMessage.length > 0) {
      errorTags.append('<div style="border: 4px solid #f8d7da; z-index: 7777; padding: 1.5rem 0rem 1.45rem 0rem; position: absolute; left: 5px; bottom: -1rem; width: calc(100% - 10px);" class="alert alert-danger animated fadeInDown text-center" role="alert">' + 'Ошибка: <b> ' + errorMessage + ' </b></div>');
      var t = 2000;
  window.setTimeout(function() {
    form.find('.alert-danger').removeClass('fadeInDown').addClass('fadeOutUp');
    window.setTimeout(function() {
    form.find('.alert-danger').remove();
    }, 500)
  }, t);

    } else {
      null;
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
  

    field.hasClass('is-invalid') ? field.removeClass('is-invalid').removeClass('animated').removeClass('shake') : false;
    validationsField(field) ? field.addClass('is-valid') : field.removeClass('is-valid');

  }

  function submitForm(e) {
    e.preventDefault();
    

    var me = $(this);

    var dataFields = me.find('input');
    var form_id = me.data('id');
    var btnSubmit = me.find('[type="submit"]');
    var data = me.find('input[name="data"]');
    var link = 'http://localhost/ny2020/app/';

    if (validationsForm(me)) {
      me.addClass('send');
      btnSubmit.attr('disabled', true);

      var utm_content = getURLParameter('utm_content');
      var utm_medium = getURLParameter('utm_medium');
      var utm_source = getURLParameter('utm_source');
      var utm_term = getURLParameter('utm_term');
      var utm_campaign = getURLParameter('utm_campaign');
      
      var utm_arr = {link,form_id,utm_source,utm_campaign,utm_content,utm_term,utm_medium};

      data.val( JSON.stringify( utm_arr ));


      localStorage.un = me.find('input[name="name"]').val();
      localStorage.up = me.find('input[name="phone"]').val();
      localStorage.ue = me.find('input[name="email"]').val();

      var fieldsData = me.serialize();



      $.ajax({
        type: 'POST',
        url: 'handler/handler.php',
        data: fieldsData,
        success: function(data, textStatus, errorThrown){
          if (data) {
            var resp = JSON.parse(data);
            if (!resp.ok && resp.msg) {
              //alert(resp.r);
            }



            var gDataFIelds = {
                  'entry.1378648537': me.find('input[name="name"]').val(),
                  'entry.906441403': me.find('input[name="phone"]').val(),
                  'entry.1561585642': me.find('input[name="email"]').val(),
                  'entry.1304558152': JSON.stringify( utm_arr ),
                  'entry.2147320007': fieldsData,
                  'entry.1739428933': JSON.stringify( resp ),
                };

                $.ajax({
                  type: "POST",
                  url: 'https://docs.google.com/forms/d/e/1FAIpQLSf6IhoSwkquAkHNYEKbO9Rv_OEix6ZtPiod_Lz2c2KxuNSg2A/formResponse',
                  dataType: 'xml',
                  data: gDataFIelds,
                  statusCode: {
                    0: function() {
                    }
                  }
                });

            if (resp.r) {
                window.location.href = resp.r;
            } else {
              me[0].reset();
              dataFields.removeClass('active').removeClass('is-valid');

              btnSubmit.attr('disabled', false);
              me.removeClass('send');
            }
          }
        },
        error: function(data, textStatus, errorThrown){
          console.log('failed', data, textStatus, errorThrown);
        }
      });

      
      
    } 
  }

  input.keyup(keyupEvent).focusout(keyupEventOff).change(keyupEvent);
  form.submit(submitForm);  
  
});
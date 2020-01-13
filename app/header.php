<?php
    $path = dirname(str_replace($_SERVER['DOCUMENT_ROOT'], '//'.$_SERVER['HTTP_HOST'].'/', __DIR__));
?>

<!DOCTYPE html>
<html lang="ru">
    <head>
        <?php if ($page == 'page-index'): ?>
            <!-- Google Analytics Content Experiment code -->
            <script>function utmx_section(){}function utmx(){}(function(){var
                    k='188342479-1',d=document,l=d.location,c=d.cookie;
                    if(l.search.indexOf('utm_expid='+k)>0)return;
                    function f(n){if(c){var i=c.indexOf(n+'=');if(i>-1){var j=c.
                    indexOf(';',i);return escape(c.substring(i+n.length+1,j<0?c.
                        length:j))}}}var x=f('__utmx'),xx=f('__utmxx'),h=l.hash;d.write(
                        '<sc'+'ript src="'+'http'+(l.protocol=='https:'?'s://ssl':
                        '://www')+'.google-analytics.com/ga_exp.js?'+'utmxkey='+k+
                        '&utmx='+(x?x:'')+'&utmxx='+(xx?xx:'')+'&utmxtime='+new Date().
                        valueOf()+(h?'&utmxhash='+escape(h.substr(1)):'')+
                        '" type="text/javascript" charset="utf-8"><\/sc'+'ript>')})();
            </script><script>utmx('url','A/B');</script>
            <!-- End of Google Analytics Content Experiment code -->
        <?php endif; ?>
        <meta charset="utf-8">
        <title>EDPLATFORMA - КРУПНЕЙШИЙ ФОРУМ СТРАНЫ ПО ЗАПУСКУ И СОЗДАНИЮ ОБРАЗОВАТЕЛЬНЫХ ПРОЕКТОВ</title>
        <meta name="description" content="Участвуйте в 2-дневном форуме и перейдите от модели «эксперт-одиночка» к модели «прибыльной образовательной платформы»">
        <meta property="og:title" content="EDPLATFORMA - КРУПНЕЙШИЙ ФОРУМ СТРАНЫ ПО ЗАПУСКУ И СОЗДАНИЮ ОБРАЗОВАТЕЛЬНЫХ ПРОЕКТОВ">
        <meta property="og:site_name" content="EdPlatforma">
        <meta property="og:url" content="http://www.edplatforma.com">
        <meta property="og:description" content="Участвуйте в 2-дневном форуме и перейдите от модели «эксперт-одиночка» к модели «прибыльной образовательной платформы»">
        <meta property="og:image" content="<?php echo $path ?>/img/screen.png">
        <meta name="theme-color" content="#2A2F4F">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1">
        <link rel="shortcut icon" href="<?php echo $path ?>/img/icon.ico">
        <link rel="stylesheet" href="//cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/4.1.3/css/bootstrap.min.css">
        <link rel="stylesheet" href="<?php echo $path ?>/css/intltelinput.min.css">
        <?php if ($page != 'page-sub'): ?>
            <link rel = "stylesheet" href = "<?php echo $path ?>/css/main.css" >
        <?php endif; ?>
        <?php if ($page == 'page-video'): ?>
            <link rel = "stylesheet" href = "https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.9.0/slick.min.css" >
            <link rel = "stylesheet" href = "https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.9.0/slick-theme.min.css" >
        <?php endif; ?>

        <style>
            form { position: relative; }
            .pupilages .bridging, .VzpBDgKojMy { border-bottom-width: 2px; }
            input.accept { border-bottom: 2px solid #31c82e; }
            input.error { border-bottom: 2px solid #e80e3e; }
            .modal .error-message {
                position: absolute;
                left: calc(50% - 39%);
                text-align: center;
                width: 78%;
                font-size: .8rem;
                background: #e80e3e;
                z-index: 2;
                bottom: 35px;
                padding: 10px 6px;
                color: white;
            }
            .error-message {
                position: absolute;
                left: 0;
                text-align: center;
                width: 100%;
                font-size: .8rem;
                background: #e80e3e;
                z-index: 2;
                bottom: -70px;
                padding: 10px 6px;
                color: white;
            }
            .kappie {
                z-index: 2;
            }
        </style>
        <?php /*
        <!-- Global site tag (gtag.js) - Google Analytics -->
        <script async src="https://www.googletagmanager.com/gtag/js?id=UA-132866370-1"></script>
        <script>
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', 'UA-132866370-1');
        </script>
        */?>
        
        <!-- Google Tag Manager -->
            <script>(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','GTM-MBV9GDP');</script>
        <!-- End Google Tag Manager -->
    
        <!-- Facebook Pixel Code -->
            <script>
                !function(f,b,e,v,n,t,s)
                {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
                    n.callMethod.apply(n,arguments):n.queue.push(arguments)};
                    if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
                    n.queue=[];t=b.createElement(e);t.async=!0;
                    t.src=v;s=b.getElementsByTagName(e)[0];
                    s.parentNode.insertBefore(t,s)}(window, document,'script',
                    'https://connect.facebook.net/en_US/fbevents.js');
                fbq('init', '1492213370873481');
                fbq('track', 'PageView');
            </script>
            <noscript><img height="1" width="1" style="display:none" src="https://www.facebook.com/tr?id=1492213370873481&ev=PageView&noscript=1"/></noscript>
        <!-- End Facebook Pixel Code -->

        <!-- Facebook Pixel Code -->
            <script>
              !function(f,b,e,v,n,t,s)
              {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
              n.callMethod.apply(n,arguments):n.queue.push(arguments)};
              if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
              n.queue=[];t=b.createElement(e);t.async=!0;
              t.src=v;s=b.getElementsByTagName(e)[0];
              s.parentNode.insertBefore(t,s)}(window, document,'script',
              'https://connect.facebook.net/en_US/fbevents.js');
              fbq('init', '1689255384441954');
              fbq('track', 'PageView');
            </script>
            <noscript><img height="1" width="1" style="display:none"
              src="https://www.facebook.com/tr?id=1689255384441954&ev=PageView&noscript=1"
            /></noscript>
        <!-- End Facebook Pixel Code -->
        <!-- Facebook Pixel Code -->
            <script>
              !function(f,b,e,v,n,t,s)
              {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
              n.callMethod.apply(n,arguments):n.queue.push(arguments)};
              if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
              n.queue=[];t=b.createElement(e);t.async=!0;
              t.src=v;s=b.getElementsByTagName(e)[0];
              s.parentNode.insertBefore(t,s)}(window, document,'script',
              'https://connect.facebook.net/en_US/fbevents.js');
              fbq('init', '394173191347726');
              fbq('track', 'PageView');
            </script>
            <noscript><img height="1" width="1" style="display:none"
              src="https://www.facebook.com/tr?id=394173191347726&ev=PageView&noscript=1"
            /></noscript>
            <!-- End Facebook Pixel Code -->
        <!-- Yandex.Metrika counter -->
            <script type="text/javascript" >
                (function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
                    m[i].l=1*new Date();k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)})
                (window, document, "script", "https://mc.yandex.ru/metrika/tag.js", "ym");
    
                ym(52149856, "init", {
                    id:52149856,
                    clickmap:true,
                    trackLinks:true,
                    accurateTrackBounce:true,
                    webvisor:true
                });
            </script>
            <noscript><div><img src="https://mc.yandex.ru/watch/52149856" style="position:absolute; left:-9999px;" alt="" /></div></noscript>
        <!-- /Yandex.Metrika counter -->


    </head> 
    <body class="<?php echo $page ?>">
<!-- Google Tag Manager (noscript) -->
<noscript><iframe src="https://www.googletagmanager.com/ns.html?id=GTM-MBV9GDP"
height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript>
<!-- End Google Tag Manager (noscript) -->

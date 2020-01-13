<?php
//  -------------------------- variables -----------------------------
$form = $_POST['form'];
$name = $_POST['name'];
$email = $_POST['email'];
$phone = str_replace([' ', '(', ')', '-'], '', $_POST['phone']);
$country = $_POST['country'];
$page_url = $_POST['page_url'];
$ip = $_POST['ip'];
$utm_campaign = $_POST['utm_campaign'];
$utm_medium = $_POST['utm_medium'];
$utm_source = $_POST['utm_source'];
$utm_content = $_POST['utm_content'];
$utm_term = $_POST['utm_term'];
$referer = $_POST['referer'];
$device = $_POST['device'];
$mailerlite = $_POST['mailerlite'];
$productCount = $_POST['productCount'];
$amount = $_POST['amount'];
$productPrice = $_POST['productPrice'];

// if ($mailerlite == 'true') {
//     echo 'ok';
// } else {
//     var_dump($mailerlite);
// }



//  -------------------------- Google Sheets ------------------------------
/*
$gsheets_url = 'https://script.google.com/macros/s/AKfycbwypsetDeFuXoEZsKeNGHh9VBiNdqeSYr50mnKx8kQbz5uY8-xu/exec';
$gsheets_post_data = array();

$gsheets_post_data['form'] = ($form != null) ? $form : '-';
$gsheets_post_data['name'] = ($name != null) ? $name : '-';
$gsheets_post_data['email'] = ($email != null) ? $email : '-';
$gsheets_post_data['phone'] = ($phone != null) ? $phone : '-';
$gsheets_post_data['country'] = ($country != null) ? $country : '-';
$gsheets_post_data['page_url'] = ($page_url != null) ? $page_url : '-';
$gsheets_post_data['ip'] = ($ip != null) ? $ip : '-';
$gsheets_post_data['utm_campaign'] = ($utm_campaign != null) ? $utm_campaign : '-';
$gsheets_post_data['utm_medium'] = ($utm_medium != null) ? $utm_medium : '-';
$gsheets_post_data['utm_source'] = ($utm_source != null) ? $utm_source : '-';
$gsheets_post_data['utm_content'] = ($utm_content != null) ? $utm_content : '-';
$gsheets_post_data['utm_term'] = ($utm_term != null) ? $utm_term : '-';
$gsheets_post_data['referer'] = ($referer != null) ? $referer : '-';
$gsheets_post_data['device'] = ($device != null) ? $device : '-';
$gsheets_post_data['datetime'] =  date('Y.m.d H:i:s');

$gsheets_post_url = $gsheets_url . '?' . http_build_query($gsheets_post_data);
$gsheets_post_data = curl_init();
    curl_setopt($gsheets_post_data, CURLOPT_URL, $gsheets_post_url);
    curl_setopt($gsheets_post_data, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($gsheets_post_data, CURLOPT_HTTPHEADER, array('Content-Type: application/json'));
$result = curl_exec($gsheets_post_data);
curl_close($gsheets_post_data);

ver_dump($result);
*/
//  -------------------------- MalikCRM ------------------------------
define('MALIKCRM_API_URL', 'https://pavelgonza.malikcrm.ru/api/add');
define('MALIKCRM_API_SECRET_KEY', 'lifeforumkey');
if (!empty($amount)) {
    define('MALIKCRM_PROJECT_ID', '30');
} else {
    define('MALIKCRM_PROJECT_ID', '27');
}

$data = array(
    'project_id' => MALIKCRM_PROJECT_ID,
    'name' => $name,
    'email' => $email,
    'phone' => $phone,
//    'comment' => $form.PHP_EOL.PHP_EOL.'utm_source - '.$utm_source.PHP_EOL.'utm_campaign - '.$utm_campaign.PHP_EOL.'utm_medium - '.$utm_medium.PHP_EOL.'utm_term - '.$utm_term.PHP_EOL.'utm_content - '.$utm_content ,
    'comment' => $form,
    'utm_source' => $utm_source,
    'utm_campaign' => $utm_campaign,
    'utm_medium' => $utm_medium,
    'utm_term' => $utm_term,
    'utm_content' => $utm_content,
);

$data['hash'] = md5($data['project_id'].$data['name'].$data['phone'].MALIKCRM_API_SECRET_KEY);



$curl = curl_init();
    curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($curl, CURLOPT_URL, MALIKCRM_API_URL);
    curl_setopt($curl, CURLOPT_CUSTOMREQUEST, 'POST');
    curl_setopt($curl, CURLOPT_POSTFIELDS, http_build_query($data));
    curl_setopt($curl, CURLOPT_HEADER, false);
$result = curl_exec($curl);

$merchantAccount = 'pavelgonza_com'; // test_merch_n1

$time =  time();

$string = "pavelgonza_com;http://pavelgonza.com;" . json_decode($result, true)['id'] . "_" . $time .";". $time .";" . $amount . ";UAH;" . $form . ";" . $productCount . ";" . $productPrice . "";
$key = "a08a208296bac02ed90f7edf2de0dc7d02136757"; 
$hash = hash_hmac("md5",$string,$key);

$result = array(
    'data' => $result,
    'hash' => $hash,
    'time' => $time,
    'string' => $string,
);
echo json_encode($result);
    //var_dump($result);


//  -------------------------- Mailerlite SDK ------------------------------
if ($mailerlite == 'true') {
    require 'vendor/autoload.php';

    $groupsApi = (new MailerLiteApi\MailerLite("7ebb468096019dcb55930ca188fbc13f"))->groups();

    $subscriber = [
        'email' => $email,
        'fields' => [
            'name' => $name,
            'phone' => $phone,
            'formname' => $form,
            'utm_source' => $utm_source,
            'utm_campaign' => $utm_campaign,
            'utm_medium' => $utm_medium,
            'utm_term' => $utm_term,
            'utm_content' => $utm_content,
        ]
    ];

    $response = $groupsApi->addSubscriber(10992782, $subscriber);
}

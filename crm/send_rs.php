<?php

define('MALIKCRM_API_URL', 'http://pavelgonza.malikcrm.ru/api/add'); // URL для запросов
define('MALIKCRM_API_SECRET_KEY', 'lifeforumkey'); // Секретный ключ для API запросов (можно задать в разделе "Настройки API")
define('MALIKCRM_PROJECT_ID', '18'); // Числовой идентификатор проекта в CRM (можно найти в разделе "Проекты")

$name = trim($_POST['name']);
$phone = trim($_POST['phone']);
$email = trim($_POST['email']);
$comment = 'rs';
$utm_source = trim($_POST['utm_source']);
$utm_campaign = trim($_POST['utm_campaign']);
$utm_medium = trim($_POST['utm_medium']);
$utm_term = trim($_POST['utm_term']);
$utm_content = trim($_POST['utm_content']);

// Максимальный набор данных
$data = array(
    'project_id' => MALIKCRM_PROJECT_ID,
    'name' => $name, // Имя клиента
    'email' => $email, // Электронный адрес клиента
    'phone' => $phone, // Телефон клиента
    'comment' => $comment, // Комментарий к сделке
    'utm_source' => $utm_source, // UTM метки
    'utm_campaign' => $utm_campaign,
    'utm_medium' => $utm_medium,
    'utm_term' => $utm_term,
    'utm_content' => $utm_content,
);

// Генерация хеша для безопасности
$data['hash'] = md5($data['project_id'].$data['name'].$data['phone'].MALIKCRM_API_SECRET_KEY);

// Отправка POST запроса
$curl = curl_init();
curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);
curl_setopt($curl, CURLOPT_URL, MALIKCRM_API_URL);
curl_setopt($curl, CURLOPT_CUSTOMREQUEST, 'POST');
curl_setopt($curl, CURLOPT_POSTFIELDS, http_build_query($data));
curl_setopt($curl, CURLOPT_HEADER, false);
$result = curl_exec($curl);

?>
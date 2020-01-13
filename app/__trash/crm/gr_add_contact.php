<?php

//if ( trim($_POST['email']) && trim($_POST['phone']) && trim($_POST['name']) ) {

$fields = array(
	'name' => trim($_POST['name']),//'Виталий',
	'phone' => trim($_POST['phone']),//'+380999999999',
	'email' => trim($_POST['email']),//'hodachinskiy@gmail.com',
	'gr_campaign_id' => '4d2WF',//trim($_POST['gr_comp']),
);


require_once( 'GetResponseAPI3.class.php' );

$getresponse = new GetResponse('29b22d3931c8453e666ce7c427db40ca');


$arrContact = array(
	'query' => array(
		'email' => $fields['email'],
		'campaignId' => '4dgZK',
	),
	'fields' => 'email'
);

$contact = $getresponse->getContacts($arrContact);
$contact = json_decode(json_encode($contact), True);



if ($contact) {
	//echo "FIND CONTACT";

	$company = array();
	foreach ($contact as $value) {	
		$response = $getresponse->getContact($value['contactId']);
		$response = json_decode(json_encode($response), True);
		//array_push($company, $response['campaign']['campaignId']);
	}

	//$find_company = in_array($fields['gr_campaign_id'], $company);

	//if ($find_company) {
	//	$err = json_encode(array('error' => '9999'));
	//} else {

		$customFieldValues = array(
		    array('customFieldId' => '981AN',
		        'value' => array(
		            $fields['phone']
		        )
		    )
		);

		$arr_new_contact = array(
			'name' => $fields['name'],
			'email' => $fields['email'],
			'dayOfCycle' => 0,
			'campaign' => array('campaignId' => $fields['gr_campaign_id']),
			'customFieldValues' => $customFieldValues,
		);

		$responce = $getresponse->updateContact($value['contactId'], $arr_new_contact);
		//$responce = $getresponse->addContact($arr_new_contact);//updateContact $value['contactId']
		$responce = json_decode(json_encode($responce), True);

		echo "<pre>";
			
		var_dump($company);
		die;

		echo json_encode($responce);
		$gr_id = $value['contactId'];
	//}

} else {
	/*
	//echo "NO FIND CONTACT";
	$customFieldValues = array(
	    array('customFieldId' => 'aF5eh',
	        'value' => array(
	            $fields['phone']
	        )
	    )
	);
	$arr_new_contact = array(
		'name' => $fields['name'],
		'email' => $fields['email'],
		'dayOfCycle' => 0,
		'campaign' => array('campaignId' => $fields['gr_campaign_id']),
		'customFieldValues' => $customFieldValues,
	);

	$responce = $getresponse->addContact($arr_new_contact);

	$get_contact_id = $getresponse->getContacts($arrContact);
	$get_contact_id = json_decode(json_encode($get_contact_id), True);


	//echo json_encode(array('lgb_gr_user_id' => $get_contact_id[0]['contactId']));
	$gr_id = $get_contact_id[0]['contactId'];
	//echo "<pre>";
	var_dump($responce);
	//var_dump($get_contact_id[0]['contactId']);
	//echo json_encode($responce);
	*/
	}

//}
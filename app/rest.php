<?
// CRM server conection data
define('CRM_HOST', 'aquagradus.bitrix24.ua'); // your CRM domain name
define('CRM_PORT', '443'); // CRM server port
define('CRM_PATH', '/crm/configs/import/lead.php'); // CRM server REST service path

// CRM server authorization data
define('CRM_LOGIN', 'serg.adm.bitrix24@gmail.com'); // login of a CRM user able to manage leads
define('CRM_PASSWORD', 'Rsegpass2018'); // password of a CRM user
// OR you can send special authorization hash which is sent by server after first successful connection with login and password
//define('CRM_AUTH', 'e54ec19f0c5f092ea11145b80f465e1a'); // authorization hash

/********************************************************************************************/

function get_ip()
{
    if (!empty($_SERVER['HTTP_CLIENT_IP']))
    {
        $ip=$_SERVER['HTTP_CLIENT_IP'];
    }
    elseif (!empty($_SERVER['HTTP_X_FORWARDED_FOR']))
    {
        $ip=$_SERVER['HTTP_X_FORWARDED_FOR'];
    }
    else
    {
        $ip=$_SERVER['REMOTE_ADDR'];
    }
    return $ip;
}

// Handle the parsing of the _ga cookie or setting it to a unique identifier

function gaParseCookie()
{
	if (isset($_COOKIE['_ga'])) {
		list($version,$domainDepth, $cid1, $cid2) = explode('.', $_COOKIE["_ga"]);
		$cid = $cid1.'.'.$cid2;
	}
	else $cid = gaGenUUID();
	return $cid;
}

// POST processing
if ($_SERVER['REQUEST_METHOD'] == 'POST')
{
	$leadData = $_POST['DATA'];

	// get lead data from the form
	$postData = array(
		'TITLE' => $leadData['TITLE'],
		'NAME' => $leadData['NAME'],
		'PHONE_MOBILE' => $leadData['PHONE_MOBILE'],
        'EMAIL_WORK' => $leadData['EMAIL_WORK'],
        'COMMENTS' => $leadData['COMMENTS'],
        'SOURCE_ID' => $leadData['SOURCE_ID'],
		'UF_CRM_1569920847' => gaParseCookie(),
        'UF_CRM_1539692902' => get_ip()
	);

	// append authorization data
	if (defined('CRM_AUTH'))
	{
		$postData['AUTH'] = CRM_AUTH;
	}
	else
	{
		$postData['LOGIN'] = CRM_LOGIN;
		$postData['PASSWORD'] = CRM_PASSWORD;
	}

	// open socket to CRM
	$fp = fsockopen("ssl://".CRM_HOST, CRM_PORT, $errno, $errstr, 30);
	if ($fp)
	{
		// prepare POST data
		$strPostData = '';
		foreach ($postData as $key => $value)
			$strPostData .= ($strPostData == '' ? '' : '&').$key.'='.urlencode($value);

		// prepare POST headers
		$str = "POST ".CRM_PATH." HTTP/1.0\r\n";
		$str .= "Host: ".CRM_HOST."\r\n";
		$str .= "Content-Type: application/x-www-form-urlencoded\r\n";
		$str .= "Content-Length: ".strlen($strPostData)."\r\n";
		$str .= "Connection: close\r\n\r\n";

		$str .= $strPostData;

		// send POST to CRM
		fwrite($fp, $str);

		// get CRM headers
		$result = '';
		while (!feof($fp))
		{
			$result .= fgets($fp, 128);
		}
		fclose($fp);

		// cut response headers
		$response = explode("\r\n\r\n", $result);

		$output = '<pre>'.print_r($response[1], 1).'</pre>';
	}
	else
	{
		echo 'Connection Failed! '.$errstr.' ('.$errno.')';
	}
}
else
{
	$output = '';
}

$mailData = $_POST['DATA'];

	$postmailData = array(
		'САЙТ ' => $mailData['SOURCE_ID'],
		'ТЕМА ' => $mailData['TITLE'],
		'ТЕЛЕФОН ' => $mailData['PHONE_MOBILE'],
		'ИМЯ ' => $mailData['NAME'],
		'EMAIL ' => $mailData['EMAIL_WORK'],
		'КОММЕНТАРИИ ' => $mailData['COMMENTS'],
		'IP' => get_ip()
	);

$strmailPostData = '';
		foreach ($postmailData as $key => $value)
			$strmailPostData .= ($strmailPostData == '' ? '' : '').$key.'= '.$value."\r\n";

$recepient = "aquagradus@gmail.com";
$sitename = "kolonna-samogon.com.ua";

$pagetitle = "Новая заявка \"$sitename\"";
mail($recepient, $pagetitle, $strmailPostData, "Content-type: text/plain; charset=\"utf-8\"\n From: $recepient");

?>